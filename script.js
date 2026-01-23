// Random Servis No & Yetki No
document.getElementById("serviceNo").innerText = Math.floor(100000 + Math.random() * 900000);
document.getElementById("serviceAuthNo").innerText = Math.floor(10000 + Math.random()*90000) + "BM" + Math.floor(Math.random()*10);

// Yeni işlem ve ödeme ekleme
function addTaskRow(){
  const tbody = document.getElementById("taskTableBody");
  const tr = document.createElement("tr");
  tr.innerHTML = `<td><input type="date"></td><td><input></td><td><input></td>`;
  tbody.appendChild(tr);
}

function addPaymentRow(){
  const tbody = document.getElementById("paymentTableBody");
  const tr = document.createElement("tr");
  tr.innerHTML = `<td><input type="date"></td><td><input></td><td><input></td><td><input></td><td><input></td>`;
  tbody.appendChild(tr);
}

// Formu Yazdır (ServisKaydet mantığı)
function printForm(){
  const printContents = document.querySelector(".form-container").innerHTML;
  const win = window.open('', '', 'height=900,width=900');
  win.document.write('<html><head><title>Servis Formu</title>');
  win.document.write('<link rel="stylesheet" href="style.css">');
  win.document.write('</head><body>');
  win.document.write(printContents);
  win.document.write('</body></html>');
  win.document.close();
  win.focus();
  win.print();
}
