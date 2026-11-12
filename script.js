let keranjang = [];

const namaBarangInput = document.getElementById('namaBarang');
const hargaBarangInput = document.getElementById('hargaBarang');
const jumlahBarangInput = document.getElementById('jumlahBarang');
const tambahBtn = document.getElementById('tambahBtn');
const daftarBarangEl = document.getElementById('daftarBarang');
const isMemberCheckbox = document.getElementById('isMember');
const subtotalBelanjaEl = document.getElementById('subtotalBelanja');
const persenDiskonEl = document.getElementById('persenDiskon');
const nominalDiskonEl = document.getElementById('nominalDiskon');
const totalBelanjaEl = document.getElementById('totalBelanja');

tambahBtn.addEventListener('click', () => {
    const nama = namaBarangInput.value.trim();
    const harga = parseFloat(hargaBarangInput.value);
    const jumlah = parseInt(jumlahBarangInput.value);

    if (nama !== '' && harga > 0 && jumlah > 0) {
        const barang = {
            id: Date.now(),
            nama: nama,
            harga: harga,
            jumlah: jumlah,
            subtotal: harga * jumlah
        };

        keranjang.push(barang);
        kosongkanInput();
        renderTabel();
    } else {
        alert('Mohon isi nama, harga, dan jumlah barang dengan benar!');
    }
});


isMemberCheckbox.addEventListener('change', () => {
    renderTabel();
});

function hapusBarang(id) {
    keranjang = keranjang.filter(barang => barang.id !== id);
    renderTabel();
}

function kosongkanInput() {
    namaBarangInput.value = '';
    hargaBarangInput.value = '';
    jumlahBarangInput.value = '';
    namaBarangInput.focus();
}

function formatRupiah(angka) {
    return angka.toLocaleString('id-ID');
}

function hitungTotal(totalSubtotal) {
    let persenDiskon = 0;

    
    if (totalSubtotal >= 200000) {
        persenDiskon = 15;
    } else if (totalSubtotal >= 100000) {
        persenDiskon = 10;
    } else if (totalSubtotal >= 50000) {
        persenDiskon = 5;
    }

    
    if (isMemberCheckbox.checked && totalSubtotal > 0) {
        persenDiskon += 5;
    }

    // Kalkulasi Nominal
    const nominalDiskon = (totalSubtotal * persenDiskon) / 100;
    const totalAkhir = totalSubtotal - nominalDiskon;

    // Update DOM
    subtotalBelanjaEl.textContent = formatRupiah(totalSubtotal);
    persenDiskonEl.textContent = persenDiskon;
    nominalDiskonEl.textContent = formatRupiah(nominalDiskon);
    totalBelanjaEl.textContent = formatRupiah(totalAkhir);
}

function renderTabel() {
    daftarBarangEl.innerHTML = '';
    let totalSubtotal = 0;

    keranjang.forEach((barang) => {
        totalSubtotal += barang.subtotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${barang.nama}</td>
            <td>Rp ${formatRupiah(barang.harga)}</td>
            <td>${barang.jumlah}</td>
            <td>Rp ${formatRupiah(barang.subtotal)}</td>
            <td><button class="btn-hapus" onclick="hapusBarang(${barang.id})">Hapus</button></td>
        `;
        
        daftarBarangEl.appendChild(row);
    });

    
    hitungTotal(totalSubtotal);
}