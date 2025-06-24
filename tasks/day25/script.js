// Switch case
// let number1 = 100;
// let number2 = 0;
// let operator =  "div";
// let result


// if(operator==="add"){
//     result = number1+number2
// } else if( operator==="sub"){
//     result = number1-number2
// } else if( operator==="mul"){
//     result = number1*number2
// } else {
//     if(number2===0){
//         result =  ("please denomiator cannot be 0")
//     } else {
//         result = number1/number2
//     }
// }
// console.log(result)

// function(){
//   console.log("running")
// }()


// function calc (operator, number1, number2) {
//   let result
//   switch(operator){
//     case "add":
//       result = number1 + number2;
//       break;
//     case "sub":
//       result = number1 - number2;
//       break;
//     case "mul":
//       result = number1 * number2;
//       break;
//     case "div":
//       result = number1 / number2
//       if (number2 === 0) {
//         result = "Please denominator cannot be 0"
//       }else  result = number1/number2
//     default:
//      result = "Invalid Operator"
//   }
//   return result

// }


// var data = [
//   { operator: "add", number1: 0, number2: 2 },
//   { operator: "sub", number1: 0, number2: 2 },
//   { operator: "mul", number1: 0, number2: 2 },
//   { operator: "div", number1: 0, number2: 2 }
// ];
// const output = calc("add", 100, 0);
//   console.log(output)


//   for(i=0; i<data.length;i++){
//     const result = calc(data[i].operator, data[i].number1, data[i].number2)
//     console.log(result)
//   }

  // callback function
//   function print(result){
//     console.log('result', result)
//     // return result
// }
// function divide(res, divisor){
//     return res/divisor
// }

// function multiply(res, multiplier){
//     return res*multiplier
// }
// function sum(a,b,c, printer){
//     let res = a+b
//    const multiplyRes = c(res, 100)
//    if(printer) printer(multiplyRes)
//    else console.log ("No printer detected")
// //   print(multiplyRes)

// }
// sum(2,3, divide, function(result){console.log(result)})

// forEach loop
// const letters = ['a', 'b', 'a', 'b', 'c', 'd', 'a'];
// let count = {};
// letters.forEach((item) => {
//   // console.log('a['+ index +'] =' + index)
//   if(count[item]){
//     count[item]++
//     // console.log(count[item])
//   } else {
//     count[item] = 1;
//   }

// })
// // console.log(count)

// let obj = {
//   "name": "Ramesh",
//   age: 25
// }
// obj["college"] = "Oxford"

// console.log(obj)
// output : { a: 3, b : 2, c: 1, d: 1}

// find odd/even numbers
// const numbers = [1,2,3,4,5,6,7,8]
// const findEven = numbers.filter(isEven)

//  function isEven(value){
//   if (value % 2 !== 0)
//     return value

//  }
//  console.log('findEven', findEven)

 // Remove Duplicate

//  const numbersz = [1,2,3,4,2,5]
//  let sum =0
//  numbersz.forEach((item, index, arr) => {
//   console.log(item)
//   sum += item
//  })
//  console.log(sum)

// count array item

// const letters = ['a', 'b', 'a', 'b', 'c', 'd', 'a'];
// let count = []
// letters.forEach((item) => {
//   if(count[item]){
//     count[item]++

//   } else{
//     count[item] = 1
//   }
// })
// console.log(count)

// map lop

// const numbers = [1,2,3,4,5]
// const numberDoubled = numbers.map(double)

// function double(value){
//   return value *2
// }
// console.log(numbers)
// console.log(numberDoubled)

// Multiply
// const numbers = [1,2,3,4,5]
// const numberDouble = numbers.map(multiply)

// function multiply(value, index, arr){
//   console.log("arr", arr)
//   return value * index
// }
// console.log(numberDouble)

// String to Number
// const str = ["1","2",'3']
// const numberstr = str.map(Number) 
// console.log( numberstr)

// const products = [
//   {
//     name: 'laptop',
//     price: 50000,
//     count: 2
//   },
//   {
//     name: 'desktop',
//     price: 25000,
//     count: 3
//   },{
//     name: 'phone',
//     price: 30000,
//     count: 1
//   }
// ]

// totalProductsValue = products.map((product) => ({
//   name: product.name,
//   totalValue: product.price * product.count 
  
// }))
// console.log(totalProductsValue)


//  arr.filter(filteredArr);
//  function filteredArr(){

//  }

