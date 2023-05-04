import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io("http://localhost:3000");

const sendMessage = document.getElementById('sendMessage')
const messageQueue = document.getElementById('messageQueue')
const groups = document.getElementById('groups')
const groupBtn = document.getElementById('groupBtn')
const groupFormBtn = document.getElementById('submitGroupName')
const grpAlert = document.getElementById('groupAlert')
const inviteBtn = document.getElementById('inviteUsersBtn')
const users = document.getElementById('users');
const phonenumerList = document.getElementById('phonenumerList');
const emailList = document.getElementById('emailList');
const submitUserInviteName = document.getElementById('submitUserInviteName');
const pendingRequestsBtn = document.getElementById('pendingRequestsBtn')
const pendingRequestsList = document.getElementById('pendingRequestsList');
const memberList = document.getElementById('memberList');
const membersBtn = document.getElementById('membersBtn')

socket.on('broadcast', () => {
    console.log("broadcast")
    loadMessages();
})

socket.on('deleteGroupChat', (data) => {
    try {
        console.log("deletegorupchat")

        // let actUser=document.getElementById('activeUser').innerHTML;
        // let token = localStorage.getItem('token')
        // let id=axios.get("http://localhost:3000/chatapp/getId/"+actUser,{ headers: { "Authorization": token } });
        // if(id==data.deleteduserid && localStorage.getItem(groupId)==data.deletedGpId){
        //     localStorage.delete("groupId");
        //     localStorage.delete("oldmessages");
        //     alert("Group modifications")
        //   //  window.location.reload();
        // }

        loadMessages();
    } catch (error) {
        console.log(error);
    }
})

//bi-directional flow for a notification when a group invite request is made
socket.on("pendingRequestCheck", (data) => {
    try {
        console.log("pendingRequestsCheck")
        let actUser = document.getElementById('activeUser').innerHTML;
        //console.log(actUser,username)
        if (data.username == actUser) {
            alert("Check pending requests!");
            window.location.reload();

        }
    } catch (error) {
        console.log(error)
    }
})

//Joined notification
var showJoinAcknowledgment = async() => {
    try {
        let showUserJoined = {};
        let lastId = -1;
        let grpId = localStorage.getItem("groupId")
        if (JSON.parse(localStorage.getItem("newmessages")).length == 0) {
            if (localStorage.getItem("oldmessages") == null || JSON.parse(localStorage.getItem('oldmessages')).length == 0) {
                lastId = -1;
            } else {
                let oldmessageArray = JSON.parse(localStorage.getItem('oldmessages'));
                lastId = oldmessageArray[oldmessageArray.length - 1].id;

            }
        }
        else {
            let newmessagesArray = JSON.parse(localStorage.getItem('newmessages'));
            lastId = newmessagesArray[newmessagesArray.length - 1].id;
        }

        let token=localStorage.getItem('token')
        let id = await axios.get("http://localhost:3000/chatapp" + "/getid", { headers: { "Authorization": token } })
        showUserJoined = {
            "id": lastId,
            "message": id.data.data.username + " Joined",
            "createdAt": "2023-05-02T15:08:25.000Z",
            "updatedAt": "2023-05-02T15:08:25.000Z",
            "userId": id.data.data.id,
            "groupId": grpId
        }

        let newArray = JSON.parse(localStorage.getItem("newmessages"));
        newArray.push(showUserJoined)
        localStorage.setItem("newmessages", JSON.stringify(newArray))
    } catch (error) {
        console.log(error)
    }
}

var sendMessages = (e) => {
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
                axios.post("/chatapp/sendmessage", myobj, { headers: { "Authorization": token } }).then((result) => {
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
            let username = await axios.get("/chatapp/getusername" + "/" + listCheckForValues[i].userId, { headers: { "Authorization": token } })
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
var addToMessagesList = async (flag = 0) => {
    try {

        messageQueue.innerHTML = "";

        if (flag == 1) {
            await showJoinAcknowledgment();
        }
        
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

var loadMessages = async (check = 0) => {
    try {
        // e.preventDefault();
        console.log("loadMessages called")
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

            await axios.get("/chatapp/getmessages/" + `${lastId}/${grpId}`, { headers: { "Authorization": token } }).then(
                (result) => {

                    console.log("datarecieved", result.data.messages);
                    //oldmessageArray.push(...result.data.messages)
                    let newmessages = result.data.messages

                    localStorage.setItem("oldmessages", JSON.stringify(oldmessageArray))
                    localStorage.setItem("newmessages", JSON.stringify(newmessages))

                    if (check == 1) {
                        addToMessagesList(1);
                    } else {
                        addToMessagesList();
                    }

                }



            ).catch(err => console.log(err));
        }
    } catch (error) {
        console.log(error)
    }
}

var loadMessagesWithJoinedAcknowledgement = () => {
    try {
        loadMessages(0);
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

var showusername = async () => {
    try {
        let token = localStorage.getItem('token');
        await axios.get("/chatapp/" + "getusername", { headers: { "Authorization": token } }).then(result => {
            document.getElementById('activeUser').innerHTML = result.data.username;
            console.log("currentUser", typeof (document.getElementById('activeUser').innerHTML))
        }).catch(err => {
            console.log(err);
        })

    } catch (error) {
        console.log(error)
    }
}

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

                let username = document.getElementById('activeUser').innerHTML;
                console.log("addGroupsusername", username);

                //newElem.classList.add = "btn-success";
                newElem.style.backgroundColor = "green"
                localStorage.removeItem("oldmessages");
                // window.location.reload();

                loadMessages(1)
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
        axios.get("/chatapp" + "/getgroups", { headers: { "Authorization": token } }).then(
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
        axios.post("/chatapp" + "/addgroup", myobj, { headers: { "Authorization": token } }).then(
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
        for (let i = 0; i < usersList.length; i++) {
            let newElemUsername = document.createElement('option');
            // newElem.id=element.id;
            newElemUsername.innerHTML = usersList[i].username;
            users.appendChild(newElemUsername);

            let newElemPhonenumber = document.createElement('option');
            // newElem.id=element.id;
            newElemPhonenumber.innerHTML = usersList[i].phonenumber;
            phonenumerList.appendChild(newElemPhonenumber);

            let newElemEmail = document.createElement('option');
            // newElem.id=element.id;
            newElemEmail.innerHTML = usersList[i].email;
            phonenumerList.appendChild(newElemEmail);
        }
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
        await axios.get("/chatapp" + "/getusers", { headers: { "Authorization": token } }).then(
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
        let phonenumer = document.getElementById('phonenumer').value;
        let email = document.getElementById('email').value;

        if (userInvited == '' || phonenumer == '' || email == '') {
            return;
        }

        let grpId = localStorage.getItem('groupId') == null ? 0 : localStorage.getItem('groupId');

        if (grpId == 0) {
            return
        }

        let myObj = {
            "userInvited": userInvited,
            "groupID": grpId,
            "PhoneNumber": phonenumer,
            "Email": email
        }
        let token = localStorage.getItem('token')
        await axios.post("/chatapp/" + "sendinvite", myObj, { headers: { "Authorization": token } }).then(
            result => {

                let inviteForm = document.getElementById('inviteform');
                inviteForm.style.display = "none";
                console.log("after invite requests")
                //add phone number and email
                alert("Invite sent to " + userInvited);

            }
        )
    } catch (error) {
        alert('Check user credentials')
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
                let token = localStorage.getItem('token')
                let username = await axios.get("/chatapp/getusername" + "/" + element.invitationBy, { headers: { "Authorization": token } })
                newElem.innerHTML = `Join request by ${username.data.username}`;

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
                    await axios.post("/chatapp/updateGroups", myObj, { headers: { "Authorization": token } }).then(
                        result => {
                            alert("Group Request Accepted");
                            newElem.style.display = "none";
                            window.location.reload();
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
        await axios.get("/chatapp/" + "getRequests", { headers: { "Authorization": token } }).then(
            result => {
                addJoinRequest(result.data.data);
            }
        )
    } catch (error) {
        console.log(error)
    }
}

var addUsersToMembersList = async (listOfMembers) => {
    try {
        memberList.innerHTML = "";
        for (let i = 0; i < listOfMembers.length; i++) {

            console.log(listOfMembers[i]);
            let token = localStorage.getItem('token')
            let username = await axios.get("/chatapp/getusername" + "/" + listOfMembers[i].userId, { headers: { "Authorization": token } })
            let newElem = document.createElement('li');
            newElem.classList = "list-group-item"
            newElem.innerHTML = username.data.username


            //isadmin
            let isadmin = await axios.get("/chatapp/" + "isadmin/" + `${listOfMembers[i].userId}/${listOfMembers[i].groupId}`, { headers: { "Authorization": token } })

            if (isadmin.data.data) {
                let adminBtn = document.createElement('button');
                adminBtn.classList = "btn btn-success float-end"
                adminBtn.innerHTML = "Admin"
                newElem.appendChild(adminBtn);
            }
            else {


                let acceptBtn = document.createElement('button');
                acceptBtn.classList = "btn btn-primary float-end"
                acceptBtn.innerHTML = "Make Admin"

                let deleteBtn = document.createElement('button');
                deleteBtn.classList = "btn btn-warning float-end"
                deleteBtn.innerHTML = "Delete"


                acceptBtn.onclick = async () => {
                    let myObj = {
                        "userid": listOfMembers[i].userId,
                        "groupID": listOfMembers[i].groupId
                    }

                    await axios.post("/chatapp/makeadmin", myObj, { headers: { "Authorization": token } }).then(
                        result => {
                            alert("Admin Access Granted");
                            // acceptBtn.style.display = "none";
                            acceptBtn.classList = "btn btn-success"
                            acceptBtn.innerHTML = "Admin"

                        }
                    )
                }

                deleteBtn.onclick = async () => {

                    let isadmin = await axios.get("/chatapp/" + "isadmin/" + "token" + `/${listOfMembers[i].groupId}`, { headers: { "Authorization": token } })
                    if (isadmin.data.status == true) {
                        let myObj = {
                            "userid": listOfMembers[i].userId,
                            "groupID": listOfMembers[i].groupId
                        }
                        await axios.post("/chatapp/" + "deleteUserFromGroup", myObj, { headers: { "Authorization": token } }).then(
                            result => {
                                alert(JSON.stringify(result.data.message))
                                newElem.style.display = "none";
                                // localStorage.removeItem("groupId")

                            })
                    }

                }

                newElem.appendChild(deleteBtn);
                newElem.appendChild(acceptBtn);
            }
            memberList.appendChild(newElem)

        }
    } catch (error) {
        console.log(error);
    }
}

var showGroupsMemberList = async () => {
    try {
        console.log("inside memberslist")
        if (memberList.style.display == "") {
            console.log("display mat dikh")
            memberList.style.display = "none";
        } else {
            console.log("inside dikh")
            memberList.style.display = "";
            let grpId = localStorage.getItem('groupId') == null ? 0 : localStorage.getItem('groupId');
            if (grpId == 0) {
                throw new Error("No Group selected");
            }
            let token = localStorage.getItem("token");
            axios.get("/chatapp/" + "getGroupMembers/" + `${grpId}`, { headers: { "Authorization": token } }).then(
                result => {
                    //  console.log(result.data.data);
                    addUsersToMembersList(result.data.data);
                }
            )
        }
    } catch (error) {
        console.log(error)
    }
}

//setInterval refreshes the page after defined milliseconds
document.addEventListener("DOMContentLoaded", loadMessagesWithJoinedAcknowledgement);
document.addEventListener("DOMContentLoaded", getGroupsForUser)
document.addEventListener('DOMContentLoaded', getGroupsJoinRequests);
document.addEventListener('DOMContentLoaded', showusername);
sendMessage.addEventListener('click', sendMessages);
groupBtn.addEventListener('click', displayGroupForm);
groupFormBtn.addEventListener('click', addGroup);
inviteBtn.addEventListener('click', showInviteForm)
submitUserInviteName.addEventListener('click', sendInvite);
pendingRequestsBtn.addEventListener('click', showPendingRequests);
membersBtn.addEventListener('click', showGroupsMemberList);
