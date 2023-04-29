const sendMessage = document.getElementById('sendMessage')
const messageQueue = document.getElementById('messageQueue')
const groups = document.getElementById('groups')
const groupBtn = document.getElementById('groupBtn')
const groupFormBtn = document.getElementById('submitGroupName')
const grpAlert = document.getElementById('groupAlert')
const inviteBtn = document.getElementById('inviteUsersBtn')
const users = document.getElementById('users');
const submitUserInviteName = document.getElementById('submitUserInviteName');
const pendingRequestsBtn = document.getElementById('pendingRequestsBtn')
const pendingRequestsList = document.getElementById('pendingRequestsList');

function sendMessages(e) {
    try {
        e.preventDefault()
        let grpId = localStorage.getItem('groupId') == null ? 0 : localStorage.getItem('groupId');
        console.log(grpId);
        if (grpId == 0) {
            const grpAlert = document.getElementById('groupAlert')
            grpAlert.style.display = ''
        } else {
            let message = document.getElementById('message').value
            if (message == '') {
                alert('Fill the message value')
            }
            else {
                var myobj = {
                    "message": message,
                    "groupID": grpId
                }

                let token = localStorage.getItem('token')
                axios.post("http://localhost:3000/chatapp/sendmessage", myobj, { headers: { "Authorization": token } }).then((result) => {
                    loadMessages();
                }).catch(err => {
                    console.log(err)
                })
            }
        }



    } catch (error) {
        console.log(error)
    }
}

var printMessages = async (listCheckForValues, oldmessageArray) => {

    try {

        console.log(listCheckForValues)
        for (let i = 0; i < listCheckForValues.length; i++) {
            let token = localStorage.getItem('token')
            let username = await axios.get("http://localhost:3000/chatapp/getusername" + "/" + listCheckForValues[i].userId, { headers: { "Authorization": token } })
            //     result => {
            //         elem.innerHTML = result.data.username + " : " + element.message;
            //         count++;
            //         console.log("inside")
            //         messageQueue.appendChild(elem);
            //     }
            // ).catch(err => {
            //     console.log(err)
            // })
            console.log(listCheckForValues[i])
            console.log(username.data.username);
            let elem = document.createElement('li');
            
            elem.id = i;
            if (i % 2) {
                elem.classList = "list-group-item list-group-item-dark"
            } else {
                elem.classList = "list-group-item list-group-item-light"
            }
            elem.innerHTML = username.data.username + " : " + listCheckForValues[i].message;
            
            messageQueue.appendChild(elem);


            if (oldmessageArray.length != 0 && oldmessageArray.length > 10) {
                console.log("Excess messages")
                oldmessageArray.shift();
            }
            if (messageQueue.getElementsByTagName('li').length > 10) {
                messageQueue.removeChild(messageQueue.firstElementChild);
            }
        }
        localStorage.setItem("oldmessages", JSON.stringify(oldmessageArray))
    }
    catch (err) {
        console.log(err);
    }


}

//Addition of message in the list
var addToMessagesList = async () => {
    try {

        messageQueue.innerHTML = "";

        let oldmessageArray = JSON.parse(localStorage.getItem("oldmessages"));
        let newmessageArray = JSON.parse(localStorage.getItem("newmessages"))

        // oldmessageArray=oldmessageArray?oldmessageArray:[];
        await printMessages(oldmessageArray, oldmessageArray).then(async result => {
            await printMessages(newmessageArray, oldmessageArray);
        });

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

        let grpId = localStorage.getItem('groupId') == null ? 0 : localStorage.getItem('groupId');
        console.log(grpId);
        if (grpId == 0) {
            grpAlert.style.display = ''
        }
        else {
            grpAlert.style.display = 'none'
            let token = localStorage.getItem('token');
            let oldmessageArray = [];
            // console.log(localStorage.getItem("oldmessages"))
            if (localStorage.getItem("oldmessages") == null || JSON.parse(localStorage.getItem('oldmessages')).length == 0) {
                lastId = -1;
            } else {
                oldmessageArray = JSON.parse(localStorage.getItem('oldmessages'));
                if (oldmessageArray[oldmessageArray.length - 1].groupId != grpId) {
                    localStorage.removeItem("oldmessages");
                } else {
                    lastId = oldmessageArray[oldmessageArray.length - 1].id;
                }

            }
            console.log(lastId);

            await axios.get("http://localhost:3000/chatapp/getmessages/" + `${lastId}/${grpId}`, { headers: { "Authorization": token } }).then(
                (result) => {

                    console.log("datarecieved", result.data.messages);
                    //oldmessageArray.push(...result.data.messages)
                    let newmessages = result.data.messages

                    localStorage.setItem("oldmessages", JSON.stringify(oldmessageArray))
                    localStorage.setItem("newmessages", JSON.stringify(newmessages))

                    addToMessagesList();
                }



            ).catch(err => console.log(err));
        }
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

// var getGroupNames=()=>{
//     try {
//         axios.get("https://localhost:3000/chatapp"+"/getgroupname")
//     } catch (error) {

//     }
// }

var addGroups = (groupsArray) => {
    try {
        let count = 0;
        groupsArray.forEach(element => {

            let newElem = document.createElement('li')
            newElem.id = element.name;
            if (element.id == localStorage.getItem("groupId")) {
                newElem.classList = "btn btn-success";
                document.getElementById("activeGroup").innerHTML = element.name;
            }
            else {
                newElem.classList = "btn btn-outline-info";
            }
            newElem.innerHTML = element.name;
            newElem.onclick = () => {
                localStorage.setItem('groupId', element.id);
                document.getElementById("activeGroup").innerHTML = element.name;
                //newElem.classList.add = "btn-success";
                newElem.style.backgroundColor = "green"
                localStorage.removeItem("oldmessages");
                window.location.reload();

                loadMessages()
            }
            groups.appendChild(newElem);

        }, count)
    } catch (error) {
        console.log(error)
    }
}

var getGroupsForUser = () => {
    try {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:3000/chatapp" + "/getgroups", { headers: { "Authorization": token } }).then(
            result => {
                console.log(result.data)
                addGroups(result.data.groups[0].groups)
            }
        )
    } catch (error) {
        console.log(error)
    }
}

//Hiding and displaying the group form
var displayGroupForm = () => {
    try {
        const groupForm = document.getElementById('groupForm');
        if (groupForm.style.display == "none") {
            groupForm.style.display = "";
        } else {
            groupForm.style.display = "none";
        }

    } catch (error) {
        console.log(error);
    }
}

//Addition of various chatgroups
var addGroup = (e) => {
    try {
        e.preventDefault();
        let nameOfGroup = document.getElementById('nameOfGroup').value;
        console.log(nameOfGroup)
        let myobj = {
            "groupName": nameOfGroup,
        }
        let token = localStorage.getItem("token");
        axios.post("http://localhost:3000/chatapp" + "/addgroup", myobj, { headers: { "Authorization": token } }).then(
            result => {
                console.log(result.data.data);
                const groupForm = document.getElementById('groupForm');
                groupForm.style.display = "none";
                alert(`${nameOfGroup} added!`);
                window.location.reload();
            }
        ).catch(err => {
            console.log(err)
        })
    } catch (error) {
        console.log(err)
    }
}

var addUsersForInvite = (usersList) => {
    try {
        usersList.forEach(element => {
            let newElem = document.createElement('option');
            // newElem.id=element.id;
            newElem.innerHTML = element.username;

            users.appendChild(newElem);
        })
    } catch (error) {
        console.log(error)
    }
}

var showInviteForm = async (e) => {
    try {
        e.preventDefault();
        let inviteForm = document.getElementById('inviteform');
        if (inviteForm.style.display == '') {
            inviteForm.style.display = "none";
            return;
        }

        document.getElementById('inviteform').style.display = '';
        let token = localStorage.getItem("token");
        await axios.get("http://localhost:3000/chatapp" + "/getusers", { headers: { "Authorization": token } }).then(
            result => {
                addUsersForInvite(result.data.data)
            }
        )
    } catch (error) {
        console.log(error)
    }
}

var sendInvite = async (e) => {
    try {
        e.preventDefault();
        //username invitied
        let userInvited = document.getElementById('userInviteList').value;
        if (userInvited == '') {
            return;
        }

        let grpId = localStorage.getItem('groupId') == null ? 0 : localStorage.getItem('groupId');

        if (grpId == 0) {
            return
        }

        let myObj = {
            "userInvited": userInvited,
            "groupID": grpId
        }
        let token = localStorage.getItem('token')
        await axios.post("http://localhost:3000/chatapp/" + "sendinvite", myObj, { headers: { "Authorization": token } }).then(
            result => {

                let inviteForm = document.getElementById('inviteform');
                inviteForm.style.display = "none";
                console.log("after invite requests")
                alert("Invite sent to " + userInvited);

            }
        )
    } catch (error) {
        console.log(error)
        let inviteForm = document.getElementById('inviteform');
        inviteForm.style.display = "none";
    }
}

var showPendingRequests = (e) => {
    try {
        e.preventDefault();
        let pendingList = document.getElementById('pendingRequestsList');
        if (pendingList.style.display == '') {
            pendingList.style.display = "none";
            return;
        }
        pendingList.style.display = '';

    } catch (error) {
        console.log(error)
    }


}

//Display the pending requests to be answered
var addJoinRequest = (listOfRequests) => {
    try {
        listOfRequests.forEach(async element => {

            if (element.status == "pending") {
                let newElem = document.createElement('li');
                newElem.classList = "list-group-item"
                console.log(element.userId)
                newElem.innerHTML = `Join request by ${element.invitationBy}`;

                let acceptBtn = document.createElement('button');
                acceptBtn.classList = "btn btn-primary"
                acceptBtn.innerHTML = "Accept"


                // let deleteBtn = document.createElement('button');
                // deleteBtn.classList = "btn btn-primary"
                // deleteBtn.innerHTML = "Delete"

                let myObj = {
                    "groupID": element.groupId,
                    "invitedBy": element.invitationBy
                }
                acceptBtn.onclick = async () => {
                    let token = localStorage.getItem('token')
                    await axios.post("http://localhost:3000/chatapp/updateGroups", myObj, { headers: { "Authorization": token } }).then(
                        result => {
                            alert("Group Request Accepted");
                            newElem.style.display = "none";
                        }
                    )
                }

                newElem.appendChild(acceptBtn);


                pendingRequestsList.appendChild(newElem)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

var getGroupsJoinRequests = async () => {
    try {
        let token = localStorage.getItem('token')
        await axios.get("http://localhost:3000/chatapp/" + "getRequests", { headers: { "Authorization": token } }).then(
            result => {
                addJoinRequest(result.data.data);
            }
        )
    } catch (error) {
        console.log(error)
    }
}

//setInterval refreshes the page after defined milliseconds
document.addEventListener("DOMContentLoaded", loadMessages);
document.addEventListener("DOMContentLoaded", getGroupsForUser)
document.addEventListener('DOMContentLoaded', getGroupsJoinRequests);
sendMessage.addEventListener('click', sendMessages);
groupBtn.addEventListener('click', displayGroupForm);
groupFormBtn.addEventListener('click', addGroup);
inviteBtn.addEventListener('click', showInviteForm)
submitUserInviteName.addEventListener('click', sendInvite);

pendingRequestsBtn.addEventListener('click', showPendingRequests);
