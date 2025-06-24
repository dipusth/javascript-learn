
const apiUrl = 'https://fakestoreapi.com/products'




fetch(apiUrl) // Example public API
.then(response => response.json()) // Convert response to JSON
.then(data => {
    const apiUrlLength =  data.length;
    console.log(apiUrlLength)
    const dataLoop =  data.forEach((item) => item)
    console.log('dataLoop', dataLoop)

    let card =  ` <div class="card-list flex justify-between gap-4 flex-wrap mt-4">
        <div class="card border-2 p-2 rounded-lg">
          <div class="border-2 border-gray-100 rounded-[20px] overflow mb-4">
            <img src="./images/az.png" alt="" />
          </div>
          <div class="card-info">
            <h4 class="font-bold">
              Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
            </h4>
            <small class="block text-gray-500">Men's clothing</small>
            <span class="price-tag font-bold">$109.95</span>
          </div>
        </div>
      </div>`


})
.catch(error => {
console.error('Error fetching data:', error);
});