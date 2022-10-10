const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');
const submitButton = document.querySelector('button');

const throttle = require('lodash.throttle');

form.addEventListener('input', throttle(savedData, 500));

function savedData() {
    const data = {
     email: input.value,
     message: textarea.value,
    };

    localStorage.setItem(`feedback-form-state`, JSON.stringify(data));  
}   

if (localStorage.length !== 0) {
    input.value = JSON.parse(localStorage.getItem(`feedback-form-state`)).email;
    textarea.value = JSON.parse(localStorage.getItem(`feedback-form-state`)).message;
}

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const {
        elements: { email, message }
      } = event.currentTarget;

      if (email.value === "" || message.value === "") {
        return alert("Please fill in all the fields!");
      }
      
      const dataSent = { email: email.value, message: message.value };
      console.log(dataSent);
      
      event.currentTarget.reset();
      localStorage.removeItem('feedback-form-state');
    }

   