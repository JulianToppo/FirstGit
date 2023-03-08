var submitExpenseBtn = document.getElementById("expenseSubmitBtn");
var expenseList = document.getElementById('expenseList');
var buyPremiumBtn= document.getElementById('buyMembership');

function showExpenseEntry(myObj){
    try{
        let li= document.createElement("li");
        li.id=myObj.id;

      
        //adding entries made by the user
        li.appendChild(document.createTextNode(myObj.expenseAmount));
        li.appendChild(document.createTextNode(" "));
        li.appendChild(document.createTextNode(myObj.description));
        li.appendChild(document.createTextNode(" "));
        li.appendChild(document.createTextNode(myObj.category));

        
        //Delete button
        var delBtn = document.createElement('button');
        delBtn.id = "deleteBtn";
        delBtn.className="delete";
        delBtn.appendChild(document.createTextNode('DELETE'));

        li.appendChild(delBtn);
        expenseList.appendChild(li);
        
    }catch(err){
        console.log(err);
    }
}

const loadExpenseData=(e) => { 
    try{
        e.preventDefault();
        let token=localStorage.getItem("token");
        axios.get("http://localhost:3000"+"/expense/getExpense",{ headers : {"Authorization":token}})
        .then(result =>{
            result.data.ExpenseEntries.forEach(data =>{
                showExpenseEntry(data);
            })
        });
    }catch(err){
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

            let token=localStorage.getItem("token");
            axios.post("http://localhost:3000"+"/expense/addExpense", myObj,{ headers : {"Authorization":token}})
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
                console.log(li)
                //localStorage.removeItem(li.id);
                
                let token=localStorage.getItem("token");
                axios.delete("http://localhost:3000/expense/" + li.id, { headers : {"Authorization":token}} )
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

const buyPremiumMembership= async (e) =>{

    try {
        e.preventDefault();
        const token = localStorage.getItem('token')
        const response  = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
        console.log(response);
        var options =
        {
         "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
         "order_id": response.data.order.id,// For one time payment
         // This handler function will handle the success payment
         "handler": async function (response) {
            const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                 order_id: options.order_id,
                 payment_id: response.razorpay_payment_id,
             }, { headers: {"Authorization" : token} })
            
            console.log(res)
             alert('You are a Premium User Now')
             //hide the button and show premium user
             document.getElementById('buyMembership').style.visibility = "hidden"
             document.getElementById('message').innerHTML = "You are a premium user ";
             localStorage.setItem('token', res.data.token);
             showLeaderboard();
            }
        }
        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();
      
        rzp1.on('payment.failed', function (response){
          console.log(response)
          alert('Something went wrong')
       });
    } catch (error) {
        console.log(error);
    }
}

function checkIfPremium(e){
    try {
        e.preventDefault();
        let token=localStorage.getItem("token");
        axios.get("http://localhost:3000"+"/purchase/checkPremium",{ headers : {"Authorization":token}})
        .then(response =>{
            console.log(response.data);
            if(response.data.success=== true){
                document.getElementById('buyMembership').style.visibility = "hidden"
                document.getElementById('message').innerHTML = "You are a premium user ";
                showLeaderboard();
            }
        })
    } catch (error) {
        console.log(error);
    }
}

function showLeaderboard(){
    const inputElement = document.createElement("input");
    inputElement.type = "button";
    inputElement.value = 'Show Leaderboard'
    inputElement.onclick = async() => {
        const token = localStorage.getItem('token')
        const userLeaderBoardArray = await axios.get('http://localhost:3000/premium/showLeaderBoard', { headers: {"Authorization" : token} })
        console.log(userLeaderBoardArray.data)

        var leaderboardElem = document.getElementById('leaderboard')
        leaderboardElem.innerHTML += '<h1> Leader Board </<h1>'
        userLeaderBoardArray.data.forEach((userDetails) => {
            leaderboardElem.innerHTML += `<li>Name - ${userDetails.name} Total Expense - ${userDetails.total_cost || 0} </li>`
        })
    }
    document.getElementById("message").appendChild(inputElement);

}

document.addEventListener("DOMContentLoaded",loadExpenseData);
document.addEventListener("DOMContentLoaded",checkIfPremium);
submitExpenseBtn.addEventListener("click", addExpense);
expenseList.addEventListener("click",deleteItems);
buyPremiumBtn.addEventListener("click",buyPremiumMembership);
