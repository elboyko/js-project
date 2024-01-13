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




}

// getResponse()



document.querySelector('.search__btn').addEventListener('click', getResponse)

