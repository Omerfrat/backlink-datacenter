document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('infoForm');
    const tableBody = document.getElementById('domainTableBody');
    const searchInput = document.getElementById('search');

    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('openModal');
    const closeModalButton = document.getElementById('closeModal');

    if (!form || !tableBody || !searchInput || !modal || !openModalButton || !closeModalButton) {
        console.error('Gerekli HTML elemanları bulunamadı!');
        return;
    }

    // Modal açma
    openModalButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Modal kapama
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Modal dışında tıklanırsa modal kapama
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function loadTableData() {
        fetch('/json/veri.json')  // JSON dosyanızın yolunu buraya yazın
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = '';
                data.forEach(item => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = item.number;
                    row.insertCell(1).textContent = item.domain;
                    row.insertCell(2).textContent = item.hosting;
                    row.insertCell(3).textContent = item.username;
                    row.insertCell(4).textContent = item.password;
                });
            })
            .catch(error => {
                console.error('Veri yüklenirken bir hata oluştu:', error);
            });
    }

    // Formu gönderme işlemi
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Form verilerini al
        const domain = document.getElementById('domain').value;
        const hosting = document.getElementById('hosting').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Form verilerini JSON olarak hazırla
        const newData = {
            domain,
            hosting,
            username,
            password
        };

        // Local Storage'a ekle
        const storedData = JSON.parse(localStorage.getItem('formData')) || [];
        const newNumber = storedData.length ? storedData[storedData.length - 1].number + 1 : 1;
        newData.number = newNumber;
        storedData.push(newData);
        localStorage.setItem('formData', JSON.stringify(storedData));

        // Formu sıfırla ve modal'ı kapat
        form.reset();
        modal.style.display = 'none';
        loadTableData();

        // JSON dosyalarını güncelle
        try {
            // Tüm veriyi veri.json dosyasına gönder
            const responseVeri = await fetch('http://127.0.0.1:3000/update-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });

            if (!responseVeri.ok) {
                throw new Error(`Ağ hatası (veri.json): ${responseVeri.status} ${responseVeri.statusText}`);
            }

            // Sadece domain değerini domain.json dosyasına gönder
            const responseDomain = await fetch('http://127.0.0.1:3000/update-domain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ domain }), // Sadece domain verisi gönderiliyor
            });

            if (!responseDomain.ok) {
                throw new Error(`Ağ hatası (domain.json): ${responseDomain.status} ${responseDomain.statusText}`);
            }

            const resultVeri = await responseVeri.text();
            console.log('Veri.json başarılı:', resultVeri);

            const resultDomain = await responseDomain.text();
            console.log('Domain.json başarılı:', resultDomain);

        } catch (error) {
            console.error('Hata:', error);
        }
    });

    // Arama işlevi
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const domainCell = rows[i].getElementsByTagName('td')[1];
            if (domainCell) {
                const domainText = domainCell.textContent.toLowerCase();
                rows[i].style.display = domainText.indexOf(filter) > -1 ? '' : 'none';
            }
        }
    });

    // Sayfa yüklendiğinde verileri yükle
    loadTableData();
});
