
const apiUrl = 'https://fakestoreapi.com/products'
const userApi = 'https://fakestoreapi.com/users'
fetch(apiUrl) // Fetch products api
.then(response => response.json()) // Convert response to JSON
.then(data => {
    const cardList = document.querySelector('.card-list')
    const cardItem = data.map((item) => {
      return  `
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

      </div>`
    }).join('')
    cardList.innerHTML = cardItem
})
.catch(error => {
console.error('Error fetching data:', error);
});
fetch(userApi) // Fetch users api
.then(response => response.json()) // Convert response to JSON
.then(data => {
    const tableList = document.querySelector('.table-list')
  console.log('data', data)
    const tableItem = data.map((item, i) => {
      return `
      <tr>
      <td>${i} </td>
     
      <td>${toTitleCase(item.name.firstname)} ${toTitleCase(item.name.lastname)}</td>
      <td>${item.email}</td>
      <td>${item.username}</td>
      <td>${toTitleCase(item.address.city)}, ${toTitleCase(item.address.street)}, ${toTitleCase(item.address.zipcode)}</td>
      <td>${item.phone}</td>
      
      </tr>
      
      `
    }).join('')
    tableList.innerHTML += tableItem

})
.catch(error => {
console.error('Error fetching data:', error);
});


function toTitleCase(str) {

  return str.toLowerCase().split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}
const iconLike = document.querySelector('.icon-like');
document.addEventListener('click', function(e){
  console.log('e.target', e.target)
  const icon = e.target.closest('.icon-like')
  if(icon){
    icon.classList.add('active')
  }
})

