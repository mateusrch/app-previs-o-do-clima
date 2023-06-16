const apiKey = '309955764822acf6b70c8a23cd9216da';
const baseUrl = 'https://api.openweathermap.org/';

const getCityUrl = cityName => `${baseUrl}data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pt`;
const getCoordsUrl = cityName => `${baseUrl}geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
const getAirQualityUrl = (lat, lon) =>`${baseUrl}data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
const getForecastUrl = (lat, lon) => `${baseUrl}data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt`;

const errors = statusCode => ({
  401: 'Essa aplicação ainda não está autorizada a acessar o conteúdo, tente mais tarde.',
  404: 'Essa cidade não existe em nosso banco de dados, verifique se você digitou o nome da cidade correto.',
  500:'Erro no servidor, tente mais tarde.',
  502:'Erro no servidor, tente mais tarde.',
  503:'Erro no servidor, tente mais tarde.',
  504:'Erro no servidor, tente mais tarde.',
}[statusCode])

const fetchData = async url => {
  try {
    const reponse = await fetch(url);

    if (reponse.status !== 200) {
      alert(errors(reponse.status));
      location.reload();
    }

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
