var form=document.getElementById('my-form');
const msg = document.querySelector('.msg');

form.addEventListener('click',storeValues);

function storeValues(e){
    e.preventDefault();

    var name=document.getElementById('name');
    var email=document.getElementById('email');
    var phonenumber=document.getElementById('phonenumber');
    var dateForCall=document.getElementById('dateForCall');
    var timeForCall=document.getElementById('timeForCall');
    
    console.log(name.value,email.value,phonenumber.value,dateForCall.value,timeForCall.val);

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

        myObjString=JSON.stringify(myObj)
                
        localStorage.setItem('Entered Value',myObjString);


      }

}