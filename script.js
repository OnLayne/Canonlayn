function autoGrow(el){
  el.style.height = "auto";
  el.style.height = (el.scrollHeight) + "px";
}

document.getElementById("serviceNo").innerText =
Math.floor(100000 + Math.random()*900000);
document.getElementById("serviceAuthNo").innerText =
Math.floor(10000 + Math.random()*90000);

function addTaskRow(){
  const tr=document.createElement("tr");
  tr.innerHTML=`<td><input type="date"></td><td><input></td><td><textarea class="desc"></textarea></td><td><input></td>`;
  taskTableBody.appendChild(tr);
}

function addPaymentRow(){
  const tr=document.createElement("tr");
  tr.innerHTML=`<td><input type="date"></td><td><input></td><td><input></td><td><input></td><td><input></td>`;
  paymentTableBody.appendChild(tr);
}

function clearSign(id){
  const c=document.getElementById(id).getContext("2d");
  c.clearRect(0,0,300,150);
}

function enableSign(id){
  const canvas=document.getElementById(id);
  const ctx=canvas.getContext("2d");
  let draw=false;
  canvas.addEventListener("touchstart",e=>{draw=true});
  canvas.addEventListener("touchmove",e=>{
    if(!draw)return;
    e.preventDefault();
    const r=canvas.getBoundingClientRect();
    const t=e.touches[0];
    ctx.lineTo(t.clientX-r.left,t.clientY-r.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(t.clientX-r.left,t.clientY-r.top);
  });
  canvas.addEventListener("touchend",()=>draw=false);
}

enableSign("customerSign");
enableSign("techSign");

function printForm(){window.print();}
