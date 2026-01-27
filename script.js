document.getElementById("serviceNo").innerText =
  Math.floor(100000 + Math.random() * 900000);

document.getElementById("serviceAuthNo").innerText =
  Math.floor(10000 + Math.random() * 90000);

const işlemler = [
  "Atölyeye Alındı",
  "Yerinde Bakım Yapıldı",
  "Atölyeye Aldır (Nakliye Gönder)",
  "Fiyatta Anlaşılamadı",
  "Ürün Garantili Çıktı",
  "Müşteriye Ulaşılamadı",
  "Müşteri İptal Etti",
  "Parçası Atölyeye Alındı",
  "Haber Verecek",
  "Farklı Teknisyen",
  "Yönlendir",
  "Servisi Sonlandır"
];

function addTaskRow() {
  const tr = document.createElement("tr");

  const selectOptions = işlemler
    .map(i => `<option value="${i}">${i}</option>`)
    .join("");

  tr.innerHTML = `
    <td><input type="date"></td>
    <td>
      <select onchange="updateServiceStatus(this)">
        <option value="">Seçiniz</option>
        ${selectOptions}
      </select>
    </td>
    <td><textarea></textarea></td>
    <td><input type="number"></td>
  `;

  document.getElementById("taskTableBody").appendChild(tr);
}

function updateServiceStatus(select) {
  document.getElementById("serviceStatusText").innerText = select.value;
}

function printForm() {
  window.print();
}

addTaskRow();
