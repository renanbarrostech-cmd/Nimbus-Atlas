const countryForm = document.querySelector("#country")
const dadoInput = document.querySelector("#countryInput")
const resultContainer = document.querySelector('#result');

function renderCountry(country) {
    resultContainer.innerHTML = `
  <div class="card">
    <h2 class="card__title">${country.names.common}</h2>
    <img src="${country.flag.url_png}" alt="Bandeira de ${country.names.common}">
    <div class="card__row">
  <span>Capital:</span>
  <span>${country.capitals[0].name}</span>
</div>
  </div>
`;
}

countryForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
        const response = await fetch(
            `https://api.restcountries.com/countries/v5?q=${dadoInput.value}`,
            { headers: { 'Authorization': 'Bearer rc_live_4f8b9178aa734bd180bd6107824b1cf7' } }
        )

        if (!response.ok) {
            console.log("País não encontrado!")
        }
        const data = await response.json();
        console.log(data.data.objects[0].capitals[0].coordinates.lat)
        console.log(data.data.objects[0].capitals[0].coordinates.lng)
        console.log(data.data)

        renderCountry(data.data.objects[0]);
    } catch (error) {
        console.log(error);
    }

});


