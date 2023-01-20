
var electronicList=document.getElementById("electronicList");;
var skicareList=document.getElementById("skincareList");
var foodList=document.getElementById("foodList");

var productList=document.getElementById("productSubsets");
var submitBtn=document.getElementById('submitProducts');

submitBtn.addEventListener("click",addItems);
productList.addEventListener("click",deleteProduct);
document.addEventListener("DOMContentLoaded",getAllProducts);


function getAllProducts(e){
    console.log("inside get all products");
    e.preventDefault(e);
    axios.get("https://crudcrud.com/api/e2402a509f104fe3abfab7e9976e8234/products")
    .then((response) => response.data.forEach(element => {
        addItemsToLists(element);
    }))
    .catch((err) => console.log(err));
}

function addItems(e){

    e.preventDefault(e);
    var sellingPrice=document.getElementById("sellingPrice").value;
    var productName=document.getElementById("productName").value;
    var category=document.getElementById("category").value;

    if(sellingPrice=="" || productName=="" || category==""){
        alert("Enter properties");
    }
    else{
        const myObj={
            "sellingPrice":sellingPrice,
            "productName":productName,
            "category":category
        }
        
        axios.post("https://crudcrud.com/api/e2402a509f104fe3abfab7e9976e8234/products",myObj)
        .then(
            (response)=>
            {
            console.log(response),
            addItemsToLists(response.data)
            }
        )
        .catch(err => console.log(res));
    }

}

function addItemsToLists(obj){

    let selectedList;
    if(obj.category=="electronic"){
        selectedList=document.getElementById("electronicList");
    }else if(obj.category=="skincare"){
        selectedList=document.getElementById("skincareList");
    }else{
        selectedList=document.getElementById("foodList");
    }

    let product=document.createElement("li");
    product.className="list-group-item"
    product.id=obj._id;

    product.appendChild(document.createTextNode(obj.productName));
    product.appendChild(document.createTextNode(" "));
    product.appendChild(document.createTextNode(obj.sellingPrice));
   // electronicItem.appendChild(document.createTextNode(obj.productName));

   let deleteBtn=document.createElement("button");
   deleteBtn.classList="btn btn-primary float-end delete";
   deleteBtn.id="del-btn";
   deleteBtn.value="Delete Product";
   deleteBtn.textContent="Delete Product"

   product.appendChild(deleteBtn);
   selectedList.appendChild(product);
}


function deleteProduct(e){
    e.preventDefault(e);
    console.log(e);
    if(e.target.classList.contains("delete")){
        
        let listEntry= e.target.parentElement;
        
        console.log(listEntry.id);

        axios.delete("https://crudcrud.com/api/e2402a509f104fe3abfab7e9976e8234/products/"+listEntry.id)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));

        if(e.target.parentElement.parentElement.id=="electronicList"){
            electronicList.removeChild(listEntry);
        }
        else if(e.target.parentElement.parentElement.id=="skincareList"){
            skicareList.removeChild(listEntry)
        }else{
            foodList.removeChild(listEntry);
        }

       
    }
  
}
