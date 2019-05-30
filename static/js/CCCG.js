function createCard(cardData) {
    let card = document.createElement("div");
    card.id = "card";
    card.setAttribute("draggable", "true");
    card.addEventListener("dragstart", function () {
        dragstartHandler(event)
    }, false);
    card.className = "playing-card";
    card.setAttribute("draggable", "true");
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


    let cardSlots = document.querySelectorAll('.inHandCards > div');
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

function displayHealth(playerHealth) {
    let health = document.querySelector("#player-health");

    let image = document.createElement("img");
    image.src = "https://i.imgur.com/0XwkL3b.png";

    health.textContent = `${playerHealth}`;
    health.appendChild(image);
    health.style.backgroundSize = `${playerHealth}%`
}

function dealDamage() {
    return damagePlayer(20);
}

function damagePlayer(damage) {
    playerHealth = playerHealth - damage;
    displayHealth(playerHealth);
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

function main() {
    let cards = [
        {
            "name": "Nemo",
            "power": 2,
            "image": "https://pbs.twimg.com/profile_images/988980087147053058/uUQiBEyG_400x400.jpg",
            "health": 6,
            "mana": 9,
        },
        {
            "name": "Nemo",
            "power": 2,
            "image": "https://pbs.twimg.com/profile_images/988980087147053058/uUQiBEyG_400x400.jpg",
            "health": 6,
            "mana": 9,
        },
        {
            "name": "Nemo",
            "power": 2,
            "image": "https://pbs.twimg.com/profile_images/988980087147053058/uUQiBEyG_400x400.jpg",
            "health": 6,
            "mana": 9,
        },
        {
            "name": "Nemo",
            "power": 2,
            "image": "https://pbs.twimg.com/profile_images/988980087147053058/uUQiBEyG_400x400.jpg",
            "health": 6,
            "mana": 9,
        },
    ];

    // TODO randomize cards

    for (let card of cards.slice(0,4)) {
        createCard(card)
    }

    let playerHealth = 100;


    displayHealth(playerHealth);


    /* Combat Happens and HP gets deducted */
    let soulTap = document.createElement("button");
    soulTap.textContent = "SoulTap";
    soulTap.addEventListener("click", dealDamage);
    document.querySelector(".fight").appendChild(soulTap);
}

main();