document.getElementById("serviceNo").innerText =
  Math.floor(100000 + Math.random() * 900000);

document.getElementById("serviceAuthNo").innerText =
  Math.floor(10000 + Math.random() * 90000) + "BM";

function addTaskRow() {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input type="date"></td>
    <td><input></td>
    <td><input></td>
    <td><input></td>`;
  document.getElementById("taskTableBody").appendChild(tr);
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
}

function clearSign(id) {
  const c = document.getElementById(id);
  c.getContext("2d").clearRect(0, 0, c.width, c.height);
}

function enableSign(id) {
  const c = document.getElementById(id);
  const ctx = c.getContext("2d");
  let draw = false;

  c.addEventListener("touchstart", e => {
    draw = true;
    ctx.beginPath();
  });
  c.addEventListener("touchmove", e => {
    if (!draw) return;
    e.preventDefault();
    const r = c.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineTo(e.touches[0].clientX - r.left, e.touches[0].clientY - r.top);
    ctx.stroke();
  });
  c.addEventListener("touchend", () => draw = false);
}

enableSign("customerSign");
enableSign("techSign");

function printForm() {
  window.print();
}
