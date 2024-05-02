// import { getCard, cards } from "./cartes";

const btnTakeCart = document.getElementById('act1');
const cardsPlayer = document.getElementById('cardsPlayer1');
let cardsPlayer1 = [];
const cards = [
    // piques noirs
    {
        image: './public/images/cartes/card_spades_02.png',
        value: 2,
        color: 'noir',
        categorie: 'pique'
    },
    {
        image: './public/images/cartes/card_spades_03.png',
        value: 3,
        color: 'noir',
        categorie: 'pique'
    },
    {
        image: './public/images/cartes/card_spades_04.png',
        value: 4,
        color: 'noir',
        categorie: 'pique'
    },
    {
        image: './public/images/cartes/card_spades_05.png',
        value: 5,
        color: 'noir',
        categorie: 'pique'
    },
    {
        image: './public/images/cartes/card_spades_06.png',
        value: 6,
        color: 'noir',
        categorie: 'pique'
    },
    {
        image: './public/images/cartes/card_spades_07.png',
        value: 7,
        color: 'noir',
        categorie: 'pique'
    },
    {
        image: './public/images/cartes/card_spades_08.png',
        value: 8,
        color: 'noir',
        categorie: 'pique'
    },
    {
        image: './public/images/cartes/card_spades_09.png',
        value: 9,
        color: 'noir',
        categorie: 'pique'
    },
    {
        image: './public/images/cartes/card_spades_10.png',
        value: 10,
        color: 'noir',
        categorie: 'pique'
    },
    {
        // J
        image: './public/images/cartes/card_spades_J.png',
        value: 10,
        color: 'noir',
        categorie: 'pique'
    },
    {
        // Q
        image: './public/images/cartes/card_spades_Q.png',
        value: 10,
        color: 'noir',
        categorie: 'pique'
    },
    {
        // K
        image: './public/images/cartes/card_spades_K.png',
        value: 10,
        color: 'noir',
        categorie: 'pique'
    },
    {
        // A
        image: './public/images/cartes/card_spades_A.png',
        value: [1, 10],
        color: 'noir',
        categorie: 'pique'
    },
    // careau roujes
    {
        image: './public/images/cartes/card_diamonds_02.png',
        value: 2,
        color: 'rouge',
        categorie: 'careau'
    },
    {
        image: './public/images/cartes/card_diamonds_03.png',
        value: 3,
        color: 'rouge',
        categorie: 'careau'
    },
    {
        image: './public/images/cartes/card_diamonds_04.png',
        value: 4,
        color: 'rouge',
        categorie: 'careau'
    },
    {
        image: './public/images/cartes/card_diamonds_05.png',
        value: 5,
        color: 'rouge',
        categorie: 'careau'
    },
    {
        image: './public/images/cartes/card_diamonds_06.png',
        value: 6,
        color: 'rouge',
        categorie: 'careau'
    },
    {
        image: './public/images/cartes/card_diamonds_07.png',
        value: 7,
        color: 'rouge',
        categorie: 'careau'
    },
    {
        image: './public/images/cartes/card_diamonds_08.png',
        value: 8,
        color: 'rouge',
        categorie: 'careau'
    },
    {
        image: './public/images/cartes/card_diamonds_09.png',
        value: 9,
        color: 'rouge',
        categorie: 'careau'
    },
    {
        image: './public/images/cartes/card_diamonds_10.png',
        value: 10,
        color: 'rouge',
        categorie: 'careau'
    },
    {
        // J
        image: './public/images/cartes/card_diamonds_J.png',
        value: 10,
        color: 'rouge',
        categorie: 'careau'
    },
    {
        // Q
        image: './public/images/cartes/card_diamonds_Q.png',
        value: 10,
        color: 'rouge',
        categorie: 'careau'
    },
    {
        // K
        image: './public/images/cartes/card_diamonds_K.png',
        value: 10,
        color: 'rouge',
        categorie: 'careau'
    },
    {
        // A
        image: './public/images/cartes/card_diamonds_A.png',
        value: [1, 10],
        color: 'rouge',
        categorie: 'careau'
    },
    // Treffle
    {
        image: './public/images/cartes/card_clubs_02.png',
        value: 2,
        color: 'noir',
        categorie: 'treffle'
    },
    {
        image: './public/images/cartes/card_clubs_03.png',
        value: 3,
        color: 'noir',
        categorie: 'treffle'
    },
    {
        image: './public/images/cartes/card_clubs_04.png',
        value: 4,
        color: 'noir',
        categorie: 'treffle'
    },
    {
        image: './public/images/cartes/card_clubs_05.png',
        value: 5,
        color: 'noir',
        categorie: 'treffle'
    },
    {
        image: './public/images/cartes/card_clubs_06.png',
        value: 6,
        color: 'noir',
        categorie: 'treffle'
    },
    {
        image: './public/images/cartes/card_clubs_07.png',
        value: 7,
        color: 'noir',
        categorie: 'treffle'
    },
    {
        image: './public/images/cartes/card_clubs_08.png',
        value: 8,
        color: 'noir',
        categorie: 'treffle'
    },
    {
        image: './public/images/cartes/card_clubs_09.png',
        value: 9,
        color: 'noir',
        categorie: 'treffle'
    },
    {
        image: './public/images/cartes/card_clubs_10.png',
        value: 10,
        color: 'noir',
        categorie: 'treffle'
    },
    {
        // J
        image: './public/images/cartes/card_clubs_J.png',
        value: 10,
        color: 'noir',
        categorie: 'treffle'
    },
    {
        // Q
        image: './public/images/cartes/card_clubs_Q.png',
        value: 10,
        color: 'noir',
        categorie: 'treffle'
    },
    {
        // K
        image: './public/images/cartes/card_clubs_K.png',
        value: 10,
        color: 'noir',
        categorie: 'treffle'
    },
    {
        // A
        image: './public/images/cartes/card_clubs_A.png',
        value: [1, 10],
        color: 'noir',
        categorie: 'treffle'
    },
    // Coeurs
    {
        image: './public/images/cartes/card_hearts_02.png',
        value: 2,
        color: 'rouge',
        categorie: 'coeur'
    },
    {
        image: './public/images/cartes/card_hearts_03.png',
        value: 3,
        color: 'rouge',
        categorie: 'coeur'
    },
    {
        image: './public/images/cartes/card_hearts_04.png',
        value: 4,
        color: 'rouge',
        categorie: 'coeur'
    },
    {
        image: './public/images/cartes/card_hearts_05.png',
        value: 5,
        color: 'rouge',
        categorie: 'coeur'
    },
    {
        image: './public/images/cartes/card_hearts_06.png',
        value: 6,
        color: 'rouge',
        categorie: 'coeur'
    },
    {
        image: './public/images/cartes/card_hearts_07.png',
        value: 7,
        color: 'rouge',
        categorie: 'coeur'
    },
    {
        image: './public/images/cartes/card_hearts_08.png',
        value: 8,
        color: 'rouge',
        categorie: 'coeur'
    },
    {
        image: './public/images/cartes/card_hearts_09.png',
        value: 9,
        color: 'rouge',
        categorie: 'coeur'
    },
    {
        image: './public/images/cartes/card_hearts_10.png',
        value: 10,
        color: 'rouge',
        categorie: 'coeur'
    },
    {
        // J
        image: './public/images/cartes/card_hearts_J.png',
        value: 10,
        color: 'rouge',
        categorie: 'coeur'
    },
    {
        // Q
        image: './public/images/cartes/card_hearts_Q.png',
        value: 10,
        color: 'rouge',
        categorie: 'coeur'
    },
    {
        // K
        image: './public/images/cartes/card_hearts_K.png',
        value: 10,
        color: 'rouge',
        categorie: 'coeur'
    },
    {
        // A
        image: './public/images/cartes/card_hearts_A.png',
        value: [1, 10],
        color: 'rouge',
        categorie: 'coeur'
    },
]
let cardsInGame = cards;
let cardsUsed = [];

function getCard(tab) {
    // selectioner une carte
    const randIndex = Math.floor(Math.random() * (tab.length));
    const cardSelected = tab[randIndex];

    // Ajouter la carte au tableau de cartes utilises
    cardsUsed.push(cards[randIndex]);

    // actualiser le tableau de cartes qui restent
    const tempCards = cardsInGame.filter(card => card.image != cardSelected.image);
    cardsInGame = tempCards;

    return cardSelected;
}

function demanderUneCarte () {
    const newCarte = getCard(cardsInGame);
    console.log(newCarte)
    if (newCarte) {
        const htmlCarte = document.createElement('div');
        htmlCarte.classList.add('card');
        cardsPlayer.appendChild(htmlCarte);
        htmlCarte.style.backgroundImage =  `url(${newCarte.image})`
        cardsPlayer1.push(newCarte)
    }
}

btnTakeCart.addEventListener('click', (e) => {
    e.preventDefault()
    demanderUneCarte();
})





