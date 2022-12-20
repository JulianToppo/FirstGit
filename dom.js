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
// var item=document.querySelector('.list-group-item:nth-child(2)')
// item.style.backgroundColor='Green';

// //QueryselectorAll for font change
// var listItem=document.querySelectorAll('li');
// //Changing color to lightgreen
// listItem[1].style.color="LightGreen"

// //Making list item invisible
// listItem[2].style.display="none"

// //making odd items with background green
// var odd=document.querySelectorAll('li:nth-child(odd)');

// for(var i=0;i<odd.length;i++){
//     odd[i].style.backgroundColor="Green";
// }


//TRAVERSING THE DOM
var itemList=document.querySelector('#items');
//parentNode;
// console.log(itemList.parentNode);
// itemList.parentNode.style.backgroundColor="#f4f4f4";

// console.log(itemList.parentNode.parentNode);

// //parentElement;
// console.log(itemList.parentElement);
// itemList.parentElement.style.backgroundColor="#f4f4f4";

// console.log(itemList.parentElement.parentElement);

//childNodes //prints texts as line breaks
// console.log(itemList.childNodes);

// console.log(itemList.children)

// console.log(itemList.children[1])
// itemList.children[1].style.backgroundColor= 'yellow'

// //firstChild //also considers spaces so it's better to ignore it
// console.log(itemList.firstChild)

// //firstElementChild
// console.log(itemList.firstElementChild)
// itemList.firstElementChild.textContent='Hello'

// //lastElementChild
// console.log(itemList.lastElementChild)
// itemList.lastElementChild.textContent='Hello 4'

//SIBLING
//nextSibling returns breaks as text so it's better to use something else
//console.log(itemList.nextSibling)

//nextElementSibling
// console.log(itemList.nextElementSibling)

//previousElementsibling
// console.log(itemList.previousElementSibling)
// itemList.previousElementSibling.style.color='green'

//CREATING
//createElement

// //create a div
 var newDiv=document.createElement('div');

// //add class
 newDiv.className='hello';

// //add id
 newDiv.id='hello1';

// //set attribute
 newDiv.setAttribute('title','Hello div');

// //create text node
 var newDivText=document.createTextNode('Hello World');
 newDiv.style.fontSize='40px'
// //appent text node in the div

 newDiv.append(newDivText)

 var container=document.querySelector('header .container')
 var h1=document.querySelector('header h1')

console.log(newDiv);

container.insertBefore(newDiv, h1);

//Adding element before item 1 in list
var newItemDiv=document.createElement('li');

//add class
newItemDiv.className='list-group-item';

//add id
newItemDiv.id='helloItem';

//set attribute
newItemDiv.setAttribute('title','Hello item');

//create text node
var newDivText=document.createTextNode('Hello World');
newItemDiv.style.fontSize='20px'

//appent text node in the div
newItemDiv.append(newDivText)

console.log(newItemDiv)

var container1=document.querySelector('.list-group')
console.log(container1)
var h1=document.querySelector('li')
console.log(h1)
container1.insertBefore(newItemDiv, h1);