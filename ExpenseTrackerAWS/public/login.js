var LoginBtn = document.getElementById("submitLoginForm");
//var openSignUp = document.getElementById("signUpPage");
var loginError = document.getElementById("loginError");
var errorMsg = document.getElementById("errorMsg");

// var OpenSignUp= async(e)=>{
//     try{
//         e.preventDefault();
//         axios.get("http://localhost:3000/signUp")
//         .then(data =>{
//                 console.log(data.data);
//         })
//     }catch(err){
//         console.log(err);
//     }
// }



var SubmitLoginForm = async (e) => {

    try {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        if (email == '' || password == '' ) {

            errorMsg.innerHTML = "Please enter the values before submitting"
            setTimeout(() => errorMsg.remove(), 3000);
            return;

        }

        let myObj = {
            "email": email,
            "password": password
        };

        axios.post("http://localhost:3000/login/", myObj)
            .then(data => {
                alert("User Login Successful!");
              //  console.log(data.data);

            }).catch(err =>{
                loginError.innerHTML=JSON.stringify(err.response.data.Error);
                console.log(err);
            })
    } catch (err) {
         console.log(err);
    }
}


LoginBtn.addEventListener("click", SubmitLoginForm);
//openSignUp.addEventListener("click", OpenSignUp);