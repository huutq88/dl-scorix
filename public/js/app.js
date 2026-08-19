document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('download-form');
  const inputUrl = document.getElementById('video-url');
  const btnPaste = document.getElementById('btn-paste');
  const btnFetch = document.getElementById('btn-fetch');
  const errorToast = document.getElementById('error-message');

  const previewCard = document.getElementById('preview-card');
  const previewThumb = document.getElementById('preview-thumb');
  const platformBadge = document.getElementById('platform-badge');
  const previewDuration = document.getElementById('preview-duration');
  const previewTitle = document.getElementById('preview-title');
  const previewUploader = document.getElementById('preview-uploader');
  const formatSelect = document.getElementById('format-select');

  const btnDownloadStart = document.getElementById('btn-download-start');
  const progressContainer = document.getElementById('progress-container');
  const progressText = document.getElementById('progress-text');
  const progressPercent = document.getElementById('progress-percent');
  const progressBarFill = document.getElementById('progress-bar-fill');

  const openShortcutModal = document.getElementById('open-shortcut-modal');
  const closeShortcutModal = document.getElementById('close-shortcut-modal');
  const shortcutModal = document.getElementById('shortcut-modal');

  let currentVideoData = null;

  // Paste from clipboard button
  btnPaste.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        inputUrl.value = text.trim();
        hideError();
      }
    } catch (err) {
      showError('Unable to access clipboard. Please paste manually using Ctrl+V or Cmd+V.');
    }
  });

  // Handle Form Submit -> Fetch Info
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = inputUrl.value.trim();
    if (!url) return;

    hideError();
    setFetchLoading(true);
    hidePreview();

    try {
      const res = await fetch('/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to fetch video information.');
      }

      currentVideoData = data;
      renderPreview(data);
    } catch (err) {
      showError(err.message);
    } finally {
      setFetchLoading(false);
    }
  });

  // Render Preview Card
  function renderPreview(data) {
    previewThumb.src = data.thumbnail || 'https://via.placeholder.com/400x225?text=Social+Video';
    previewTitle.textContent = data.title;
    previewUploader.textContent = data.uploader;
    previewDuration.textContent = data.duration;

    // Platform styling
    const p = data.platform;
    platformBadge.style.backgroundColor = p.color;
    platformBadge.innerHTML = `<i class="fa-brands fa-${p.icon}"></i> ${p.name}`;

    // Populate format options
    formatSelect.innerHTML = '';
    data.formats.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = f.label;
      formatSelect.appendChild(opt);
    });

    previewCard.classList.remove('hidden');
    progressContainer.classList.add('hidden');
  }

  // Handle Download Click
  btnDownloadStart.addEventListener('click', async () => {
    if (!currentVideoData) return;

    const url = currentVideoData.url;
    const formatId = formatSelect.value;

    btnDownloadStart.disabled = true;
    btnDownloadStart.style.opacity = '0.7';
    progressContainer.classList.remove('hidden');
    updateProgress(15, 'Initializing high-speed connection...');

    try {
      let currentP = 20;
      const interval = setInterval(() => {
        if (currentP < 85) {
          currentP += Math.floor(Math.random() * 8) + 2;
          updateProgress(currentP, 'Processing video stream...');
        }
      }, 400);

      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, formatId })
      });

      clearInterval(interval);
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Download failed. Please try again or select another quality format.');
      }

      updateProgress(100, 'Processing complete! Transferring file...');

      // Trigger universal file download across mobile and desktop browsers
      const targetUrl = data.downloadUrl + `&filename=${encodeURIComponent(currentVideoData.title)}.${data.ext}`;
      window.location.href = targetUrl;

      setTimeout(() => {
        progressContainer.classList.add('hidden');
      }, 3000);

    } catch (err) {
      showError(err.message);
      progressContainer.classList.add('hidden');
    } finally {
      btnDownloadStart.disabled = false;
      btnDownloadStart.style.opacity = '1';
    }
  });

  // Helper Functions
  function updateProgress(percent, message) {
    progressBarFill.style.width = `${percent}%`;
    progressPercent.textContent = `${percent}%`;
    progressText.textContent = message;
  }

  function setFetchLoading(isLoading) {
    const btnText = btnFetch.querySelector('.btn-text');
    const spinner = btnFetch.querySelector('.spinner');
    if (isLoading) {
      btnFetch.disabled = true;
      btnText.classList.add('hidden');
      spinner.classList.remove('hidden');
    } else {
      btnFetch.disabled = false;
      btnText.classList.remove('hidden');
      spinner.classList.add('hidden');
    }
  }

  function showError(msg) {
    errorToast.textContent = msg;
    errorToast.classList.remove('hidden');
  }

  function hideError() {
    errorToast.textContent = '';
    errorToast.classList.add('hidden');
  }

  function hidePreview() {
    previewCard.classList.add('hidden');
  }

  // Modal handlers
  openShortcutModal.addEventListener('click', (e) => {
    e.preventDefault();
    shortcutModal.classList.remove('hidden');
  });

  closeShortcutModal.addEventListener('click', () => {
    shortcutModal.classList.add('hidden');
  });

  shortcutModal.addEventListener('click', (e) => {
    if (e.target === shortcutModal) {
      shortcutModal.classList.add('hidden');
    }
  });
});
