
function createCard(cardData, hand) {
    let card = document.createElement("div");
    card.id = "card" + cardData.name;
    if (hand === ".inHandCards") {
        card.setAttribute("draggable", "true");
        card.addEventListener("dragstart", function () {
        dragstartHandler(event)
    }, false);}
    else if (hand === ".enemyCards") {card.setAttribute("draggable", "false"); card.style.cursor = "not-allowed";}
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

function displayHealth() {
    let health = document.querySelector("#player-health");
    let playerHealth = health.dataset.health;

    let image = document.createElement("img");
    image.src = "https://i.imgur.com/0XwkL3b.png";

    health.textContent = playerHealth;
    health.appendChild(image);
    health.style.backgroundSize = `${playerHealth}%`
}


function damagePlayer(damage) {
    let currentHealth = document.querySelector("#player-health");
    currentHealth.dataset.health = (parseInt(currentHealth.dataset.health) - damage).toString();
    displayHealth();
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
    try {
        let damageToPlayer = 0,
            attackHp = parseInt(attacker.dataset.health),
            attackDmg = parseInt(attacker.dataset.power),
            defendHp = parseInt(defender.dataset.health),
            defendDmg = parseInt(defender.dataset.power);
        if (attackDmg >= defendHp)
        {defendHp = (defendHp - attackDmg); damageToPlayer = (defendHp * -1) }
        else if (attackDmg < defendHp) {defendHp = (defendHp - attackDmg);}

        if (defendDmg >= attackHp) {attackHp = (attackHp - defendDmg);}
        else if (defendDmg < attackHp) {attackHp = (attackHp - defendDmg);}

        if (attackHp <= 0) {attacker.parentElement.removeChild(attacker)}
        if (defendHp <= 0) {defender.parentElement.removeChild(defender)}
        defender.dataset.health = defendHp.toString();
        attacker.dataset.health = attackHp.toString();
        return damageToPlayer;
    }
    catch (error) {
        console.error("nothing happened keep playing!")}
    finally {return 0;}

}


function doBattlePhase() {
    let defenders = document.querySelectorAll(".defender");
    let noDefenderDamage = 0;
    for (let defender of defenders) {
        if (defender.firstChild == null) {
            for (let card of enemyCards) {
                noDefenderDamage += card.power;}}}
    if (noDefenderDamage > 0) {damagePlayer(noDefenderDamage / 4)}

    let attackerOne = document.querySelector("#enemy-card-one").firstChild,
        attackerTwo = document.querySelector("#enemy-card-two").firstChild,
        attackerThree = document.querySelector("#enemy-card-three").firstChild,
        attackerFour = document.querySelector("#enemy-card-four").firstChild,
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
    if (damageToPlayer > 0) {damagePlayer(damageToPlayer)}


}

function iniBattle() {
    const fightButton = document.querySelector(".fight");
    fightButton.addEventListener("click", doBattlePhase);
}


function main() {
    // TODO randomize cards
    for (let card of cards.slice(0, 4)) {
        createCard(card, ".inHandCards")
    }
    for (let enemyCard of enemyCards.slice(0, 4)) {
        createCard(enemyCard, ".enemyCards");
    }

    displayHealth();
    iniDragAndDrop();
    iniBattle();
};

main();