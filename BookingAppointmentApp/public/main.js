
// axios.defaults.headers.common = {
//   "Content-Type": "application/json"
// }

var form=document.getElementById('my-form');
const msg = document.querySelector('.msg');
var editOn= false;
var editId;

function editPostInServer(myObj){
  axios.put("http://localhost:3000/edit"+`/${editId}`,myObj)
  .then((response)=> console.log(response))
  .catch((err)=>console.log(err));
}

//Adding elements from cloud using get request using DOMContentLoaded
window.addEventListener("DOMContentLoaded",()=>{
  axios.get("http://localhost:3000/users/getAllUsers")
  .then((response) => {
      console.log(response.data.Users);
      response.data.Users.forEach(element => {
        addelements(element);
      });
  })
  .catch((err) => {
    console.log(err);
  })
});

//creating unordered list for entries
var listToAdd=document.createElement('ul');
listToAdd.className="appendedList";
form.appendChild(listToAdd);

var listGroup=document.querySelector(".appendedList");

//EVENT LISTENERS
form.addEventListener('submit',storeValues);
listGroup.addEventListener('click',deleteList);
listGroup.addEventListener('click',EditList);

function storeValues(e){
    e.preventDefault();

    console.log("inside store values");
    var name=document.getElementById('name');
    var email=document.getElementById('email');
    var phonenumber=document.getElementById('phonenumber');
    var dateForCall=document.getElementById('dateForCall');
    var timeForCall=document.getElementById('timeForCall');
   // console.log(name.value,email.value,phonenumber.value,dateForCall.value,timeForCall.val);
    var showList;
    if(name.value === '' || email.value === '' || phonenumber.value==='' || dateForCall.value==='' || timeForCall.value==='') {
        // alert('Please enter all fields');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
      }else{
        //store the values in the local storage
        let myObj={
          "name":name.value,
          "email":email.value,
          "phonenumber":phonenumber.value,
          'dateForCall':dateForCall.value,
          'timeForCall':timeForCall.value

        }
        
        //storing the values 
        /*      
        if(localStorage.getItem(myObj.email)){
            console.log("Duplicate Entry");
            removeFromPrintedList(myObj.email);
            localStorage.removeItem(myObj.email);
            localStorage.setItem(myObj.email, JSON.stringify(myObj));
            addelements(myObj);
        }else{
          localStorage.setItem(myObj.email, JSON.stringify(myObj));
          addelements(myObj);
        }
        */

        if(editOn == true){
           editPostInServer(myObj);
           myObj.id=editId;
           addelements(myObj);
           editOn=false;
           editId=0;
           return ;
        }
        else{

          //console.log(myObj);
        //STORING OBJECT IN A CLOUD
        axios.post("http://localhost:3000/user/add-user",myObj)
        .then((response) => {
            console.log("store data request",response);
            addelements(response.data.newUserDetail);
        })
        .catch((err) => {

          msg.classList.add('error');
          msg.innerHTML = 'Check the credentials';
          // Remove error after 3 seconds
          setTimeout(() => msg.remove(), 3000);

          //document.body.innerHTML=document.body.innerHTML + "<h4>Something Went Wrong</h4>"
        })
      }
    }
     
     
}

//for adding elements after submit button
function addelements(myObj){
    console.log(myObj.id);

    var ul = document.querySelector(".appendedList");  
    var li = document.createElement("li");
    li.style.width="100%";
    li.class="list-group";
    li.id=myObj.id;
  
    li.appendChild(document.createTextNode(myObj.name));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(myObj.email));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(myObj.phonenumber));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(myObj.dateForCall));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(myObj.timeForCall));
    li.appendChild(document.createTextNode(" "));
    

    var deleteBtn=document.createElement('button');

    deleteBtn.className='btn btn-danger btn-sm float-end delete';

    

    //create edit button element
    var editBtn=document.createElement('button')
    editBtn.className='btn btn-primary btn-sm float-end edit';
    editBtn.appendChild(document.createTextNode('Edit'));
    deleteBtn.appendChild(document.createTextNode('X'));
    //Append button to li 
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    ul.appendChild(li);

    //reset the values to empty in the form
    document.getElementById("my-form").reset();
}

function removeFromPrintedList(objEmail){
  var ul= document.querySelector(".appendedList");
  var li=document.getElementById(objEmail);
  if(li){
    ul.removeChild(li);
  }else{
    console.log("Not in the printed list");
  }
}

function deleteList(e){

  e.preventDefault();

  if(e.target.classList.contains('delete')){
    if(confirm('Are you sure?')){
        var li=e.target.parentElement;
        console.log(li)
        listGroup.removeChild(li);
        
        //localStorage.removeItem(li.id);
        console.log('deleteList id',li.id);
        axios.delete("http://localhost:3000/delete/"+li.id)
        .then((response)=> console.log(response))
        .catch((err) => console.log(err));
    }
}
}

function EditList(e){
  
  e.preventDefault();
  if(e.target.classList.contains('edit')){
    if(confirm('Are you sure?')){
        var li=e.target.parentElement;
        console.log(li);
               
        document.getElementById("name").value = li.childNodes[0].data;
        document.getElementById("email").value =li.childNodes[2].data;
        document.getElementById("phonenumber").value = li.childNodes[4].data;
        document.getElementById("dateForCall").value= li.childNodes[6].data;
        document.getElementById("timeForCall").value = li.childNodes[8].data;
        //localStorage.removeItem(li.id);

        //alert on ui
        msg.style="text-align:center; color:blue";
        msg.innerHTML = 'Editing Form fields';
        
        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 5000);

        editOn=true;
        editId=li.id;
        listGroup.removeChild(li);  
    }
}

}
