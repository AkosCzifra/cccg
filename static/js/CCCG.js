function createCard(name, power, image, health, mana, position){
    let card = document.createElement("div");
    card.id = "card";
    card.setAttribute("draggable", "true");
    card.addEventListener("dragstart", function () {dragstartHandler(event)}, false);
    card.className = "playing-card";
    card.setAttribute("draggable", "true");
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

    card.dataset.power = power;
    card.dataset.health = health;
    card.dataset.mana = mana;


    document.querySelector(position).appendChild(card)
}

createCard(

    "Nemo",
    2,
    "https://pbs.twimg.com/profile_images/988980087147053058/uUQiBEyG_400x400.jpg",
    6,
    9,
    "#first-card");

createCard(

    "Nemo",
    2,
    "https://pbs.twimg.com/profile_images/988980087147053058/uUQiBEyG_400x400.jpg",
    6,
    9,
    "#second-card");

createCard(

    "Nemo",
    2,
    "https://pbs.twimg.com/profile_images/988980087147053058/uUQiBEyG_400x400.jpg",
    6,
    9,
    "#third-card");

createCard(

    "Nemo",
    2,
    "https://pbs.twimg.com/profile_images/988980087147053058/uUQiBEyG_400x400.jpg",
    6,
    9,
    "#fourth-card");

let playerHealth = 100;

function displayHealth(playerHealth){
    let health = document.querySelector("#player-health");

    let image = document.createElement("img");
    image.src = "https://i.imgur.com/0XwkL3b.png";

    health.textContent = `${playerHealth}`;
    health.appendChild(image);
    health.style.backgroundSize = `${playerHealth}%`
}

displayHealth(playerHealth);


/* Combat Happens and HP gets deducted */
let soulTap = document.createElement("button");
soulTap.textContent = "SoulTap";
soulTap.addEventListener("click", dealDamage);
document.querySelector(".fight").appendChild(soulTap);

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
      e.dataTransfer.dropEffect = "none";}
  else {e.dataTransfer.dropEffect = "all";}
}

function dropHandler (e) {
  e.preventDefault();
  let id = e.dataTransfer.getData("id");
  let dragged = document.getElementById(id);
  e.target.appendChild(dragged);
  dragged.setAttribute("draggable", "false");
  dragged.style.cursor = "not-allowed";
}
