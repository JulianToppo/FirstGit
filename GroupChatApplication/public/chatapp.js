const sendMessage = document.getElementById('sendMessage')
const messageQueue = document.getElementById('messageQueue')


var displayMessages = (e) => {
    try {
        e.preventDefault();
        let message = document.getElementById('message').value;
        if (message == '') {
            alert('Fill the message value')
        }
        else {
            var myobj = {
                "message": message
            }
            let token = localStorage.getItem('token');
            axios.post("http://localhost:3000/chatapp/sendmessage", myobj, { headers: { "Authorization": token } }).then((result) => {

            }).catch(err => {
                console.log(err)
            })
        }

    } catch (error) {
        console.log(error)
    }
}

var printMessages = (listCheckForValues, oldmessageArray) => {
    let count = 0;

    listCheckForValues.forEach(async element => {
        let elem = document.createElement('li');
        console.log(count);
        elem.id = count;
        if (count % 2) {
            elem.classList = "list-group-item list-group-item-dark"
        } else {
            elem.classList = "list-group-item list-group-item-light"
        }

        // let token = localStorage.getItem('token')
        // axios.get("http://localhost:3000/chatapp/getusername"+"/"+element.userId,{headers:{"Authorization":token}}).then(
        //     result=>{
        //         elem.innerHTML=result.data.username+" : "+ element.message;
        //         count++;
        //         messageQueue.appendChild(elem);


        //     }
        // ).catch(err=>{
        //     console.log(err)
        // })
        elem.innerHTML = element.message;
        count++;
        messageQueue.appendChild(elem);
        if (oldmessageArray.length > 10) {
            console.log("Excess messages")
            oldmessageArray.shift();
        }
        if (messageQueue.getElementsByTagName('li').length > 10) {
            messageQueue.removeChild(messageQueue.firstElementChild);
        }

    }, count);
    localStorage.setItem("oldmessages", JSON.stringify(oldmessageArray))
}

//Additiong of message in the list
var addToMessagesList = async () => {
    try {

        // messageQueue.innerHTML="";

        let oldmessageArray = JSON.parse(localStorage.getItem("oldmessages"));
        let newmessageArray = JSON.parse(localStorage.getItem("newmessages"))

        printMessages(oldmessageArray, oldmessageArray);
        printMessages(newmessageArray, oldmessageArray);

        oldmessageArray.push(...newmessageArray);
        localStorage.setItem("oldmessages", JSON.stringify(oldmessageArray))


    } catch (error) {
        console.log(error)
    }
}

var loadMessages = async () => {
    try {
        // e.preventDefault();
        let lastId;
        let token = localStorage.getItem('token');
        let oldmessageArray = [];
        if (localStorage.getItem("oldmessages") != undefined) {
            oldmessageArray = JSON.parse(localStorage.getItem('oldmessages'));
            lastId = oldmessageArray[oldmessageArray.length - 1].id;
        } else {
            lastId = -1;
        }
        console.log(lastId);

        await axios.get("http://localhost:3000/chatapp/getmessages/" + lastId, { headers: { "Authorization": token } }).then(
            (result) => {

                //oldmessageArray.push(...result.data.messages)
                let newmessages = result.data.messages

                // localStorage.setItem("oldmessages", JSON.stringify(oldmessageArray))
                localStorage.setItem("newmessages", JSON.stringify(newmessages))

                addToMessagesList();
            }
        ).catch(err => console.log(err));
    } catch (error) {
        console.log(error)
    }
}

var refreshloadMessages = () => {
    try {
        setInterval(loadMessages, 1000);
    } catch (err) {
        console.log(err);
    }
}

//setInterval refreshes the page after defined milliseconds
document.addEventListener("DOMContentLoaded", refreshloadMessages);
sendMessage.addEventListener('click', displayMessages);