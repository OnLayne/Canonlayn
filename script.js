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

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p","mm","a4");

  let y = 20;

  function line(text){
    pdf.text(text, 15, y);
    y += 8;
  }

  pdf.setFont("helvetica","bold");
  pdf.setFontSize(16);
  pdf.text("TEKNİK SERVİS FORMU", 105, 15, { align: "center" });

  pdf.setFontSize(11);
  pdf.setFont("helvetica","normal");

  line("MÜŞTERİ BİLGİLERİ");
  line("Ad: " + document.querySelector("[name=customerName]").value);
  line("Telefon: " + document.querySelector("[name=customerPhone]").value);
  line("Adres: " + document.querySelector("[name=customerAddress]").value);
  line("Operatör Notu: " + document.querySelector("[name=operatorNote]").value);

  y += 5;

  line("CİHAZ BİLGİSİ");
  line("Marka: " + document.querySelector("[name=brand]").value);
  line("Tür: " + document.querySelector("[name=type]").value);
  line("Model: " + document.querySelector("[name=model]").value);
  line("Arıza: " + document.querySelector("[name=fault]").value);

  y += 5;

  line("Servis Durumu: " + document.getElementById("serviceStatusSelect").value);
  line("Servis Açıklama: " + document.getElementById("serviceDesc").value);

  pdf.save("Servis-Formu.pdf");
}
