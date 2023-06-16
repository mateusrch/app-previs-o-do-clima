const apiKey = '309955764822acf6b70c8a23cd9216da';
const baseUrl = 'https://api.openweathermap.org/';

const getCityUrl = cityName => `${baseUrl}data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pt`;
const getCoordsUrl = cityName => `${baseUrl}geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
const getAirQualityUrl = (lat, lon) =>`${baseUrl}data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
const getForecastUrl = (lat, lon) => `${baseUrl}data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt`;

const fetchData = async url => {
  try {
    const reponse = await fetch(url);

    if (!reponse.ok) {
      throw Error('Não foi possível obter os dados');
    }

    return reponse.json();
  } catch (error) {
    console.log(error);
  }
}

const getCityWeather = async cityName => fetchData(getCityUrl(cityName))

const getAirPolutionData = async cityName => {
  const [{ lat, lon }] = await fetchData(getCoordsUrl(cityName));

  return fetchData(getAirQualityUrl(lat, lon));
};

const getForecastData = async cityName => {
  const [{ lat, lon }] = await fetchData(getCoordsUrl(cityName));

  return fetchData(getForecastUrl(lat, lon));
};
