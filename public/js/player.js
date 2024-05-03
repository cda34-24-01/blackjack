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
        this.deck.innerHTML = '';
        // this.playerCards = [];
    }
    calcScore (newValue) {
        if (this.score + newValue > 21 && newValue === 11) {
            return this.score += 1;
        } else {
            return this.score += newValue;
        }

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
            this.score = this.calcScore(cardSelected.value);
            this.playerCards.push(cardSelected);
            this.cardsInGame = currentsCarts;
            console.log('cards used :' + this.playerCards.length)
            console.log('cards in game :' + this.cardsInGame.length)
        };
    };
}