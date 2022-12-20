var form=document.getElementById('my-form');
const msg = document.querySelector('.msg');

form.addEventListener('click',storeValues);

function storeValues(e){
    e.preventDefault();

    var name=document.getElementById('name');
    var email=document.getElementById('email');
    var phonenumber=document.getElementById('phonenumber');
    var Dateforcall=document.getElementById('Dateforcall');
    var Timeforcall=document.getElementById('Timeforcall');
    
    console.log(name.value,email.value,phonenumber.value,Dateforcall.value,Timeforcall.val);

    if(name.value === '' || email.value === '' || phonenumber.value==='' || Dateforcall.value==='' || Timeforcall.value==='') {
        // alert('Please enter all fields');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
      }else{
        //store the values in the local storage
        localStorage.setItem('name',name.value);
        localStorage.setItem('email',email.value);
        localStorage.setItem('phonenumber',phonenumber.value);
        localStorage.setItem('Dateforcall',Dateforcall.value);
        localStorage.setItem('Timeforcall',Timeforcall.value);


      }

}