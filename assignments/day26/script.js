
const iconLike = document.querySelector('.icon-like')

document.addEventListener('click', function(e){
    console.log('document clicking')
 const icon = e.target.closest('.icon-like')
 if(icon){
      icon.classList.add('active')
       console.log('Heart is clicked')
 }
})


const cardList = document.querySelector('.card-list')
let card = ""


const universities = [
  {
    university: "Arizona State University",
    address: "Tempe, Arizona, United States of America",
    courseName: "Biotechnology and Genomics",
    feePerYear: "AUD 36,000",
    duration: "2 Years",
    degreeLevel: "Masters",
    image: "images/az.png"
  },
  {
    university: "Massachusetts Institute of Technology",
    address: "Cambridge, Massachusetts, United States",
    courseName: "Computer Science and Engineering",
    feePerYear: "USD 53,450",
    duration: "4 Years",
    degreeLevel: "Bachelors",
    image: "images/uni-img1.jpg"
  },
  {
    university: "University of Oxford",
    address: "Oxford, England, United Kingdom",
    courseName: "International Relations",
    feePerYear: "GBP 28,950",
    duration: "3 Years",
    degreeLevel: "Bachelors",
       image: "images/uni-img2.jpg"
  },
  {
    university: "University of Toronto",
    address: "Toronto, Ontario, Canada",
    courseName: "Business Administration",
    feePerYear: "CAD 42,000",
    duration: "4 Years",
    degreeLevel: "Bachelors",
    image: "images/az.png"
  },
  {
    university: "ETH Zurich",
    address: "Zürich, Switzerland",
    courseName: "Mechanical Engineering",
    feePerYear: "CHF 1,300",
    duration: "2 Years",
    degreeLevel: "Masters",
    image: "images/uni-img1.jpg"
  },
  {
    university: "University of Sydney",
    address: "Sydney, New South Wales, Australia",
    courseName: "Medicine",
    feePerYear: "AUD 52,000",
    duration: "6 Years",
    degreeLevel: "Bachelors",
     image: "images/uni-img2.jpg"
  },
  {
    university: "University of Tokyo",
    address: "Tokyo, Japan",
    courseName: "Robotics Engineering",
    feePerYear: "JPY 535,800",
    duration: "4 Years",
    degreeLevel: "Bachelors",
  image: "images/uni-img3.jpg"
  },
  {
    university: "National University of Singapore",
    address: "Singapore",
    courseName: "Data Science",
    feePerYear: "SGD 38,200",
    duration: "1.5 Years",
    degreeLevel: "Masters",
    image: "images/az.png"
  },
  {
    university: "University of Cape Town",
    address: "Cape Town, South Africa",
    courseName: "Environmental Science",
    feePerYear: "ZAR 64,500",
    duration: "3 Years",
    degreeLevel: "Bachelors",
    image: "images/az.png"
  },
  {
    university: "Technical University of Munich",
    address: "Munich, Germany",
    courseName: "Artificial Intelligence",
    feePerYear: "EUR 258",
    duration: "2 Years",
    degreeLevel: "Masters",
    image: "images/uni-img1.jpg"
  }
];
// for(i=0;i<universities.length; i++){
//     const cardItem = `  <div class="card border-2">
//                 <div class="flex items-center pb-3">
//                   <div class="circle circle-md border-2 border-gray-200 p-2">
//                     <img src="/images/az.png" alt="" />
//                   </div>
//                   <div class="ml-3">
//                     <h4 class="title">Arizona State University</h4>
//                     <span>Tempe, Arizona,United States of America</span>
//                   </div>
//                   <span class="icon ml-auto icon-like">
//                     <svg
//                       font-size="medium"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                     >
//                       <path
//                         d="M11.2232 19.2905L11.2217 19.2892C8.62708 16.9364 6.55406 15.0515 5.11801 13.2946C3.69296 11.5512 3 10.0562 3 8.5C3 5.96348 4.97109 4 7.5 4C8.9377 4 10.3341 4.67446 11.2412 5.73128L12 6.61543L12.7588 5.73128C13.6659 4.67446 15.0623 4 16.5 4C19.0289 4 21 5.96348 21 8.5C21 10.0562 20.307 11.5512 18.882 13.2946C17.4459 15.0515 15.3729 16.9364 12.7783 19.2892L12.7768 19.2905L12 19.9977L11.2232 19.2905Z"
//                         stroke="#2C2F3A"
//                         stroke-width="2"
//                       ></path>
//                     </svg>
//                   </span>
//                 </div>
//                 <div class="card-details border-top-1 pt-3">
//                   <div>
//                     <p><small>Course Name</small></p>
//                     <h6 class="text-gray-900 font-semibold">Biotechnology and Genomics</h6>
//                   </div>
//                   <div class="card-info text-gray-500 mt-5">
//                     <ul class="flex gap-4 list-flex">
//                       <li>
//                         <small class="block">Fee per year</small>
//                         <small>AUD 1.00</small>
//                       </li>
//                       <li>
//                         <small class="block">Duration</small>
//                         <small>26640 Year</small>
//                       </li>
//                       <li>
//                         <small class="block">Duration</small>
//                         <small>Masters</small>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>`
//     card += cardItem
// }

universities.forEach((item) => {
     const cardItem = `  <div class="card border-2">
                <div class="flex items-center pb-3">
                  <div class="circle circle-md border-2 border-gray-200 p-2">
                    <img src=${item.image} alt="" />
                  </div>
                  <div class="ml-3">
                    <h4 class="title">${item.university}</h4>
                    <span>${item.address}</span>
                  </div>
                  <span class="icon ml-auto icon-like">
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
                <div class="card-details border-top-1 pt-3">
                  <div>
                    <p><small>Course Name</small></p>
                    <h6 class="text-gray-900 font-semibold">${item.courseName}</h6>
                  </div>
                  <div class="card-info text-gray-500 mt-5">
                    <ul class="flex gap-4 list-flex">
                      <li>
                        <small class="block">Fee per year</small>
                        <small>${item.feePerYear}</small>
                      </li>
                      <li>
                        <small class="block">Duration</small>
                        <small>${item.duration}r</small>
                      </li>
                      <li>
                        <small class="block">Cerificate</small>
                        <small>Certificate III</small>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>`
                 card += cardItem

})
cardList.innerHTML = card