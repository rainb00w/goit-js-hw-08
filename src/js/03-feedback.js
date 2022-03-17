import throttle from 'lodash.throttle';

const formData = {};

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onTextAreaInput, 500));
form.addEventListener('submit', sendAndClear);


fillForm();

function onTextAreaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  console.log(formData);
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function fillForm() {
  let savedMessage = localStorage.getItem('feedback-form-state');

  savedMessage = savedMessage ? JSON.parse(savedMessage) : {};

  Object.entries(savedMessage).forEach(([name, value]) => (form.elements[name].value = value),
  );
}

function sendAndClear(evt) {
    evt.preventDefault();

    let savedMessage = localStorage.getItem('feedback-form-state');
    savedMessage = savedMessage ? JSON.parse(savedMessage) : {};
    console.log(savedMessage);

    localStorage.removeItem('feedback-form-state');
    evt.currentTarget.reset();
}

