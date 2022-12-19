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

var item=document.getElementsByClassName('title')
console.log(item)
item[0].style.color="Green"
item[0].style.fontWeight="900"
