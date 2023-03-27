var submitExpenseBtn = document.getElementById("expenseSubmitBtn");
var expenseList = document.getElementById('expenseList');
var buyPremiumBtn = document.getElementById('buyMembership');
var downloadedFilesList = document.getElementById('downloadedFiles');

var showExpenses = document.getElementById('showExpenses');

var baseURL=process.env.HOST_IPADDRESS;

function showExpenseEntry(myObj) {
    try {

        
        let li = document.createElement("li");
        li.id = myObj.id;


        //adding entries made by the user
        li.appendChild(document.createTextNode(myObj.expenseAmount));
        li.appendChild(document.createTextNode(" "));
        li.appendChild(document.createTextNode(myObj.description));
        li.appendChild(document.createTextNode(" "));
        li.appendChild(document.createTextNode(myObj.category));


        //Delete button
        var delBtn = document.createElement('button');
        delBtn.id = "deleteBtn";
        delBtn.className = "delete";
        delBtn.appendChild(document.createTextNode('DELETE'));

        li.appendChild(delBtn);
        expenseList.appendChild(li);

    } catch (err) {
        console.log(err);
    }
}

function showDownloadedFiles(myObj) {
    try {
        let li = document.createElement("li");
        li.id = myObj.id;

        var a = document.createElement("a");
        a.href = myObj.fileURL;
        a.download = 'myexpense.csv';
        a.innerText = myObj.fileURL;

        li.appendChild(a);
        downloadedFilesList.appendChild(li);

    } catch (err) {
        console.log(err);
    }
}

const showPagination = ({currpage,hasNext,next,hasPrevious,previous,last}) => {
    try {
        console.log("inside show pagination");

        const showPaginationList= document.getElementById("pagination");
        showPaginationList.innerHTML='';

        if(hasPrevious)
        {
        let btn= document.createElement('button');
        btn.id=previous;
        btn.addEventListener('click',()=>{
            getProducts(previous)
        });
        btn.innerHTML=previous;
        showPaginationList.appendChild(btn);
        }

        let btn= document.createElement('button');
        btn.id=currpage;
        btn.innerHTML=currpage;
        btn.addEventListener('click',()=>{
            getProducts(currpage)
        });

        showPaginationList.appendChild(btn);

        if(hasNext){
            let btn= document.createElement('button');
            btn.id=next;
            btn.addEventListener('click',()=>{
                getProducts(next)
            });
            btn.innerHTML=next;
            showPaginationList.appendChild(btn);
        }

    } catch (error) {
        console.log(error);
    }
}


const loadExpenseData = async (e) => {
    try {
        e.preventDefault();
        
        const rowCount=localStorage.getItem('rowCount');
        let token = localStorage.getItem("token");
        const pageNo = 1;
        await axios.get(`${baseURL}` + "/expense/getExpense/pageNo/"+ `${pageNo}`+"/"+`${rowCount}`, { headers: { "Authorization": token } })
            .then(result => {
                console.log("result from load expense data recived")
                expenseList.innerHTML='';
                result.data.ExpenseEntries.forEach(data => {
                    showExpenseEntry(data);  
                });
                showPagination(result.data.paginationValues);
            });
    } catch (err) {
        console.log(err);
    }
}

const getProducts= async (pageNo)=>{
    try {
        const rowCount=localStorage.getItem('rowCount');
        let token = localStorage.getItem("token");
        await axios.get(`${baseURL}` + "/expense/getExpense/pageNo/"+ `${pageNo}`+"/"+`${rowCount}`, { headers: { "Authorization": token } })
            .then(result => {
                expenseList.innerHTML='';
                result.data.ExpenseEntries.forEach(data => {
                    showExpenseEntry(data);
                })
                showPagination(result.data.paginationValues);
            });
    } catch (err) {
        console.log(err);
    }
}


const addExpense = (e) => {

    try {
        e.preventDefault();

        let expenseAmount = document.getElementById('expenseAmount').value;
        let description = document.getElementById('description').value;
        let category = document.getElementById('category').value;

        if (expenseAmount == '' || description == '' || category == '') {

            errorMsg.innerHTML = "Please enter the values before submitting"
            setTimeout(() => errorMsg.remove(), 3000);
            return;

        } else {

            let myObj = {
                "expenseAmount": expenseAmount,
                "description": description,
                "category": category
            };

            let token = localStorage.getItem("token");
            axios.post(`${baseURL}` + "/expense/addExpense", myObj, { headers: { "Authorization": token } })
                .then(data => {
                    //alert(JSON.stringify(data.data.Message));
                    //  console.log(data.data);
                    // add expense entry to frontend
                    console.log(data.data.NewExpenseEntry);
                    showExpenseEntry(data.data.NewExpenseEntry);

                }).catch(err => {
                    loginError.innerHTML = JSON.stringify(err.response.data.Error);
                    console.log(err);
                })
        }
    } catch (err) {
        console.log(err);
    }
}



const deleteItems = async (e) => {

    try {
        console.log('Inside delete function')
        e.preventDefault(e);
        if (e.target.classList.contains('delete')) {
            if (confirm('Are you sure?')) {
                var li = e.target.parentElement;

                //localStorage.removeItem(li.id);

                let token = localStorage.getItem("token");
                axios.delete("http://localhost:3000/expense/" + li.id, { headers: { "Authorization": token } })
                    .then(
                        (result) => {
                            console.log("Entry Deleted")
                            console.log(result.data.Delete);
                        }
                    )

                expenseList.removeChild(li);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}

const buyPremiumMembership = async (e) => {

    try {
        e.preventDefault();
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: { "Authorization": token } });
        console.log(response);
        var options =
        {
            "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
            "order_id": response.data.order.id,// For one time payment
            // This handler function will handle the success payment
            "handler": async function (response) {
                const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id,
                }, { headers: { "Authorization": token } })

                console.log(res)
                alert('You are a Premium User Now')
                //hide the button and show premium user
                document.getElementById('buyMembership').style.visibility = "hidden"
                document.getElementById('message').innerHTML = "You are a premium user ";
                localStorage.setItem('token', res.data.token);
                showLeaderboard();
                showDaily_Monthly_YearlyExpense();
            }
        }
        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on('payment.failed', function (response) {
            console.log(response)
            alert('Something went wrong')
        });
    } catch (error) {
        console.log(error);
    }
}

function checkIfPremium(e) {
    try {
        e.preventDefault();
        let token = localStorage.getItem("token");
        axios.get(`${baseURL}` + "/purchase/checkPremium", { headers: { "Authorization": token } })
            .then(response => {
                console.log(response.data);
                if (response.data.success === true) {
                    document.getElementById('buyMembership').style.visibility = "hidden"
                    document.getElementById('message').innerHTML = "You are a premium user ";
                    showLeaderboard();
                }
            })
    } catch (error) {
        console.log(error);
    }
}

function showLeaderboard() {
    const inputElement = document.createElement("input");
    inputElement.type = "button";
    inputElement.value = 'Show Leaderboard'
    inputElement.onclick = async () => {
        const token = localStorage.getItem('token')
        const userLeaderBoardArray = await axios.get(`${baseURL}`+'/premium/showLeaderBoard', { headers: { "Authorization": token } })
        console.log(userLeaderBoardArray.data)

        var leaderboardElem = document.getElementById('leaderboard')

        while (leaderboardElem.firstChild) {
            leaderboardElem.removeChild(leaderboardElem.firstChild);
        }

        leaderboardElem.innerHTML += '<h1> Leader Board </<h1>'
        userLeaderBoardArray.data.forEach((userDetails) => {
            leaderboardElem.innerHTML += `<li>Name - ${userDetails.name} Total Expense - ${userDetails.totalExpense || 0} </li>`
        })
    }
    document.getElementById("message").appendChild(inputElement);

}

// function showDaily_Monthly_YearlyExpense(){
//     try {
//         let btn= document.createElement('button');
//         btn.id="showDailyMonthlyYearlyExpense";
//         btn.value="Show Reports";
//         btn.onclick= async() => {
//             window.location="/showReports";

//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

async function download() {
    const token = localStorage.getItem('token')
    axios.get(`${baseURL}` +"/expense/user/download", { headers: { "Authorization": token } })
        .then((response) => {
            if (response.status === 200) {

                var a = document.createElement("a");
                a.href = response.data.fileURL;
                a.download = 'myexpense.csv';
                a.click();

                showDownloadedFiles(response.data);
                //window.location.reload();


            } else {
                throw new Error(response.data.message)
            }

        })
        .catch((err) => {
            console.log(err)
        });
}

const loadDownloadedFiles = async (e) => {
    try {

        e.preventDefault();
        let token = localStorage.getItem("token");
        await axios.get(`${baseURL}` + "/expense/getDownloadedFiles", { headers: { "Authorization": token } })
            .then(result => {
                result.data.DownloadedFiles.forEach(data => {
                    showDownloadedFiles(data);
                })
            });
    } catch (err) {
        console.log(err);
    }
}

const changeExpenseRowCount= (e)=>{
    try {
        e.preventDefault();
        const rowCount= document.getElementById('numberOfExpenses').value;
        localStorage.setItem('rowCount',rowCount);
        getProducts(1);
    } catch (error) {
        console.log(error)
    }

}

document.addEventListener("DOMContentLoaded", loadExpenseData);
document.addEventListener("DOMContentLoaded", checkIfPremium);
document.addEventListener("DOMContentLoaded", loadDownloadedFiles);
submitExpenseBtn.addEventListener("click", addExpense);
expenseList.addEventListener("click", deleteItems);
buyPremiumBtn.addEventListener("click", buyPremiumMembership);
showExpenses.addEventListener('click',changeExpenseRowCount);