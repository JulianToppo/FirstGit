var submitExpenseBtn = document.getElementById("expenseSubmitBtn");
var expenseList = document.getElementById('expenseList');

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


document.addEventListener("DOMContentLoaded",loadExpenseData);
submitExpenseBtn.addEventListener("click", addExpense);
expenseList.addEventListener("click",deleteItems);