// click on like button
const iconLike = document.querySelector(".icon-like");
document.addEventListener("click", function (e) {
  console.log("e.target", e.target);
  const icon = e.target.closest(".icon-like");
  if (icon) {
    icon.classList.add("active");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // const dropdown = document.querySelector('.dropdown-option');
  // const toggleBtn = document.getElementById('dropdownToggle');

  document.addEventListener("click", function (e) {
    let dropdownOptions = document.querySelectorAll(".dropdown-option");

    dropdownOptions.forEach((dropdown) => {
      const targetClass = e.target.closest(".dropdown-option");
      const targetContains = dropdown.contains(e.target);
      // const targetIsActive = dropdown.hasClass('active');
      if (!targetClass || !targetContains) {
        dropdown.classList.remove("active");
      }
    });
    // if(dropdownOption && !dropdownOption.contains(e.target))
    // {
    //  dropdownOption.classList.remove('active')
    //  console.log('active removed')
    // }
    //  // ALSO close if clicked inside a list item
    // if (dropdownOption && e.target.closest('.dropdown-option li')) {
    //   dropdownOption.classList.remove('active');
    // }
  });
});
// Fetch products api
const productApi = "https://fakestoreapi.com/products";
// Fetch users api
const userApi = "https://fakestoreapi.com/users";
// Fetch api function
async function fetchApi(api, method = "GET", data = null, headers = {}) {
  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(data && method !== "GET" ? { body: JSON.stringify(data) } : {}),
    };
    const response = await fetch(api, options);
    if (!response.ok) {
      throw new Error(`HTTP eror! status: ${response.status}`);
    }
    // const result = await response.json();

    return response;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}

// form submit

const submitResponse = document.querySelector(".submit-response");
let tableList = document.querySelector(".table-list");
let formSubmit = document.getElementById("productformSubmit");
let formTitle = document.getElementById("title");
let formSubmitText = formSubmit.querySelector("span");
let formHeaderTitle = document.getElementById("head-title");
let localDataRes = [];

const btnAddNew = document.querySelector("#btnAddNew");
const addNewFormModal = document.querySelector("#addNewFormModal");
const btnCloseNew = document.querySelector("#btnCloseNew");
const formArea = document.querySelector(".form-area");
btnAddNew.addEventListener("click", function () {
  addNewFormModal.classList.remove("hidden");
  formArea.reset();
  formSubmitText.innerText = "Add New Product";
  formHeaderTitle.innerText = "Add New Product";
  setTimeout(() => {
    addNewFormModal.classList.add("delay");
  });
});
btnCloseNew.addEventListener("click", function () {
  addNewFormModal.classList.remove("delay");
  setTimeout(() => {
    addNewFormModal.classList.add("hidden");
  }, 60);
});

// Click Action Function
function actionMenu(clickedAction) {
  const dropdownOption = document.querySelectorAll(".dropdown-option");
  dropdownOption.forEach((item) => {
    if (item !== clickedAction) {
      item.classList.remove("active");
    }
  });
  clickedAction.classList.toggle("active");
}
let currentEditId = null; // track if we're editing an existing product
formArea &&
  formArea.addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const title = formData.get("title");
    const price = formData.get("price");
    const description = formData.get("descriptions");
    const category = formData.get("category");
    const imageFile = formData.get("image");
    const productListData = await fetchApi(productApi);
    const productListDataRes = await productListData.json();

    if (!title || !price || !description || !category) {
      alert("Please enter complete credentials");
      return;
    }
    if (isNaN(price)) {
      alert("Please enter valid price");
      return;
    }
    formSubmit && formSubmit.classList.add("show");
    let payLoadData = {
      id: 0,
      title: title,
      price: price,
      description: description,
      category: category,
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    };
    let responseData;
    if (currentEditId) {
      const updateRes = await fetchApi(
        `${productApi}/${currentEditId}`,
        "PUT",
        payLoadData
      );
      if (updateRes.ok) {
        alert("Product updated successfully");
      }
      responseData = await updateRes.json();
      currentEditId = null;
      // formSubmitText = "Add New Product";
    } else {
      const postRes = await fetchApi(productApi, "POST", payLoadData);
      if (postRes.ok) {
        alert("Product created successfully");
      }
      responseData = await postRes.json();
      // if(postRes.ok){
      //   alert('Product added successfully')
      // }
    }
    // Add rating manually
    if (!responseData.rating) {
      const rating = {
        count: 24,
        rate: 4.5,
      };
      responseData.rating = rating;
    }

    // Re-fetch latest list or locally update
    const fetchProduct = await fetchApi(productApi);
    const fetchProductRes = await fetchProduct.json();
    const updatedData = currentEditId
      ? fetchProductRes.map((p) =>
          p.id === responseData.id ? responseData : p
        )
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
        addNewFormModal.classList.add("hidden");
      }, 600);

      form.reset();
    }, 500);
  });

// Create table list function
async function tableListFunc(api, newData) {
  console.log("newData in tableList func", newData);
  if (!newData) {
    let fetchProduct = await fetchApi(api);
    let fetchRroductRes = await fetchProduct.json();
    console.log("fetchRroductRes", fetchRroductRes);
    localDataRes = [...fetchRroductRes];
    console.log("localDataRes inside if !newData", fetchRroductRes);
    renderTable(localDataRes);
  } else {
    console.log("newData inside if data not fetched", newData);
    renderTable(newData);
  }
}
tableListFunc(productApi);

function renderTable(productList) {
  console.log("productList on render table", productList);
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
        <td class='views icon-xs text-slate-400'><i class="fa-solid fa-eye mr-1"></i>${
          item.rating.count
        } <div class='border rounded-md inline-block p-1 ml-1'>${
        item.rating.rate
      }<i class="fa-solid fa-star text-orange-500 ml-1"></i></div></td>
        <td>
          <div class="relative">
            <button class="dropdown-option" onClick='actionMenu(this)'>
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
              <ul class="dropdown-menu">
                <li><a href="#" class="list" onClick='openModal(null, ${JSON.stringify(
                  item
                ).replace(/'/g, "&apos;")})'>View</a></li>
                <li><a href="#" class="list" onClick='updateProduct(null, ${JSON.stringify(
                  item
                ).replace(/'/g, "&apos;")})'>Edit</a></li>
                <li><a href="#" class="list delete" onClick="openModal(${
                  item.id
                })">Remove</a></li>
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

// Dialogue box modal function
function openModal(id, item) {
  const wrapper = document.createElement("div");
  let dialogueWrapper = `
  <div id="dialogModal"class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" >
  `;
  if (id) {
    console.log('id passed on openModal', id)
    let confirmModal = `
      <div class="bg-white p-10 rounded-lg shadow-lg w-[400px] relative border">
        <div class="text-center pb-3">
          <h4 class="text-5 font-bold text-center" id="head-title">Are you sure want to Delete?</h4>
          <div class="flex justify-between gap-4 mt-6">
            <button class="btn p-3 border-slate-400 border-2 border-solid text-slate-400" id="modal-cancel" onclick='removeData()'><i class="fa-solid fa-ban mr-2"></i>Cancel</button>
            <button class="btn p-3 bg-red-500 text-white" id="modal-remove" onclick='removeData(${id})'><i class="fa-regular fa-trash-can mr-2"></i>Delete</button>
          </div>
        </div>
        <button
          type="button"
          id="btnCloseModal"
          class="btn-close px-4 py-2 rounded"
          id="btn-productClose"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;
    dialogueWrapper += confirmModal;
  }
  if (item) {
    console.log('item passed on openModal', item)
    let cardModal = `
        <div class="card max-w-[400px] min-w-[300px] flex flex-col p-5 rounded-lg justify-between">
          <div class="card-inner border-2 w-full item-center p-5 border-gray-300 rounded-[20px] overflow mb-4">
            <img src=${item.image} alt=${item.category} />
            <span class="absolute icon icon-circle circle-sm bg-slate-200 ml-auto icon-like">
                <svg
                  font-size="medium"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11.2232 19.2905L11.2217 19.2892C8.62708 16.9364 6.55406 15.0515 5.11801 13.2946C3.69296 11.5512 3 10.0562 3 8.5C3 5.96348 4.97109 4 7.5 4C8.9377 4 10.3341 4.67446 11.2412 5.73128L12 6.61543L12.7588 5.73128C13.6659 4.67446 15.0623 4 16.5 4C19.0289 4 21 5.96348 21 8.5C21 10.0562 20.307 11.5512 18.882 13.2946C17.4459 15.0515 15.3729 16.9364 12.7783 19.2892L12.7768 19.2905L12 19.9977L11.2232 19.2905Z"
                    stroke="#2C2F3A"
                    stroke-width="2"
                  ></path>
                </svg>
              </span>
          </div>
          <div class="card-info">
            <h4 class="font-bold text-6">
              ${item.title}
            </h4>
            <div class='flex justify-between items-center my-2'>
            <span class="price-tag font-bold text-slate-800 text-lg">$${item.price}</span>
            <small class="block text-gray-500">${item.category}</small>
            </div>
            <button class="bg-primary py-2 px-3 rounded-lg w-full"><i class="fa-solid fa-cart-shopping mr-3"></i>Add to Cart</button>
          </div>
          <button
            type="button"
            id="btnCloseModal"
            class="btn-close px-4 py-2 rounded text-slate-500"
            id="btn-productClose"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
      </div>`;
    dialogueWrapper += cardModal;
  }
  dialogueWrapper += `</div>`;
  wrapper.innerHTML = dialogueWrapper;
  console.log("wrapper", wrapper);
  document.body.appendChild(wrapper.firstElementChild);

  let dialogModalBtn = document.getElementById("btnCloseModal");
  let dialogModal = document.getElementById("dialogModal");
  console.log("dialogModalBtn close", dialogModalBtn);
  if (dialogModalBtn) {
    console.log("if dialogModalBtn close", dialogModalBtn);
    dialogModalBtn.addEventListener("click", function () {
      dialogModal.remove();
    });
  }
}
// Delete list after clicking remove on dialog
async function removeData(id) {
  const dialogModal = document.getElementById("dialogModal");
  if (!id) {
    console.log("canceled");
    dialogModal.remove();
    return;
  }
  const productApWithId = productApi + "/" + id;
  try {
    const fetchProductRes = await fetch(productApWithId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!fetchProductRes.ok) {
      throw new Error(`Failed to delete product with ID: ${id}`);
    }
  } catch (err) {
    console.error(err.message);
    alert(err.message);
  }
  // Remove item from the local list
  let localProductList = localDataRes.filter((product) => product.id !== id);
  console.log("localProductList after filter", localProductList);
  // Re-render table with updated data
  localDataRes = localProductList;
  tableListFunc(null, localProductList);
  dialogModal.remove();
}

async function updateProduct(id, data) {
  currentEditId = id || (data && data.id) || null;
  let result = data;
  if (!result && id) {
    const productRes = await fetchApi(`${productApi}/${id}`);
    result = await productRes.json();
  }
  if (!result) return;
  updatingForm(result);
  // Method to Update form elemet
  function updatingForm(result) {
    if (!result) {
      return;
    }
    formSubmitText.innerText = "Update";
    formHeaderTitle.innerText = "Update Form";
    addNewFormModal.classList.remove("hidden");
    let title = document.getElementsByName("title");
    let price = document.getElementsByName("price");
    let category = document.getElementsByName("category")[0];
    let description = document.getElementsByName("descriptions");

    if (category) {
      Array.from(category.options).forEach((option) => {
        const selectedOption =
          option.text.toLowerCase() === result.category.toLowerCase();
        if (selectedOption) {
          option.selected = true;
          return;
        } else console.log("selected false", option);
      });
    }

    title[0].value = result.title;
    price[0].value = result.price;
    description[0].value = result.description;
    category[0].value = result.category;
  }
}
