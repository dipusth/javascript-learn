
const apiUrl = 'https://fakestoreapi.com/products'




fetch(apiUrl) // Example public API
.then(response => response.json()) // Convert response to JSON
.then(data => {
    const apiUrlLength =  data.length;
    console.log(data)
    const cardList = document.querySelector('.card-list')

    
    const cardItem = data.map((item) => {
      return  `
        <div class="card border-2 p-2 rounded-lg">
          <div class="border-2 border-gray-100 rounded-[20px] overflow mb-4">
            <img src=${item.image} alt=${item.category} />
          </div>
          <div class="card-info">
            <h4 class="font-bold">
              ${item.title}
            </h4>
            <small class="block text-gray-500">${item.category}</small>
            <span class="price-tag font-bold">${item.price}</span>
          </div>

      </div>`
    }).join('')
    cardList.innerHTML = cardItem
    console.log('cardHtml', cardHtml)
})
.catch(error => {
console.error('Error fetching data:', error);
});