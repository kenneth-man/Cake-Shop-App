'use strict';

const allBtn = document.querySelector('#btn-all');
const fruitTypeBtn = document.querySelector('#btn-fruit');
const noFruitTypeBtn = document.querySelector('#btn-noFruit');

const searchBtn = document.querySelector('#btn-search');
const input = document.querySelector('#input');

const berryBox = document.querySelector('#berry');
const chocoBox = document.querySelector('#chocolate');
const cupBox = document.querySelector('#cup');
const fruitBox = document.querySelector('#fruit');
const pumpBox = document.querySelector('#pumpkin');
const towerBox = document.querySelector('#tower');

const popupWhole = document.querySelector('#popup-whole');
const popupLeft = document.querySelector('#popup-left');
const popupRight = document.querySelector('#popup-right');
const popupImage = document.querySelector('#popup-image');
const popupExit = document.querySelector('#popup-exit');

const total = document.querySelector('#total');
let totalDisplayed = 0;
let filteredArr = [];
let filteredArrImgs = [];
let counter = 0;

const berryCake = {
    domObj: berryBox,
    stringName: 'Berry Cake',
    fruit: true,
    price: 5,
    source: './res/berry-cake.jpg'
}

const chocolateCake = {
    domObj: chocoBox,
    stringName: 'Chocolate Cake',
    fruit: false,
    price: 7,
    source: './res/chocolate-cake.jpg'
}

const cupCake = {
    domObj: cupBox,
    stringName: 'Cup Cake',
    fruit: true,
    price: 2,
    source: './res/cup-cake.jpg'
}

const fruitCake = {
    domObj: fruitBox,
    stringName: 'Fruit Cake',
    fruit: true,
    price: 6,
    source: './res/fruit-cake.jpg'
}

const pumpkinCake = {
    domObj: pumpBox,
    stringName: 'Pumpkin Cake',
    fruit: true,
    price: 10,
    source: './res/pumpkin-cake.jpg'
}

const towerCake = {
    domObj: towerBox,
    stringName: 'Tower Cake',
    fruit: false,
    price: 20,
    source: './res/tower-cake.jpg'
}

const items = [berryCake, chocolateCake, cupCake, fruitCake, pumpkinCake, towerCake];

/*for refactoring*/
const reset = () => {
    /*reset array on subsequent clicks */
    filteredArr = [];
    filteredArrImgs = [];
    counter = 0;

    items.map(curr => curr.domObj.classList.add('hidden'));
};

const updateTotal = (arr) => {
    total.textContent = `${arr.reduce((acc, curr) => acc + curr, 0)}`;
};

const addItemsEventListener = () => {
    items.map(curr => curr.domObj.addEventListener('click', () => {
        popupWhole.classList.remove('popup__hidden');
        popupImage.src = curr.source;
    }));
};
addItemsEventListener();



/*ALL button*/
allBtn.addEventListener('click', () => {
    reset();

    items.map(curr => {
        curr.domObj.classList.remove('hidden');
        filteredArr.push(curr.price);
        filteredArrImgs.push(curr.source);
    });

    updateTotal(filteredArr);
});

/*FRUIT button*/
fruitTypeBtn.addEventListener('click', () => {
    reset();

    items.filter(curr => curr.fruit === true).map(curr => {
        curr.domObj.classList.remove('hidden');
        filteredArr.push(curr.price);
        filteredArrImgs.push(curr.source);
    });
    
    updateTotal(filteredArr);
});

/*NO FRUIT button*/
noFruitTypeBtn.addEventListener('click', () => {
    reset();

    items.filter(curr => curr.fruit === false).map(curr => {
        curr.domObj.classList.remove('hidden');
        filteredArr.push(curr.price);
        filteredArrImgs.push(curr.source);
    });

    updateTotal(filteredArr);
});

/*SEARCH button*/
searchBtn.addEventListener('click', (e) => {
    /*prevent page refresh*/
    e.preventDefault();

    /*remove focus out of input bar*/
    input.blur();

    reset();

    items.filter(curr => curr.stringName === input.value).map(curr => {
        curr.domObj.classList.remove('hidden');
        total.textContent = curr.price;
    });

    /*clear input bar*/
    input.value = '';
});

/*POPUP LEFT button*/
popupLeft.addEventListener('click', () => {
    if(filteredArrImgs.length > 1){
        counter === 0 ? counter = filteredArrImgs.length - 1 : counter -=1;
        popupImage.src = filteredArrImgs[counter];
    }
});

/*POPUP RIGHT button*/
popupRight.addEventListener('click', () => {
    if(filteredArrImgs.length > 1){
        counter === filteredArrImgs.length - 1 ? counter =  0 : counter +=1;
        popupImage.src = filteredArrImgs[counter];
    }
});

/*POPUP EXIT button*/
popupExit.addEventListener('click', () => {
    popupWhole.classList.add('popup__hidden');
});