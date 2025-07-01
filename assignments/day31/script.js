// click on like button
const iconLike = document.querySelector(".icon-like");
document.addEventListener("click", function (e) {
  console.log("e.target", e.target);
  const icon = e.target.closest(".icon-like");
  if (icon) {
    icon.classList.add("active");
  }
});

// Fetch api function
async function fetchApi(api) {
  try{
      const response =  await fetch(api)
  
    if (!response.ok){
      throw new Error(`HTTP eror! status: ${response.status}`)
    }
    
    let data =  response.json()
    console.log('resp data', data)
    return data
  } catch (error){
    console.error('Fetch Error:', error)
  }

}
// Change to Ttile Case function
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
// Fetch products api
const productApi = "https://fakestoreapi.com/products";
// Fetch users api
const userApi = "https://fakestoreapi.com/users";
// Create Card List function
async function cardListFunc (api){
    const respData = await fetchApi(api);
    const cardList = document.querySelector(".card-list");
      const cardItem = respData
      .map((item) => {
        return `
        <div class="card flex flex-col p-5 rounded-lg justify-between">
          <div class="card-inner border-2 w-full item-center p-5 border-gray-100 rounded-[20px] overflow mb-4">
            <img src=${item.image} alt=${item.category} />
            <span class="absolute icon icon-circle bg-slate-200 ml-auto icon-like">
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
            <small class="block text-gray-500">${item.category}</small>
            <span class="price-tag font-bold">$${item.price}</span>
          </div>

      </div>`;
      })
      .join("");
    cardList.innerHTML = cardItem;
      return cardItem

}
cardListFunc(productApi)
// Create table list function
async function tableListFunc(api){
  const tableList = document.querySelector(".table-list");
  const resData = await fetchApi(api)
  const tableListItem = resData.map((item, i) => {
     return `
      <tr>
        <td>${i + 1} </td>
      
        <td>${toTitleCase(item.name.firstname)} ${toTitleCase(
            item.name.lastname
          )}</td>
        <td>${item.email}</td>
        <td>${item.username}</td>
        <td>${toTitleCase(item.address.city)}, ${toTitleCase(
            item.address.street
          )}, ${toTitleCase(item.address.zipcode)}</td>
        <td>${item.phone}</td>
        <td>
          <button class="btn border-2 border-gray-300 p-2 px-3 rounded-lg text-red-500 btn-delete" onClick="btnDeletefunction(${item, i})" type="button"><i class="fa-solid fa-trash"></i></button>
          <button class="ml-2 btn border-2 border-gray-300 p-2 px-3 rounded-lg text-red-500 btn-edit" type="button"><i class="fa-solid fa-pen-to-square"></i></button>
        </td>
        
        </tr>
    `
    }).join('')
   
    tableList.innerHTML += tableListItem
}
tableListFunc(userApi)


// Action (Edit/Delete) Button Function
// const btnDelete = document.querySelectorAll(".btn-delete");
// const btnEdit = document.querySelectorAll(".btn-edit");

// btnDelete.forEach((del) => {
//   del.addEventListener("click", btnDeletefunction);
// });

// btnEdit.addEventListener('click', btnEditfunction)
function btnDeletefunction(item, index) {
  console.log("delet|ed item", item);
  console.log("delet|ed index", index);
  // data.splice(index, 1)
}
function btnEditfunction() {
  console.log("Edited");
}


// form submit
const formArea = document.querySelector('.form-area');

formArea.addEventListener('submit', function(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: formData, 
  })
  .then(response => response.json())
  .then(data => {
    console.log("Success:", data);
    alert("Form submitted successfully!");
  })
  .catch(error => {
    console.error("Error submitting form:", error);
    alert("Something went wrong!");
  });
});



  


