const dado = document.querySelector("#country")
let dadoInput = document.querySelector("#countryInput")

dado.addEventListener('submit', function (event) {
  console.log(dadoInput.value)

  event.preventDefault();
});