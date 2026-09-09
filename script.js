const countryForm = document.querySelector("#country")
const dadoInput = document.querySelector("#countryInput")

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
        console.log(data.data.objects[0].capitals[0].name)
    } catch (error) {
        console.log(error);
    }

});
