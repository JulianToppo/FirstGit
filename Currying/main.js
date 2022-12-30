let multiply= function(x,y){
    console.log(x*x)
}

//We curry methods by using bind functions and creation new copy of 
//it. We can preset the values or pass argument
let multiplyByTwo=multiply.bind(this,2);
multiplyByTwo(2);

let multiplyByThree=multiply.bind(this,3);
multiplyByThree(2);

//With two argument it willl lignore the second call
let multiplyByTwoAgain=multiply.bind(this,2,3);
multiplyByTwoAgain(5);

//CURRYING BY USING CLOSURES
 let  multiplyy= function(x){
    return function(y){
        console.log(x*y);
    }
 }

 multiplyByTwo= multiplyy(2);
 multiplyByTwo(3);