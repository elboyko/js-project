
const formOne = document.querySelector('.registration__form');
formOne.addEventListener('submit', change)
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


   let isFormValid =
      inputName.classList.contains('green__line') &&
      inputMail.classList.contains('green__line') &&
      inputPassword.classList.contains('green__line') &&
      inputSurname.classList.contains('green__line');

   if (isFormValid) {
      let obj = {
         'inputName': `${inputName.value}`,
         'inputSurname': `${inputSurname.value}`,
         'inputPassword': `${inputPassword.value}`,
         'inputMail': `${inputMail.value}`,
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
      console.log('форма прошла проверку');
      formOne.reset()
   }
}

