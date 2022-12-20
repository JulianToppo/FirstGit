var form=document.getElementById('addForm')
var itemList=document.getElementById('items')
var filter=document.getElementById('filter');
//form submit event
form.addEventListener('submit',addItem);

//delete event
itemList.addEventListener('click',removeItem);

//search event
filter.addEventListener('keyup', filterItems);

//Add item
function addItem(e){
    e.preventDefault(); //no normal form submission

    //Get input value
    var newItem=document.getElementById('item').value;
    var newdesc=document.getElementById('desc').value;
    //create new li element
    var li=document.createElement('li');
    //add class
    li.className='list-group-item';

    li.appendChild(document.createTextNode(newItem));
    li.appendChild(document.createTextNode(newdesc));

    //create del button element
    var deleteBtn=document.createElement('button');

    deleteBtn.className='btn btn-danger btn-sm float-right delete';

    deleteBtn.appendChild(document.createTextNode('X'));

    //create edit button element
    var editBtn=document.createElement('button')
    editBtn.className='btn btn-primary btn-sm float-right edit';
    editBtn.appendChild(document.createTextNode('Edit'));

    //Append button to li 
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
 

    //Append li to list
    itemList.appendChild(li);
}


function removeItem(e){
    //condition to make sure the click is made on the button and not elsewhere
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li=e.target.parentElement;
            console.log(li)
            itemList.removeChild(li);
        }
    }
}


// //Creating an edit button
var editBtn=document.createElement('button')
editBtn.className='btn btn-primary btn-sm float-right edit';
editBtn.appendChild(document.createTextNode('Edit'));

//fetching list-group
var listgroup=document.querySelectorAll('.list-group-item');
// console.log(listgroup.length)

for(var i=0;i<listgroup.length;i++){
    //appendChild only adds elements to the end of the list so this means that a node can't be in two points of the document simultaneously so we use cloneNode
    listgroup[i].appendChild(editBtn.cloneNode(true))
}




//Filter items
function filterItems(e){
    //convert text to lowercase
    var text = e.target.value.toLowerCase();
    // console.log(text);

    //Get lis
    //console.log(itemList);
    var items = itemList.getElementsByTagName('li');
    //console.log(items.length)

    //Convert to an array
    Array.from(items).forEach(function(item){
        var desc=item.childNodes[1].textContent;
        var itemName= item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text)!= -1 || desc.toLowerCase().indexOf(text)!= -1 ){
            item.style.display='block'
        }else{
            item.style.display='none'
        }
    })
}

//creating description box
var descriptionbox=document.createElement('input');
descriptionbox.className='form-control mr-2';
descriptionbox.id='desc'
descriptionbox.type='text'
descriptionbox.placeholder='Add description'

var descInsertAfter=document.getElementById('addForm')
var descInsertBefore=document.getElementById('submit')
descInsertAfter.insertBefore(descriptionbox,descInsertBefore);


