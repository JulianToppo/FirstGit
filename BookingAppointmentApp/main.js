var form=document.getElementById('my-form');
const msg = document.querySelector('.msg');

form.addEventListener('submit',storeValues);

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
        
        //storing the values in an array
        showList = JSON.parse(localStorage.getItem('ListOfEnteredValue') || "[]")
        showList.push(myObj);
        localStorage.setItem("ListOfEnteredValue", JSON.stringify(showList));
      }
     
      addelements();
}

//for adding elements after submit button
function addelements(){
  showList = JSON.parse(localStorage.getItem('ListOfEnteredValue') || "[]")
  var ul = document.querySelector(".submit");
  console.log(ul);
  var li = document.createElement("div");
  for(var i=0;i<showList.length;i++){
    li.appendChild(document.createTextNode(showList[i].name));
    li.innerHTML += ' ';
    li.appendChild(document.createTextNode(showList[i].email));
    li.innerHTML += ' ';
    li.appendChild(document.createTextNode(showList[i].phonenumber));
    li.innerHTML += ' ';
    li.appendChild(document.createTextNode(showList[i].dateForCall));
    li.innerHTML += ' ';
    li.appendChild(document.createTextNode(showList[i].timeForCall));
    li.innerHTML += '<br>';
    
  ul.appendChild(li);
  }
}
