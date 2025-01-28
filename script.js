const items = [
    {
        title: 'Хайлайтер',
        description: "Сухой хайлайтер для лица",
        price: 19,
        img: "./images/img_1.jpg",
        rating: 4.3,
    },
    {
        title: 'Румяна',
        description: "Кремовые румяна для лица",
        price: 17,
        img: "./images/img_2.jpg",
        rating: 5,
    },
    {
        title: 'Тушь',
        description: "Тушь для ресниц с эффектом удлинения",
        price: 22,
        img: "./images/img_3.jpg",
        rating: 4.7,
    },
    {
        title: 'Палетка теней',
        description: "Палетка теней для век",
        price: 28,
        img: "./images/img_4.jpg",
        rating: 4.3,
    },
    {
        title: 'Скульптор',
        description: "Кремовый скульптор для контуринга лица",
        price: 19,
        img: "./images/img_5.jpg",
        rating: 5,
    },
    {
        title: 'Пудра',
        description: "Матирующая пудра для лица",
        price: 25,
        img: "./images/img_6.jpg",
        rating: 4.4,
    },
    {
        title: 'Тональный крем',
        description: "Тональный крем для лица",
        price: 35,
        img: "./images/img_7.jpeg",
        rating: 5,
    },
    {
        title: 'Кисть для тона',
        description: "Кисть для тонального крема",
        price: 19,
        img: "./images/img_8.jpg",
        rating: 4.5,
    },
    {
        title: 'Фиксатор макияжа',
        description: "Зафиксирует макияж на весь день",
        price: 26,
        img: "./images/img_9.jpg",
        rating: 4,
    },
    {
        title: 'Гель для бровей',
        description: "Гель для бровей прозрачный",
        price: 18,
        img: "./images/img_10.jpg",
        rating: 4.8,
    },
    {
        title: 'Карандаш для бровей',
        description: "Карандаш для бровей в коричневом оттенке",
        price: 14,
        img: "./images/img_11.jpg",
        rating: 3.9,
    },
    {
        title: 'Карандаш для губ',
        description: "Автоматический карандаш для губ",
        price: 15,
        img: "./images/img_12.jpg",
        rating: 4.8,
    },
];

const cardTemplate = document.querySelector('#item-template');
const shopItemsContainer = document.querySelector('.shop-items');
const button = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');
const nothingFound = document.querySelector('.nothing-found');

function makeCard(item) {
    const cardItem = cardTemplate.content.cloneNode(true);

    cardItem.querySelector('.shop-item__image').src = item.img;
    cardItem.querySelector('.shop-item__title').textContent = item.title;
    cardItem.querySelector('.shop-item__text').textContent = item.description;
    cardItem.querySelector('.shop-item__price').textContent = `${item.price}BYN`;

    const ratingContainer = cardItem.querySelector(".rating");
    for (let i = 0; i < item.rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa-solid", "fa-star");
        ratingContainer.append(star);
    }

    return cardItem;
};

let currentState = [...items];

function renderItems(array) {
    shopItemsContainer.innerHTML = "";
    nothingFound.innerHTML = "";

    array.forEach(function (item) {
        shopItemsContainer.append(makeCard(item));
    });

    if (!array.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
};

renderItems(currentState);

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }

    return 0;
};

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

const sortControl = document.querySelector('#sort');

sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive": {
            currentState.sort((a, b) => b.price - a.price);
            break;
        }
        case "cheap": {
            currentState.sort((a, b) => a.price - b.price);
            break;
        }
        case "rating": {
            currentState.sort((a, b) => b.rating - a.rating);
            break;
        }
        case "alphabet": {
            currentState.sort((a, b) => sortByAlphabet(a, b));
            break;
        }
    }
    renderItems(currentState);
});

function searchItems() {

    const searchText = searchInput.value.trim().toLowerCase();

    currentState = items.filter(item => {
        return item.title.toLowerCase().includes(searchText);
    })

    currentState.sort((a, b) => sortByAlphabet(a, b));

    sortControl.selectedIndex = 0;

    renderItems(currentState);
};

searchInput.addEventListener("search", searchItems);

button.addEventListener("click", searchItems);
