const temp = document.getElementById("temp");
const dateElem = document.getElementById("date");
const windSpeed = document.getElementById("windspeed");
const humidity = document.getElementById("humidity");
const text = document.getElementById("text");
const weeklyforecast = document.getElementById("weeklyforecast");
const place = document.getElementById("place");
const hourlyforecast = document.getElementById("hourlyforecast");
const btn = document.getElementById("submit");
const form = document.forms.country_form;

function main(data) {
    data.then((res) => {
        today(res.current, res.location);
        date(res.forecast.forecastday[0].date);
        weekly(res.forecast.forecastday);
        hourly(res.forecast.forecastday[0].hour, res.location.localtime);
    });
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    const query = new FormData(form).get("country");
    main(retrieve(query));
});

function date(date) {
    dateElem.textContent = date;
}

function today(weather, location) {
    place.textContent = location.name
    text.textContent = weather.condition.text
    temp.textContent = weather.temp_c
    windSpeed.textContent = weather.wind_mph
    humidity.textContent = weather.humidity
}

function hourly(hours, time) {
    time = new Date(time).getHours()
    let need = hours.slice(time, time + 9)
    if (need.length < 9) {
        need.push(...hours.slice(0, 9 - need.length))
    }
    need.forEach((hr) => {
        hourlyforecast.innerHTML += `
            <article>
                <h3>${new Date(hr.time).getHours()}:00</h3>
                <h1>${hr.temp_c}&deg;</h1>
                <p>${hr.condition.text}</p>
            </article>
        `;
    })
}

function weekly(days) {
    const week = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
    days = days.slice(1)

    days.forEach((day) => {
        weeklyforecast.innerHtml += `
            <article>
                <h3>${week[new Date(day.date).getDay()]}</h3>
                <h1>${day.day.avgtemp_c}&deg;</h1>
                <p>${day.day.condition.text}</p>
            </article>
        `;
    })
}

async function retrieve (place) {
        let data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=e0a42835c0374abcb4a141107243001&q=${place}&days=7&aqi=no&alerts=no`);
        data = await data.json();
        return data;
    };

main(retrieve("Paris"));