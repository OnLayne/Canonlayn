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
  const now=new Date();
  const dt=`${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
  div.innerHTML=`${dt} | ${task} | ${desc} | ${price}`;
  const list=document.getElementById("taskList");
  list.insertBefore(div,list.firstChild);
  if(list.children.length>5) list.removeChild(list.lastChild);
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
  if(!date||!amount||!method||!collector) return alert("Tüm alanları doldurun!");
  const div=document.createElement("div");
  div.innerText=`${date} | ${amount} TL | ${method} | ${collector}`;
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
function clearSign(id){ const c=document.getElementById(id); c.getContext("2d").clearRect(0,0,c.width,c.height);}

// PDF Oluşturma – Profesyonel Kurumsal
function generatePDF(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Başlık
  doc.setFontSize(18); doc.setTextColor(42,63,84); doc.text("CANTECH Gezici Bölge Merkez Servisi",105,12,null,null,"center");

  // Tablo 1 – Servis Bilgileri
  doc.autoTable({
    startY:20,
    theme:'grid',
    headStyles:{fillColor:[42,63,84], textColor:255},
    head:[["Servis No","Tarih","Müşteri","Telefon","Adres"]],
    body:[[document.getElementById("serviceNo").value,
           document.getElementById("serviceDate").value,
           document.getElementById("customerName").value,
           document.getElementById("customerPhone").value,
           document.getElementById("customerAddress").value]]
  });

  // Tablo 2 – Cihaz Bilgileri yanyana
  doc.autoTable({
    startY:doc.lastAutoTable.finalY-20,
    margin:{left:120},
    theme:'grid',
    headStyles:{fillColor:[100,149,237], textColor:255},
    head:[["Cihaz Türü","Marka","Model","Seri No","Arıza"]],
    body:[[document.getElementById("deviceType").value,
           document.getElementById("brand").value,
           document.getElementById("model").value,
           document.getElementById("serial").value,
           document.getElementById("issue").value]]
  });

  // Tablo 3 – Servis Durumu
  const status=document.getElementById("serviceStatus").value;
  doc.autoTable({startY:doc.lastAutoTable.finalY+5, head:[["SERVİS DURUMU"]], body:[[status]],
    headStyles:{fillColor:[192,57,43], textColor:255}, styles:{halign:'center', fontStyle:'bold'}});

  // Tablo 4 – Son 5 İşlem Başlık
  doc.autoTable({startY:doc.lastAutoTable.finalY+5, head:[["SERVİSTE YAPILAN SON 5 İŞLEM"]], body:[[""]],
    headStyles:{fillColor:[42,63,84], textColor:255}});

  // Tablo 5 – Yapılan İşlemler Detayı
  const tasks=Array.from(document.getElementById("taskList").children).map(t=>t.innerText.split("|").map(x=>x.trim()));
  if(tasks.length>0){
    doc.autoTable({
      startY:doc.lastAutoTable.finalY+2,
      head:[["Tarih-Saat","İşlem","Açıklama","Müşteriye Verilen Fiyat"]],
      body:tasks,
      alternateRowStyles:{fillColor:[242,242,242]}
    });
  }

  // Tablo 6 – Para Hareketleri
  const pays=Array.from(document.getElementById("paymentList").children).map(p=>p.innerText.split("|").map(x=>x.trim()));
  if(pays.length>0){
    doc.autoTable({
      startY:doc.lastAutoTable.finalY+2,
      head:[["Tarih","Tutar","Ödeme Şekli","Tahsil Eden"]],
      body:pays,
      headStyles:{fillColor:[42,63,84], textColor:255},
      alternateRowStyles:{fillColor:[242,242,242]}
    });
  }

  // Tablo 7 ve 8 – İmzalar
  const c1=document.getElementById("customerSign").toDataURL("image/png");
  const c2=document.getElementById("techSign").toDataURL("image/png");
  doc.addImage(c1,"PNG",140,doc.lastAutoTable.finalY+10,50,30);
  doc.addImage(c2,"PNG",10,doc.lastAutoTable.finalY+10,50,30);

  // Yasal metin
  const legalText=`1- Yapılan işlemler 1 yıl garanti altındadır.\n2- Bu servis formu fatura yerine geçmez.\n3- Cayma bedeli iadesi yoktur.\n4- Takılan parçanın geri iadesi yoktur.\nServis istasyonlarının sorumlulukları...`;
  doc.setFontSize(8); doc.setTextColor(50,50,50); doc.text(legalText,10,doc.lastAutoTable.finalY+45);

  doc.save("servis_formu.pdf");
}
