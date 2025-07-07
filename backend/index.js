import readline from 'readline';

class Board {
    constructor(tiles) {
        this.tiles = tiles
    }

    setChip(playedCard, color){

        for (let i = 0; i < this.tiles.length; i++) {
            let tileRow = this.tiles[i]
            for (let j = 0; j < tileRow.length; j++) {
                const tile = tileRow[j];
                if (playedCard === tile.card.name){
                    tile.chip = new Chip(color)
                    return true
                }
            }            
        }
        return false
    }

    checkForSequence(){

    }
}

class Tile {
    constructor(card, chip) {
        this.card = card
        this.chip = chip;
    }
}

class Chip {
    constructor(color) {
        this.color = color;
    }
}

class Deck {
    constructor(cards) {
        this.cards = cards;
    }
    
    draw(){
        return this.cards.pop()
    }

    shuffle(){
        let newCards = []
        
        while (this.cards.length != 0){

            const minCeiled = Math.ceil(0);
            const maxFloored = Math.floor(this.cards.length - 1);

            let randNum = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
            
            newCards.push(this.cards[randNum])

            this.cards.splice(randNum, 1)
        }
        
        this.cards = newCards
    }

    dealHand(player, numCards){
        
        for (let i = 0; i < numCards; i++) {
            let card = this.draw()
            player.addToHand(card)
        }
    }

}

class Card {
    constructor(name) {
        this.name = name;
    }
}


class Jack extends Card {
    constructor(name, eyes){
        super(name)
        this.eyes = eyes
    }
}


class DiscardPile {

    constructor(){
        this.cards = []
    }

    emptyToDeck(deck){
        while (this.cards.length !== 0){
            deck.cards.push(this.cards.pop())
        }
    }

    discard(card){
        this.cards.push(card)
    }
}

class  Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.hand = []
    }

    playCard(board, deck, discardPile, selectedCard){

        let chipSet = board.setChip(selectedCard, this.color)


        // if(!chipSet){
        //     discardPile
        // }

        

        // this.addToHand(deck.draw())
        
    }


    deadCard(discardPile){
        discardPile
    }

    addToHand(card){
        this.hand.push(card)
    }

    removeFromHand(cardName){
        this.hand = this.hand.filter(card => card.name !== cardName)
    }

}

class Game {

    constructor(players, sequencesToWin, cardsPerPlayer){
        this.players = players
        this.sequencesToWin = sequencesToWin
        this.cardsPerPlayer = cardsPerPlayer
    }

    cards = [
        [ "W",    "6♦",   "7♦",   "8♦",   "9♦",   "10♦",  "Q♦",   "K♦",  "A♦",   "W"   ],
        [ "5♦",   "3♥",   "2♥",   "2♠",   "3♠",   "4♠",   "5♠",   "6♠",  "7♠",   "A♣"  ],
        [ "4♦",   "4♥",   "K♦",   "A♦",   "A♣",   "K♣",   "Q♣",   "10♣", "8♠",   "K♣"  ],
        [ "3♦",   "5♥",   "Q♦",   "Q♥",   "10♥",  "9♥",   "8♥",   "9♣",  "9♠",   "Q♣"  ],
        [ "2♦",   "6♥",   "10♦",  "K♥",   "3♥",   "2♥",   "7♥",   "8♣",  "10♠",  "10♣" ],
        [ "A♠",   "7♥",   "9♦",   "A♥",   "4♥",   "5♥",   "6♥",   "7♣",  "Q♠",   "9♣"  ],
        [ "K♠",   "8♥",   "8♦",   "2♣",   "3♣",   "4♣",   "5♣",   "6♣",  "K♠",   "8♣"  ],
        [ "Q♠",   "9♥",   "7♦",   "6♦",   "5♦",   "4♦",   "3♦",   "2♦",  "A♠",   "7♣"  ],
        [ "10♠",  "10♥",  "Q♥",   "k♥",   "A♥",   "2♣",   "3♣",   "4♣",  "5♣",   "6♣"  ],
        [ "W",    "9♠",   "8♠",   "7♠",   "6♠",   "5♠",   "4♠",   "3♠",  "2♠",   "W"   ],
    ]

    teams = {
        "Blue" : 0,
        "Green" : 0,
        "Red" : 0
    }

    createBoard(){
        let board = this.cards.map( row =>{
            return row.map( card => {
                if(card === "W"){
                    return new Tile(new Card(card), new Chip("White"))
                }
                return new Tile(new Card(card), null)
            })
        })

        return new Board(board) 
    }


    createDeck(){
        let deckCards = []

        
        for (let i = 0; i < this.cards.length; i++) {
            let cardRow = this.cards[i];
            for (let j = 0; j < cardRow.length; j++) {
                let card = cardRow[j]
                
                if(card === "W"){
                    continue
                }
                deckCards.push(new Card(card))
            }
        }
        
        // for (let k = 0; k <= 2; k++) {
        //     deckCards.push( new Jack('J♠', 1))
        //     deckCards.push( new Jack('J♥', 1))
        //     deckCards.push( new Jack('J♦', 2))
        //     deckCards.push( new Jack('J♣', 2))
        // }

        return new Deck(deckCards) 
    }

    


    async startGame(){

        let board = this.createBoard()

        let deck = this.createDeck()

        deck.shuffle()

        this.players.forEach( player =>{         
            deck.dealHand(player, cardsPerPlayer)
        })

        
        let player = this.players[0]
        
        
        console.log(`${player.name} turn`);
        console.log(`Hand: ${getHandStr(player)}`);
        const cardName = await ask('Select card: ')

        console.log(board.setChip(cardName, player.color))

        printBoard(board)

        // let playerIterator = 0

        // do {
            
        //     console.log(pl);
            
            
            
        //     if(playerIterator === players.length -1) {
        //         playerIterator = 0
        //     }

        // }while(board.checkForWin())


        /*
            distribute cards to each player
            player turn
            game actions
            check if they won

            repeat

        
        */
        
    }
    

}

function printBoard(board) {
    for (let i = 0; i < board.tiles.length; i++) {
        const tileRow = board.tiles[i];
        let line = '';
        for (let j = 0; j < tileRow.length; j++) {
            let tile = tileRow[j]
            
            let cardName = tile.card.name;
            const chip = tile.chip

            if (chip){
                if(chip.color === "Red"){
                    cardName +="|$"
                }
                else if(chip.color === "Blue"){
                    cardName +="|#"
                }
                else if(chip.color === "Green"){
                    cardName +="|@"
                }
                else{
                    cardName +="|X"
                }
            }
            else{
                cardName +="|O"
            }

            line += cardName.padEnd(8, ' ');
        }
        console.log(line.trimEnd());
    }
}


function ask(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (answer) => {
      rl.close(); 
      resolve(answer);
    });
  });
}


const maxPlayers = 12
const minPlayers = 2
const teamSizes = [2, 3]
const chipColors = ['Blue', 'Green', 'Red']

let [numPlayers, numTeams] = process.argv.slice(2);

if (!numPlayers || !numTeams) {
  console.log("Must enter number of players and teams at start of program");
  process.exit(1);
}

numPlayers = Number(numPlayers);
numTeams = Number(numTeams);

if (isNaN(numPlayers) || isNaN(numTeams)) {
  console.log("Number of players and teams must be a number");
  process.exit(1);
}

if(!teamSizes.includes(numTeams)){
    console.log("Teams of 2 or 3 only");
    process.exit(1);
}

if( numPlayers % numTeams !== 0){
    console.log("Number of players has to be divisible by number teams");
    process.exit(1);
}

if (numPlayers < minPlayers || numPlayers > maxPlayers) {
  console.log("Number of players has to be between 2 and 12");
  process.exit(1);
}

let players = []


console.log("Enter player names\n");


for (let i = 0; i < numPlayers / numTeams; i++) {
    for (let j = 0; j < numTeams; j++) {
        const name = await ask('Name: ')
        players.push(new Player(name, chipColors[j]))
    }
}

let sequencesToWin = numTeams === 2 ? 2 : 1

let cardsPerPlayer = 0;

switch (numPlayers) {
  case 2:
    cardsPerPlayer = 7;
    break;
  case 4:
    cardsPerPlayer = 6;
    break;
  case 6:
    cardsPerPlayer = 5;
    break;
  case 8:
    cardsPerPlayer = 4;
    break;
  case 10:
  case 12:
    cardsPerPlayer = 3;
    break;
  default:
    console.log("Unsupported number of players. Must be 2, 4, 6, 8, 10, or 12.");
    process.exit(1);
}




let game = new Game(players, sequencesToWin, cardsPerPlayer)

await game.startGame()

// printBoard(game.createBoard().tiles)

// console.log(game.createDeck().cards);

function getHandStr(player){
    let handStr = ''    

    for(let i = 0; i < player.hand.length; i++){
        handStr += player.hand[i].name + ' '
    }

    return handStr.trim()

}