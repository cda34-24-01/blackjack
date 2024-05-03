import { getCard } from "./cartes.js";

export class player {
    constructor (name, argent, cardsInGame, deck) {
        this.cardsInGame = cardsInGame; // les cartes disponibles
        this.deck = deck; // le conteneur html ou on va inserer les cartes
        this.name = name;
        this.argent = argent;
        this.playerCards = [];
        this.score = 0;
    };
    reset () {
        this.score = 0;
        this.playerCards = [];
    }
    calcScore () {
        return this.playerCards.reduce((sum, value) => {
            if (sum + value > 21 && value === 11) {
                return sum + 1;
            } else {
                return sum + value;
            }
        }, 0);
    };
    refreshCardsInGame () {
        return this.cardsInGame;
    };


    demanderUneCarte () {
        const { cardSelected, currentsCarts } = getCard(this.cardsInGame);
        if (cardSelected) {
            const htmlCarte = document.createElement('img');
            this.deck.appendChild(htmlCarte);
            htmlCarte.classList.add('card');
            htmlCarte.style.left = `${this.playerCards.length * 20}%`;
            htmlCarte.src = cardSelected.image;
            this.playerCards.push(cardSelected.value);
            this.score = this.calcScore();
            this.cardsInGame = currentsCarts;
        };
    };
}