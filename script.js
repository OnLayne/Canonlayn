// Random servis numarası ve yetki no
document.getElementById("serviceNo").innerText = Math.floor(100000 + Math.random() * 900000);
document.getElementById("serviceAuthNo").innerText = Math.floor(10000 + Math.random()*90000) + "BM" + Math.floor(Math.random()*10);

// Yazdırma fonksiyonu
function printForm(){
  const printContents = document.getElementById("printForm").innerHTML;
  const win = window.open('', '', 'height=800,width=800');
  win.document.write('<html><head><title>Yazdır</title>');
  win.document.write('<link rel="stylesheet" href="style.css">');
  win.document.write('</head><body>');
  win.document.write(printContents);
  win.document.write('</body></html>');
  win.document.close();
  win.focus();
  win.print();
}
