//constants
const serverNPModTable = {
    "saber" : 1,
    "caster" : 1.2,
    "berserker" : 0.8,
}
const serverStarModTable = {
    "saber" : 0,
    "caster" : 0,
    "berserker" : 0,
}
const classAttackTable = {
    "saber" : 1,
    "caster" : 0.9,
    "berserker" : 1.1,
}
const attributeAdvantageTable = {
    "sky": {
      "sky": 1000,
      "earth": 1100,
    },
    "earth": {
      "sky": 900,
      "earth": 1000,
    },
}
const classAdvantageTable = {
    "saber": {
      "saber": 1000,
      "caster": 1000,
      "berserker": 2000,
    },
    "caster": {
      "saber": 1000,
      "caster": 1000,
      "berserker": 2000,
    },
    "berserker": {
      "saber": 1500,
      "caster": 1500,
      "berserker": 1500,
    },
}
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
    class : 'saber',
    attribute : 'earth',
    np : [2,'Arthur',1], //cardType, owner, isNP.
    npName : 'Excalibur',
    npDamage : 500,
    npTarget : 1, //(0 for single, 1 for AOE, 2 for support)
    npExtras : 'NPStrUp 10% 1 turn', //Replace with function declaration for NP extras.
    charge : 0,
    attack : 13645,
    starDrop : 10,
    starWeight: 100,
    npGainAtk : 0.84,
    npGainDef : 3,
    cards: [[2,'Arthur',0],[2,'Arthur',0],[0,'Arthur',0],[1,'Arthur',0],[1,'Arthur',0]],
    //TODO: more elegant way of handling card ownership. Probably handled in Attack()
    hitCount: [3,2,1,5,3],
    skills: [[manaBurstA, "Mana Burst A"],
        [resplendentJourneyEX, "Resplendent Journey EX"],
        [giantBeastHuntA, "Giant Beast Hunt A"],],
};
const Lancelot = {
    name:'Lancelot',
    maxHP : 14051,
    currentHP : 14051,
    class : 'saber',
    attribute : 'earth',
    np : [1,'Lancelot',1],
    npName : 'Arondight Overload',
    npDamage : 1500,
    npTarget : 0,
    npExtras : 'Incoming Damage Plus 1000 to target 5 turns', //Replace with function declaration for NP extras.
    charge : 0,
    attack : 12046,
    starDrop : 10,
    starWeight: 100,
    npGainAtk : 0.83,
    npGainDef : 3,
    cards: [[2,'Lancelot',0],[2,'Lancelot',0],[0,'Lancelot',0],[1,'Lancelot',0],[1,'Lancelot',0]],
    hitCount: [3,2,4,5,1],
    skills: [[knightOfTheLakeA, "Knight of the Lake A"], [eternalArmsMasteryAPlus, "Eternal Arms Mastery A+"], [knightOfOwnerASharp, "Knight of Owner A+"]],
};
const Gawain = {
    name:'Gawain',
    maxHP : 13845,
    currentHP : 13845,
    class : 'saber',
    attribute : 'earth',
    np : [2,'Gawain',1],
    npName : 'Excalibur Galatine',
    npDamage : 500,
    npTarget : 1,
    npExtras : 'Skill Seal all enemy 1 turn, Burn 1000 all enemies 5 turns', //Replace with function declaration for NP extras.
    charge : 0,
    attack : 12317,
    starDrop : 10,
    starWeight: 102,
    npGainAtk : 1.14,
    npGainDef : 3,
    cards: [[2,'Gawain',0],[2,'Gawain',0],[2,'Gawain',0],[0,'Gawain',0],[1,'Gawain',0]],
    hitCount: [2,2,1,5,4],
    skills: [[numeralOfTheSaintEX, "Numeral of the Saint EX"], [nightlessCharismaB, "Nightless Charisma B"], [beltOfBertilakEX, "Belt of Bertilak EX"]],
};
const Jason = {
    name:'Jason',
    maxHP : 11677,
    currentHP : 11677,
    class : 'saber',
    attribute : 'earth',
    np : [1,'Jason',1],
    npName : 'Astrápste Argo',
    npDamage : 750,
    npTarget : 1,
    npExtras : 'Arts up 20% 3 turns', //Replace with function declaration for NP extras.
    charge : 0,
    attack : 8479,
    starDrop : 10,
    starWeight: 100,
    npGainAtk : 0.84,
    npGainDef : 3,
    cards: [[2,'Jason',0],[2,'Jason',0],[0,'Jason',0],[1,'Jason',0],[1,'Jason',0]],
    hitCount: [3,4,1,4,5],
    skills: [[theDesiredArgonCoin, "The Desired Argon Coin"], [inspirationAtDeathsDoorA, "Inspiration at Death's Door A"], [counqueringTheSeaWithFriendsBSharp, "Conqueringthe Sea with Friends B++"]],
};
const Medea = {
    name:'Medea',
    maxHP : 11719,
    currentHP : 11719,
    class : 'caster',
    attribute : 'earth',
    np : [1, 'Medea',1],
    npName : 'Rule Breaker',
    npDamage : 900,
    npTarget : 0,
    npExtras : 'Clear buffs target, charge 20% self', //Replace with function declaration for NP extras.
    charge : 0,
    attack : 10039,
    starDrop : 10.9,
    starWeight: 50,
    npGainAtk : 1.64,
    npGainDef : 3,
    cards: [[0,'Medea',0],[1,'Medea',0],[1,'Medea',0],[1,'Medea',0],[2,'Medea',0]],
    hitCount: [2,1,1,3,1],
    skills: [[rapidWordsOfDivineA, "Rapid Words of Divine A"], [argonCoin, "Argon Coin"], [circesTeachingA, "Circe's Teaching A"]],
};
const Heracles = {
    name:'Heracles',
    maxHP : 12521,
    currentHP : 12521,
    class : 'berserker',
    attribute : 'sky',
    np : [2,'Heracles',1],
    npName : 'Nine Lives',
    npDamage : 1000,
    npTarget : 0,
    npExtras : 'Defense down 10% for 3 turns', //Replace with function declaration for NP extras.
    charge : 0,
    attack : 12901,
    starDrop : 5,
    starWeight: 10,
    npGainAtk : 1.07,
    npGainDef : 5,
    cards: [[2,'Heracles',0],[2,'Heracles',0],[2,'Heracles',0],[1,'Heracles',0],[0,'Heracles',0]],
    hitCount: [2,2,1,3,15],
    skills: [[valorAPlus, "Valor A+"], [mindsEyeFakeB, "Mind's Eye (Fake) B"], [battleContinuationA, "Battle Continuation A"]],
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
const resetBtn = document.getElementById('reset');
const topMsg = document.querySelector('h1');

/* Event Listener */
document.querySelector('#normal-cards').addEventListener('click', handleNormalCardClick);
document.querySelector('#np-cards').addEventListener('click', handleNPCardClick); //NP NYI
document.getElementById('go').addEventListener('click', handleGoClick);
document.querySelector('#enemy-team').addEventListener('click', handleTargetClick);
document.getElementById('reset').addEventListener('click', init);
document.getElementById('skills').addEventListener('click', handleSkillClick);

/* Setup */
function init() {
    gameState = null;
    resetBtn.style.visibility = 'hidden';
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
    deck = [];
    hand = [];
    for (let i=0; i<3; i++) {
        if (playerTeam[i].charge >= 300) {playerTeam[i].charge = 300};
        if (playerTeam[i].charge === 99) {playerTeam[i].charge = 100};
        npBtns[i].disabled = (playerTeam[i].charge >= 100) ? false : true;
    }    
    makeDeck();
    renderBattlefield();
    renderSkillBtns();
    renderTopMsg();
    turnSetup();
}

function turnSetup() {
    playerTurn = true;
    hand = [];
    for(let i=0; i<5; i++){
        draw(hand, deck);
    }
    npHand = [playerTeammateOne.np, playerTeammateTwo.np, playerTeammateThree.np]
    renderCards();
    chosenCards = [];
}

function turnExecute() {
    critStars = 0;
    for (let i=0; i<3; i++) {
        if (gameState === null) {
            attack(playerTeam.find(({ name }) => name === chosenCards[i][1]),
                enemyTeam[playerTarget], i, chosenCards[i][0], chosenCards[i][2]);
        }
    }
    playerTurn = false;
    for(let i=0; i<3; i++) {
        if (gameState === null) {
            enemyTarget = getRandomInt(0, playerTeam.length);
            while (enemyTarget.currentHP <= 0) {
                enemyTarget = getRandomInt(0, playerTeam.length);
            }
            let activeEnemy = getRandomInt(0, enemyTeam.length);
            while (activeEnemy.currentHP <= 0) {
                activeEnemy = getRandomInt(0, enemyTeam.length);
            }
            attack(enemyTeam[activeEnemy],playerTeam[enemyTarget],getRandomInt(0,2),1);
        }
    }
    for (let i=0; i<5; i++) {
        normalCardBtns[i].disabled = false;
    }
    for (let i=0; i<3; i++) {
        if (playerTeam[i].charge >= 300) {playerTeam[i].charge = 300};
        if (playerTeam[i].charge === 99) {playerTeam[i].charge = 100};
        npBtns[i].disabled = (playerTeam[i].charge >= 100) ? false : true;
    }
    renderSkillBtns();
    turnSetup();
}

function renderCards() {
    for (let i = 0; i < hand.length; i++) {
        normalCardBtns[i].innerText = `${hand[i][1]} - ${cardTypeTable[hand[i][0]]}`;
    }
    for (let i = 0; i < npHand.length; i++) {
        npBtns[i].innerText = `${npHand[i][1]} - ${playerTeam[i].npName}`;
        
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

function renderSkillBtns() {
    let btnIdx = 0;
    for (let i=0; i<playerTeam.length; i++) {
        for (let j=0; j<playerTeam[i].skills.length; j++) {
            skillBtns[btnIdx].innerText = playerTeam[i].skills[j][1];
            btnIdx++;
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

function handleNormalCardClick(evt) {
    if (chosenCards.length < 3) {
        let parent = evt.target.parentNode;
        chosenCards.push(hand[Array.prototype.indexOf.call(parent.children, evt.target)]); //See the TODO in handleTargetClick; can we simplify?
        evt.target.disabled = true;
    }
}

function handleNPCardClick(evt) {
    if (chosenCards.length < 3) {
        let parent = evt.target.parentNode;
        chosenCards.push(npHand[Array.prototype.indexOf.call(parent.children, evt.target)]); //See the TODO in handleTargetClick; can we simplify?
        evt.target.disabled = true;
    }
}

function handleGoClick() {
    if (chosenCards.length === 3) turnExecute();
}

function handleSkillClick(evt) {
    let parent = evt.target.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, evt.target);
    let char = Math.floor(index/3);
    let sIndex = (index % 3);
    playerTeam[char].skills[sIndex][0]();
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
    let hitCount = (isNP === 1) ? source.hitCount[4] : source.hitCount[cardType];
    let critChance = 0.1;
    // DAMAGE SECTION
    let isCrit = (Math.random() < critChance) ? 1 : 0; //Crit chance 10%, stars NYI.
    isCrit = (isNP === 1) ? 0 : isCrit;
    let firstCardBuster = (chosenCards[0][0] = 2) ? 0.2 : 0;
    let busterChainMod = ((chosenCards[0][0] + chosenCards[1][0] + chosenCards[2][0]) === 6) ? 0.2 : 0;
    let cardDamageValue = cdvTable[cardType][cardPos];
    // cardMod = source.cardMods[cardType]; NYI see next line.
    cardMod = 0; //cardMod buffs are NYI, this is to not break the cardDamageValue formula.
    let npDamageMultiplier = (source.npDamage)?source.npDamage/100:1;
    let classAttackBonus = classAttackTable[source.class];
    let criticalModifier = 1 + isCrit;
    
    /*let NPOvercharge = Math.floor(source.charge / 100);
    for (let i = 0; i < cardPos; i++) {
        if (chosenCards[i][2] === 1) {NPOvercharge++;}
    }
    if (isNP === 1) {
        cardPos = 0;
        source.charge = 0;
    }; //TODO: Implement Overcharge for NPExtra effects.*/

    if ((isNP === 1) && (source.npTarget === 1)) {
        for (let i = 0; i < enemyTeam.length; i++) {
            if (enemyTeam[i].currentHP > 0) {
                let classAdvantageModifier = classAdvantageTable[source.class][target.class] / 1000;
                let attributeModifier = attributeAdvantageTable[source.attribute][target.attribute] / 1000;
                let damage = source.attack
                    * ((isNP === 1) ? npDamageMultiplier : 1) //% value on NP
                    * (firstCardBuster + (cardDamageValue * (1 + cardMod))) //0.2 if Buster lead, CDV lookup
                    * classAttackBonus //Base damage change for classes
                    * classAdvantageModifier //Effective/Resist class triangle
                    * attributeModifier //Star Human Earth Beast Man
                    * (0.9 + getRandomInt(0,200)/1000) //Random from 0.9 to 1.099; getRandomInt's upper bound is not included.
                    * 0.23 //Magic Number TM part of the formula
                    // * (1 + atkMod - defMod) //Buffs
                    * criticalModifier //2 if Crit, 1 if not.
                    // * extraCardModifier //2 if extra in Brave, 3.5 if extra in Q/A/B Brave, 1 if neither
                    // * (1 - specialDefMod) //Some enemies have this.
                    // * (1 + powerMod + selfDamageMod + (critDamageMod * isCrit) + (npDamageMod * isNP)) //power mod, sdm is nyi, cdm is crit % up/down, npDamageMod is np % up/down
                    // * (1 + damageSpecialMod) //SpecialAttack, event CE etc.
                    // * (1 + ((superEffectiveModifier - 1) * isSuperEffective)) //NP SuperEffective % and qualification.
                    // + dmgPlusAdd //Flat increases from Waver, Divinity, etc
                    // + selfDmgCutAdd //Flat decreases from Waver, mash, etc
                    + (source.attack * busterChainMod); //if Buster Chain 0.2, 0 otherwise.
                damage = Math.floor(Math.max(damage,0)); 
                enemyTeam[i].currentHP -= damage;
                console.log(`${enemyTeam[i].name} took ${damage} damage ${isCrit}, and is at ${enemyTeam[i].currentHP} hp now.`)
                if (enemyTeam[i].currentHP <= 0) {
                    defeat(enemyTeam[i]);
                }
            let serverNPMod = serverNPModTable[enemyTeam[i].class];
            let firstCardArts = (chosenCards[0][0] = 1) ? 1 : 0;
            let cardNpValue;
            let overkillNPAdd = (enemyTeam[i].currentHP <= 0) ? 1.5 : 0;
            if (cardType === 2) {cardNpValue = 0}
                else cardNpValue = (cardType === 1) ? 3 : 1;
            let NpPerHit = Math.floor(
                Math.floor(
                    source.npGainAtk
                    * (firstCardArts + (cardNpValue * (1 + cardMod)))
                    * serverNPMod
                    // * (1 + source.npChargeRateMod) NYI NpGain buff
                    * criticalModifier
                )
                * overkillNPAdd
            )
            source.charge += (NpPerHit * hitCount);
            //CRIT STAR SECTION
            let firstCardQuick = (chosenCards[0][0] = 0) ? 0.2 : 0;
            let cardStarValue = cStarTable[cardType][cardPos];
            let serverStarMod = serverStarModTable[enemyTeam[i].class];
            let overkillStarAdd = (enemyTeam[i].currentHP <= 0) ? 0.3 : 0;
            let dropChancePerHit =
                ((source.starDrop / 100)
                + firstCardQuick + (cardStarValue * (1 + cardMod))
                + serverStarMod
                // + starDropMod
                // - enemyStarDropMod
                + ((isCrit === 1) ? 0.2 : 0)
                )
                + overkillStarAdd;
            dropChancePerHit = Math.min(3, dropChancePerHit);
            for (let i = 0; i < hitCount; i++) {
                dropChance = dropChancePerHit;
                while (dropChance > 0) {
                    if (Math.random() < dropChance) {critStars++}
                    dropChance--;
                }
            }
            console.log(`Currently at ${critStars} stars.`)
            }
        }
    } else {
        let classAdvantageModifier = classAdvantageTable[source.class][target.class] / 1000;
        let attributeModifier = attributeAdvantageTable[source.attribute][target.attribute] / 1000;
        let criticalModifier = 1 + isCrit;
        let damage = source.attack
            * ((isNP === 1) ? npDamageMultiplier : 1) //% value on NP
            * (firstCardBuster + (cardDamageValue * (1 + cardMod))) //0.2 if Buster lead, CDV lookup
            * classAttackBonus //Base damage change for classes
            * classAdvantageModifier //Effective/Resist class triangle
            * attributeModifier //Star Human Earth Beast Man
            * (0.9 + getRandomInt(0,200)/1000) //Random from 0.9 to 1.099; getRandomInt's upper bound is not included.
            * 0.23 //Magic Number TM part of the formula
            // * (1 + atkMod - defMod) //Buffs
            * criticalModifier //2 if Crit, 1 if not.
            // * extraCardModifier //2 if extra in Brave, 3.5 if extra in Q/A/B Brave, 1 if neither
            // * (1 - specialDefMod) //Some enemies have this.
            // * (1 + powerMod + selfDamageMod + (critDamageMod * isCrit) + (npDamageMod * isNP)) //power mod, sdm is nyi, cdm is crit % up/down, npDamageMod is np % up/down
            // * (1 + damageSpecialMod) //SpecialAttack, event CE etc.
            // * (1 + ((superEffectiveModifier - 1) * isSuperEffective)) //NP SuperEffective % and qualification.
            // + dmgPlusAdd //Flat increases from Waver, Divinity, etc
            // + selfDmgCutAdd //Flat decreases from Waver, mash, etc
            + (source.attack * busterChainMod); //if Buster Chain 0.2, 0 otherwise.
        damage = Math.floor(Math.max(damage,0)); 
        target.currentHP -= damage;
        console.log(`${target.name} took ${damage} damage ${isCrit}, and is at ${target.currentHP} hp now.`)
        if (target.currentHP <= 0 && playerTurn === true) {
            defeat(target);
        }
        if (target.currentHP <= 0 && playerTurn === false) {
            death(target);
        }
        
        let serverNPMod = serverNPModTable[target.class];
        if (playerTeam.includes(source)) {
            //NP GAIN SECTION
            let firstCardArts = (chosenCards[0][0] = 1) ? 1 : 0;
            let cardNpValue;
            let overkillNPAdd = (target.currentHP <= 0) ? 1.5 : 0;
            if (cardType === 2) {cardNpValue = 0}
                else cardNpValue = (cardType === 1) ? 3 : 1;
            let NpPerHit = Math.floor(
                Math.floor(
                    source.npGainAtk
                    * (firstCardArts + (cardNpValue * (1 + cardMod)))
                    * serverNPMod
                    // * (1 + source.npChargeRateMod) NYI NpGain buff
                    * criticalModifier
                )
                * overkillNPAdd
            )
            source.charge += (NpPerHit * hitCount);
            //CRIT STAR SECTION
            let firstCardQuick = (chosenCards[0][0] = 0) ? 0.2 : 0;
            let cardStarValue = cStarTable[cardType][cardPos];
            let serverStarMod = serverStarModTable[target.class];
            let overkillStarAdd = (target.currentHP <= 0) ? 0.3 : 0;
            let dropChancePerHit =
                ((source.starDrop / 100)
                + firstCardQuick + (cardStarValue * (1 + cardMod))
                + serverStarMod
                // + starDropMod
                // - enemyStarDropMod
                + ((isCrit === 1) ? 0.2 : 0)
                )
                + overkillStarAdd;
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
                * serverNPMod
                // * (1 + target.npChargeRateMod) NYI NpGain buff
                // * (1 + target.npDefChargeRateMod) NYI NpGainDef buff
            )
        );
        target.charge += (NpPerStruck * source.hitCount[cardType]);
    }
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
        enemyTarget = getRandomInt(0, playerTeam.length); //TODO: Why doesn't this work? Enemies repeat attacks against dead allies.
        while (enemyTarget.currentHP <= 0) {
            enemyTarget = getRandomInt(0, playerTeam.length);
        }
        makeDeck();
    }
}

function defeat(target) {
    console.log(`${target.name} was defeated!`);
    let targetIndex = enemyTeam.indexOf(target);
    enemyElArray[targetIndex].style.borderStyle = 'none';
    enemyElArray[targetIndex].children[0].src = `images/Gravestone.webp`;
    let i;
    for (i = 0; i < enemyTeam.length; i++) {
        if (enemyTeam[i].currentHP > 0) {
            playerTarget = i;
            break
        }
    }
    if (i >= enemyTeam.length) {
        victory();
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
    resetBtn.style.visibility = 'visible';
    renderTopMsg();
}

function victory() {
    gameState = 1;
    resetBtn.style.visibility = 'visible';
    renderTopMsg();
}

//SKILLS
function manaBurstA() {
    console.log("Mana burst!");
}

function resplendentJourneyEX() {
    console.log("Resplendent journey!");
}

function giantBeastHuntA() {
    console.log("Giant beast hunt!");
}

function knightOfTheLakeA() {
    console.log("Knight of the Lake!");
}

function eternalArmsMasteryAPlus() {
    console.log("Eternal Arms Mastery!");
}

function knightOfOwnerASharp() {
    console.log("Knight of Owner!");
}

function numeralOfTheSaintEX() {
    console.log("Numeral of the Saint!");
}

function nightlessCharismaB() {
    console.log("Nightless Charisma!");
}

function beltOfBertilakEX() {
    console.log("Belt of Bertilak!");
}

function theDesiredArgonCoin() {
    console.log("The Desired Argon Coin!");
}

function inspirationAtDeathsDoorA() {
    console.log("Inspiration at Death's Door!");
}

function counqueringTheSeaWithFriendsBSharp() {
    console.log("Conquering the Sea with Friends!");
}

function rapidWordsOfDivineA() {
    console.log("Rapid Words of Divine!");
}

function argonCoin() {
    console.log("Argon Coin!");
}

function circesTeachingA() {
    console.log("Circe's Teachings!");
}

function valorAPlus() {
    console.log("Valor A Plus!");
}

function mindsEyeFakeB() {
    console.log("Mind's Eye (Fake)!");
}

function battleContinuationA() {
    console.log("Battle Continuation!");
}

init();