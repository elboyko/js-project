const menuBtn = document.querySelector('.menu__btn');
const menuClose = document.querySelector('.menu__close');
const menuList = document.querySelector('.menu__list');
const btnIn = document.querySelector('#header-link');

menuBtn.addEventListener('click', function () {
   menuList.classList.add('menu__list--open');
});
menuClose.addEventListener('click', function () {
   menuList.classList.remove('menu__list--open');
});

// const api = 'https://imdb-api.com/api';
// function getMovie(e) {
//    e.preventDefault()
//    const api = fetch('https://api.kinopoisk.dev/v1.3/movie?page=1&limit=10&type=cartoon&year=2020-2023&rating.kp=8.3-10', {
//       method: "GET",
//       headers: { 'X-API-KEY': 'EBBC6HN-995ME0E-JN7C5NT-F1022GR' }
//    })
//       .then((res) => res.json())
//       .then((data) => {
//          // console.log(data[0]['name']);
//          console.log(data)
//          // let key;
//          // for (key in data) {
//          //    console.log(data.docs[key].type);
//          // }
//          console.log(data.docs[0].name)
//       })

// };

// document.querySelector('.search__btn').addEventListener('click', getMovie)
// console.log('Hello');

// function makeThree(event) {
//    event.preventDefault()
//    console.log('ghbdtn');
//    fetch('https://www.boredapi.com/api/activity')
//       .then((res) => res.json())
//       .then((data) => console.log(data))
// }


async function getResponse() {
   let response = await fetch('https://api.kinopoisk.dev/v1.3/movie?page=1&limit=10&type=cartoon&year=2020-2023&rating.kp=8.3-10', {
      method: "GET",
      headers: { 'X-API-KEY': 'EBBC6HN-995ME0E-JN7C5NT-F1022GR' }
   })
   let content = await response.json()
   console.log(content);
   //вывод на страницу
   let list = document.querySelector('.film')


   // let key;
   // for (key in content) {

   list.innerHTML += `
      <li class="film__post">
<h4 class="film__name">${content.docs[0].name}</h4>
<img class="film__img" src="${content.docs[0].poster.url}" alt="" >

</li>
   <li class="film__post">
<h4 class="film__name">${content.docs[1].name}</h4>
<img class="film__img" src="${content.docs[1].poster.url}" alt="" >
</li>

</li>
   <li class="film__post">
<h4 class="film__name">${content.docs[2].name}</h4>
<img class="film__img" src="${content.docs[2].poster.url}" alt="" >
</li>

</li>
   <li class="film__post">
<h4 class="film__name">${content.docs[3].name}</h4>
<img class="film__img" src="${content.docs[3].poster.url}" alt="" >
</li>



      `



   // }




}

// getResponse()



document.querySelector('.search__btn').addEventListener('click', getResponse)