
var submitBtn= document.getElementById("submitLoginForm");
var errorMsg= document.getElementById("errorMsg");

var SubmitForm= async (e)=>{
   
   try{

  e.preventDefault();
    
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;

    if(email=='' || password=='' || name=='' ){

        errorMsg.innerHTML="Please enter the values before submitting"
        setTimeout(() => errorMsg.remove(), 3000);
        return;

    }

    let myObj={
        "name":name,
        "email":email,
        "password":password
    };

    axios.post("http://localhost:3000/user/post",myObj)
    .then(data=>{

    })
    }catch(err){
      console.log(err);
    }
}

document.addEventListener("click",SubmitForm);