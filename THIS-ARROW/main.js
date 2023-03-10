
class Student{
    static count=0;
    constructor(name,age,phone,marks){
        Student.count++;
        this.name=name;
        this.age=age;
        this.phone=phone;
        this.marks=marks;
        
    }

    isEligible(){
        if(this.marks>40){
            console.log('Eligible');
        }else{
            console.log('Not Eligible');
        }
        return 0;
    }

    static totalstudents(){
        console.log(Student.count);
    }

    eligibleForPlacements=(age,minimarks) =>{

        if(this.age>age && this.marks>minimarks){
            console.log(`${this.name} is eligible for placements`);
        }else{
            console.log(`${this.name} is not eligible for placements`);
        }

    }
}

const chintu=new Student('chinti',20,1344332,80);
const mintu=new Student('mintu',23,342342,40);
const jessica=new Student('jessica',20,43342,30);
const monika=new Student('monika',20,53534,80);
const rachel=new Student('rachel',20,534,90);

chintu.eligibleForPlacements(15,67);
mintu.eligibleForPlacements(15,67);
jessica.eligibleForPlacements(15,67);
monika.eligibleForPlacements(15,67);
rachel.eligibleForPlacements(15,67);

// jessica.isEligible()

Student.totalstudents();