// scripts/alert.js

export function showAlert(message) {
  const alertBox = document.getElementById('alertBox');
  const alertMessage = document.getElementById('alertMessage');

  alertMessage.textContent = message;
  alertBox.showModal();
  initAlert()
}

export function initAlert() {
  const closeBtn = document.getElementById('closeAlertBtn');
  const alertBox = document.getElementById('alertBox');

  closeBtn.addEventListener('click', () => {
    alertBox.close();
  });
}
