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
function getMovie(e) {
   e.preventDefault()
   const api = fetch('https://api.kinopoisk.dev/v1.3/movie?page=1&limit=10&type=cartoon&year=2020-2023&rating.kp=8.3-10', {
      method: "GET",
      headers: { 'X-API-KEY': 'EBBC6HN-995ME0E-JN7C5NT-F1022GR' }
   })
      .then((res) => res.json())
      .then((data) => {
         // console.log(data[0]['name']);
         console.log(data)
      })

};


document.querySelector('.search__btn').addEventListener('click', getMovie)
console.log('Hello');

// function makeThree(event) {
//    event.preventDefault()
//    console.log('ghbdtn');
//    fetch('https://www.boredapi.com/api/activity')
//       .then((res) => res.json())
//       .then((data) => console.log(data))
// }

// document.querySelector('.search__btn').addEventListener('click', makeThree);


// const API_key = '4d0acb5c587ea09e45d027229439b325';
// const form = document.querySelector('#form');
// const input = document.querySelector('.form__input');

// form.onsubmit = submitHandler;
// async function submitHandler(e) {
//    e.preventDefault();
//    if (input.value.trim() === '') {
//       console.log('Enter City name');
//    } else {
//       console.log(input.value.trim());
//    }


// const cityName = input.value.trim();
// input.value = '';//сброс значения из input

// const cityInfo = await getGeo(cityName);
// // console.log(cityInfo);
// // console.log(cityInfo[0]['lat']);
// // console.log(cityInfo[0]['lon']);//для этого из данных нужно извлечь lat и lon
// const weatherInfo = await getWeather(cityInfo[0]['lat'], cityInfo[0]['lon']);
// console.log(weatherInfo);
// console.log(weatherInfo.name);//выводим название города
// console.log(weatherInfo.main.temp);//выводим температуру
// console.log(weatherInfo.main.humidity);//выводим влажность
// console.log(weatherInfo.wind.speed);//выводим скорость ветра
// console.log(weatherInfo.weather[0]['main']);//выводим картинку погоды


// const weatherData = {
//    name: weatherInfo.name,
//    temp: weatherInfo.main.temp,
//    humidity: weatherInfo.main.humidity,
//    speed: weatherInfo.wind.speed,
//    main: weatherInfo.weather[0]['main']
// };
// renderWeatherData(weatherData);

// }

//функция  поиска города
// async function getGeo(name) {
//    const getUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_key}`;

//    const response = await fetch(getUrl);
//    const data = await response.json();

//    return data;
// }
//нужно сделать запрос на получение погоды
//для этого из данных нужно извлечь lat и lon

// async function getWeather(lat, lon) {
//    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_key}`;
//    const response = await fetch(weatherUrl);
//    const data = await response.json();

//    return data;

// }
//теперь напишем функцию, которая будет принимать все эти значения и отображать их на странице

//компануем все эти данные в виде объекта, строка 27

// function renderWeatherData(data) {
//    const temp = document.querySelector('.weather__temp');
//    const city = document.querySelector('.weather__city');
//    const humidity = document.querySelector('#humidity');
//    const speed = document.querySelector('#speed');
//    const img = document.querySelector('.weather__img');
//    temp.innerText = Math.round(data.temp) + '°c';
//    city.innerText = data.name;
//    humidity.innerText = data.humidity + '%';
//    speed.innerText = Math.round(data.speed) + ' km/h';



   // const fileNames = {
   //    'Clouds': 'clouds',
   //    'Clear': 'clear',
   //    'Rain': 'rain',
   //    'Snow': 'snow',
   // }

   // if (fileNames[data.main]) {
   //    img.src = `./image/${fileNames[data.main]}.png`;
   // } else { console.log('error'); }

   // if (fileNames[data.main] === fileNames[data.main[Clouds]]) {
   //    img.src = './image/clouds.png'
   // } else if (fileNames[data.main] === fileNames[data.main[Snow]]) {
   //    img.src = './image/snow.png'
   // } else if (fileNames[data.main] === fileNames[data.main[Clear]]) {
   //    img.src = './image/clear.png'
   // }
   // else {
   //    img.src = './image/rain.png'
   // }

// }

//Блок ЧАТ
const button = document.getElementById('chat_btn');
const comments = document.querySelector('#comments');
const userName = document.querySelector('#name');
const avatar = document.querySelector('#avatar');
const message = document.querySelector('#message');
const nameCheckboxYes = document.querySelector('#name_yes');
const nameCheckboxNo = document.querySelector('#name_no');
const tasks = JSON.parse(localStorage.getItem('comments')) || [];

let createComment = () => {
	let newComment = document.createElement('div');
	newComment.classList.add('comment');
	//спам фильтр
	const spamFilter = /buy viagra|xxx|porno/gi;
	// параграф для имени
	let newName = document.createElement('p');
	newName.classList.add('comment__name');
	// проверка имени
	let nameChange = userName.value;
	if (nameCheckboxNo.checked && nameCheckboxYes.checked) {
		alert('выберите один вариант');
		return;
	} else if (nameCheckboxNo.checked) {
		nameChange = 'username';
		newName.textContent = nameChange;
	} else if (nameCheckboxYes.checked) {
		if (nameChange.indexOf(' ') !== -1) {
			alert(`поле "имя" не может содержать пробел`);
			return;
		} else if (spamFilter.test(nameChange)) {
			nameChange = nameChange.replace(spamFilter, '***');
			nameChange = nameChange.charAt(0).toUpperCase() + nameChange.slice(1).toLowerCase();
			newName.textContent = nameChange;
		} else {
			nameChange = nameChange.charAt(0).toUpperCase() + nameChange.slice(1).toLowerCase();
			newName.textContent = nameChange;
		}
	} else {
		alert(`выберите один вариант`);
		return;
	}

	// создание аватара
	let newAvatar = document.createElement('img');
	newAvatar.classList.add('comment__avatar');
	if (avatar.value) {
		newAvatar.setAttribute('src', avatar.value);
	} else {
		const avatars = [
			'/style/images/Carry.jpg',
			'/style/images/Harry-Potter.jpg',
			'/style/images/Carry.jpg',
			'/style/images/Iron-Man.jpg',
			'/style/images/Minion.jpg',
			'/style/images/home-alone.jpg',
			'/style/images/snow.jpg',
		];
		const randomIndex = Math.floor(Math.random() * avatars.length);
		const randomAvatar = avatars[randomIndex];
		newAvatar.setAttribute('src', randomAvatar);
	}

	// создание даты
	let newDate = document.createElement('p');
	newDate.classList.add('comment__date');
	let commentDate = new Date().toLocaleString('ru-Ru', {
		weekday: 'short',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		year: '2-digit',
		month: 'short',
		day: '2-digit',
	});
	newDate.innerHTML = commentDate;

	//создание поля заполнения
	let newMessage = document.createElement('p');
	let messageText = message.value;
	if (messageText === '' || !messageText.replace(/\s/g, '').length) {
		alert(`поле "сообщение" не может быть пустым`);
		return;
	} else if (spamFilter.test(messageText)) {
		messageText = messageText.replace(spamFilter, '***');
		newMessage.classList.add('comment__text');
		newMessage.textContent = messageText;
	} else {
		newMessage.classList.add('comment__text');
		newMessage.textContent = messageText;
	}

	//вывод сообщений
	newComment.append(newAvatar, commentDate, newName, newMessage);
	comments.append(newComment);

	tasks.push({
		name: nameChange,
		avatar: newAvatar.getAttribute('src'),
		date: commentDate,
		message: messageText,
	});
	localStorage.setItem('comments', JSON.stringify(tasks));

	// обнуление
	userName.value = '';
	message.value = '';
	avatar.value = '';
};

button.addEventListener('click', createComment);

const loadComments = () => {
	tasks.forEach((commentData) => {
		let comment = document.createElement('div');
		comment.classList.add('comment');

		let nameParagraph = document.createElement('p');
		nameParagraph.classList.add('comment__name');
		nameParagraph.textContent = commentData.name;

		let avatarImg = document.createElement('img');
		avatarImg.classList.add('comment__avatar');
		avatarImg.setAttribute('src', commentData.avatar);

		let dateParagraph = document.createElement('p');
		dateParagraph.classList.add('comment__date');
		dateParagraph.textContent = commentData.date;

		let messageParagraph = document.createElement('p');
		messageParagraph.classList.add('comment__text');
		messageParagraph.textContent = commentData.message;

		comment.append(avatarImg, dateParagraph, nameParagraph, messageParagraph);
		comments.appendChild(comment);
	});
};

loadComments();

//переключение темы
document.getElementById('themeToggle').addEventListener('click', function () {
	const currentTheme = document.body.className;
	if (currentTheme === 'light-theme') {
		document.body.className = 'dark-theme';
	} else {
		document.body.className = 'light-theme';
	}
});



