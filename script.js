document.getElementById("serviceNo").innerText =
Math.floor(100000 + Math.random()*900000);

document.getElementById("serviceAuthNo").innerText =
Math.floor(10000 + Math.random()*90000);

function addTaskRow(){
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input type="date"></td>
    <td><input></td>
    <td><textarea class="desc"></textarea></td>
    <td><input></td>
  `;
  taskTableBody.appendChild(tr);
}

function addPaymentRow(){
  const tr=document.createElement("tr");
  tr.innerHTML=`
    <td><input type="date"></td>
    <td><input></td>
    <td><input></td>
    <td><input></td>
    <td><input></td>
  `;
  paymentTableBody.appendChild(tr);
}

function printForm(){
  window.print();
}
