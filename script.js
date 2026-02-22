document.addEventListener("DOMContentLoaded", () => {

  // Servis No
  document.getElementById("serviceNo").textContent =
    Math.floor(100000 + Math.random()*900000);

  // Yetki No (tek tanım)
  function generateAuthNo(){
    return "FMS-" + Math.floor(10000 + Math.random()*90000);
  }
  document.getElementById("serviceAuthNo").textContent = generateAuthNo();

  // AutoGrow
  function autoGrow(el){
    el.style.height="auto";
    el.style.height=el.scrollHeight+"px";
  }

  document.querySelectorAll(".auto-grow").forEach(el=>{
    autoGrow(el);
    el.addEventListener("input",()=>autoGrow(el));
  });

  // Print öncesi textarea → düz metin
  window.addEventListener("beforeprint",()=>{
    const desc=document.getElementById("serviceDesc");
    document.querySelector(".desc-print").textContent=desc.value;
  });

  // İmza sistemi (yüksek DPI)
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

  window.clearSign=function(id){
    const canvas=document.getElementById(id);
    const ctx=canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
  };

  window.addTaskRow=function(){
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td><input type="date"></td>
      <td><input></td>
      <td><textarea class="auto-grow"></textarea></td>
      <td><input></td>`;
    document.querySelector("#taskTableBody tbody").appendChild(tr);
  };

  window.addPaymentRow=function(){
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td><input type="date"></td>
      <td><input></td>
      <td><input></td>
      <td><input></td>
      <td><input></td>`;
    document.querySelector("#paymentTableBody tbody").appendChild(tr);
  };

});

function printForm(){
  window.print();
}
