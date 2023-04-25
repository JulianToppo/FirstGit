const sendMessage= document.getElementById('sendMessage')

var displayMessages= (e)=>{
    try {
        e.preventDefault();
        let message= document.getElementById('message').value;
        if(message==''){
            alert('Fill the message value')
        }
        else{
            var myobj={
                "message":message
            }
            let token=localStorage.getItem('token');
            axios.post("http://localhost:3000/chatapp/sendmessage",myobj,{headers:{"Authorization":token}}).then((result)=>{

            }).catch(err=>{
                console.log(err)
            })
        }

    } catch (error) {
        console.log(error)
    }
}

sendMessage.addEventListener('click',displayMessages);