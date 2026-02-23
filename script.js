document.addEventListener("DOMContentLoaded", () => {

  // RANDOM NUMARALAR
  document.getElementById("serviceNo").textContent =
    Math.floor(100000 + Math.random()*900000);

  document.getElementById("serviceAuthNo").textContent =
    "FMS-" + Math.floor(10000 + Math.random()*90000);

  document.getElementById("docNo").textContent =
    "FMS-2026-" + Math.floor(1000 + Math.random()*9000);

  // AUTOGROW
  document.querySelectorAll(".auto-grow").forEach(el=>{
    el.addEventListener("input",()=>{
      el.style.height="auto";
      el.style.height=el.scrollHeight+"px";
    });
  });

  // SERVİS DURUMU VURGU
  const status = document.getElementById("serviceStatusSelect");
  status.addEventListener("change",()=>{
    status.classList.add("status-selected");
  });

  // RETINA İMZA
  function setupSignature(id){
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");

    function resize(){
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      ctx.scale(ratio, ratio);
      ctx.lineWidth = 2;
    }

    resize();
    window.addEventListener("resize", resize);

    let drawing=false;

    function getPos(e){
      const rect=canvas.getBoundingClientRect();
      const touch=e.touches?e.touches[0]:e;
      return {x:touch.clientX-rect.left,y:touch.clientY-rect.top};
    }

    canvas.addEventListener("mousedown",e=>{
      drawing=true;
      const p=getPos(e);
      ctx.beginPath();
      ctx.moveTo(p.x,p.y);
    });

    canvas.addEventListener("mousemove",e=>{
      if(!drawing)return;
      const p=getPos(e);
      ctx.lineTo(p.x,p.y);
      ctx.stroke();
    });

    canvas.addEventListener("mouseup",()=>drawing=false);
    canvas.addEventListener("mouseleave",()=>drawing=false);

    canvas.addEventListener("touchstart",e=>{
      drawing=true;
      const p=getPos(e);
      ctx.beginPath();
      ctx.moveTo(p.x,p.y);
    },{passive:false});

    canvas.addEventListener("touchmove",e=>{
      e.preventDefault();
      if(!drawing)return;
      const p=getPos(e);
      ctx.lineTo(p.x,p.y);
      ctx.stroke();
    },{passive:false});

    canvas.addEventListener("touchend",()=>drawing=false);
  }

  setupSignature("customerSign");
  setupSignature("techSign");

});


// YÜKSEK ÇÖZÜNÜRLÜK PDF
async function downloadPDF(){

  const { jsPDF } = window.jspdf;
  const element = document.getElementById("formArea");

  const canvas = await html2canvas(element,{
    scale:3,
    useCORS:true
  });

  const imgData = canvas.toDataURL("image/jpeg",1.0);
  const pdf = new jsPDF("p","mm","a4");

  const width = 210;
  const height = canvas.height * width / canvas.width;

  pdf.addImage(imgData,"JPEG",0,0,width,height);
  pdf.save("Teknik-Servis-Formu.pdf");
}
