function initSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    let drawing = false;

    const getPos = (e) => {
        if (e.touches) { // iOS/Android dokunmatik
            return { x: e.touches[0].clientX - canvas.getBoundingClientRect().left, 
                     y: e.touches[0].clientY - canvas.getBoundingClientRect().top };
        } else { // Masaüstü mouse
            return { x: e.offsetX, y: e.offsetY };
        }
    }

    const start = (e) => { drawing = true; const pos = getPos(e); ctx.moveTo(pos.x, pos.y); }
    const draw = (e) => {
        if (!drawing) return;
        e.preventDefault();
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    const end = () => { drawing = false; ctx.beginPath(); }

    // Mouse events
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseleave', end);

    // Touch events
    canvas.addEventListener('touchstart', start);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', end);
}

function clearSign(canvasId){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Başlangıçta imza canvaslarını aktif et
initSignature('customerSign');
initSignature('techSign');
