import { moveSlides } from './carousel.js'
import { toggleLightMode } from './ligth-mode.js'


const carousel = document.querySelector('[data-carousel="forecast__carousel"]');
const carouselGallery = document.querySelector('[data-carousel="forecast__carousel-gallery"]');
const btnLightMode = document.querySelector('[data-theme-light-mode]');
const form = document.querySelector('[data-form="header__form"]');
const cityName = document.querySelector('[data-city-name]');
const cityDegrees = document.querySelector('[data-city-deg]');
const cityDescription = document.querySelector('[data-city-description]');
const cityIconWeather = document.querySelector('[data-city-icon]');
const airQualityDescription = document.querySelector('[data-air-quality="description"]');
const cardVisibility = document.querySelector('[data-weather-visibility]')
const cardWind = document.querySelector('[data-weather-wind]');
const cardHumidity = document.querySelector('[data-weather-humidity]');
const loadingDIV = document.querySelector('[data-loading]');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

const arrAirQuality = [,'Bom', 'Justo', 'Moderado', 'Ruim', 'Muito ruin'];

carousel.addEventListener('click', moveSlides);
btnLightMode.addEventListener('change', toggleLightMode);

const handleShowLoading = () => {
  loadingDIV.classList.remove('hidden');
  main.classList.add('hidden');
  footer.classList.add('hidden');
}

const handleHiddenLoading = () => {
  loadingDIV.classList.add('hidden');
  main.classList.remove('hidden');
  footer.classList.remove('hidden')
}

const insertInfosInHTML = async inputValue => {
  handleShowLoading()

  const { weather, main, visibility, wind, name } = await getCityWeather(inputValue);
  const [{ description, icon }] = weather;
  const { list } = await getAirPolutionData(inputValue);
  const [{ main: airIndex }] = list;
  const { list: arrForecast } = await getForecastData(inputValue);

  cityName.textContent = name;
  cityDegrees.textContent = `${main.temp.toFixed(1)}º`;
  cityDescription.textContent = description;
  cityIconWeather.src = `https://openweathermap.org/img/wn/${icon}.png`;
  airQualityDescription.textContent = ` ${arrAirQuality[airIndex.aqi]}`
  cardVisibility.textContent = `${(visibility / 1000).toFixed(1)} km`;
  cardWind.textContent = `${wind.speed.toFixed(1)} km/h`;
  cardHumidity.textContent = `${main.humidity}%`;

  arrForecast
  .slice(0, 8)
  .forEach(item => {
    const { weather, main, dt_txt } = item;

    carouselGallery.innerHTML += `
      <article data-carousel-card="forecast__card" class="forecast__card">
        <p class="forecast__hour">${dt_txt.substring(11, 16)}</p>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}" />
        <p class="forecast__deg">${(main.temp).toFixed(1)}º</p>
      </article>
    `;
  })

  handleHiddenLoading();

  form.reset();
  form.focus();
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const inputValue = form.city.value.toLowerCase().trim();

  if (!inputValue.length) {
    return;
  }

  insertInfosInHTML(inputValue);
});
