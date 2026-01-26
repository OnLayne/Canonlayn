document.getElementById("serviceNo").innerText =
  Math.floor(100000 + Math.random() * 900000);
document.getElementById("serviceAuthNo").innerText =
  Math.floor(10000 + Math.random() * 90000) + "BM";

function addTaskRow() {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input type="date"></td>
    <td><input></td>
    <td><textarea class="long-text"></textarea></td>
    <td><input></td>`;
  document.getElementById("taskTableBody").appendChild(tr);
  saveForm();
}

function addPaymentRow() {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input type="date"></td>
    <td><input></td>
    <td><input></td>
    <td><input></td>
    <td><input></td>`;
  document.getElementById("paymentTableBody").appendChild(tr);
  saveForm();
}

function enableSign(id) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;

  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  ctx.scale(ratio, ratio);

  let draw = false;

  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    draw = true;
    ctx.beginPath();
  });

  canvas.addEventListener("touchmove", e => {
    if (!draw) return;
    e.preventDefault();
    const r = canvas.getBoundingClientRect();
    const t = e.touches[0];
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineTo(t.clientX - r.left, t.clientY - r.top);
    ctx.stroke();
  });

  canvas.addEventListener("touchend", () => {
    draw = false;
    saveForm();
  });
}

function clearSign(id) {
  const c = document.getElementById(id);
  c.getContext("2d").clearRect(0, 0, c.width, c.height);
  saveForm();
}

function saveForm() {
  const data = {};
  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.id) data[el.id] = el.value;
  });
  data.customerSign = customerSign.toDataURL();
  data.techSign = techSign.toDataURL();
  localStorage.setItem("cantechForm", JSON.stringify(data));
}

function loadForm() {
  const data = JSON.parse(localStorage.getItem("cantechForm"));
  if (!data) return;
  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (data[el.id]) el.value = data[el.id];
  });
  restoreCanvas("customerSign", data.customerSign);
  restoreCanvas("techSign", data.techSign);
}

function restoreCanvas(id, img) {
  if (!img) return;
  const c = document.getElementById(id);
  const ctx = c.getContext("2d");
  const i = new Image();
  i.onload = () => ctx.drawImage(i, 0, 0);
  i.src = img;
}

window.onload = () => {
  loadForm();
  enableSign("customerSign");
  enableSign("techSign");
};
