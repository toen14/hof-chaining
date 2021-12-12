const arr = [1, 2, 3, 4, 5]
// how this is works ?
const n = arr.reverse().filter((v, i) => v**i).map((v, i) => v + i).reduce((pv, cv) => pv + cv);

// first, understand higher order functions
// https://www.freecodecamp.org/news/higher-order-functions-in-javascript-examples/
function myMap(params) {
    let myData = [];
    for (let i = 0; i < arr.length; i++) {
        myData[i] = params(arr[i], i)
        
    }
    return myData;
}

function myReduce(params) {
    let myData = 0;
    for (let i = 0; i < arr.length; i++) {
        myData += params(myData ?? 0, arr[i])
        
    }
    return myData;    
}

let data1 = myMap((v, i) => v + i);
let data2 = myReduce((pv, cv) => pv + cv);
console.log(data1, data2)

// make into the classes
class ArrayCustom {
    constructor(array){
        this.array = array;
    }

    myMap(params) {
        let myData = [];
        for (let i = 0; i < this.array.length; i++) {
            myData[i] = params(this.array[i], i)
            
        }
        this.array = myData
        // return this for chaining methods
        return this;    
    }
    
    myReduce(params) {
        let myData = 0;
        for (let i = 0; i < this.array.length; i++) {
            myData += params(myData ?? 0, this.array[i])
            
        }
        return myData;    
    }
}

// gotcha, your own chaining methods
let myArr = new ArrayCustom(arr).myMap((v, i) => v + i).myReduce((pv, cv) => pv + cv);
console.log(myArr);

// must be faild, cause myReduce no return this
// new ArrayCustom(arr).myReduce((pv, cv) => pv + cv).myMap((v, i) => v + i);