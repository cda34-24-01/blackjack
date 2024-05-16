import { getCard } from "./cartes.js";

export class player {
    constructor (name, money, cardsInGame, deck, wins, loses) {
        this.cardsInGame = cardsInGame; // les cartes disponibles
        this.wins = wins
        this.loses = loses
        this.deck = deck; // le conteneur html ou on va inserer les cartes
        this.name = name;
        this.money = money;
        this.usedCards = [];
        this.currentHand = [];
        this.score = 0;
    };

    reset () {
        this.score = 0;
        this.deck.innerHTML = '';
        this.currentHand = [];
    };
    addWin() {
        this.wins ++;
        // console.log(`${this.name} has ${this.wins} wins`)
        // ici nous ferions l'insertion dans la base de données
    }
    addLose() {
        this.loses ++;
        // console.log(`${this.name} has ${this.loses} loses`)
        // ici nous ferions l'insertion dans la base de données
    }


    calcScore() {
        let score = this.currentHand.reduce((sum, value) => sum + value, 0);
        let numAces = this.currentHand.filter(card => card === 11).length;
    
        while (score > 21 && numAces > 0) {
            score -= 10;
            numAces--;
        }
        return score;
    }

    refreshCardsInGame () {
        return this.cardsInGame;
    };

    demanderUneCarte () {
        const { cardSelected, currentsCarts } = getCard(this.cardsInGame);
        if (cardSelected) {
            // ajouter un carte (img)
            const htmlCarte = document.createElement('img');
            this.deck.appendChild(htmlCarte);
            htmlCarte.classList.add('card');

            // positioner les cartes
            htmlCarte.style.left = this.deck.children.length === 1 ? '0' : `${(this.deck.children.length - 1) * 20}%`;
            htmlCarte.src = cardSelected.image;
    
            // gérer le score et le tableau de cartes
            this.currentHand.push(cardSelected.value);

            this.score = this.calcScore();
            this.usedCards.push(cardSelected);
            this.cardsInGame = currentsCarts;
    
            // ajouter les cartes utilises
            if (this.cardsInGame.length < 20) {
                this.cardsInGame.push(...this.usedCards);
                this.usedCards = [];
            }
        };
    };
}