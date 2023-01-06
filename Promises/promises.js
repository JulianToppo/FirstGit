const posts=[
    {title:'Post One',body:'This is post one'},
    {title:'Post Two',body:'This is post two'}
];

let intervalId;

function getPosts(){
    clearInterval(intervalId);
    intervalId=setInterval(()=>{
      let output='';
        posts.forEach((post,index)=>{     
                output+=`<li>${post.title} created at ${Date.now()}</li>`

        });
        document.body.innerHTML=output;
    },1000);  
}

//Creating createpost promise 
const createPost = async (post,callback) => {
    
    let postCreation= new Promise((resolve,reject) => {
        setTimeout(()=>{
            posts.push(post);
            const error=false;

            if(!error){
                resolve();
            }
            else{
                reject('Error:Something is wrong');
            }
        },1000);
});
    return await postCreation;
}

//Creating delete promise 
const deletePost = async () => {
    let delPost= new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let error;
            if(posts.length>=1){
                posts.pop();
                error=false;
            }else{
               error=true;  
            }
           
            if(!error){
                resolve();
            }
            else{
                reject('Error:Array is empty');
            }

        },1000);
    })

    return await delPost;

}


function createfour(){
    createPost({title:'Post Four',body:'This is post four'})
    .then(()=>{
        getPosts,
        deletePost().then(getPosts).catch(err => console.log(err))

    })
}

 //Task 1 : Create a new post and delete the last updated item in the array and if empty throw an error 
 //It also contains the creation of post 4 within the catch post (Trying to learn error management by promises)
/*
createPost({title:'Post Three',body:'This is post three'})
.then(() =>{
    getPosts(),                 //prints 3
    deletePost().then(() =>{    //deletes 3rd
        getPosts(),             //prints 2
        deletePost().then(() => { //deletes 2nd 
            getPosts(),             //prints 1
            deletePost().then(() => {   //deletes 1st
                getPosts(),             //empty
                deletePost().then().catch((err) =>{
                    console.log(err);           //first catching the error and then calling post four
                    createfour();
                } )
                }).catch(err => console.log(err))
                }).catch(err => console.log(err))
                }).catch(err => console.log(err))
                }).catch(err => console.log(err));
*/

const promise1= Promise.resolve('Hello World');
const promise2= 10;
const promise3 = new Promise((resolve,reject) =>
setTimeout(resolve,2000,'Goodbye'));

// Promise.all([promise4]).then(
//     (values)=>console.log(values));

function updateLastUserActivityTime(msg,callback){
    
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            console.log(`${msg}  ${Date.now()}`);

            let error=false;
            if(!error){
                resolve();
            }
            else{
                reject('Error');
            }

            
        },0);
});
}

//Updating last activity time and calling multiple promises asynchronously 
Promise.all([updateLastUserActivityTime('Before Creating'),createPost({title:'Post Three ',body:'This is post three'})])
.then(() => {
            console.log(posts),
            getPosts(),
            deletePost().then(() => {
                console.log(posts),
                updateLastUserActivityTime('After Deleting Three').then(getPosts()).catch(err => console.log(err))
             }).catch(err => console.log(err))
        }).catch(err => console.log(err));
    