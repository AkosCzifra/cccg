function createCard(name, power, image, health, mana){
    let card = document.createElement("div");
    card.className = "playing-card";
    let cardName = document.createElement("div");
    cardName.textContent = name;
    cardName.className = "card-name";
    let cardPower = document.createElement("div");
    cardPower.textContent = power;
    cardPower.className = "power-number";
    let cardImage = document.createElement("img");
    cardImage.src = `${image}`;
    let cardHealth = document.createElement("div");
    cardHealth.textContent = health;
    cardHealth.className = "health-number";
    let cardMana = document.createElement("div");
    cardMana.textContent = mana;
    cardMana.className = "mana-number";

    card.appendChild(cardPower);
    card.appendChild(cardImage);
    card.appendChild(cardHealth);
    card.appendChild(cardMana);
    card.appendChild(cardName);


    document.querySelector("#first-card").appendChild(card)
}

createCard(
    "Nemo",
    2,
    "https://pbs.twimg.com/profile_images/988980087147053058/uUQiBEyG_400x400.jpg",
    6,
    9);
