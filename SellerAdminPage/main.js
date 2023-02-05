
var electronicList=document.getElementById("electronicList");;
var skicareList=document.getElementById("skincareList");
var foodList=document.getElementById("foodList");

var productList=document.getElementById("productSubsets");
var submitBtn=document.getElementById('submitProducts');


function addItemsToLists(obj){
    try{
        console.log("inside add items to list");
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
        deleteBtn.value="DeleteProduct";
        deleteBtn.textContent="Delete Product"

        product.appendChild(deleteBtn);
        selectedList.appendChild(product);
    }
    catch(err){
        console.log(err);
    }
}




const getAllProducts= async(e) => {
   try{ 
        console.log("inside get all products");
        e.preventDefault(e);   
        let resp= await axios.get("https://crudcrud.com/api/b84e22ad652c436b91cd2651161610f2/products");
        console.log(resp);
        resp.data.forEach(element => {
            addItemsToLists(element);
        })
    }
    catch(err) {
        console.log(err);
    }
}


const addItems= async(e) => {
    try{   
        console.log("inside add items");
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
               
        const response= await axios.post("https://crudcrud.com/api/b84e22ad652c436b91cd2651161610f2/products",myObj);
        addItemsToLists(response.data)
    }
    }
    catch(err){
        console.log(err)
    } 

}


const deleteProduct= async(e) => {
    try{
         console.log("inside delete products");
        e.preventDefault(e);
        console.log(e);
        if(e.target.classList.contains("delete")){
            
            let listEntry= e.target.parentElement;
            
            console.log(listEntry.id);

            
                const response= await axios.delete("https://crudcrud.com/api/b84e22ad652c436b91cd2651161610f2/products/"+listEntry.id)
                console.log(response);
            
        

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
    catch(err){
        console.log(err)
    } 
  
}


document.addEventListener("DOMContentLoaded",getAllProducts);
submitBtn.addEventListener("click",addItems);
productList.addEventListener("click",deleteProduct);


