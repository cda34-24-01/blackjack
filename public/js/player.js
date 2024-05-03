import { getCard, cards } from "./cartes.js";

export class player {
    constructor (name, argent, cardsInGame, deck) {
        this.cardsInGame = cardsInGame; // les cartes disponibles
        this.deck = deck; // le conteneur html ou on va inserer les cartes
        this.name = name;
        this.argent = argent;
        this.playerCards = [];
        this.score = 0;
    }

    calcScore () {
        return this.playerCards.reduce((sum, value) => {
            console.log('scoring')
            if (sum + value > 21 && value === 11) {
                return sum + 1;
            } else {
                return sum + value;
            }
        }, 0);
    }

    demanderUneCarte () {
        const newCarte = getCard(this.cardsInGame);
        if (newCarte) {
            const htmlCarte = document.createElement('img');
            this.deck.appendChild(htmlCarte);
            htmlCarte.classList.add('card');
            htmlCarte.style.left = `${this.playerCards.length * 20}%`;
            htmlCarte.src = newCarte.image;
            this.playerCards.push(newCarte.value);
            this.score = this.calcScore();
        };
    };
}