const dropList = document.querySelectorAll(".drop-list select")
let flag = document.querySelectorAll(".CFlag")
let fromCurrency = document.querySelector(".fromCurrency")
let toCurrency = document.querySelector(".toCurrency")
let btn = document.querySelector('.btn')
let fromPair = document.querySelector('.fromPair')
let toPair = document.querySelector('.toPair')
let AK = '13d8610f7ab4ed324013525d'


for(let i = 0; i < dropList.length; i++){
    for(currency_code in country_code){
        let optionTag = `<option value="${currency_code}">${currency_code} </option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
        }
        dropList[i].addEventListener('change', e =>{
        loadFlag(e.target);
        });    
}

fromCurrency.addEventListener("click",function(){
    fromCurrency.value ="";
    toCurrency.value = "";
});

fromPair.value = "NGN";
toPair.value = "USD";

function loadFlag(element){
    for (flag in country_code){
        if(flag == element.value){
            let imgName = element.parentElement.querySelector(".CFlag");
            const imgUrl = `https://flagsapi.com/${country_code[flag]}/flat/64.png`
            imgName.src= imgUrl;
        }
    }
}

const exchangeIcon = document.querySelector(".drop-list .icon")
exchangeIcon.addEventListener('click', ()=> {
    let tempCode = fromPair.value
    fromPair.value = toPair.value;
    toPair.value = tempCode;
    getConversion();
});

btn.addEventListener('click', (e)=> {
    e.preventDefault()
    getConversion()
})
 
const getConversion = async ()=> {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${AK}/pair/${fromPair.value}/${toPair.value}/${fromCurrency.value}`)
    const data = await res.json()
    toCurrency.value = data.conversion_result + " " + toPair.value
}
