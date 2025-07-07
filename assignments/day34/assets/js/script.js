


document.addEventListener('DOMContentLoaded', function(){

  // const dropdown = document.querySelector('.dropdown-option');
  // const toggleBtn = document.getElementById('dropdownToggle');

  document.addEventListener('click', function(e){
    let dropdownOptions = document.querySelectorAll('.dropdown-option')

    dropdownOptions.forEach((dropdown) => {
      const targetClass = e.target.closest('.dropdown-option');
      const targetContains = dropdown.contains(e.target);
      // const targetIsActive = dropdown.hasClass('active');
      if(!targetClass || !targetContains ){
        dropdown.classList.remove('active') 
      }
    })
    // if(dropdownOption && !dropdownOption.contains(e.target))
    // {
    //  dropdownOption.classList.remove('active') 
    //  console.log('active removed')
    // }
    //  // ALSO close if clicked inside a list item
    // if (dropdownOption && e.target.closest('.dropdown-option li')) {
    //   dropdownOption.classList.remove('active');
    // }
  
  })
})
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
      },
      ...(data && method !== 'GET' ? { body: JSON.stringify(data) } : {})
    };
     const response = await fetch(api, options);
    if (!response.ok) {
      throw new Error(`HTTP eror! status: ${response.status}`);
    }
    // const result = await response.json();

    return response;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error
  }
}


// form submit

const submitResponse = document.querySelector(".submit-response");
let tableList = document.querySelector(".table-list");
let formSubmit = document.getElementById('productformSubmit')
let formTitle = document.getElementById('title')
let formSubmitText = formSubmit.querySelector('span')
let formHeaderTitle = document.getElementById('head-title')
let localDataRes = []

const btnAddNew = document.querySelector('#btnAddNew')
const addNewFormModal = document.querySelector('#addNewFormModal')
const btnCloseNew = document.querySelector('#btnCloseNew')
const formArea = document.querySelector(".form-area");
btnAddNew.addEventListener('click', function(){
  addNewFormModal.classList.remove('hidden')
  formArea.reset()
  formSubmitText.innerText = 'Add New Product'
  formHeaderTitle.innerText = 'Add New Product'
  setTimeout(() => {
    addNewFormModal.classList.add('delay')
  })
})
btnCloseNew.addEventListener('click', function(){
  addNewFormModal.classList.remove('delay')
    setTimeout(() => {
    addNewFormModal.classList.add('hidden')
  }, 60)
})

// Click Action Function
function actionMenu(clickedAction) {
    const dropdownOption = document.querySelectorAll('.dropdown-option')
    dropdownOption.forEach((item) =>{
      if(item !== clickedAction){
        item.classList.remove('active')
      }
    })
    clickedAction.classList.toggle('active')

 
}
let currentEditId = null; // track if we're editing an existing product
formArea && formArea.addEventListener("submit", async function (event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const title = formData.get("title");
  const price = formData.get("price");
  const description = formData.get("descriptions");
  const category = formData.get("category");
  const imageFile = formData.get("image");
  const productListData =  await fetchApi(productApi);
  const productListDataRes = await productListData.json()

  if(!title || !price || !description || !category){
    alert("Please enter complete credentials")
    return
  }
  if(isNaN(price)) {
    alert("Please enter valid price")
    return
  }
  formSubmit && formSubmit.classList.add("show");
  let payLoadData = {
    id: 0,
    title: title,
    price: price,
    description: description,
    category: category,
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
  };
  let responseData;
  if(currentEditId){
    const updateRes = await fetchApi(`${productApi}/${currentEditId}`, 'PUT', payLoadData)
    if(updateRes.ok){
      alert('Product updated successfully')
    }
      responseData = await updateRes.json()
    currentEditId = null
    // formSubmitText = "Add New Product";
  }else{
    const postRes = await fetchApi(productApi, 'POST', payLoadData)
    if(postRes.ok){
      alert('Product created successfully')
    }
    responseData =  await postRes.json()
    // if(postRes.ok){
    //   alert('Product added successfully')
    // }
  }
  // Add rating manually
  if(!responseData.rating){
    const rating = {
      count: 24,
      rate: 4.5,
    };
    responseData.rating = rating
  }

  // Re-fetch latest list or locally update
const fetchProduct = await fetchApi(productApi);
const fetchProductRes = await fetchProduct.json();
const updatedData = currentEditId
  ? fetchProductRes.map(p => p.id === responseData.id ? responseData : p)
  : [responseData, ...fetchProductRes];
  // let newData = [responseData, ...productListDataRes]

  setTimeout(() => {
    const para = document.createElement("p");
    para.innerText = "Your form has been submitted successfully";
    para.style.color = "green";
    submitResponse.appendChild(para);
    formSubmit && formSubmit.classList.remove("show");
    tableListFunc(productApi, updatedData);
    setTimeout(() => {
      para.remove();
      addNewFormModal.classList.add('hidden')      
    }, 600);

    form.reset();
  }, 500);

  
});

// Create table list function
async function tableListFunc(api, newData) {
  if(!newData){
    let fetchProduct = await fetchApi(api);
    let fetchRroductRes = await fetchProduct.json()
    console.log('fetchRroductRes', fetchRroductRes)
    localDataRes = [...fetchRroductRes]
    console.log('localDataRes inside ', localDataRes)
    renderTable(fetchRroductRes)
  } else {
    renderTable(newData)
  }
}
tableListFunc(productApi);

function renderTable(productList) {
  console.log('productList on render table', productList)
  const tableListItem = productList
    .map((item, i) => {
      return `
      <tr>
        <td>${i + 1} </td>
      
        <td>${toTitleCase(item.title)}</td>
        <td><img src=${item.image} alt=${item.category} /></td>
        <td>${item.category}</td>
        <td class='truncate max-w-[350px]'>${item.description}</td>
        <td><b>$${item.price}</b></td>
        <td class='views icon-xs text-slate-400'><i class="fa-solid fa-eye mr-1"></i>${item.rating.count} <div class='border rounded-md inline-block p-1 ml-1'>${item.rating.rate}<i class="fa-solid fa-star text-orange-500 ml-1"></i></div></td>
        <td>
          <div class="relative">
            <button class="dropdown-option" onClick='actionMenu(this)'>
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
              <ul class="dropdown-menu">
                <li><a href="#" class="list">View</a></li>
                <li><a href="#" class="list" onClick='updateProduct(null, ${JSON.stringify(item).replace(/'/g, "&apos;")})'>Edit</a></li>
                <li><a href="#" class="list delete" onClick="deleteProduct(${item.id})">Remove</a></li>
              </ul>
          </div>

       </td>
        
        </tr>
    `;
    })
    .join("");

  tableList.innerHTML = tableListItem;
}

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
  try{
    const fetchProductRes = await fetch(productApWithId, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'},
    })
    if (!fetchProductRes.ok) {
      throw new Error(`Failed to delete product with ID: ${id}`);
    }
    // Re-fetch product list and update UI
    const updatedList = await fetchApi(productApi);
    deleteLocalProduct(id)
    // tableListFunc(productApi, updatedList);
    alert( `Product Deleted successfully`)
  } catch (err){
    console.error(err.message)
    alert(err.message)
  }
}

function deleteLocalProduct(id) {
  // Remove item from the local list
  localProductList = localDataRes.filter(product => product.id !== id);
  // Re-render your table with updated data
  tableListFunc(null, localProductList);
}
async function updateProduct(id, data) {
  currentEditId = id || (data && data.id) || null;
  const productApWithId = productApi+'/'+ id
  let result = data;
  if (!result && id) {
    const productRes = await fetchApi(`${productApi}/${id}`);
    result = await productRes.json();
  }
  if (!result) return;
  updatingForm(result);
  // try{
  //   if(id){

  //     let productRes = await fetch(productApWithId)
  //     console.log('productRes on update', productRes)
  //     if(!productRes.ok) throw new Error(`Failed to update list with ID: ${id}`)
  //     let result = await productRes.json()
  //     console.log('result on id', result)
  //     updatingForm(result)
  //   }
  //   if(data){
  //       let result = data
  //      console.log('result on data', result)
  //       updatingForm(result)
  //   }

 
  // } catch(err){
  //   console.error(err)
  //   alert(err)
  // }

  function updatingForm(result){
    if(!result ){
      return
    }
    // console.log('result on updating form', result)
    formSubmitText.innerText = 'Update'
    formHeaderTitle.innerText = 'Update Form'
    addNewFormModal.classList.remove('hidden')
    let title =  document.getElementsByName('title') 
    let price =  document.getElementsByName('price') 
    let category =  document.getElementsByName('category')[0]
    let description =  document.getElementsByName('descriptions') 

    if(category){
      Array.from(category.options).forEach(option => {
        const selectedOption = option.text.toLowerCase() === result.category.toLowerCase()
        if(selectedOption) {
          option.selected = true
          return;
        }
        else  console.log('selected false', option)
      })
    }
  
    title[0].value = result.title
    price[0].value = result.price
    description[0].value = result.description
    category[0].value = result.category


  }
  // try{
  //   const fetchProductRes = await fetch(productApWithId, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json'},
  //   })
  //   if (!fetchProductRes.ok) {
  //     throw new Error(`Failed to edit product with ID: ${id}`);
  //   }
  //   console.log('fetchProductRes',fetchProductRes)
  //   // Re-fetch product list and update UI05  
  //   const updatedList = await fetchApi(productApi);
  //   console.log('updatedList',updatedList)
  //   tableListFunc(productApi, updatedList);
  //   alert( `Product Edited successfully`)
  // } catch (err){
  //   console.error(err.message)
  //   alert(err.message)
  // }
}

//  function submitProduct(e) {
//   e.preventDefault()

//   console.log('submitted')
  
  
// }
