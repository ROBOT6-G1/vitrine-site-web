document.addEventListener('DOMContentLoaded', () => {
  const loginBox = document.getElementById('loginBox');
  const adminPanel = document.getElementById('adminPanel');
  const loginBtn = document.getElementById('loginBtn');
  const passInput = document.getElementById('adminPass');

  loginBtn.addEventListener('click', () => {
    if (passInput.value === '1234') {
      loginBox.classList.add('hidden');
      adminPanel.classList.remove('hidden');
      loadMessages();
    } else {
      alert('Tsy mety ny teny miafina!');
    }
  });

  const imgInput = document.getElementById('adminImgUpload');
  if (imgInput) {
    imgInput.addEventListener('change', handleImageCompress);
  }
});

function handleImageCompress(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.src = event.target.result;
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxWidth = 800;
      const scaleSize = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scaleSize;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
      document.getElementById('imgPreview').src = compressedBase64;
      document.getElementById('imgPreviewContainer').classList.remove('hidden');
      localStorage.setItem('last_uploaded_img', compressedBase64);
    }
  }
  reader.readAsDataURL(file);
}

function loadMessages() {
  const container = document.getElementById('messagesList');
  const messages = JSON.parse(localStorage.getItem('devweb_messages') || '[]');
  if (messages.length === 0) {
    container.innerHTML = '<p class="text-slate-400">Tsy misy hafatra voaray amin'izao.</p>';
    return;
  }
  container.innerHTML = messages.map(m => `
    <div class="p-4 bg-slate-800 rounded-lg border border-slate-700 space-y-2">
      <div class="flex justify-between items-center">
        <span class="font-bold text-indigo-400">${m.name} (${m.phone})</span>
        <span class="text-xs text-slate-400">${m.date}</span>
      </div>
      <p class="text-sm text-slate-300"><strong>Tolotra:</strong> ${m.service}</p>
      <p class="text-sm text-slate-200 bg-slate-900 p-2 rounded">${m.message}</p>
    </div>
  `).join('');
}