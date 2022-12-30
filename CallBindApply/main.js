//Object Student
var Student={
    age:40
}

var printAge=function(){
    console.log(this.age);
}

//calling using bind which returns a new function and binds the Object to it which can be later accesed using this
var bindStudent=printAge.bind(Student);
bindStudent();

//calling using call //it accepts each paramenter individually like call(Student,1,2,3)
var callStudent=printAge.call(Student); 
callStudent;

//calling printAge using apply //it takes argument as an array of elements like call(Student,[1,2,3])
var applyStudent=printAge.apply(Student); 
applyStudent;

