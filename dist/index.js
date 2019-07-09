const URL = 'http://localhost:3000';

function initialize() {
  const buttonEl = document.querySelector('button.submit');
  buttonEl.addEventListener('click', submit);
}

function triggerNetworkRequest(method = 'GET', path, payload) {
  const request = new XMLHttpRequest();
  request.addEventListener('load', () => {
      const responseBody = request.response;
      const responseCode = request.status;
      console.log(responseCode, JSON.parse(responseBody));
  });
  request.addEventListener('error', (body) => {
      console.warn('error', body);
  });
  request.open(method, URL + path);
  request.setRequestHeader('content-type', 'application/json');
  request.send(JSON.stringify(payload));
}

function submit() {
  const payload = {
      age: Number(document.querySelector('input[formcontrolname="age"]').value),
      gender: document.querySelector('select[formcontrolname="gender"]').value,
  };
  triggerNetworkRequest('POST', '/survey', payload);
}

initialize();
