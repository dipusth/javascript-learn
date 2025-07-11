// Reverse a string Task 1
const name = "Bibek"
let reverse = ""
for (let i= name.length - 1; i >= 0 ; i--){
     reverse += name[i];
}
console.log('1. reverse', reverse)

// Find the largest number in an array Task 2
let input2 = [1,7,9,2,5]
const largest = input2.reduce((a, c) => {
    if(a >c) {
        return a
    } else {
        return c
    }
})
console.log('2. largest', largest)

// Print even numbers from 1 to N Task 3
let input3  = [1,2,3,4,5,6,7,8,9,10]
const evenNum = []
for(i=0;i<input3.length; i++){
    if(input3[i] % 2 == 0){
        evenNum.push(input3[i])
    }

}
console.log('3. evenNum', evenNum)

// Add all numbers in an array Task 4
let input4 = [1,5,9]
let newNum = 0
for(i=0;i<input4.length;i++){
   newNum +=  input4[i]
}
console.log('4. newNum', newNum)

// Flatten a nested array Task 7
let input7 = [1, [2, [3, 4], 5], 6];
// console.log('input7', input7.length)
function loopfunc(arr){
    let input7res = []
    for(let i=0; i<arr.length; i++){
        if(Array.isArray(arr[i])){
            // loopfunc(arr[i])
            // console.log(' Output inside if' , arr[i])
            input7res = [...input7res, ...loopfunc(arr[i])]
        } else{
               console.log('5. Output', arr[i])
                input7res.push(arr[i])
        }
        
     
    }
    return input7res

}
let output7 = loopfunc(input7)
console.log('5. output7', output7)

// Check for palindrome Task 8
function palindrome(str){
     let smallStr = str.toLowerCase();
     let reversedStr = ""
     for(i=str.length -1; i>=0; i--){
        reversedStr += smallStr[i]
     }
     return reversedStr === smallStr

}
console.log(palindrome("madam"));
console.log(palindrome("12421")); 

// Frequency counter Task 9
function chartCount(str) {
    let count = {}
    for(let i=0;i<str.length; i++){
        if(count[str[i]]){
            count[str[i]]++
        }
        else count[str[i]] = 1
    }
    return console.log('count', count)

}

chartCount('hello')

// Find first non-repeating character Task 11
function firstUniqueChar(str){
    let count = {}
    for(let char of str){
       count[char] = (count[char] || 0) + 1;
    }
    for (let char of str ){
        if(count[char] === 1){
            return char
        }
    }
    return null
}
console.log(firstUniqueChar("aabbcdeff"));

// JavaScript Debugging (2 Tasks): points 3
// Variable hoisting with var

 function test() {
  if (true) {
    var message = "Hi";
  }
  console.log(message); // Hi
// What will this print?
}


// Object comparison

const a = { name: "example" };
const b = { name: "example" };
console.log(a.name === b.name); // true
 // true or false?
