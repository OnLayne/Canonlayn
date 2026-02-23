document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("serviceNo").textContent =
    Math.floor(100000 + Math.random()*900000);

  function generateAuthNo(){
    return "FMS-" + Math.floor(10000 + Math.random()*90000);
  }
  document.getElementById("serviceAuthNo").textContent = generateAuthNo();

  document.getElementById("docNo").textContent =
    "FMS-2026-" + Math.floor(1000 + Math.random()*9000);

  function autoGrow(el){
    el.style.height="auto";
    el.style.height=el.scrollHeight+"px";
  }

  document.querySelectorAll(".auto-grow").forEach(function(el){
    autoGrow(el);
    el.addEventListener("input",function(){
      autoGrow(el);
    });
  });

  const statusSelect=document.getElementById("serviceStatusSelect");
  statusSelect.addEventListener("change",function(){
    statusSelect.classList.add("status-selected");
  });
  statusSelect.classList.add("status-selected");

  window.addEventListener("beforeprint",function(){
    const desc=document.getElementById("serviceDesc");
    document.querySelector(".desc-print").textContent=desc.value;
  });

  // ===============================
  // İMZA SİSTEMİ TAM MOBİL UYUMLU
  // ===============================

  function setupSignature(canvasId){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    function resizeCanvas(){
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

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let drawing = false;

    function getPosition(event){
      const rect = canvas.getBoundingClientRect();
      const touch = event.touches ? event.touches[0] : event;

      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }

    function startDraw(e){
      e.preventDefault();
      drawing = true;
      const pos = getPosition(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    function draw(e){
      if(!drawing) return;
      e.preventDefault();
      const pos = getPosition(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    function stopDraw(){
      drawing = false;
    }

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);

    canvas.addEventListener("touchstart", startDraw, { passive:false });
    canvas.addEventListener("touchmove", draw, { passive:false });
    canvas.addEventListener("touchend", stopDraw);
  }

  setupSignature("customerSign");
  setupSignature("techSign");

});