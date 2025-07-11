
const apiUrl = 'https://fakestoreapi.com/products'

const employeeJson = [
    {
      "id": 1,
      "name": "John Smith",
      "position": "Software Engineer",
      "department": "Engineering",
      "email": "john.smith@example.com",
      "phone": "555-0101",
      "hireDate": "2020-05-15",
   "photo": "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      "id": 2,
      "name": "Sarah Johnson",
      "position": "Marketing Manager",
      "department": "Marketing",
      "email": "sarah.j@example.com",
      "phone": "555-0102",
      "hireDate": "2018-11-03",
   "photo": "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      "id": 3,
      "name": "Michael Chen",
      "position": "Data Analyst",
      "department": "Analytics",
      "email": "michael.c@example.com",
      "phone": "555-0103",
      "hireDate": "2021-02-28",
   "photo": "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      "id": 4,
      "name": "Emily Wilson",
      "position": "HR Specialist",
      "department": "Human Resources",
      "email": "emily.w@example.com",
      "phone": "555-0104",
      "hireDate": "2019-07-22",
   "photo": "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      "id": 5,
      "name": "David Brown",
      "position": "Sales Representative",
      "department": "Sales",
      "email": "david.b@example.com",
      "phone": "555-0105",
      "hireDate": "2022-01-10",
   "photo": "https://randomuser.me/api/portraits/men/19.jpg"
    },
    {
      "id": 6,
      "name": "Lisa Rodriguez",
      "position": "Product Manager",
      "department": "Product",
      "email": "lisa.r@example.com",
      "phone": "555-0106",
      "hireDate": "2020-09-17",
   "photo": "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
      "id": 7,
      "name": "Robert Kim",
      "position": "UX Designer",
      "department": "Design",
      "email": "robert.k@example.com",
      "phone": "555-0107",
      "hireDate": "2021-04-05",
   "photo": "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      "id": 8,
      "name": "Jessica Lee",
      "position": "Financial Analyst",
      "department": "Finance",
      "email": "jessica.l@example.com",
      "phone": "555-0108",
      "hireDate": "2017-12-12",
   "photo": "https://randomuser.me/api/portraits/women/25.jpg"
    },
    {
      "id": 9,
      "name": "Thomas Garcia",
      "position": "IT Support Specialist",
      "department": "IT",
      "email": "thomas.g@example.com",
      "phone": "555-0109",
      "hireDate": "2022-03-30",
   "photo": "https://randomuser.me/api/portraits/men/55.jpg"
    },
    {
      "id": 10,
      "name": "Amanda Taylor",
      "position": "Customer Success Manager",
      "department": "Customer Support",
      "email": "amanda.t@example.com",
      "phone": "555-0110",
      "hireDate": "2021-08-14",
   "photo": "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      "id": 11,
      "name": "James Wilson",
      "position": "Operations Manager",
      "department": "Operations",
      "email": "james.w@example.com",
      "phone": "555-0111",
      "hireDate": "2018-06-25",
   "photo": "https://randomuser.me/api/portraits/men/19.jpg"
    }
  ]

    const cardList = document.querySelector('.card-list')
    const tableList = document.querySelector('.table-list')
  const cardItem = employeeJson.map((item) => {
      return  `
        <div class="card flex flex-col p-5 rounded-lg justify-between">
          <div class="w-full item-center p-3 border-gray-100 rounded-full overflow mb-1 z-10">
            <img src=${item.photo} alt=${item.name} />
          </div>
          <div class="card-info">
            <div class="text-center py-3 mb-4">
              <h3 class="font-bold text-3">${item.name}</h3>
               <span class='font-normal text-slate-400'>${item.position}</span>
            </div>
            <small class="block font-bold"><span class='font-normal'>Department: </span>${item.department}</small>
            <small class="block font-bold"><span class='font-normal'>Phone: </span>${item.phone}</small>
            <small class="font-bold"> <span class='font-normal'>Email: </span>${item.email}</small>
          </div>

      </div>`
    }).join('')

      cardList.innerHTML = cardItem


const tableItem = employeeJson.map((item, i) => {
  return `
    <tr>
      <td>${i + 1}</td>
      <td><img src="${item.photo}" alt="${item.name}" class="employee-photo"></td> 
      <td>${item.name}</td> 
      <td>${item.position}</td>
      <td>${item.department}</td>
      <td><a href="mailto:${item.email}">${item.email}</a></td>
      <td>
        <button class="btn border-2 border-gray-300 p-2 px-3 rounded-lg text-red-500 btn-delete" type="button"><i class="fa-solid fa-trash"></i></button>
        <button class="ml-2 btn border-2 border-gray-300 p-2 px-3 rounded-lg text-red-500 btn-edit" type="button"><i class="fa-solid fa-pen-to-square"></i></button>
      </td>
    </tr>`;
}).join('');

tableList.innerHTML = tableItem;


const btnDelete = document.querySelectorAll('.btn-delete')
const btnEdit = document.querySelectorAll('.btn-edit')


btnDelete.forEach((del) => {
  del.addEventListener('click', btnDeletefunction)

})

// btnEdit.addEventListener('click', btnEditfunction)
function btnDeletefunction (data){
  console.log('deleted', data)
}
function btnEditfunction (){
  console.log('Edited')
}