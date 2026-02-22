document.addEventListener("DOMContentLoaded", () => {

  // Servis No
  document.getElementById("serviceNo").textContent =
    Math.floor(100000 + Math.random()*900000);

  // Yetki No
  function generateAuthNo(){
    return "FMS-" + Math.floor(10000 + Math.random()*90000);
  }
  document.getElementById("serviceAuthNo").textContent = generateAuthNo();

  // Doküman No
  document.getElementById("docNo").textContent =
    "FMS-2026-" + Math.floor(1000 + Math.random()*9000);

  // AutoGrow
  function autoGrow(el){
    el.style.height="auto";
    el.style.height=el.scrollHeight+"px";
  }

  document.querySelectorAll(".auto-grow").forEach(el=>{
    autoGrow(el);
    el.addEventListener("input",()=>autoGrow(el));
  });

  // Servis Durumu Vurgu
  const statusSelect=document.getElementById("serviceStatusSelect");
  function updateStatusHighlight(){
    statusSelect.classList.add("status-selected");
  }
  statusSelect.addEventListener("change",updateStatusHighlight);
  updateStatusHighlight();

  // Print öncesi textarea düz metin
  window.addEventListener("beforeprint",()=>{
    const desc=document.getElementById("serviceDesc");
    document.querySelector(".desc-print").textContent=desc.value;
  });

  // ===== İMZA SİSTEMİ (DÜZELTİLMİŞ) =====
  function setupSignature(id){
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");

    function resize(){
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;

      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(ratio, ratio);

      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";
    }

    resize();
    window.addEventListener("resize", resize);

    let drawing = false;

    function getPos(e){
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches ? e.touches[0] : e;

      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }

    function start(e){
      drawing = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    function move(e){
      if(!drawing) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    function end(){
      drawing = false;
    }

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mouseleave", end);

    canvas.addEventListener("touchstart", start, { passive:false });
    canvas.addEventListener("touchmove", move, { passive:false });
    canvas.addEventListener("touchend", end);
  }

  setupSignature("customerSign");
  setupSignature("techSign");

});


// ===== PRINT =====
function printForm(){
  window.print();
}


// ===== PDF İNDİRME (MOBİL UYUMLU) =====
async function downloadPDF(){

  const element = document.querySelector(".a4-page");

  if(!element){
    alert("PDF alanı bulunamadı.");
    return;
  }

  // Canvas üret
  const canvas = await html2canvas(element,{
    scale:3,
    useCORS:true,
    backgroundColor:"#ffffff",
    scrollY:-window.scrollY
  });

  const pdf = new window.jspdf.jsPDF({
    orientation:"portrait",
    unit:"mm",
    format:"a4"
  });

  const pageWidth = 210;
  const pageHeight = 297;

  // px → mm oranı
  const pxFullHeight = canvas.height;
  const pxPageHeight = Math.floor(canvas.width * (pageHeight / pageWidth));

  let pageCanvas = document.createElement("canvas");
  let pageCtx = pageCanvas.getContext("2d");

  pageCanvas.width = canvas.width;
  pageCanvas.height = pxPageHeight;

  let renderedHeight = 0;
  let pageNumber = 0;

  while(renderedHeight < pxFullHeight){

    // Sayfa canvas'ını temizle
    pageCtx.fillStyle = "#ffffff";
    pageCtx.fillRect(0,0,pageCanvas.width,pageCanvas.height);

    // Ana canvas’tan ilgili bölümü kes
    pageCtx.drawImage(
      canvas,
      0,
      renderedHeight,
      canvas.width,
      pxPageHeight,
      0,
      0,
      canvas.width,
      pxPageHeight
    );

    const imgData = pageCanvas.toDataURL("image/png");

    if(pageNumber > 0){
      pdf.addPage();
    }

    // Arka planı beyaza boya (gri çizgi engeli)
    pdf.setFillColor(255,255,255);
    pdf.rect(0,0,pageWidth,pageHeight,"F");

    pdf.addImage(imgData,"PNG",0,0,pageWidth,pageHeight);

    renderedHeight += pxPageHeight;
    pageNumber++;
  }

  pdf.save("Servis-Formu.pdf");
}
