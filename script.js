const nextButtonContainer = document.getElementById('generate-button');
const nextButton = document.getElementById('jokeButton');
const jokeContainer = document.getElementById('joke-container');

const message = new SpeechSynthesisUtterance();

function setMessage(text, volume) {
    message.text = text;
    message.rate = 0.9;
    message.volume = volume;
}

function speak(joke){
    setMessage(joke, 0.65);
    speechSynthesis.speak(message);
}

(async function starterJoke() {
    var url = `https://icanhazdadjoke.com/`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    });
    
    const json = await response.json();
    const joke = json.joke;
    jokeContainer.innerHTML = joke;
    speak(jokeContainer.textContent);
    nextButtonContainer.innerHTML = `<button id="jokeButton" class="btn btn-success">
                                            Tell Me Another One!
                                        </button>`;
})();


async function fetchJoke() {
    var url = `https://icanhazdadjoke.com/`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    });
    
    const json = await response.json();
    const joke = json.joke;
    jokeContainer.innerHTML = joke;
    speak(joke);
}

document.addEventListener('click', function(e) {
    if(e.target && e.target.id == "jokeButton"){
        fetchJoke();
    }
});

