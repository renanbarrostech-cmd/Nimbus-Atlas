const countryForm = document.querySelector("#country");
const dadoInput = document.querySelector("#countryInput");
const resultContainer = document.querySelector("#result");
const weatherCodes = {
  0: "Céu limpo",
  1: "Poucas nuvens",
  2: "Parcialmente nublado",
  3: "Nublado",
  61: "Chuva fraca",
  63: "Chuva moderada",
  95: "Tempestade",
};

function renderCountry(country) {
  resultContainer.innerHTML = `
  <div class="card">
    <h2 class="card__title">${country.names.common}</h2>
    <img src="${country.flag.url_png}" alt="Bandeira de ${country.names.common}">
    <div class="card__row">
  <span>Capital:</span>
  <span>${country.capitals[0].name}</span>
</div>
<button id="weatherBtn">Ver clima</button>
  </div>
`;

  const weatherBtn = document.querySelector("#weatherBtn");
  weatherBtn.addEventListener("click", async function () {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${country.capitals[0].coordinates.lat}&longitude=${country.capitals[0].coordinates.lng}&current=temperature_2m,weathercode`,
      );
      if (!response.ok) {
        console.log("Não foi possível carregar o clima");
      }
      const data = await response.json();
      const description =
        weatherCodes[data.current.weathercode] || "Condição desconhecida";
      console.log(data);

      weatherBtn.insertAdjacentHTML(
        "afterend",
        `
  <div class="card__row">
    <span>Clima:</span>
    <span>${data.current.temperature_2m}°C - ${description}</span>
  </div>
`,
      );
    } catch (error) {
      console.log(error);
    }
  });
}

countryForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  try {
    const response = await fetch(
      `https://api.restcountries.com/countries/v5?q=${dadoInput.value}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      console.log("País não encontrado!");
    }
    const data = await response.json();

    if (data.data.objects.length === 0) {
      resultContainer.innerHTML = `
  <div class="error-message">
    País não encontrado! Traduza para o inglês.
  </div>
`;
      console.log("País não encontrado!");
      return; // interrompe a função aqui, não deixa continuar
    }

    renderCountry(data.data.objects[0]);
  } catch (error) {
    console.log(error);
  }
});
