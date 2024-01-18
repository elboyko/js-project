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

//попап регистрация
const openPopup2 = document.querySelector('#popup-open2');
const closePopup2 = document.querySelector('#popup-close2');
const popUp2 = document.querySelector('#popup2');


openPopup2.addEventListener('click', function (e) {
	e.preventDefault();
	popUp2.classList.add('activ');
})


//popup логин
const openPopup = document.querySelector('#popup-open');
const closePopup = document.querySelector('#popup-close');
const popUp = document.querySelector('#popup');


openPopup.addEventListener('click', function (e) {
	e.preventDefault();
	popUp.classList.add('activ');
})

closePopup.addEventListener('click', function () {
	popUp.classList.remove('activ');
})



//вывод на страницу лучших фильмов 2023 года
async function getResponse() {
	let response = await fetch('https://api.kinopoisk.dev/v1.3/movie?page=1&limit=10&type=cartoon&year=2020-2023&rating.kp=8.3-10', {
		method: "GET",
		headers: { 'X-API-KEY': 'EBBC6HN-995ME0E-JN7C5NT-F1022GR' }
	})
	let content = await response.json()
	console.log(content);
	//вывод на страницу
	let listIn = document.querySelector('.search__film')
	for (let i = 0; i < content.docs.length; i++) {
		listIn.innerHTML += `<li class="search__film-post">
	<img class="search__film-img" src="${content.docs[i].poster.url}" alt="" >
	<h4 class="search__film-name">${content.docs[i].name}</h4>`
	}
}

document.querySelector('.search__btn').addEventListener('click', getResponse)


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

//меняем тему главной картинки
document.getElementById('themeToggle').addEventListener('click', function () {
	let imgChange = document.querySelector('.search__img');
	if (imgChange.src.match('./style/images/main__cat.jpg')) {
		imgChange.src = './style/images/main__dog.jpeg'
	} else {
		imgChange.src = './style/images/main__cat.jpg'
	}

})


//title animation
var hotbod = document.querySelector("body");

function doStuff() {
	hotbod.className += " animate";
}

window.onload = function () {
	doStuff();
};


//comedy block


const data = [
	{
		id: 1,
		type: "romantic-comedy",
		title: "Зачарованная",
		star: "Эми Адамс",
		rating: "рейтинг: IMDb 7.1, Кинопоиск 7.0",
		image: "https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/e828e75f-a992-4f47-a58c-e103052d7d51/576x"
	},
	{
		id: 2,
		type: "family-comedy",
		title: "Собачья жизнь",
		year: 2017,
		rating: "рейтинг: IMDb 6.9, Кинопоиск 7.8",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQexcz9NPU8X6bBWrmx6wEA5CQ-EKQz7DfeEC5dQGq5G97QDsZpPpfxyKy1b773zHtOjs&usqp=CAU"
	},
	{
		id: 3,
		type: "romantic-comedy",
		title: "Из 13 в 30",
		star: "Дженнифер Гарнер",
		rating: "рейтинг: IMDb 6.1, Кинопоиск 6.9",
		image: "https://st.kinobase.org/storage/360x534/posters/2020/02/0644ef9e500542bc642b.jpg"
	},
	{
		id: 4,
		type: "family-comedy",
		title: "Приключения Паддингтона",
		year: 2014,
		rating: "рейтинг: IMDb 7.2, Кинопоиск 7.2",
		image: "https://cdn.ananasposter.ru/image/cache/catalog/poster/film/95/2796-1000x830.jpg"
	}
];


class Comedy {
	constructor(type, rating, title, image) {
		this.type = type;
		this.rating = rating;
		this.title = title;
		this.image = image
	}

	getInfo() {
		let info = `${this.type} ${this.title}`;
		return info;
	}

	getRating
		() {
		let rating = `Искрометная ${this.type} "${this.title}" для хорошего настроения! У этой комедии ${this.rating}.`;
		return rating;
	}
}

class Family extends Comedy {
	constructor(type, rating, title, image, year) {
		super(type, rating, title, image);
		this.year = year;
	}
	getYear() {
		let year = `Комедия "${this.title}"- лучшая комедия ${this.year} года!`;
		return year;
	}
}
class Romantic extends Comedy {
	constructor(type, rating, title, image, star) {
		super(type, rating, title, image);
		this.star = star;
	}

	getStarName() {
		let star = `В главной роли комедии "${this.title}" восхитительная актриса: ${this.star}.`;
		return star;
	}
}

const list = document.getElementById("list");
const addMovie = () => {
	if (list.innerHTML === "") {
		data.forEach(item => {
			const newMovie = document.createElement("div");
			newMovie.classList.add("movie");
			const newImage = document.createElement("img");
			newImage.classList.add("image");
			const newTitle = document.createElement("h2");
			newTitle.classList.add("title");
			const newRating = document.createElement("div");
			const newDescription = document.createElement("div");
			newMovie.append(newImage, newTitle, newRating, newDescription);
			switch (item.type) {
				case "family-comedy":
					let newFam = new Family("семейная комедия: ", item.rating, item.title, item.image, item.year);
					newImage.src = newFam.image;
					newTitle.textContent = newFam.getInfo();
					newDescription.textContent = newFam.getYear();
					newRating.textContent = newFam.getRating();
					break;
				case "romantic-comedy":
					let newRom = new Romantic("романтическая комедия: ", item.rating, item.title, item.image, item.star,);
					newImage.src = newRom.image;
					newTitle.textContent = newRom.getInfo();
					newDescription.textContent = newRom.getStarName();
					newRating.textContent = newRom.getRating();
					break;
			}
			list.appendChild(newMovie);
		});
	}
	list.classList.toggle('hidden');
};
document.getElementById('comedy_btn').addEventListener('click', addMovie);


//comedysound
const comedyButton = document.getElementById("animation");
function makeSound() {
	const audio = new Audio();
	audio.preload = 'auto';
	audio.src = '/style/images/superhero-theme-7963.mp3';
	audio.play();

}

comedyButton.onclick = makeSound;

// Date

let d = new Date();

let day = new Array("Воскресенье", "Понедельник", "Вторник",
	"Среда", "Четверг", "Пятница", "Суббота");

let month = new Array("января", "февраля", "марта", "апреля", "мая", "июня",
	"июля", "августа", "сентября", "октября", "ноября", "декабря");

document.getElementsByClassName('date')[0].insertAdjacentHTML('afterbegin', '<div id="myDate">' + day[d.getDay()] + " " + d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear() + " г." + '</div>');
myDate.style.fontSize = "14pt";
myDate.style.color = "yellowgreen";


//форма регистрации

const errorName = document.querySelector('.error-name');
const errorSurname = document.querySelector('.error-surname');
const errorPassword = document.querySelector('.error-password');
const errorEmail = document.querySelector('.error-email');
const errorPhone = document.querySelector('.error-phone');
const submitBtm = document.querySelector('.registration__form-btn');



const inputName = document.querySelector('#firstName');
const inputSurname = document.querySelector('#firstSurname');
const inputMail = document.querySelector('#firstEmail');
const inputPassword = document.querySelector('#firstPassword');
const inputPhone = document.querySelector('#firstPhone');
const inputLogin = document.querySelector('#login');

//функция проверки поля имени
function checkValidityName() {
	let validity = inputName.validity;
	let reg = /^[a-zA-ZА-Яа-я]+$/;
	let error = document.querySelector('.error-name');
	let res = reg.test(inputName.value)
	if (!res) {
		inputName.classList.add('red__line');
		error.textContent = 'Неверный формат';
	}
	else if (validity.valueMissing) {
		inputName.classList.add('red__line');
		error.textContent = 'Необходимо заполнить поле';
	}
	else {
		inputName.classList.add('green__line');
		inputName.classList.remove('red__line');
		error.textContent = '';
	}
}

//функция проверки поля Фамилия
function checkValiditySurname() {
	let validity = inputSurname.validity;
	let reg = /^[a-zA-ZА-Яа-я]+$/;
	let error = document.querySelector('.error-surname');
	let res = reg.test(inputSurname.value)
	if (!res) {
		inputSurname.classList.add('red__line');
		error.textContent = 'Неверный формат';
	}
	else if (validity.valueMissing) {
		inputSurname.classList.add('red__line');
		error.textContent = 'Необходимо заполнить поле';
	}
	else {
		inputSurname.classList.add('green__line');
		inputSurname.classList.remove('red__line');
		error.textContent = '';
	}
}
//функция проверки поля Логин
function checkValidityLogin() {
	let validityLogin = inputLogin.validity;
	let error = document.querySelector('.error-login');
	if (validityLogin.valueMissing) {

		inputLogin.classList.add('red__line');
		error.textContent = 'Необходимо заполнить поле';
	}
	else {
		inputLogin.classList.add('green__line');
		inputLogin.classList.remove('red__line');
		error.textContent = '';
	}
}

//функция проверки поля Email
function checkValidityEmail() {
	let validityMail = inputMail.validity;
	let error = document.querySelector('.error-email');
	if (validityMail.valueMissing) {

		inputMail.classList.add('red__line');
		error.textContent = 'Необходимо заполнить поле';
	}
	else {
		inputMail.classList.add('green__line');
		inputMail.classList.remove('red__line');
		error.textContent = '';
	}
}
//функция проверки поля  пароль
function checkValidityPassword() {
	let error = document.querySelector('.error-password');
	if (inputPassword.valueMissing) {
		inputPassword.classList.add('red__line');
		error.textContent = 'Необходимо заполнить поле';
	}
	else if (
		inputPassword.value.length < 8
	) {
		error.textContent = 'Пароль должен быть не менее 8 символов';
		inputPassword.classList.add('red__line');
	} else {
		inputPassword.classList.add('green__line');
		inputPassword.classList.remove('red__line');
		error.textContent = '';
	}
}


function change(event) {
	event.preventDefault();
	checkValidityName();
	checkValiditySurname();
	checkValidityPassword();
	checkValidityEmail();
	checkValidityLogin();


	let isFormValid =
		inputName.classList.contains('green__line') &&
		inputMail.classList.contains('green__line') &&
		inputPassword.classList.contains('green__line') &&
		inputSurname.classList.contains('green__line') &&
		inputLogin.classList.contains('green__line');

	if (isFormValid) {
		let obj = {
			'userName': `${inputName.value}`,
			'userSurname': `${inputSurname.value}`,
			'userPassword': `${inputPassword.value}`,
			'userEmail': `${inputMail.value}`,
			'userLogin': `${inputLogin.value}`,
		}

		localStorage.setItem('user', JSON.stringify(obj));
		console.log('Объект obj был записан в Local Storage.');
		// Действия после успешной отправки формы, например, отправка данных.
		console.log('Форма успешно отправлена');
		inputName.addEventListener('input', () => {
			inputName.classList.remove('red__line');
			document.querySelector('.error-name').textContent = '';
		});

		inputMail.addEventListener('input', () => {
			inputMail.classList.remove('red__line');
			document.querySelector('.error-email').textContent = '';
		});

		inputPassword.addEventListener('input', () => {
			inputPassword.classList.remove('red__line');
			document.querySelector('.error-password').textContent = '';
		});

		inputSurname.addEventListener('input', () => {
			inputSurname.classList.remove('red__line');
			document.querySelector('.error-surname').textContent = '';
		});
		inputLogin.addEventListener('input', () => {
			inputLogin.classList.remove('red__line');
			document.querySelector('.error-login').textContent = '';
		});

		console.log('форма прошла проверку');
		formOne.reset()
	}
}
formOne.addEventListener('submit', change)



//связать форму регистрации и форму логина
const popupLogin = document.querySelector('.popup__login');
const popupPassword = document.querySelector('.popup__password');
const popupBtnIn = document.querySelector('#popup__btn-in');

// console.log(popupBtnIn);
popupBtnIn.addEventListener('click', function (e) {
	e.preventDefault();

	let obj1 = {
		'login': `${popupLogin.value}`,
		'password': `${popupPassword.value}`,
	}

	localStorage.setItem('login', JSON.stringify(obj1));
	popupLogin.value = '';
	popupPassword.value = '';
	console.log('hello');
})

function userResult() {
	const registr = localStorage.getItem('user');
	if (registr) {
		const resultArray = JSON.parse(registr);
		console.log(resultArray);
		const userLogin = resultArray.userPassword;
		console.log(userLogin);
		// return resultArray;
	} else { console.log('error'); }
}
function loginResult() {
	const login = localStorage.getItem('login');
	if (login) {
		const resultLogin = JSON.parse(login);
		const loginPassword = resultLogin.password
		console.log(loginPassword);
		return resultLogin
	} else { console.log('error'); }
}


const popupClose = document.querySelector('.popup__close');
popupClose.addEventListener('click', res)


function res() {
	const registr = localStorage.getItem('user');
	if (registr) {
		const resultArray = JSON.parse(registr);
		console.log(resultArray);
		let userPassword = resultArray.userPassword;
		console.log(userPassword);
		// return resultArray;
	} else { console.log('error'); }

	const login = localStorage.getItem('login');
	if (login) {
		const resultLogin = JSON.parse(login);
		let loginPassword = resultLogin.password
		console.log(loginPassword);
		// return resultLogin
	} else { console.log('error'); }


	// if (userPassword === loginPassword) {
	// 	console.log('успех')
	// }
	// else { console.log('нет результата'); }

}


// Game of Thrones quotations
 const news = document.getElementById("thrones");

function addPost(post) {
    const newPost = document.createElement("div"); 
	newPost.classList.add("post")                   //блок с содержимым
    const title = document.createElement("h2"); //element creation
	title.textContent = `Персонаж: ${post.character.name}`; // name = title
	title.classList.add("post-title");  // claas add
	newPost.appendChild(title);

    const postText = document.createElement("p");
	postText.textContent = `Цитата: "${post.sentence}"`; 
	postText.classList.add("post-text");
	newPost.appendChild(postText); 

	
	const houseText = document.createElement("p");
	houseText.textContent = `Дом: "${post.character.house.name}"`; 
	newPost.appendChild(houseText);
	postText.classList.add("house-text");
news.appendChild(newPost);
}

function publishPost() {
        fetch("https://api.gameofthronesquotes.xyz/v1/random/5")
        .then((response) => response.json())
        .then((posts) => {
            posts.forEach((post) => {
                addPost(post);
            });
        })
        .catch((error) => {
            console.error("Ошибка", error);
        });
}


document.getElementById('game_btn').addEventListener('click', publishPost);