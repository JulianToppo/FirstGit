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

// var item=document.getElementsByClassName('list-group-item')
// console.log(item.length)
// console.log(item[1])
// item[1].textContent="Hello"
// item[1].style.fontWeight="bold"
// item[1].style.backgroundColor="Yellow"

// for(var i=0;i<item.length;i++){
//     item[i].style.backgroundColor="#f4f4f4" //making the background color light grey
// }

// item[2].style.backgroundColor="Green"

// for(var i=0;i<item.length;i++){
//     item[i].style.fontWeight="bold"
// }

// //GET ELEMENTS BY TAG NAME
// var li=document.getElementsByTagName('li');

// li[1].textContent="Hello"
// li[1].style.fontWeight="bold"
// li[1].style.backgroundColor="Yellow"


//  for(var i=0;i<item.length;i++){
//     li[i].style.fontWeight="bold"
//  }

//QUERY SELECTOR
// var header=document.querySelector("#main-header");
// header.style.borderBottom= 'solid 4px #ccc';

// var input=document.querySelector("input") //selects only one
// input.value="Hello World"

// var submit=document.querySelector('input[type="submit"]')
// submit.value="Send"

// var item=document.querySelector('.list-group-item')
// item.style.color='red';

//Changing the background color using queryselector
var item=document.querySelector('.list-group-item:nth-child(2)')
item.style.backgroundColor='Green';

//QueryselectorAll for font change
var listItem=document.querySelectorAll('li');
//Changing color to lightgreen
listItem[1].style.color="LightGreen"

//Making list item invisible
listItem[2].style.display="none"

//making odd items with background green
var odd=document.querySelectorAll('li:nth-child(odd)');

for(var i=0;i<odd.length;i++){
    odd[i].style.backgroundColor="Green";
}

 