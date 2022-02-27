import { Notify } from 'notiflix/build/notiflix-notify-aio';

function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v3.1/name';
    const parameter = '?fields=name,capital,population,flags,languages';
    return fetch(`${BASE_URL}/${name}${parameter}`);
    
}

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// from input listener
function workOnRequest() {

    const inputValue = input.value.trim();
    if (input.value != "") {
        fetchCountries(inputValue)
            .then((response) => {
                console.log(response)
                if (response.ok) return response.json();
                return Promise.reject(response.status);
            })
            .then(showResult)
            .catch(onFetchError)
    } else {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
    }
        
}

function showResult(country) {
    if (country.length > 10) {
        // notification
        Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (country.length === 1) {
        // only one country
        const countries = country.map(({name, flags, capital, population, languages}) => {
            countryList.innerHTML = `
                <li style="list-style-type:none">
                    <p style="display:flex;"><img style='width:30px; height:30px' src='${flags.svg}' /><span style="justify-self: center;margin-left:10px;font-size:1.5em;">${name.common}</span></p>
                </li>
            `
            return `
                <p><b>Capital</b>: ${capital}</p>
                <p><b>Population</b>: ${population}</p>
                <p><b>Languages</b>: ${Object.values(languages)}</p>
            `
        }).join('');
        // const img = document.createElement()
        countryInfo.innerHTML = countries;
    } else {

        const countries = country.map(({name, flags}) => {

            return `
                <li style="list-style-type:none">
                    <p style="display:flex;"><img style='width:30px; height:30px' src='${flags.svg}' /><span style="justify-self: center;margin-left:10px;">${name.common}</span></p>
                </li>
            `
        }).join('');
        // const img = document.createElement()
        countryList.innerHTML = countries;
        countryInfo.innerHTML = '';
    }
}
function onFetchError() {
    Notify.failure('Oops, there is no country with that name');
}

export default { input, workOnRequest };
