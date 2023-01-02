var msg=document.getElementById('msg')
var submitBtn=document.getElementById('submitbutton')
var groceryList=document.getElementById('groceryList')

submitBtn.addEventListener('click',additems);
groceryList.addEventListener('click',deleteItems);
groceryList.addEventListener('click',editItems);

function additems(e){
    
    e.preventDefault(e);

    var expenseAmount=document.getElementById('expenseAmount').value;
    var description=document.getElementById('chooseDesc').value;
    var category=document.getElementById('category').value;

    
    if(expenseAmount=="" || description=="" || category=="" ){
        
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        
        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
        return;
    }
    
    //store in local storage
    myObj={
        "expenseAmount":expenseAmount,
        "description":description,
        "category":category,
    }

    if(localStorage.getItem(myObj.description)){
        removeFromPrintedList(myObj.description);
        localStorage.removeItem(myObj.description);
        localStorage.setItem(myObj.description, JSON.stringify(myObj));
    }else{
    localStorage.setItem(myObj.description, JSON.stringify(myObj));
    }


    //Addition of list
    var li=document.createElement('li');
    li.id=description;
    li.className="list-group-item list-group-item-info";

    //adding entries made by the user
    li.appendChild(document.createTextNode(expenseAmount));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(description));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(category));
    


    //Delete button
    var delBtn=document.createElement('button');
    delBtn.id="deleteBtn";
    delBtn.className="btn btn-danger btn-sm float-right delete"
    delBtn.appendChild(document.createTextNode('DELETE'));

    //Edit button
    var EditBtn=document.createElement('button');
    EditBtn.id="editBtn";
    EditBtn.className="btn btn-primary btn-sm float-right edit";
    EditBtn.appendChild(document.createTextNode('EDIT'));

    
    li.appendChild(EditBtn);
    li.appendChild(delBtn);

    groceryList.appendChild(li);
}

function removeFromPrintedList(desc){
    var li=document.getElementById(desc);
    if(li){
        groceryList.removeChild(li);
    }else{
      console.log("Not in the printed list");
    }
  }

function deleteItems(e){
    console.log('Inside delete function')
    e.preventDefault(e);
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li=e.target.parentElement;
            console.log(li)
            localStorage.removeItem(li.id);
            groceryList.removeChild(li);
        }
    }
}

function editItems(e){
    console.log('Inside edit function')
    e.preventDefault(e);
    if(e.target.classList.contains('edit')){
        if(confirm('Are you sure?')){
            var li=e.target.parentElement;
            console.log(li)
            
            document.getElementById('expenseAmount').value=li.childNodes[0].data;
            document.getElementById('chooseDesc').value=li.childNodes[2].data;
            document.getElementById('category').value=li.childNodes[4].data;;

            localStorage.removeItem(li.id);
            groceryList.removeChild(li);
        }
    }
}