function printForm() {
    const formContent = document.querySelector('.form-container').innerHTML;
    const styleContent = document.querySelector('link[rel="stylesheet"]').outerHTML;

    // Gizli iframe oluştur
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
        <html>
        <head>
            ${styleContent}
        </head>
        <body>
            ${formContent}
            <script>
                const canvases = document.querySelectorAll('canvas');
                canvases.forEach(c => {
                    const img = document.createElement('img');
                    img.src = c.toDataURL();
                    img.style.width = c.width + 'px';
                    img.style.height = c.height + 'px';
                    c.parentNode.replaceChild(img, c);
                });
                window.onload = function() {
                    window.focus();
                    window.print();
                }
            <\/script>
        </body>
        </html>
    `);
    doc.close();

    // Yazdırma tamamlandıktan sonra iframe'i kaldır
    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 1000);
}
