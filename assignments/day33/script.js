// Fetch products api
const productApi = "https://fakestoreapi.com/products";
// Fetch users api
const userApi = "https://fakestoreapi.com/users";
// Fetch api function
async function fetchApi(api, method = 'GET', data = null, headers = {}) {
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
    if(data && method !== 'GET'){
      options.body = JSON.stringify(data);
    }
    const response = await fetch(api , options);
    if (!response.ok) {
      throw new Error(`HTTP eror! status: ${response.status}`);
    }
    const result = response.json();
    return result;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error
  }
}


// form submit
const formArea = document.querySelector(".form-area");
const formBtn = formArea.querySelector("button");
const submitResponse = document.querySelector(".submit-response");
let tableList = document.querySelector(".table-list");


formArea.addEventListener("submit", async function (event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const title = formData.get("title");
  const price = formData.get("price");
  const description = formData.get("description");
  const category = formData.get("category");
  const imageFile = formData.get("image");
  
  const productListData =  await fetchApi(productApi);
  console.log('productListData', productListData)
  let payLoadData = {
    id: 0,
    title: title,
    price: price,
    description: description,
    category: category,
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
  };

  if(!title || !price || !description || !category){
    alert("Please enter complete credentials")
    return
  }
  if(isNaN(price)) {
    alert("Please enter valid price")
    return
  }

  
  fetchApi(productApi, 'POST', payLoadData)
  .then((response) => {
    formBtn.classList.add("show");
    return response
  })
  .then((data) => {
    console.log("data here", data);
    let newData = [data, ...productListData]
    if (newData) {
      setTimeout(() => {
        const para = document.createElement("p");
        para.innerText = "Your form has been submitted successfully";
        para.style.color = "green";
        submitResponse.appendChild(para);
        formBtn.classList.remove("show");
        tableListFunc(productApi, newData);
        console.log("Success:", data);
        //  alert("Form submitted successfully!");
        setTimeout(() => {
          para.remove();
        }, 2000);

        form.reset();
      }, 1500);
    }
  })
  .catch((error) => {
    console.error("Error submitting form:", error);
    alert("Something went wrong!");
  });

});

// Create table list function
async function tableListFunc(api, newData) {
  let resData = await fetchApi(api);
  if(newData) {
    resData = newData
    console.log('newData in table func',newData)
  }
  let tableListItem = resData
    .map((item, i) => {
      // console.log('item on delete function', item)
      return `
      <tr>
        <td>${i + 1} </td>
      
        <td>${toTitleCase(item.title)}</td>
        <td><img src=${item.image} alt=${item.category} /></td>
        <td>${item.category}</td>
        <td>${item.description}</td>
        <td>$${item.price}</td>
        <td>
          <button class="btn border-2 border-gray-300 p-2 px-3 rounded-lg text-red-500 btn-delete" onClick="deleteProduct(${item.id })" type="button"><i class="fa-solid fa-trash"></i></button>
          <button class="ml-2 btn border-2 border-gray-300 p-2 px-3 rounded-lg text-red-500 btn-edit" onClick="EditProduct(${item.id})" type="button"><i class="fa-solid fa-pen-to-square"></i></button>
        </td>
        
        </tr>
    `;
    })
    .join("");

  tableList.innerHTML = tableListItem;
}
tableListFunc(productApi);

// Change to Ttile Case function
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
// Action (Edit/Delete) Button Function
async function deleteProduct(id) {
  const productApWithId = productApi+'/'+ id
  console.log('productApWithId',productApWithId)
  try{
    const fetchProductRes = await fetch(productApWithId, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'},
    })
    if (!fetchProductRes.ok) {
      throw new Error(`Failed to delete product with ID: ${id}`);
    }
    console.log('fetchProductRes',fetchProductRes)
    // Re-fetch product list and update UI
    const updatedList = await fetchApi(productApi);
    console.log('updatedList',updatedList)
    tableListFunc(productApi, updatedList);
    alert( `Product Deleted successfully`)
  } catch (err){
    console.error(err.message)
    alert(err.message)
  }
}
async function EditProduct(id) {
  const productApWithId = productApi+'/'+ id
  console.log('productApWithId',productApWithId)
  try{
    const fetchProductRes = await fetch(productApWithId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
    })
    if (!fetchProductRes.ok) {
      throw new Error(`Failed to edit product with ID: ${id}`);
    }
    console.log('fetchProductRes',fetchProductRes)
    // Re-fetch product list and update UI05  
    const updatedList = await fetchApi(productApi);
    console.log('updatedList',updatedList)
    tableListFunc(productApi, updatedList);
    alert( `Product Deleted successfully`)
  } catch (err){
    console.error(err.message)
    alert(err.message)
  }
}
function btnEditfunction() {
  console.log("Edited");
}
