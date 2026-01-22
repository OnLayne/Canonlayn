// Random servis numarası ve yetki no
document.getElementById("serviceNo").innerText = Math.floor(100000 + Math.random() * 900000);
document.getElementById("serviceAuthNo").innerText = Math.floor(10000 + Math.random()*90000) + "BM" + Math.floor(Math.random()*10);

// Teknisyen formunu dolduracak fonksiyon
function fillForm(data) {
    document.getElementById("customerName").innerText = data.customerName;
    document.getElementById("customerPhone").innerText = data.customerPhone;
    document.getElementById("customerAddress").innerText = data.customerAddress;
    document.getElementById("operatorNote").innerText = data.operatorNote;

    document.getElementById("deviceBrand").innerText = data.deviceBrand;
    document.getElementById("deviceType").innerText = data.deviceType;
    document.getElementById("deviceModel").innerText = data.deviceModel;
    document.getElementById("deviceSerial").innerText = data.deviceSerial;
    document.getElementById("deviceIssue").innerText = data.deviceIssue;

    document.getElementById("serviceStatus").innerText = data.serviceStatus;

    const taskTableBody = document.getElementById("taskTableBody");
    taskTableBody.innerHTML = "";
    data.tasks.forEach(task => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${task.date}</td><td>${task.action}</td><td>${task.desc}</td>`;
        taskTableBody.appendChild(row);
    });

    const paymentTableBody = document.getElementById("paymentTableBody");
    paymentTableBody.innerHTML = "";
    data.payments.forEach(pay => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${pay.date}</td><td>${pay.collector}</td><td>${pay.method}</td><td>${pay.status}</td><td>${pay.amount}</td>`;
        paymentTableBody.appendChild(row);
    });
}

// Yazdırma
function printForm(){
    const printContents = document.getElementById("printForm").innerHTML;
    const win = window.open('', '', 'height=900,width=900');
    win.document.write('<html><head><title>Yazdır</title>');
    win.document.write('<link rel="stylesheet" href="style.css">');
    win.document.write('</head><body>');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    win.print();
}
