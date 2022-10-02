import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    ulEl: document.querySelector('.country-list'),
    divEl:document.querySelector('.country-info')
};

refs.inputEl.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY))

function onInput() {

    const request = `https://restcountries.com/v3.1/name/${refs.inputEl.value.trim()}?fields=name,capital,population,flags,languages`;

    fetchCountries(request).then(renderMarcup)
};

function renderMarcup(countries) {
    if (countries.length > 10) {
        refs.ulEl.innerHTML = "";
        refs.divEl.innerHTML = "";
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (countries.length <= 10 && countries.length >= 2) {

        refs.ulEl.innerHTML = aa(countries);
        refs.divEl.innerHTML = "";
    } else if (countries.length === 1) {
        refs.divEl.innerHTML = b(countries);
        refs.ulEl.innerHTML = "";
    } else if (refs.inputEl.value === "") {
        refs.ulEl.innerHTML = "";
        refs.divEl.innerHTML = "";
    } else {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    } 
};

function aa(countries) {
 
    return [...countries].map(({name,flags}  ) => {
        
        return `
        <li class="country-list_item">
        <img class="country-list_image"  src="${flags.svg}">
        <p class="country-list_name">${name.official}</p>
        </li>`
    });
}

function b(countries) {
    
    return [...countries].map(({ name, flags, capital, population, languages }) => {
        
        
        if (Object.keys(languages).length > 1) {
            languages = Object.values(languages).map(language => language).join(", ");
            console.log(languages)
        } else {
            languages = Object.values(languages).map(language => language)
        }

        return `
        <div class="country-list_item">
        <img class="country-list_image"  src="${flags.svg}">
        <p class="country-list_name">${name.official}</p>
        </div>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${languages}</p>
        `
    });
}