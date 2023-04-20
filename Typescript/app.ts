const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
const btnElement = document.querySelector('button')!;

//type alias
type NumOrString= number|string
type Result= {val:number; timestamp:Date}

interface ResultObj{
    val:number;
    timestamp:Date
}

//predefined array types
const numResults:Array<number>=[];
const stringResults: string[]=[];
function add(num1: NumOrString, num2: NumOrString) {
    if (typeof num1 == 'number' && typeof num2 == 'number') {
        return num1 + num2;
    } else if (typeof num1 == 'string' && typeof num2 == 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
}

console.log(add(1, 6));

function printResult(ResultObj:ResultObj){
    console.log(ResultObj.val);
}

btnElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1, +num2);
    const stringResult = add(num1, num2);
  
    numResults.push(result as number);
    stringResults.push(stringResult as string);

    printResult({val:result as number,timestamp:new Date()})
    console.log(numResults, stringResults)
})

//promise with generic types
const myPromise= new Promise<string>((resolve,reject)=>{
    setTimeout(()=>{
        resolve('It worked!');
    },1000)
});

myPromise.then((result)=>{
    console.log(result)
})