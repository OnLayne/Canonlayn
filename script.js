function fillFromInputs() {
    const action = document.getElementById("inputTaskAction").value;
    const desc = document.getElementById("inputTaskDesc").value;
    const price = document.getElementById("inputTaskPrice").value;

    // Form objesi
    const formData = {
        customerName: document.getElementById("inputCustomerName").value,
        customerPhone: document.getElementById("inputCustomerPhone").value,
        customerAddress: document.getElementById("inputCustomerAddress").value,
        operatorNote: document.getElementById("inputOperatorNote").value,
        deviceBrand: document.getElementById("inputDeviceBrand").value,
        deviceType: document.getElementById("inputDeviceType").value,
        deviceModel: document.getElementById("inputDeviceModel").value,
        deviceSerial: document.getElementById("inputDeviceSerial").value,
        deviceIssue: document.getElementById("inputDeviceIssue").value,
        serviceStatus: action,
        tasks:[
            {
                date: new Date().toLocaleString(),
                action: action,
                desc: `${desc} | Müşteriye Verilen Fiyat: ${price} TL`,
                technician: "GEZİCİ BÖLGE MERKEZ"
            }
        ],
        payments:[
            {
                date: new Date().toLocaleDateString(),
                collector:"GEZİCİ BÖLGE MERKEZ",
                method:"Nakit",
                status:"Alındı",
                amount: price + " TL"
            }
        ]
    };

    openPrintWindow(formData);
}

// Yeni pencere yazdırma
function openPrintWindow(formData){
    const win = window.open('', '', 'height=900,width=900');
    win.document.write('<html><head><title>Servis Formu</title>');
    win.document.write('<link rel="stylesheet" href="style.css">');
    win.document.write('</head><body>');

    // Üst bilgi
    win.document.write(`<h2 style="text-align:center;">BÖLGE MERKEZ TEKNİK SERVİS</h2>`);
    win.document.write(`<h3 style="text-align:center;">- TEKNİK SERVİS FORMU -</h3>`);

    // Servis no ve yetki no
    const serviceNo = Math.floor(Math.random()*1000000);
    const serviceAuth = Math.floor(Math.random()*90000)+10000;
    win.document.write(`<div style="display:flex;justify-content:space-between;">
        <div>Servis No: ${serviceNo}</div>
        <div>Servis Yetki No: ${serviceAuth}</div>
    </div>`);

    // Müşteri ve cihaz tabloları
    win.document.write(`
        <table class="form-table">
            <tr><th>MÜŞTERİ BİLGİLERİ</th><th>CİHAZ BİLGİSİ</th></tr>
            <tr>
                <td>
                    Ad: ${formData.customerName}<br>
                    Telefon: ${formData.customerPhone}<br>
                    Adres: ${formData.customerAddress}<br>
                    Operatör Notu: ${formData.operatorNote}
                </td>
                <td>
                    Cihaz Markası: ${formData.deviceBrand}<br>
                    Cihaz Türü: ${formData.deviceType}<br>
                    Cihaz Modeli: ${formData.deviceModel}<br>
                    Cihaz Seri No: ${formData.deviceSerial}<br>
                    Cihaz Arızası: ${formData.deviceIssue}
                </td>
            </tr>
        </table>
    `);

    // Servis durumu
    win.document.write(`<h4 style="color:red;">SERVİS DURUMU: ${formData.serviceStatus}</h4>`);

    // Yapılan işlemler
    win.document.write(`<h4>SERVİSTE YAPILAN İŞLEMLER</h4>`);
    win.document.write(`<table class="form-table"><tr><th>TARİH</th><th>İŞLEM ADI</th><th>AÇIKLAMA</th></tr>`);
    formData.tasks.forEach(task=>{
        win.document.write(`<tr>
            <td>${task.date}</td>
            <td>${task.action}</td>
            <td>${task.desc} (Teknisyen: ${task.technician})</td>
        </tr>`);
    });
    win.document.write(`</table>`);

    // Para hareketleri
    win.document.write(`<h4>PARA HAREKETLERİ</h4>`);
    win.document.write(`<table class="form-table"><tr><th>TARİH</th><th>TAHSİL EDEN</th><th>ÖDEME ŞEKLİ</th><th>ÖDEME DURUMU</th><th>TUTAR</th></tr>`);
    formData.payments.forEach(p=>{
        win.document.write(`<tr>
            <td>${p.date}</td>
            <td>${p.collector}</td>
            <td>${p.method}</td>
            <td>${p.status}</td>
            <td>${p.amount}</td>
        </tr>`);
    });
    win.document.write(`</table>`);

    // İmzalar
    win.document.write(`
        <div style="display:flex;justify-content:space-between;margin-top:50px;">
            <div>
                <p>Müşteri İmza</p>
                <canvas id="cSign" width="250" height="80" style="border:1px solid #000;"></canvas>
            </div>
            <div>
                <p>Teknisyen İmza</p>
                <canvas id="tSign" width="250" height="80" style="border:1px solid #000;"></canvas>
            </div>
        </div>
    `);

    // Bilgilendirme yazısı
    win.document.write(`
        <p style="margin-top:30px;font-size:12px;">
        1- YAPILAN İŞLEMLER 1 YIL GARANTİ ALTINDADIR.<br>
        2- BU SERVİS FORMU FATURA YERİNE GEÇMEZ.<br>
        3- CAYMA BEDELİ İADESİ YOKTUR.<br>
        4- TAKILAN PARÇANIN GERİ İADESİ YOKTUR.
        </p>
    `);

    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    setTimeout(()=>win.print(), 500);
}
