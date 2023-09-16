import { subtotal, display,calcPostageFromPurchase} from "./util.js"

const priceElement = document.getElementById("product");
const numberElememt = document.getElementById("number");
const addButton = document.getElementById("add");
const sumButton = document.getElementById("sum");

const products = [
    {
        id: 1,
        name: "オリジナルブレンド200g",
        price: "500"
    },
    {
        id: 2,
        name: "オリジナルブレンド500g",
        price: "900"
    },
    {
        id: 3,
        name: "スペシャルブレンド200g",
        price: "700"
    },
    {
        id: 4,
        name: "スペシャルブレンド500g",
        price: "1200"
    },
]

addButton.addEventListener('click', e => add());
sumButton.addEventListener('click', e => calc());

let purchases=[];
function add() {
    const pickId = parseInt(priceElement.value);
    const product = products.find(item => item.id == pickId);
    const number = numberElememt.value;
    
    let purchase = {
      product: product,
      number: parseInt(number),
    };
  
    const newPurchase = purchases.findIndex((item) => item.id === purchase.product.id) // --1
    if(purchases.length < 1 || newPurchase === -1) {
      purchases.push(purchase)
    } else {
      purchases[newPurchase].number += purchase.number
    }
  
    window.alert(`${display(purchases)}\n小計${subtotal(purchases)}円`);
    priceElement.value = "";
    numberElememt.value = "";
}

function display() {
    return purchases.map(purchase => {
        return `${purchase.product.name} ${purchase.product.price}円：${purchase.number}点\n`;
    }).join("")
};

function subtotal(){
    return purchases.reduce((prev, purchase)=> {
        return prev + purchase.product.price * purchase.number
    },0);
}

function calc() {
    const sum = subtotal(purchases);
    const postage = calcPostageFromPurchase(sum);
    window.alert(`小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`)
    purchases = [];
    priceElement.value="";
    numberElememt.value="";
}
function calcPostageFromPurchase(sum){
    if(sum== 0 || sum>=3000){
        return 0;
    }else if (sum < 2000){
        return 500; 
    }else {
        return 250;
    }
}
