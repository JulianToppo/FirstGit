console.log('person1: shows ticket');
console.log('person2: shows ticket');

//Asynchronous cleaner structure for promises using async and await
const preMovie = async () => {
    const promiseWifeBringingTick= new Promise((resolve,reject) => {
        setTimeout(()=> resolve('ticket'),3000);
    })

    const getPopcorn= new Promise((resolve,reject) => resolve('popcorn'));
    
    const addButter= new Promise((resolve,reject) => resolve('butter'));

    const getColdDrinnks= new Promise((resolve,reject) => resolve('cold drink'));
    
    let ticket = await promiseWifeBringingTick;

    console.log(`wife: i have the ${ticket}`);
    console.log('husband: we should go in');
    console.log('wife: no i am hungry');

    let popcorn= await getPopcorn;
    console.log(`wife: i have the ${popcorn}`);
    console.log('husband: we should go in');
    console.log('wife: no i need butter on my popcorn');

    let butter= await addButter;
    console.log(`wife: i have the ${butter} on my popcorn`);
    console.log('husband: anything else darling?');
    console.log("I need coldrink with my popcorn");

    let coldDrinks= await getColdDrinnks;
    console.log(`wife: i have the ${coldDrinks} with my popcorn`);
    console.log('husband: anything else darling?');
    console.log('wife: lets go we are getting late');
    console.log('husband: thankyou for reminding *grins*');

    return ticket;
}

preMovie().then((m) => console.log(m));


console.log('person4: shows ticket');
console.log('person5: shows ticket');