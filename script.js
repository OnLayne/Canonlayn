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

  document.body.classList.add("pdf-mode");

  const canvas = await html2canvas(element,{
    scale:3,
    useCORS:true,
    backgroundColor:"#ffffff"
  });

  const pdf = new window.jspdf.jsPDF({
    orientation:"portrait",
    unit:"mm",
    format:"a4"
  });

  const pageWidth = 210;
  const pageHeight = 297;

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pageCanvas = document.createElement("canvas");
  const pageCtx = pageCanvas.getContext("2d");

  const pageHeightPx = Math.floor(canvas.width * pageHeight / pageWidth);

  pageCanvas.width = canvas.width;
  pageCanvas.height = pageHeightPx;

  let renderedHeight = 0;
  let pageNumber = 0;

  while(renderedHeight < canvas.height){

    pageCtx.clearRect(0,0,pageCanvas.width,pageCanvas.height);

    pageCtx.drawImage(
      canvas,
      0,
      renderedHeight,
      canvas.width,
      pageHeightPx,
      0,
      0,
      canvas.width,
      pageHeightPx
    );

    if(pageNumber > 0){
      pdf.addPage();
    }

    const imgData = pageCanvas.toDataURL("image/jpeg",1.0);

    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      imgWidth,
      pageHeight
    );

    renderedHeight += pageHeightPx;
    pageNumber++;
  }

  pdf.save("Servis-Formu.pdf");

  document.body.classList.remove("pdf-mode");
}
