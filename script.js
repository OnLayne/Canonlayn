// Random servis no ve yetki no
document.getElementById('serviceNo').innerText = Math.floor(Math.random()*900000+100000);
document.getElementById('serviceAuthNo').innerText = Math.floor(Math.random()*90000+10000) + 'BM1';

// iOS ve masaüstü imza
function initSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    let drawing = false;

    const getPos = (e) => {
        if(e.touches){return {x: e.touches[0].clientX - canvas.getBoundingClientRect().left, y: e.touches[0].clientY - canvas.getBoundingClientRect().top};}
        else{return {x: e.offsetX, y: e.offsetY};}
    }

    const start = (e)=>{ drawing=true; const pos=getPos(e); ctx.moveTo(pos.x,pos.y); }
    const draw = (e)=>{ if(!drawing) return; e.preventDefault(); const pos=getPos(e); ctx.lineTo(pos.x,pos.y); ctx.strokeStyle="#000"; ctx.lineWidth=2; ctx.stroke(); }
    const end = ()=>{ drawing=false; ctx.beginPath(); }

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseleave', end);

    canvas.addEventListener('touchstart', start);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', end);
}

function clearSign(canvasId){
    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

initSignature('customerSign');
initSignature('techSign');

// Yeni sekmede yazdırma
function printForm(){
    const printWindow=window.open('','_blank','width=900,height=700');
    const formContent=document.querySelector('.form-container').innerHTML;
    const styleContent=document.querySelector('link[rel="stylesheet"]').outerHTML;

    printWindow.document.open();
    printWindow.document.write(`
        <html>
        <head>
            <title>Servis Formu</title>
            ${styleContent}
        </head>
        <body>
            ${formContent}
            <script>
                const canvases=document.querySelectorAll('canvas');
                canvases.forEach(c=>{
                    const img=document.createElement('img');
                    img.src=c.toDataURL();
                    img.style.width=c.width+'px';
                    img.style.height=c.height+'px';
                    c.parentNode.replaceChild(img,c);
                });
                window.onload=function(){window.print();}
            <\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
}
