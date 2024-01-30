const time = document.getElementById("time");
const date = document.getElementById("date");

const temp = document.getElementById("temp");
const windSpeed = document.getElementById("windspeed");
const humidity = document.getElementById("humidity");
const text = document.getElementById("text");
const weeklyForcast = document.getElementById("weeklyforcast");
const place = document.getElementById("place");
const hourlyForcast = document.getElementById("hourlyforcast");
const form = document.forms.country_form;

function main() {
    dateTime();
}

function dateTime() {
    const fullDate = new Date();
    date.textContent = fullDate.toDateString();
    time.textContent = fullDate.toLocaleTimeString()
}

function hourly() {}

function weekly() {}

function Storage() {
    const get = () => {}
    const post = () => {}
    const update = () => {}
}

main();
setInterval(dateTime, 50000);
