console.log("CLient side js file is loaded");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';
    const location = search.value; 

    fetch('https://my-weather-service.onrender.com/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then(data => {
            if(data.error) {
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.data;

            }
        })
    })

    search.value = '';
})