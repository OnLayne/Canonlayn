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

  // İmza Sistemi
  function setupSignature(id){
    const canvas=document.getElementById(id);
    const ctx=canvas.getContext("2d");

    function resize(){
      const ratio=window.devicePixelRatio||1;
      const rect=canvas.getBoundingClientRect();
      canvas.width=rect.width*ratio;
      canvas.height=rect.height*ratio;
      ctx.scale(ratio,ratio);
      ctx.lineWidth=2;
      ctx.lineCap="round";
    }
    resize();
    window.addEventListener("resize",resize);

    let drawing=false;

    function getPos(e){
      const rect=canvas.getBoundingClientRect();
      const touch=e.touches?e.touches[0]:e;
      return {
        x:touch.clientX-rect.left,
        y:touch.clientY-rect.top
      };
    }

    function start(e){
      drawing=true;
      const pos=getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x,pos.y);
    }

    function move(e){
      if(!drawing)return;
      e.preventDefault();
      const pos=getPos(e);
      ctx.lineTo(pos.x,pos.y);
      ctx.stroke();
    }

    function end(){drawing=false;}

    canvas.addEventListener("mousedown",start);
    canvas.addEventListener("mousemove",move);
    canvas.addEventListener("mouseup",end);
    canvas.addEventListener("mouseleave",end);

    canvas.addEventListener("touchstart",start,{passive:false});
    canvas.addEventListener("touchmove",move,{passive:false});
    canvas.addEventListener("touchend",end);
  }

  setupSignature("customerSign");
  setupSignature("techSign");

});

function printForm(){
  window.print();
}


// ===== MOBİL UYUMLU PDF =====

async function downloadPDF(){

  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("PDF kütüphanesi yüklenemedi.");
    return;
  }

  const element = document.querySelector(".a4-page");

  if(!element){
    alert("PDF alanı bulunamadı.");
    return;
  }

  const canvas = await html2canvas(element,{
    scale:2,
    useCORS:true
  });

  const imgData = canvas.toDataURL("image/jpeg",1.0);

  const pdf = new window.jspdf.jsPDF("p","mm","a4");

  const pageWidth = 210;
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData,"JPEG",0,0,imgWidth,imgHeight);

  pdf.save("Servis-Formu.pdf");
}

}
  
  const pdfBlob = pdf.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);

  window.open(pdfUrl, "_blank");
}
