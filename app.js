document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  initContactForm();
  requestPushPermission();
});

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'fr',
    includedLanguages: 'mg,fr,en,de',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

function initFAQ() {
  const buttons = document.querySelectorAll('.faq-toggle');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      content.classList.toggle('hidden');
    });
  });
}

function requestPushPermission() {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}

function sendPushNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body: body, icon: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=100&q=80' });
  }
}

function initContactForm() {
  const form = document.getElementById('mainContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value;
    const phone = document.getElementById('formPhone').value;
    const service = document.getElementById('formService').value;
    const message = document.getElementById('formMessage').value;

    const contactEntry = {
      id: Date.now(),
      name,
      phone,
      service,
      message,
      date: new Date().toLocaleDateString('fr-FR')
    };

    const existing = JSON.parse(localStorage.getItem('devweb_messages') || '[]');
    existing.push(contactEntry);
    localStorage.setItem('devweb_messages', JSON.stringify(existing));

    sendPushNotification('Hafatra vaovao!', `${name} dia nandefa hafatra momba ny ${service}`);

    const whatsappText = encodeURIComponent(`🛒 HAFATRA VAOVAO - DEVWEBIA Vitrine\n👤 Anarana: ${name}\n📞 Telefaonina: ${phone}\n🎯 Tolotra: ${service}\n💬 Hafatra: ${message}`);
    const waUrl = `https://wa.me/261323911654?text=${whatsappText}`;
    
    alert('Misaotra amin\'ny hafatra! Hatao reho amin\'ny WhatsApp ny fampitana izany.');
    window.open(waUrl, '_blank');
    form.reset();
  });
}