function idGenerator(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function createCard(cardData, hand) {
    let card = document.createElement("div");
    card.id = idGenerator(15);
    if (hand === ".inHandCards") {
        card.setAttribute("draggable", "true");
        card.addEventListener("dragstart", function () {
            dragstartHandler(event)
        }, false);
    } else if (hand === ".enemyCards") {
        card.setAttribute("draggable", "false");
        card.style.cursor = "not-allowed";
    }
    card.className = "playing-card";
    let cardName = document.createElement("div");
    cardName.textContent = cardData.name;
    cardName.className = "card-name";
    let cardPower = document.createElement("div");
    cardPower.textContent = cardData.power;
    cardPower.className = "power-number";
    let cardImage = document.createElement("img");
    cardImage.src = `${cardData.image}`;
    cardImage.ondragstart = function () {
        return false;
    };
    let cardHealth = document.createElement("div");
    cardHealth.textContent = cardData.health;
    cardHealth.className = "health-number";
    let cardMana = document.createElement("div");
    cardMana.textContent = cardData.mana;
    cardMana.className = "mana-number";

    card.appendChild(cardPower);
    card.appendChild(cardImage);
    card.appendChild(cardHealth);
    card.appendChild(cardMana);
    card.appendChild(cardName);

    card.dataset.power = cardData.power;
    card.dataset.health = cardData.health;
    card.dataset.mana = cardData.mana;

    let cardSlots = document.querySelectorAll(`${hand} > div`);
    let emptySlot = null;
    for (let slot of cardSlots) {
        if (slot.innerHTML.trim() === "") {
            emptySlot = slot;
            break;
        }
    }

    if (emptySlot) {
        emptySlot.appendChild(card);
    }
}

function displayPlayerHealth() {
    let health = document.querySelector("#player-health");
    let playerHealth = health.dataset.health;

    let image = document.createElement("img");
    image.src = "https://i.imgur.com/0XwkL3b.png";

    health.textContent = playerHealth;
    health.appendChild(image);
    health.style.backgroundSize = `${playerHealth * 2}%`
}

function displayEnemyHealth() {
    let health = document.querySelector("#enemy-health");
    let playerHealth = health.dataset.health;

    let image = document.createElement("img");
    image.src = "https://i.imgur.com/0XwkL3b.png";

    health.textContent = playerHealth;
    health.appendChild(image);
    health.style.backgroundSize = `${playerHealth * 2}%`
}


function damagePlayer(damage) {
    let currentHealth = document.querySelector("#player-health");
    currentHealth.dataset.health = (parseInt(currentHealth.dataset.health) - damage).toString();
    displayPlayerHealth();
    alert("You have been damaged!");
}


function dragstartHandler(e) {
    e.dataTransfer.setData("id", e.target.id);
}

function dragoverHandler(e) {
    e.preventDefault();
    if (e.target.getAttribute("draggable") === true) {
        e.dataTransfer.dropEffect = "none";
    } else {
        e.dataTransfer.dropEffect = "all";
    }
}

function dropHandler(e) {
    e.preventDefault();
    let id = e.dataTransfer.getData("id");
    let dragged = document.getElementById(id);
    e.target.appendChild(dragged);
    dragged.setAttribute("draggable", "false");
    dragged.style.cursor = "not-allowed";
}


function iniDragAndDrop() {
    let combatSlots = document.querySelectorAll(".playerCards> div");
    for (let slot of combatSlots) {
        slot.addEventListener('drop', dropHandler);
        slot.addEventListener('dragover', dragoverHandler);
    }
}

function defendingPlayer(attacker, defender) {
        let damageToPlayer = 0,
        attackHp = parseInt(attacker.dataset.health),
        attackDmg = parseInt(attacker.dataset.power),
        defendHp = 0,
        defendDmg = 0;
        if (defender == null){
            defendHp = 0}
        else {
            defendHp = parseInt(defender.dataset.health);
        }
        if (defender == null) {
            defendDmg = 0}
        else {
            defendDmg = parseInt(defender.dataset.power);
        }
        if (attackDmg >= defendHp) {
            defendHp = (defendHp - attackDmg);
            damageToPlayer = (defendHp * -1)
        } else if (attackDmg < defendHp) {
            defendHp = (defendHp - attackDmg);
        }

        if (defendDmg >= attackHp) {
            attackHp = (attackHp - defendDmg);
        } else if (defendDmg < attackHp) {
            attackHp = (attackHp - defendDmg);
        }

        if (attackHp <= 0) {
            attacker.parentElement.removeChild(attacker)
        }
        else{
            attacker.children[2].innerHTML = attackHp.toString();
        }

        if (defender == null) {}
        else if (defendHp <= 0) {
            defender.parentElement.removeChild(defender)
        }
        else {
            defender.children[2].innerHTML = defendHp.toString();
        }

        if (defender == null) {}
        else {
            defender.dataset.health = defendHp.toString();
        }
        attacker.dataset.health = attackHp.toString();

        return damageToPlayer;
}


function doBattlePhase() {
    let attackerOne = document.querySelector("#enemy-card-1").firstChild,
        attackerTwo = document.querySelector("#enemy-card-2").firstChild,
        attackerThree = document.querySelector("#enemy-card-3").firstChild,
        attackerFour = document.querySelector("#enemy-card-4").firstChild,
        defenderOne = document.querySelector("#position-1").firstChild,
        defenderTwo = document.querySelector("#position-2").firstChild,
        defenderThree = document.querySelector("#position-3").firstChild,
        defenderFour = document.querySelector("#position-4").firstChild;

    let damageToPlayer = 0;
    damageToPlayer += defendingPlayer(attackerOne, defenderOne);
    damageToPlayer += defendingPlayer(attackerTwo, defenderTwo);
    damageToPlayer += defendingPlayer(attackerThree, defenderThree);
    damageToPlayer += defendingPlayer(attackerFour, defenderFour);
    console.log(damageToPlayer);
    if (damageToPlayer > 0) {
        damagePlayer(damageToPlayer)
    }

    for (let i = 0; i < 4; i++) {
        createCard(cards[Math.floor(Math.random() * cards.length)], ".inHandCards")
    }
    for (let i = 0; i < 4; i++) {
        createCard(enemyCards[Math.floor(Math.random() * enemyCards.length)], ".enemyCards")
    }

}


function iniBattle() {
    const fightButton = document.querySelector(".fight");
    fightButton.addEventListener("click", doBattlePhase);
}


function main() {
    // TODO randomize cards
    // for (let card of cards.slice(0, 4)) {
    //     createCard(card, ".inHandCards")
    // }
    // for (let enemyCard of enemyCards.slice(0, 4)) {
    //     createCard(enemyCard, ".enemyCards");
    // }
    // let randomCard = cards[Math.floor(Math.random()*cards.length)];
    for (let i = 0; i < 4; i++) {
        createCard(cards[Math.floor(Math.random() * cards.length)], ".inHandCards")
    }
    for (let i = 0; i < 4; i++) {
        createCard(enemyCards[Math.floor(Math.random() * enemyCards.length)], ".enemyCards")
    }

    displayPlayerHealth();
    displayEnemyHealth();
    iniDragAndDrop();
    iniBattle();
};

main();