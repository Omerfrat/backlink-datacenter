// Modal elemanlarını seç
const modal = document.getElementById('modal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const acceptButton = document.getElementById('acceptButton');
const declineButton = document.getElementById('declineButton');

// Modal'ı aç
openModalButton.onclick = function() {
    modal.style.display = 'block';
}

// Modal'ı kapat
closeModalButton.onclick = function() {
    modal.style.display = 'none';
}

// Kabul et butonuna tıklama
acceptButton.onclick = function() {
    alert('Gizlilik Politikası ve Hizmet Şartlarını kabul ettiniz.');
    modal.style.display = 'none';
}

// Kabul etmemek butonuna tıklama
declineButton.onclick = function() {
    alert('Gizlilik Politikası ve Hizmet Şartlarını kabul etmediniz.');
    modal.style.display = 'none';
}

// Modal dışına tıklanırsa kapat
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
