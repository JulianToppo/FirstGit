var msg = document.getElementById('msg')
var submitBtn = document.getElementById('submitbutton')
var groceryList = document.getElementById('groceryList')

var editId;
var editFlag = false;
document.addEventListener('DOMContentLoaded', () => {
    try {
        axios.get("http://localhost:3000/getEntries")
            .then((result) => {
                result.data.ExpenseEntries.forEach(element => {
                    addExpenseEntry(element);
                });
            })
    } catch (err) {
        console.log(err);
    }
})

const editExpenseEntry = async (myObj) => {
    try {
        const response = await axios.put("http://localhost:3000/edit" + `/${editId}`, myObj)
        console.log(response.data.EditedUser);
    } catch (err) {
        console.log(err);
    }
}

const additems = async (e) => {

    try {
        e.preventDefault(e);

        var expenseAmount = document.getElementById('expenseAmount').value;
        var description = document.getElementById('chooseDesc').value;
        var category = document.getElementById('category').value;


        if (expenseAmount == "" || description == "" || category == "") {

            msg.classList.add('error');
            msg.innerHTML = 'Please enter all fields';

            // Remove error after 3 seconds
            setTimeout(() => msg.remove(), 3000);
            return;
        }

        //store in local storage
        myObj = {
            "expenseAmount": expenseAmount,
            "description": description,
            "category": category,
        }

        if (editFlag == true) {
            editExpenseEntry(myObj);
            myObj.id = editId;
            editFlag = false;
            addExpenseEntry(myObj);
        }
        else {
            //Store item in database
            axios.post("http://localhost:3000/", myObj)
                .then(
                    (result) => {
                        console.log(result),
                            addExpenseEntry(result.data.ExpenseEntry);
                    }
                )
        }
    }
    catch (err) {
        console.log(err);
    }
}
// if(localStorage.getItem(myObj.description)){
//     removeFromPrintedList(myObj.description);
//     localStorage.removeItem(myObj.description);
//     localStorage.setItem(myObj.description, JSON.stringify(myObj));
// }else{
// localStorage.setItem(myObj.description, JSON.stringify(myObj));
// }


//Addition of list

const addExpenseEntry = async (myObj) => {
    try {
        var li = document.createElement('li');
        li.id = myObj.id;
        li.className = "list-group-item list-group-item-info";

        //adding entries made by the user
        li.appendChild(document.createTextNode(myObj.expenseAmount));
        li.appendChild(document.createTextNode(" "));
        li.appendChild(document.createTextNode(myObj.description));
        li.appendChild(document.createTextNode(" "));
        li.appendChild(document.createTextNode(myObj.category));



        //Delete button
        var delBtn = document.createElement('button');
        delBtn.id = "deleteBtn";
        delBtn.className = "btn btn-danger btn-sm float-end delete"
        delBtn.appendChild(document.createTextNode('DELETE'));

        //Edit button
        var EditBtn = document.createElement('button');
        EditBtn.id = "editBtn";
        EditBtn.className = "btn btn-primary btn-sm float-end edit mr-1";
        EditBtn.appendChild(document.createTextNode('EDIT'));


        li.appendChild(delBtn);
        li.appendChild(EditBtn);
        groceryList.appendChild(li);
    }
    catch (err) {
        console.log(err);
    }
}

const removeFromPrintedList = async (desc) => {
    try {
        var li = document.getElementById(desc);
        if (li) {
            groceryList.removeChild(li);
        } else {
            console.log("Not in the printed list");
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

                axios.delete("http://localhost:3000/" + li.id)
                    .then(
                        (result) => {
                            console.log("Entry Deleted")
                            console.log(result.data.Delete);
                        }
                    )

                groceryList.removeChild(li);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}

const editItems = async (e) => {
    try {
        console.log('Inside edit function')
        e.preventDefault(e);
        if (e.target.classList.contains('edit')) {
            if (confirm('Are you sure?')) {
                var li = e.target.parentElement;
                console.log(li)

                document.getElementById('expenseAmount').value = li.childNodes[0].data;
                document.getElementById('chooseDesc').value = li.childNodes[2].data;
                document.getElementById('category').value = li.childNodes[4].data;;

                //localStorage.removeItem(li.id);
                editId = li.id;
                editFlag = true;
                groceryList.removeChild(li);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}

submitBtn.addEventListener('click', additems);
groceryList.addEventListener('click', deleteItems);
groceryList.addEventListener('click', editItems);