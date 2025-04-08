let formData = {
  email: '',
  message: '',
};

const feedbackFormEl = document.querySelector('.feedback-form');

(() => {
  try {
    const storageData = JSON.parse(localStorage.getItem('feedback-form-state'));

    if (storageData === null) {
      return;
    }

    formData = storageData;
    console.log(formData);

    for (const key in storageData) {
      feedbackFormEl.elements[key].value = storageData[key];
    }
  } catch (error) {
    console.log(error);
  }
})();

const onFeedbackFormElInput = event => {
  const { value, name } = event.target;

  formData[name] = value.trim();

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFeedbackFormElSubmit = event => {
  event.preventDefault();

  const isEmptyField = Object.values(formData).some(val => val === '');

  if (isEmptyField) {
    alert('Fill please all fields');
  } else {
    console.log(formData);

    feedbackFormEl.reset();
    localStorage.removeItem('feedback-form-state');
  }
};

feedbackFormEl.addEventListener('input', onFeedbackFormElInput);
feedbackFormEl.addEventListener('submit', onFeedbackFormElSubmit);
