//constants
const cardTypeTable = ['Quick', 'Arts', 'Buster'];
const cdvTable = [
    [0.8,0.9,1.12],  //Quick values
    [1,1.2,1.4],    //Arts values
    [1.5,1.8,2.1],  //Buster values
    [1,1,1,1] //Extra values
];
const cStarTable = [
    [0.8,1.3,1.8], //Quick values
    [0,0,0], //Arts values
    [0.1,0.15,0.2], //Buster values
    [1,1,1,1] //Extra values
]
const Arthur = {
    name:'Arthur',
    maxHP : 15310,
    currentHP : 15310,
    np : '', // TODO: Implement function for skills! just assign the function name (see .deck) and then we can call character.spell() later.
    charge : 0,
    attack : 13645,
    starDrop : 10,
    starWeight: 100,
    npGainAtk : 0.84,
    npGainDef : 3,
    cards: [[2,'Arthur'],[2,'Arthur'],[0,'Arthur'],[1,'Arthur'],[1,'Arthur']],
        //TODO: more elegant way of handling card ownership. Probably handled in Attack()
    hitCount: [3,2,1,5,3],
};
const Lancelot = {
    name:'Lancelot',
    maxHP : 14051,
    currentHP : 14051,
    np : '',
    charge : 0,
    attack : 12046,
    starDrop : 10,
    starWeight: 100,
    npGainAtk : 0.83,
    npGainDef : 3,
    cards: [[2,'Lancelot'],[2,'Lancelot'],[0,'Lancelot'],[1,'Lancelot'],[1,'Lancelot']],
    hitCount: [3,2,4,5,1],
};
const Gawain = {
    name:'Gawain',
    maxHP : 13845,
    currentHP : 13845,
    np : '',
    charge : 0,
    attack : 12317,
    starDrop : 10,
    starWeight: 102,
    npGainAtk : 1.14,
    npGainDef : 3,
    cards: [[2,'Gawain'],[2,'Gawain'],[2,'Gawain'],[0,'Gawain'],[1,'Gawain']],
    hitCount: [2,2,1,5,4],
};
const Jason = {
    name:'Jason',
    maxHP : 11677,
    currentHP : 11677,
    np : '',
    charge : 0,
    attack : 8479,
    starDrop : 10,
    starWeight: 100,
    npGainAtk : 0.84,
    npGainDef : 3,
    cards: [[2,'Jason'],[2,'Jason'],[0,'Jason'],[1,'Jason'],[1,'Jason']],
    hitCount: [3,4,1,4,5],
};
const Medea = {
    name:'Medea',
    maxHP : 11719,
    currentHP : 11719,
    np : '',
    charge : 0,
    attack : 10039,
    starDrop : 10.9,
    starWeight: 50,
    npGainAtk : 1.64,
    npGainDef : 3,
    cards: [[0,'Medea'],[1,'Medea'],[1,'Medea'],[1,'Medea'],[2,'Medea']],
    hitCount: [2,1,1,3,1],
};
const Heracles = {
    name:'Heracles',
    maxHP : 12521,
    currentHP : 12521,
    np : '',
    charge : 0,
    attack : 12901,
    starDrop : 5,
    starWeight: 10,
    npGainAtk : 1.07,
    npGainDef : 5,
    cards: [[2,'Heracles'],[2,'Heracles'],[2,'Heracles'],[1,'Heracles'],[0,'Heracles']],
    hitCount: [2,2,1,3,15],
};

/* Variables */
let gameState;
let playerTurn;
let playerTeammateOne, playerTeammateTwo, playerTeammateThree;
let playerTeam;
let enemyTeammateOne, enemyTeammateTwo, enemyTeammateThree;
let enemyTeam;
let deck;
let hand;
let playerTarget;
let enemyTarget;
let chosenCards;
let critStars;

/* Cached elements */
const playerElArray = [...document.querySelectorAll('.ally')];
const enemyElArray = [...document.querySelectorAll('.enemy')];
const skillBtns = [...document.querySelectorAll('#skills > button')];
const cardBtns = document.querySelector('#cards');
const npBtns = [...document.querySelectorAll('#np-cards > button')];
const normalCardBtns = [...document.querySelectorAll('#normal-cards > button')];
const goBtn = document.getElementById('go');
const topMsg = document.querySelector('h1');

/* Event Listener */
document.querySelector('#normal-cards').addEventListener('click', handleCardClick);
// document.querySelector('#np-cards').addEventListener('click', handleCardClick); NP NYI
document.getElementById('go').addEventListener('click', handleGoClick);
document.querySelector('#enemy-team').addEventListener('click', handleTargetClick);
//TODO: event listener onClick to use skills.

/* Setup */
function init() {
    gameState = null;
    playerTurn = true;
    
    // This code lets us copy objects in order to have duplicates on the team, even though we're not using them right now; future-proofing away!
    playerTeammateOne = Object.assign({}, Arthur);
    playerTeammateTwo = Object.assign({}, Lancelot);
    playerTeammateThree = Object.assign({}, Gawain);
    enemyTeammateOne = Object.assign({}, Jason);
    enemyTeammateTwo = Object.assign({}, Medea);
    enemyTeammateThree = Object.assign({}, Heracles);
    
    playerTeam = [playerTeammateOne, playerTeammateTwo, playerTeammateThree];
    enemyTeam = [enemyTeammateOne, enemyTeammateTwo, enemyTeammateThree];
    
    critStars = 0;

    playerTarget = 0;
    enemyTarget = getRandomInt(0, playerTeam.length); //Enemies target randomly.
        //TODO: enemy AI?
    deck = [];
    hand = [];
    makeDeck();
    renderBattlefield();
    renderTopMsg();
    turnSetup();
}

function turnSetup() {
    playerTurn = true;
    hand = [];
    for(let i=0; i<5; i++){
        draw(hand, deck);
    }
    renderCards();
    chosenCards = [];
}

function turnExecute() {
    critStars = 0;
    for (let i=0; i<3; i++) {
        if (gameState === null) {
            attack(playerTeam.find(({ name }) => name === chosenCards[i][1]),
                enemyTeam[playerTarget], i, chosenCards[i][0]);
        }
    }
    playerTurn = false;
    for(let i=0; i<3; i++) {
        if (gameState === null) {
            enemyTarget = getRandomInt(0, playerTeam.length); //TODO: make sure it handles skipping player members at <= 0 HP.
            let activeEnemy = getRandomInt(0, enemyTeam.length);
            attack(enemyTeam[activeEnemy],playerTeam[enemyTarget],getRandomInt(0,2),1);
        }
    }
    for (let i=0; i<5; i++) {
        normalCardBtns[i].disabled = false;
    }
    turnSetup();
}

function renderCards() {
    for (let i = 0; i < hand.length; i++) {
        normalCardBtns[i].innerText = `${hand[i][1]} - ${cardTypeTable[hand[i][0]]}`;
    }
}

function renderTopMsg() {
    if (gameState === null) {
        topMsg.innerText = `Battle Start!`;
    } else topMsg.innerText = (gameState > 0) ? `You Win!` : `You Lose.`;
}

function renderBattlefield() {
    for(let i=0; i<playerTeam.length; i++) {
        renderCharacter(playerElArray[i], playerTeam[i]);
    }
    for(let i=0; i<enemyTeam.length; i++) {
        renderCharacter(enemyElArray[i], enemyTeam[i]);
        if (playerTarget === i) {
            enemyElArray[i].style.borderStyle = 'solid';
        } else {
            enemyElArray[i].style.borderStyle = 'none';
        }
    }
}

function renderCharacter(element, char) {
    if (char.currentHP > 0) {
        element.children[0].src = `images/${char.name}.webp`;
    }
    element.children[0].alt = char.name;
    element.children[1].innerText = char.name;
    element.children[2].innerText = char.currentHP;
    element.children[3].innerText = char.charge;
}

function handleCardClick(evt) {
    if (chosenCards.length < 3) {
        let parent = evt.target.parentNode;
        chosenCards.push(hand[Array.prototype.indexOf.call(parent.children, evt.target)]); //See the TODO in handleTargetClick; can we simplify?
        evt.target.disabled = true;
    }
}

function handleGoClick() {
    if (chosenCards.length === 3) turnExecute();
}

function handleTargetClick(evt) {
    let child = evt.target;
    if (child.tagName !== "DIV") child = child.parentNode;
    let parent = child.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, child);
    // let index = parent.indexOf(child); TODO: Why does this simplification not work?
    if (enemyTeam[index].currentHP > 0) {
        playerTarget = index;
    }
    renderBattlefield();
}

function attack(source, target, cardPos, cardType, isNP) {
    //Remember cardType is an int; 0 = Quick, 1 = Arts, 2 = Buster, 3 = extra
    //cardPos is zero indexed.
    console.log(source.name + " is attacking "+target.name+".");
    let cardMod;
    let hitCount = (isNP = 1) ? source.hitCount[4] : source.hitCount[cardType];
    if (isNP = 1) {cardPos = 0};
    
    // DAMAGE SECTION
    // let isCrit = (Math.random < critChance) ? 1 : 0; //Crit chance NYI.
    let firstCardBuster = (chosenCards[0][0] = 2) ? 0.2 : 0;
    let busterChainMod = ((chosenCards[0][0] + chosenCards[1][0] + chosenCards[2][0]) === 6) ? 0.2 : 0;
        //TODO: fix this because Arts-Extra chains break it
    let cardDamageValue = cdvTable[cardType][cardPos];
    // cardMod = source.cardMods[cardType]; NYI see next line.
    cardMod = 0; //cardMod buffs are NYI, this is to not break the cardDamageValue formula.
    let damage;
    // let criticalModifier = 1 + isCrit;
    damage = source.attack
    // NYI
    // * ((isNP === 1) ? npDamageMultiplier : 1) //% value on NP
    * (firstCardBuster + (cardDamageValue * (1 + cardMod))) //0.2 if Buster lead, CDV lookup
    // * classAtkBonus //Base damage change for classes
    // * triangleModifier //Effective/Resist
    // * attributeModifier //Star Human Earth Beast Man
    * (0.9 + Math.random()*0.2) //Random from 0.9 to 1.1
    * 0.23 //Magic Number TM part of the formula
    // NYI
    // * (1 + atkMod - defMod) //Buffs
    // * criticalModifier //2 if Crit, 1 if not.
    // * extraCardModifier //2 if extra in Brave, 3.5 if extra in Q/A/B Brave, 1 if neither
    // * (1 - specialDefMod) //Some enemies have this.
    // * (1 + powerMod + selfDamageMod + (critDamageMod * isCrit) + (npDamageMod * isNP)) //power mod, sdm is nyi, cdm is crit % up/down, npDamageMod is np % up/down
    // * (1 + damageSpecialMod) //SpecialAttack, event CE etc.
    // * (1 + ((superEffectiveModifier - 1) * isSuperEffective)) //NP SuperEffective % and qualification.
    // + dmgPlusAdd //Flat increases from Waver, Divinity, etc
    // + selfDmgCutAdd //Flat decreases from Waver, mash, etc
    + (source.attack * busterChainMod) //if Buster Chain 0.2, 0 otherwise.
    damage = Math.floor(Math.max(damage,0));
    target.currentHP -= damage;
    console.log(`${target.name} took ${damage} damage, and is at ${target.currentHP} hp now.`)
    if (target.currentHP <= 0 && playerTurn === true) {
        defeat(target);
    }
    if (target.currentHP <= 0 && playerTurn === false) {
        death(target);
    }
    
    if (playerTeam.includes(source)) {
        //NP GAIN SECTION
        let firstCardArts = (chosenCards[0][0] = 1) ? 1 : 0;
        let cardNpValue;
        if (cardType === 2) {cardNpValue = 0}
            else cardNpValue = (cardType === 1) ? 3 : 1;
        let NpPerHit = Math.floor(
            Math.floor(
                source.npGainAtk
                * (firstCardArts + (cardNpValue * (1 + cardMod)))
                // * enemyServerMod NYI, target selection
                // * (1 + source.npChargeRateMod) NYI NpGain buff
                // * (1 + isCrit)NYI Crits
            )
            // * overkillModifier NYI Overkill
        )
        source.charge += (NpPerHit * hitCount);
        //CRIT STAR SECTION
        let firstCardQuick = (chosenCards[0][0] = 0) ? 0.2 : 0;
        let cardStarValue = cStarTable[cardType][cardPos];
        let dropChancePerHit =
            ((source.starDrop / 100)
            + firstCardQuick + (cardStarValue * (1 + cardMod))
            // + serverRate
            // + starDropMod
            // - enemyStarDropMod
            // + ((isCrit === 1) ? 0.2 : 0) //Crits NYI.
            )
            // + overkillAdd //This is 0.3 if it's overkill, 0 if not.
        dropChancePerHit = Math.min(3, dropChancePerHit);
        for (let i = 0; i < hitCount; i++) {
            dropChance = dropChancePerHit;
            while (dropChance > 0) {
                if (Math.random() < dropChance) {critStars++}
                dropChance--;
            }
        }
        console.log(`Currently at ${critStars} stars.`)
    } else {
        let NpPerStruck = Math.floor(
            Math.floor(
                target.npGainDef
                // * enemyServerMod NYI, target selection
                // * (1 + target.npChargeRateMod) NYI NpGain buff
                // * (1 + target.npDefChargeRateMod) NYI NpGainDef buff
            )
        )
        target.charge += (NpPerStruck * source.hitCount[cardType]);
    }
    
    renderBattlefield();
}
        
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function death(target) {
    console.log(`${target.name} died.`);
    let targetIndex = playerTeam.indexOf(target);
    playerElArray[targetIndex].children[0].src = `images/Gravestone.webp`;
    let i;
    for (i = 0; i < playerTeam.length; i++) {
        if (playerTeam[i].currentHP > 0) {
            break
        }
    }
    if (i >= playerTeam.length) {
        gameOver();
    } else {
        enemyTarget = getRandomInt(0, playerTeam.length); //TODO: Handle enemy targeting at <= 0 HP.
        makeDeck();
    }
}

function defeat(target) {
    console.log(`${target.name} was defeated!`);
    let targetIndex = enemyTeam.indexOf(target);
    enemyElArray[targetIndex].style.borderStyle = 'none';
    enemyElArray[targetIndex].children[0].src = `images/Gravestone.webp`;
    let i = 0;
    while (true) { //TODO: This is really ugly, can it be simplified? Basically a FOR loop with two separate exit conditions.
        if (i >= enemyTeam.length) {
            victory();
            break;
        } else if (enemyTeam[i].currentHP > 0) {
            playerTarget = i;
            break;
        } else {
            i++;
        }
    }
}

function makeDeck() {
    deck = [];
    for (let i=0; i<playerTeam.length; i++) {
        if (playerTeam[i].currentHP > 0) {
            deck = deck.concat(playerTeam[i].cards);
        }
    }
}

function draw(handTo, deckFrom) {
    let drawIndex = getRandomInt(0, deckFrom.length);
    handTo.push(deckFrom[drawIndex]);
    deckFrom.splice(drawIndex, 1);
    if (deckFrom.length === 0) {
        makeDeck();
    }
}

function gameOver() {
    gameState = -1;
    renderTopMsg();
}

function victory() {
    gameState = 1;
    renderTopMsg();
}

init();