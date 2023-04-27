const sendMessage= document.getElementById('sendMessage')
const messageQueue= document.getElementById('messageQueue')

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

var addToMessagesList=(messageArray)=>{
    try {
        let count=0;
        messageQueue.innerHTML="";
        messageArray.forEach(element => {
            let elem= document.createElement('li');
            console.log(count);
            elem.id=count;
            if(count%2){
                 elem.classList="list-group-item list-group-item-dark"
            }else{
                elem.classList="list-group-item list-group-item-light"
            }
           
            elem.innerHTML=element.message;
            count++;

            messageQueue.appendChild(elem);

        },count);
    } catch (error) {
        console.log(error)
    }
}

var loadMessages=()=>{
    try {
       // e.preventDefault();
        let token=localStorage.getItem('token');
        axios.get("http://localhost:3000/chatapp/loadmessages",{headers:{"Authorization":token}}).then(
            (result)=>{
                console.log(result.data.messages);
                addToMessagesList(result.data.messages);
            }
        ).catch(err=>console.log(err));
    } catch (error) {
        console.log(error)
    }
}

var refreshloadMessages=()=>{
    try{
        setInterval(loadMessages,1000);
    }catch(err){
        console.log(err);
    }
}

//setInterval refreshes the page after defined milliseconds
document.addEventListener("DOMContentLoaded",refreshloadMessages);
sendMessage.addEventListener('click',displayMessages);