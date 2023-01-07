
var form=document.getElementById('my-form');
const msg = document.querySelector('.msg');

//Adding elements from cloud using get request
function addElementFromCloud(){
  axios.get("https://crudcrud.com/api/3dc35771328a48dcb1574f90246a9e05/appointmentData")
  .then((response) => {
      console.log(response.data);
      response.data.forEach(element => {
        addelements(element);
      });
  })
  .catch((err) => {
   // document.body.innerHTML=document.body.innerHTML + "<h4>Something Went Wrong</h4>"
    console.log(err);
  })
}

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

        //STORING OBJECT IN A CLOUD
        axios.post("https://crudcrud.com/api/3dc35771328a48dcb1574f90246a9e05/appointmentData",myObj)
        .then((response) => {
            console.log(response.data);
            addelements(response.data);
        })
        .catch((err) => {
          document.body.innerHTML=document.body.innerHTML + "<h4>Something Went Wrong</h4>"
          console.log(err);
        })
      }
     
     
}

//for adding elements after submit button
function addelements(myObj){
    var ul = document.querySelector(".appendedList");  
    var li = document.createElement("li");
    li.style.width="100%";
    li.class="list-group";
    li.id=myObj.email;
  
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

    deleteBtn.className='btn btn-danger btn-sm float-right delete';

    deleteBtn.appendChild(document.createTextNode('X'));

    //create edit button element
    var editBtn=document.createElement('button')
    editBtn.className='btn btn-primary btn-sm float-right edit';
    editBtn.appendChild(document.createTextNode('Edit'));

    //Append button to li 
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    ul.appendChild(li);
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
        localStorage.removeItem(li.id);
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
        localStorage.removeItem(li.id);
        listGroup.removeChild(li);  
    }
}
}

//Function call for loading objects from the crud server 
addElementFromCloud();