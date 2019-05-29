
function dragstartHandler(e) {
  console.log("dragstart");
  e.dataTransfer.setData("text/plain", e.target.id);
  e.dataTransfer.setData("img/png", e.target.id);
  e.dataTransfer.dropEffect = "move";
}

function dragoverHandler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

function dropHandler (e) {
  e.preventDefault();
  let data = e.dataTransfer.getData("text/plain"),
      image = e.dataTransfer.getData("img/png");
  e.target.appendChild(document.getElementById(data));
  e.target.appendChild(document.getElementById(image));
  console.log("dragdone");
}

