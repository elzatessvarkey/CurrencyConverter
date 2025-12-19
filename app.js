const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.min.json";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const toCurr = document.querySelector(".to select");
const fromCurr = document.querySelector(".from select");


// Function to give the list of countries and it's currency codes in the dropdowns
for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }

        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

// Function to update the flag image 
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


const updateExchangeRate = async () => {
    
    let amount = document.querySelector(".amount input"); // or ("form input") can be used
    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 0 || isNaN(amtVal)){
        amtVal = 1;
        amount.value = "1";
    }

    console.log(amtVal);

    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();

    //console.log(from, to);

    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.min.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        //console.log("data =", data);

        let rate = data[from][to];
        //console.log(rate);

        let finalAmount = amtVal * rate;
        //console.log(finalAmount);
        
        document.querySelector(".msg").innerText =
            `${amtVal} ${from.toUpperCase()} = ${finalAmount.toFixed(2)} ${to.toUpperCase()}`;

    } catch (error) {
        console.error("Error fetching exchange rates:", error);
    }
}

// Fucntion to trigger the conversion upon clicking the button

btn.addEventListener("click", (evt) => {
    evt.preventDefault(); //prevents default behaviour of refreshing the page and other features upon clicking a button
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
})