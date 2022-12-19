// console.dir(document);

// // //Examine the document object
// // console.log(document.domain);
// // console.log(document.URL);
// // console.log(document.title);
// // // document.title=123
// // console.log(document.head);
// // console.log(document.all);
// // console.log(document.all[10]);
// // // document.all[10].textContent='Hello'

// // console.log(document.forms);
// // console.log(document.links
// console.log(document.images);

// console.log(document.getElementById('header-title'))

// const headertitle=document.getElementById('header-title')
// const header=document.getElementById('main-header')
// console.log(headertitle)
// headertitle.textContent='Hello';
// // headertitle.innerText="Goodbye"
// console.log(headertitle.textContent)
// headertitle.innerHTML='<h3>Helllllo</h3>'
// header.style.borderBottom="solid 3px #000"


// //Get elements by classname
// var items=document.getElementsByClassName('list-group-item')
// console.log(items)
// console.log(items[1])
// items[1].textContent= "Hello 2"

//Changing the color of add items green and making it bold
// var item=document.getElementsByClassName('title')
// console.log(item)
// item[0].style.color="Green"
// item[0].style.fontWeight="bold"

var item=document.getElementsByClassName('list-group-item')
// console.log(item.length)
// console.log(item[1])
// item[1].textContent="Hello"
// item[1].style.fontWeight="bold"
// item[1].style.backgroundColor="Yellow"

for(var i=0;i<item.length;i++){
    item[i].style.backgroundColor="#f4f4f4" //making the background color light grey
}

item[2].style.backgroundColor="Green"

for(var i=0;i<item.length;i++){
    item[i].style.fontWeight="bold"
}



