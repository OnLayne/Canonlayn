const deviceBrands = {
    "Kombi": ["Bosch", "Buderus", "Demirdöküm", "ECA"],
    "Klima": ["Vestel", "Midea", "Arçelik", "Daikin"],
    "Televizyon": ["Samsung", "LG", "Sony", "Vestel"],
    "Buzdolabı": ["Arçelik", "Beko", "Bosch", "Samsung"],
    "Çamaşır Makinesi": ["Arçelik", "Beko", "Bosch", "Siemens"],
    "Bulaşık Makinesi": ["Bosch", "Arçelik", "Beko", "Siemens"]
};

function updateDeviceBrands() {
    const type = document.getElementById("inputDeviceType").value;
    const brandSelect = document.getElementById("inputDeviceBrand");
    brandSelect.innerHTML = "";
    if(type && deviceBrands[type]){
        deviceBrands[type].forEach(brand => {
            const option = document.createElement("option");
            option.value = brand;
            option.text = brand;
            brandSelect.appendChild(option);
        });
    } else {
        const option = document.createElement("option");
        option.text = "Önce Tür Seçiniz";
        brandSelect.appendChild(option);
    }
}

function fillFromInputs() {
    const action = document.getElementById("inputTaskAction").value;
    const desc = document.getElementById("inputTaskDesc").value;
    const price = document.getElementById("inputTaskPrice").value;

    fillForm({
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
    });

    printForm();
}
