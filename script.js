const nextButton = document.getElementById('generate-button');
const button = document.getElementById('button');
const jokeContainer = document.getElementById('joke-container');

nextButton.addEventListener('click', generateMeme);

const message = new SpeechSynthesisUtterance();

function setMessage(text, volume) {
    message.text = text;
    message.rate = 0.9;
    message.volume = volume;
}


function extractJoke(data) {
    const type = data.type;
    const setup = data.setup;
    const punchline = data.punchline;

    setMessage(setup, 0.65);
    speechSynthesis.speak(message);
    setMessage(punchline, 0.8);
    speechSynthesis.speak(message);

    jokeContainer.innerHTML = `<div class="joke-setup">
                                    <h3>${setup}</h3>
                                </div>
                                <hr>
                                <div class="joke-punchline">
                                        <h1>${punchline + "&#129315;"}</h1>
                                </div>
                                <div class="joke-type">
                                        <strong>Genre: ${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
                                </div>
                            `;
    button.innerHTML = "Tell Me Another Joke";
    const line = document.getElementsByClassName("hr")[0];
    line.innerHTML = "<hr>"
}

function generateMeme() {
    const urlList = ['https://official-joke-api.appspot.com/jokes/random', 'https://official-joke-api.appspot.com/random_joke', 'https://official-joke-api.appspot.com/jokes/programming/random'];
    const randomIdx = Math.floor(Math.random() * urlList.length);
    // console.log(randomIdx);
    const url = urlList[randomIdx]; 
    fetch(url).then(res => 
            res.json().then(json => {
                json.length !== undefined ? extractJoke(json[0]): extractJoke(json); 
            })
    );
}


