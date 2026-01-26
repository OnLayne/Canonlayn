// Random Servis No & Yetki No
document.getElementById("serviceNo").innerText = Math.floor(100000 + Math.random() * 900000);
document.getElementById("serviceAuthNo").innerText = Math.floor(10000 + Math.random()*90000) + "BM" + Math.floor(Math.random()*10);

// İşlem ve ödeme ekleme
function addTaskRow(){
  const tbody = document.getElementById("taskTableBody");
  const tr = document.createElement("tr");
  tr.innerHTML = `<td><input type="date"></td><td><input></td><td><input></td><td><input></td>`;
  tbody.appendChild(tr);
}

function addPaymentRow(){
  const tbody = document.getElementById("paymentTableBody");
  const tr = document.createElement("tr");
  tr.innerHTML = `<td><input type="date"></td><td><input></td><td><input></td><td><input></td><td><input></td>`;
  tbody.appendChild(tr);
}

// İmzayı temizle
function clearSign(id){
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

// İmza çizimi (iOS uyumlu)
function enableSign(id){
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext('2d');
  let drawing=false;

  canvas.addEventListener('touchstart', e => { drawing=true; draw(e); });
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', e => drawing=false);

  function draw(e){
    if(!drawing) return;
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    ctx.lineWidth=2;
    ctx.lineCap='round';
    ctx.strokeStyle='black';
    ctx.lineTo(touch.clientX-rect.left, touch.clientY-rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(touch.clientX-rect.left, touch.clientY-rect.top);
  }
}

enableSign('customerSign');
enableSign('techSign');

// Yazdırma ve PDF uyumlu logo (büyük)
function printForm(){
  const container = document.querySelector('.form-container').cloneNode(true);

  // Canvas'ları resim olarak ekle
  const customerCanvas = document.getElementById('customerSign');
  const techCanvas = document.getElementById('techSign');

  const custImg = document.createElement('img');
  custImg.src = customerCanvas.toDataURL();
  custImg.style.width='250px';
  container.querySelector('#customerSign').replaceWith(custImg);

  const techImg = document.createElement('img');
  techImg.src = techCanvas.toDataURL();
  techImg.style.width='250px';
  container.querySelector('#techSign').replaceWith(techImg);

  // Logo boyutu yazdırmada büyütüldü
  const logo = container.querySelector('.logo');
  logo.style.width = 'auto';
  logo.style.maxWidth = '450px';  // A4 için büyük
  logo.style.height = 'auto';
  logo.style.display = 'block';
  logo.style.margin = '0 auto 15px';

  const win = window.open('', '', 'height=900,width=900');
  win.document.write('<html><head><title>Servis Formu</title>');
  win.document.write('<link rel="stylesheet" href="style.css">');
  win.document.write('<style>@media print{.logo{max-width:450px !important;}}</style>');
  win.document.write('</head><body>');
  win.document.write(container.outerHTML);
  win.document.write('</body></html>');
  win.document.close();
  win.focus();
  win.print();
}
