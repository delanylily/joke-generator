document.querySelector('.get-jokes').addEventListener('click', getJokes);
const heading = document.querySelector('.heading');
let message;
let api;

function getJokes(e) {
  const jokeText = document.querySelector('input[type="text"]').value;
  api = `https://api.chucknorris.io/jokes/search?query=${jokeText}`;

  if (jokeText !== '') {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', api, true);
    xhr.onload = function () {
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);
        let output = '';
        response.result.forEach(joke => {
          output += `<li>${joke.value}</li>`
        });
        document.querySelector('.jokes').innerHTML = output;
      }
    }

    xhr.send();
  } else {
    document.getElementById('search').style.border = '1px solid red';
    message = document.createElement('p');
    message.textContent = 'Please enter a valid search'
    message.classList.add('message');
    heading.append(message);
    setTimeout(clearError, 3000)
  }

  e.preventDefault();
}

function clearError() {
  document.querySelector('.message').remove()
  document.getElementById('search').style.removeProperty('border');
}