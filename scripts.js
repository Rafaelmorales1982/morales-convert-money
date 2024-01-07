const button = document.getElementById("convert-button"); //linha html 58
const select = document.getElementById("currency-select"); // linha html 46





//função principal
const convertValues = async () => {
  const inputReal = document.getElementById("input-real").value; //linha html 55
  const realValueText = document.getElementById("real-value-text"); //linha html 64
  const currencyValueText = document.getElementById("currency-value-text"); //linha html 76

//Biblioteca Axios nas próximas aulas

//utilizar fetch() serve para acessar os dados da API (consumindo uma api)

  const data = await fetch( "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then( response => response.json());
  console.log(data)
  const dolar = data.USDBRL.high;
  const euro = data.EURBRL.high;
  const bitcoin = data.BTCBRL.high;


//Mostra a cotação online no Header da página
const cotationEuro = document.getElementById("euro-text");
cotationEuro.textContent = `1 EUR = ${euro} BRL`;

const cotationDolar = document.getElementById("dolar-text");
cotationDolar.textContent = `1 USD = ${dolar} BRL`;

//bitcoins
  const cotationBitcoins = document.getElementById("bitcoin-text");
  cotationBitcoins.textContent = `1 BTC = ${bitcoin} BRL`;

  // realValueText.innerHTML = inputReal;
  //formatando valores da moeda brasileira
  realValueText.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(inputReal);

  //currencyValueText.innerHTML = inputReal / dolar;
  //formatando valores da moeda americana

  if (select.value === "US$ Dólar americano") {
    currencyValueText.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(inputReal / dolar);
  }
  //currencyValueText.innerHTML = inputReal / euro;
  //formatando valores da moeda americana

  if (select.value === "€ Euro") {
    currencyValueText.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(inputReal / euro);
  }

  if (select.value === "Bitcoin") {
    currencyValueText.innerHTML = `BTC ${inputReal / bitcoin}`;
  }
};

//função responsável pela troca da moeda
const changeCurrence = () => {
  const currencyName = document.getElementById("currency-name"); //linha html 75
  const currencyImg = document.getElementById("currency-img"); //linha html 71

  //se for selecionado € Euro ele muda o texto para Euro
  if (select.value === "€ Euro") {
    currencyName.innerHTML = "Euro";
    currencyImg.src = "./assets/img/euro.png";
  }

  if (select.value === "US$ Dólar americano") {
    currencyName.innerHTML = "Dólar americano";
    currencyImg.src = "./assets/img/eua.png";
  }

  if (select.value === "Bitcoin") {
    currencyName.innerHTML = "Bitcoin";
    currencyImg.src = "./assets/img/bitcoin.png";
  }

  convertValues();
};

//clicando chama função
button.addEventListener("click", convertValues);
//ao trocar de moeda é chamado a função changeCurrence
select.addEventListener("change", changeCurrence);


convertValues();//tenho que chamar a função para o escopo global para poder mostrar a cotação no topo da página
