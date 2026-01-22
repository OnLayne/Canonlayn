
// Cihaz Türü -> Marka
const deviceBrands = {
  Kombi:["Vaillant","Demirdöküm","Baymak","Bosch","Buderus","E.C.A","Ferroli","Ariston"],
  Klima:["Daikin","Mitsubishi","LG","Samsung","Vestel","Arçelik","Bosch","Baymak"],
  Televizyon:["Samsung","LG","Sony","Philips","Vestel","Arçelik","Beko","Grundig"],
  Buzdolabı:["Arçelik","Beko","Bosch","Siemens","Profilo","Vestel","Samsung","LG"],
  "Çamaşır Makinesi":["Arçelik","Beko","Bosch","Siemens","Profilo","Vestel","Samsung","LG"],
  "Bulaşık Makinesi":["Arçelik","Beko","Bosch","Siemens","Profilo","Vestel","Samsung","LG"]
};
function updateBrands(){
  const type=document.getElementById("deviceType").value;
  const brandSelect=document.getElementById("brand");
  brandSelect.innerHTML="<option>Marka Seç</option>";
  if(!deviceBrands[type]) return;
  deviceBrands[type].forEach(b=>{
    const opt=document.createElement("option");
    opt.value=b; opt.textContent=b;
    brandSelect.appendChild(opt);
  });
}

// Yapılan İşlemler
function addTask(){
  const task=document.getElementById("taskSelect").value;
  const desc=document.getElementById("taskDesc").value;
  const price=document.getElementById("taskPrice").value;
  if(!task) return alert("İşlem seçiniz!");
  const div=document.createElement("div");
  div.innerHTML=`<strong>GEZİCİ BÖLGE MERKEZ :</strong> ${task}<br>
                 <strong>Yapılan İşlemler :</strong> ${desc}<br>
                 <strong>Müşteriye Verilen Fiyat :</strong> ${price}`;
  document.getElementById("taskList").appendChild(div);
  document.getElementById("taskSelect").value="";
  document.getElementById("taskDesc").value="";
  document.getElementById("taskPrice").value="";
}

// Para Hareketleri
function addPayment(){
  const date=document.getElementById("paymentDate").value;
  const amount=document.getElementById("paymentAmount").value;
  const method=document.getElementById("paymentMethod").value;
  const collector=document.getElementById("paymentCollector").value;
  if(!date || !amount || !method || !collector) return alert("Tüm alanları doldurun!");
  const div=document.createElement("div");
  div.innerHTML=`${date} - ${amount} TL - ${method} - ${collector}`;
  document.getElementById("paymentList").appendChild(div);
  document.getElementById("paymentDate").value="";
  document.getElementById("paymentAmount").value="";
  document.getElementById("paymentMethod").value="";
  document.getElementById("paymentCollector").value="";
}

// İmzalar
function initSignature(canvasId){
  const c=document.getElementById(canvasId);
  const ctx=c.getContext("2d"); ctx.lineWidth=2;
  let drawing=false;
  c.addEventListener("touchstart",()=>drawing=true);
  c.addEventListener("touchend",()=>{drawing=false; ctx.beginPath();});
  c.addEventListener("touchmove",e=>{
    if(!drawing) return;
    const t=e.touches[0]; const r=c.getBoundingClientRect();
    ctx.lineTo(t.clientX-r.left,t.clientY-r.top); ctx.stroke(); ctx.beginPath(); ctx.moveTo(t.clientX-r.left,t.clientY-r.top);
  });
}
initSignature("customerSign"); initSignature("techSign");
function clearSign(id){
  const c=document.getElementById(id);
  c.getContext("2d").clearRect(0,0,c.width,c.height);
}

// PDF
async function generatePDF(){
  const { jsPDF } = window.jspdf;
  const pdf=new jsPDF();
  let y=10;
  pdf.setFontSize(16); pdf.text("CANTECH Gezici Bölge Merkez Servisi",105,y,null,null,"center"); y+=10;
  
  function addText(label,id){pdf.setFontSize(12); pdf.text(`${label}: ${document.getElementById(id).value}`,10,y); y+=7;}
  addText("Servis No","serviceNo"); addText("Servis Tarihi","serviceDate");
  addText("Müşteri Ad Soyad","customerName"); addText("Telefon","customerPhone");
  addText("Adres","customerAddress"); addText("Vergi No","taxNo");
  addText("Müsait Zaman","availableTime"); addText("Operatör Notu","operatorNote");
  addText("Cihaz Türü","deviceType"); addText("Marka","brand"); addText("Model","model");
  addText("Seri No","serial"); addText("Arıza","issue"); addText("Servis Durumu","serviceStatus");

  // Yapılan işlemler
  const tasks=document.getElementById("taskList").children;
  if(tasks.length>0){pdf.setFontSize(12); pdf.text("SERVİSTE YAPILAN İŞLEMLER:",10,y); y+=7;}
  for(let t of tasks){pdf.text(t.innerText,10,y); y+=10;}

  // Para Hareketleri
  const pays=document.getElementById("paymentList").children;
  if(pays.length>0){pdf.setFontSize(12); pdf.text("PARA HAREKETLERİ:",10,y); y+=7;}
  for(let p of pays){pdf.text(p.innerText,10,y); y+=7;}

  // İmzalar
  const c1=document.getElementById("customerSign").toDataURL("image/png");
  const c2=document.getElementById("techSign").toDataURL("image/png");
  pdf.addImage(c1,"PNG",10,y,80,40); pdf.addImage(c2,"PNG",110,y,80,40); y+=45;

  // Yasal metin
  const legalText=`1- Yapılan işlemler 1 yıl garanti altındadır.
2- Bu servis formu fatura yerine geçmez.
3- Cayma bedeli iadesi yoktur.
4- Takılan parçanın geri iadesi yoktur.
(5) Servis istasyonlarının sorumlulukları...`;
  pdf.setFontSize(8); pdf.text(legalText,10,y);

  pdf.save("servis_formu.pdf");
}