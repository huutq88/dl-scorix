/**
 * Scorix DL - Social Media Video Downloader & iOS Shortcut Ecosystem
 * Frontend Interactive Controller & Bilingual Localization Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Localization / Multi-Language Engine (VI & EN)
  // =========================================================================
  const i18n = {
    vi: {
      nav_downloader: '<i class="fa-solid fa-bolt"></i> Tải Video',
      nav_features: '<i class="fa-solid fa-star"></i> Tính Năng',
      nav_guides: '<i class="fa-solid fa-book-open"></i> Hướng Dẫn',
      nav_faq: '<i class="fa-solid fa-circle-question"></i> FAQ',
      nav_ios_shortcut: 'iOS Shortcut',
      hero_badge: '⚡ Tải Tốc Độ Cao • Không Logo Watermark • 1-Click iOS Shortcut',
      hero_title_prefix: 'Tải Video Chất Lượng Cao Từ',
      hero_subtitle: 'Dán link bất kỳ từ mạng xã hội để tải video Full HD, 4K không dính logo watermark hoặc tách nhạc MP3 320kbps siêu tốc.',
      btn_paste: 'Dán Link',
      btn_analyze: 'Phân Tích',
      sample_label: '<i class="fa-regular fa-lightbulb"></i> Thử mẫu:',
      input_placeholder: 'Dán link video từ TikTok, Reels, YouTube Shorts, Facebook...',
      status_ready: 'Sẵn sàng tải xuống',
      format_select_title: 'Chọn Định Dạng & Chất Lượng:',
      format_no_watermark: 'Không logo 100%',
      btn_download_video: 'Tải Video Ngay',
      progress_preparing: 'Đang kết nối luồng máy chủ tốc độ cao...',
      progress_processing: 'Đang trích xuất chất lượng tốt nhất...',
      progress_done: 'Đã sẵn sàng! Đang chuyển file về thiết bị...',
      history_title: 'Lịch Sử Tải Gần Đây',
      history_clear: 'Xóa lịch sử',
      history_empty: 'Chưa có video nào được tải trong phiên này.',
      shortcut_banner_badge: 'Dành Riêng Cho iPhone & iPad',
      shortcut_banner_title: 'Tải Video 1-Chạm Bằng iOS Shortcut',
      shortcut_banner_desc: 'Không cần mở trình duyệt! Chỉ cần bấm nút <strong>Chia sẻ (Share)</strong> trên TikTok, Instagram, YouTube và chọn <strong>Scorix DL</strong> — Video sẽ tự động lưu ngay vào <strong>Album Ảnh (Photos / Camera Roll)</strong>.',
      step1_title: '1. Bấm Chia sẻ',
      step1_desc: 'Trên video TikTok / Reels / YouTube',
      step2_title: '2. Chọn Scorix DL',
      step2_desc: 'Từ menu bảng Share Sheet iOS',
      step3_title: '3. Lưu Vào Ảnh',
      step3_desc: 'Tự động tải Full HD không logo',
      btn_get_shortcut: 'Cài Đặt Shortcut 1-Click',
      btn_scan_qr: 'Quét Mã QR',
      guides_title: 'Hướng Dẫn Tải Video Từng Nền Tảng',
      guide_tiktok_step1: 'Mở ứng dụng <strong>TikTok</strong>, tìm video hoặc bài hát bạn muốn tải xuống.',
      guide_tiktok_step2: 'Nhấn nút <strong>Chia sẻ (Share)</strong> ở góc phải video và chọn <strong>Sao chép liên kết (Copy Link)</strong>.',
      guide_tiktok_step3: 'Dán link vào ô tải ở trên hoặc dùng phím tắt <strong>Scorix DL</strong> trên iPhone để lưu trực tiếp không dính logo watermark.',
      guide_insta_step1: 'Mở <strong>Instagram</strong> và chọn video Reel hoặc bài viết cần tải.',
      guide_insta_step2: 'Bấm vào biểu tượng <strong>Chia sẻ (Máy bay giấy)</strong> và chọn <strong>Sao chép liên kết</strong>.',
      guide_insta_step3: 'Dán link vào Scorix DL để tải về định dạng MP4 độ phân giải cao nhất.',
      guide_yt_step1: 'Mở video <strong>YouTube</strong> hoặc <strong>YouTube Shorts</strong> bạn yêu thích.',
      guide_yt_step2: 'Nhấn <strong>Chia sẻ</strong> -> <strong>Sao chép đường dẫn</strong>.',
      guide_yt_step3: 'Dán vào thanh công cụ của Scorix DL, chọn chất lượng Full HD 1080p hoặc định dạng MP3 320kbps.',
      guide_fb_step1: 'Trên video hoặc Reel <strong>Facebook</strong>, bấm nút <strong>Chia sẻ</strong>.',
      guide_fb_step2: 'Chọn <strong>Tùy chọn khác</strong> -> <strong>Sao chép liên kết</strong>.',
      guide_fb_step3: 'Dán link vào trang web để hệ thống trích xuất video chất lượng cao nhất.',
      features_title: 'Tại Sao Nên Chọn Scorix DL?',
      feat_nowatermark_title: 'Không Logo / Watermark',
      feat_nowatermark_desc: 'Tải video TikTok, Douyin và Instagram Reels sạch 100%, không bị chèn watermark hay logo ID tác giả.',
      feat_speed_title: 'Tốc Độ Băng Thông Cao',
      feat_speed_desc: 'Hệ thống máy chủ xử lý đa luồng giúp tối ưu hóa thời gian xử lý và tải xuống chỉ trong vài giây.',
      feat_mp3_title: 'Tách Âm Thanh MP3 320kbps',
      feat_mp3_desc: 'Trích xuất nhạc nền, podcast và hiệu ứng âm thanh từ mọi video với chất lượng âm thanh gốc cao nhất.',
      feat_ios_title: 'Tương Thích iOS Shortcut',
      feat_ios_desc: 'Tích hợp phím tắt Apple Shortcuts độc quyền, lưu video thẳng vào Cuộn Camera không cần qua trình duyệt.',
      faq_title: 'Câu Hỏi Thường Gặp (FAQ)',
      faq_q1: '1. Dịch vụ Scorix DL có miễn phí không?',
      faq_a1: 'Hoàn toàn miễn phí 100%! Bạn có thể tải bao nhiêu video tùy thích mà không bị giới hạn số lượng và không phải trả bất kỳ chi phí nào.',
      faq_q2: '2. Video tải về được lưu ở đâu trên điện thoại?',
      faq_a2: 'Nếu dùng trên trình duyệt web, video sẽ lưu vào thư mục <strong>Tải về (Downloads)</strong> hoặc <strong>Tệp (Files)</strong>. Nếu dùng phím tắt <strong>iOS Shortcut Scorix DL</strong>, video sẽ tự động lưu thẳng vào <strong>Album Ảnh (Photos / Camera Roll)</strong> của bạn.',
      faq_q3: '3. Scorix DL có lưu trữ video của người dùng không?',
      faq_a3: 'Không. Chúng tôi không lưu trữ bất kỳ video hoặc dữ liệu cá nhân nào trên máy chủ. Mọi file tạm sau khi xử lý tải xuống đều tự động xóa sau 30 phút.',
      faq_q4: '4. Phím tắt iOS Shortcut hỗ trợ các phiên bản iOS nào?',
      faq_a4: 'Phím tắt Scorix DL hoạt động hoàn hảo trên mọi thiết bị iPhone, iPad chạy từ iOS 15, iOS 16, iOS 17 đến iOS 18 trở lên.',
      modal_shortcut_title: 'Cài Đặt iOS Shortcut Scorix DL',
      modal_shortcut_subtitle: 'Lưu video vào Photos chỉ với 1 chạm',
      modal_shortcut_intro: 'Nhấn nút bên dưới để tự động nhập phím tắt vào ứng dụng <strong>Phím tắt (Apple Shortcuts)</strong> trên iPhone hoặc iPad của bạn:',
      btn_import_icloud: 'Nhận Phím Tắt (iCloud Official)',
      modal_icloud_note: 'Link chính thức từ Apple iCloud • Tự động cập nhật phiên bản mới',
      modal_or_api: 'HOẶC DÙNG API / FILE CẤU HÌNH',
      label_api_endpoint: 'API Endpoint Cho Lập Trình Viên / Shortcut:',
      btn_copy: 'Sao Chép',
      btn_copied: 'Đã Chép!',
      btn_download_shortcut_file: 'Tải trực tiếp file .shortcut',
      modal_qr_title: 'Quét Mã QR Để Cài Đặt',
      modal_qr_desc: 'Mở ứng dụng <strong>Camera</strong> trên iPhone hoặc iPad và hướng vào mã QR này để thêm phím tắt ngay:',
      modal_qr_hint: 'Hỗ trợ iOS 15, 16, 17, 18+ trên iPhone & iPad',
      footer_copyright: '© 2026 Scorix DL • High Performance Social Media Video Downloader Ecosystem. All rights reserved.',
      toast_clipboard_error: 'Không thể truy cập Clipboard. Vui lòng dán link thủ công bằng Ctrl+V hoặc Cmd+V.',
      toast_copied: 'Đã sao chép vào bộ nhớ tạm!',
      toast_invalid_url: 'Vui lòng nhập đường link video hợp lệ (bắt đầu bằng http:// hoặc https://).'
    },
    en: {
      nav_downloader: '<i class="fa-solid fa-bolt"></i> Downloader',
      nav_features: '<i class="fa-solid fa-star"></i> Features',
      nav_guides: '<i class="fa-solid fa-book-open"></i> Guides',
      nav_faq: '<i class="fa-solid fa-circle-question"></i> FAQ',
      nav_ios_shortcut: 'iOS Shortcut',
      hero_badge: '⚡ Ultra Fast Speed • No Watermark • 1-Click iOS Shortcut',
      hero_title_prefix: 'Download High Quality Videos From',
      hero_subtitle: 'Paste any social link to grab Full HD, 4K watermark-free videos or crystal-clear 320kbps MP3 audio in seconds.',
      btn_paste: 'Paste Link',
      btn_analyze: 'Analyze',
      sample_label: '<i class="fa-regular fa-lightbulb"></i> Try Sample:',
      input_placeholder: 'Paste video link from TikTok, Reels, YouTube Shorts, Facebook...',
      status_ready: 'Ready to download',
      format_select_title: 'Select Format & Resolution:',
      format_no_watermark: '100% No Watermark',
      btn_download_video: 'Download Video Now',
      progress_preparing: 'Connecting to high-speed media server...',
      progress_processing: 'Extracting highest bitrate stream...',
      progress_done: 'Complete! Transferring file to your device...',
      history_title: 'Recent Downloads',
      history_clear: 'Clear history',
      history_empty: 'No videos downloaded yet in this session.',
      shortcut_banner_badge: 'Exclusive for iPhone & iPad',
      shortcut_banner_title: '1-Click Video Download with iOS Shortcut',
      shortcut_banner_desc: 'No need to open a browser! Just tap <strong>Share</strong> on TikTok, Instagram, YouTube and choose <strong>Scorix DL</strong> — Video is instantly saved to your <strong>Photos / Camera Roll</strong>.',
      step1_title: '1. Tap Share',
      step1_desc: 'On any TikTok / Reels / YouTube video',
      step2_title: '2. Pick Scorix DL',
      step2_desc: 'From the iOS Share Sheet menu',
      step3_title: '3. Saved to Photos',
      step3_desc: 'Auto-saves Full HD without watermark',
      btn_get_shortcut: 'Install Shortcut (1-Click)',
      btn_scan_qr: 'Scan QR Code',
      guides_title: 'How to Download From Each Platform',
      guide_tiktok_step1: 'Open the <strong>TikTok</strong> app, find the video or song you wish to save.',
      guide_tiktok_step2: 'Tap the <strong>Share</strong> button on the right and select <strong>Copy Link</strong>.',
      guide_tiktok_step3: 'Paste the link into the box above or use the <strong>Scorix DL</strong> iOS shortcut to save directly with no watermark.',
      guide_insta_step1: 'Open <strong>Instagram</strong> and navigate to the Reel or video post.',
      guide_insta_step2: 'Tap the <strong>Share (Paper Airplane)</strong> icon and select <strong>Copy Link</strong>.',
      guide_insta_step3: 'Paste it into Scorix DL to grab the MP4 in original maximum resolution.',
      guide_yt_step1: 'Open your favorite <strong>YouTube</strong> video or <strong>YouTube Shorts</strong>.',
      guide_yt_step2: 'Tap <strong>Share</strong> -> <strong>Copy Link</strong>.',
      guide_yt_step3: 'Paste into Scorix DL search bar, then choose 1080p Full HD or 320kbps MP3 audio.',
      guide_fb_step1: 'On any <strong>Facebook</strong> video or Reel, click the <strong>Share</strong> button.',
      guide_fb_step2: 'Choose <strong>More Options</strong> -> <strong>Copy Link</strong>.',
      guide_fb_step3: 'Paste into the website to fetch the high-speed download link.',
      features_title: 'Why Choose Scorix DL?',
      feat_nowatermark_title: 'No Watermark',
      feat_nowatermark_desc: 'Download clean TikTok, Douyin, and Instagram Reels with zero logos, ID overlays, or watermarks.',
      feat_speed_title: 'Ultra Fast Bandwidth',
      feat_speed_desc: 'Multi-threaded cloud server infrastructure processes and delivers downloads in seconds.',
      feat_mp3_title: 'Extract 320kbps MP3 Audio',
      feat_mp3_desc: 'Rip high-fidelity audio tracks, background music, and podcasts at studio quality.',
      feat_ios_title: 'Native iOS Shortcut Ready',
      feat_ios_desc: 'Exclusive Apple Shortcuts integration automatically downloads videos straight into your Camera Roll.',
      faq_title: 'Frequently Asked Questions (FAQ)',
      faq_q1: '1. Is Scorix DL completely free?',
      faq_a1: 'Yes, 100% free! You can download unlimited videos without any subscription, registration, or hidden fees.',
      faq_q2: '2. Where are downloaded videos stored on mobile?',
      faq_a2: 'When using web browsers, files go to your <strong>Downloads</strong> folder. When using the <strong>Scorix DL iOS Shortcut</strong>, videos are automatically saved straight into your <strong>Photos / Camera Roll</strong> album.',
      faq_q3: '3. Does Scorix DL store or track downloaded videos?',
      faq_a3: 'No. We do not host or store any personal media on our servers. All temporary processing files are purged after 30 minutes.',
      faq_q4: '4. Which iOS versions are supported by the shortcut?',
      faq_a4: 'The Scorix DL shortcut is fully compatible with iOS 15, iOS 16, iOS 17, and the latest iOS 18 on iPhone and iPad.',
      modal_shortcut_title: 'Scorix DL iOS Shortcut Setup',
      modal_shortcut_subtitle: 'Save videos to Photos with a single tap',
      modal_shortcut_intro: 'Tap the button below to import the official shortcut into Apple Shortcuts on your iPhone or iPad:',
      btn_import_icloud: 'Get Shortcut (Official iCloud)',
      modal_icloud_note: 'Official Apple iCloud Link • Auto-updates with latest features',
      modal_or_api: 'OR USE API / CONFIG FILE',
      label_api_endpoint: 'API Endpoint for Developers / Shortcuts:',
      btn_copy: 'Copy',
      btn_copied: 'Copied!',
      btn_download_shortcut_file: 'Download .shortcut file directly',
      modal_qr_title: 'Scan QR Code to Install',
      modal_qr_desc: 'Open the <strong>Camera</strong> app on your iPhone or iPad and point it at this QR code:',
      modal_qr_hint: 'Supports iOS 15, 16, 17, 18+ on iPhone & iPad',
      footer_copyright: '© 2026 Scorix DL • High Performance Social Media Video Downloader Ecosystem. All rights reserved.',
      toast_clipboard_error: 'Could not access clipboard. Please paste manually using Ctrl+V or Cmd+V.',
      toast_copied: 'Copied to clipboard!',
      toast_invalid_url: 'Please enter a valid video link starting with http:// or https://'
    }
  };

  let currentLang = localStorage.getItem('scorix_dl_lang') || 'vi';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('scorix_dl_lang', lang);
    document.documentElement.lang = lang;

    // Update active button
    document.getElementById('lang-vi').classList.toggle('active', lang === 'vi');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');

    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) {
        el.innerHTML = i18n[lang][key];
      }
    });

    // Update input placeholder
    const inputUrl = document.getElementById('video-url');
    if (inputUrl && i18n[lang].input_placeholder) {
      inputUrl.placeholder = i18n[lang].input_placeholder;
    }
  }

  document.getElementById('lang-vi').addEventListener('click', () => applyLanguage('vi'));
  document.getElementById('lang-en').addEventListener('click', () => applyLanguage('en'));

  // =========================================================================
  // 2. DOM Elements Selection
  // =========================================================================
  const form = document.getElementById('download-form');
  const inputUrl = document.getElementById('video-url');
  const btnClearInput = document.getElementById('btn-clear-input');
  const btnPaste = document.getElementById('btn-paste-clipboard');
  const btnFetch = document.getElementById('btn-fetch-video');
  const errorBox = document.getElementById('error-message-box');
  const errorText = document.getElementById('error-text-content');
  const btnCloseError = document.getElementById('btn-close-error');

  const previewCard = document.getElementById('preview-card');
  const previewThumb = document.getElementById('preview-thumb');
  const platformBadgeName = document.getElementById('platform-badge-name');
  const platformBadge = document.getElementById('platform-badge');
  const previewDuration = document.getElementById('preview-duration');
  const previewTitle = document.getElementById('preview-title');
  const previewUploader = document.getElementById('preview-uploader');
  const formatOptionsContainer = document.getElementById('format-options-container');

  const btnStartDownload = document.getElementById('btn-start-download');
  const downloadProgressBox = document.getElementById('download-progress-box');
  const progressStatusText = document.getElementById('progress-status-text');
  const progressPercentNumber = document.getElementById('progress-percent-number');
  const progressTrackFill = document.getElementById('progress-track-fill');

  const historySection = document.getElementById('history-section');
  const historyCardsList = document.getElementById('history-cards-list');
  const btnClearAllHistory = document.getElementById('btn-clear-all-history');

  const shortcutModal = document.getElementById('shortcut-modal-overlay');
  const btnOpenShortcutModal = document.getElementById('btn-open-shortcut-modal');
  const btnCloseShortcutModal = document.getElementById('btn-close-shortcut-modal');
  const btnCopyApi = document.getElementById('btn-copy-api');

  const qrModal = document.getElementById('qr-modal-overlay');
  const btnShowQrModal = document.getElementById('btn-show-qr-modal');
  const btnCloseQrModal = document.getElementById('btn-close-qr-modal');
  const qrCodeContainer = document.getElementById('qr-code-container');

  const toastStack = document.getElementById('toast-stack');

  let currentVideoData = null;
  let selectedFormatId = 'best';
  let qrCodeInstance = null;

  const ICLOUD_SHORTCUT_URL = 'https://www.icloud.com/shortcuts/99b04fd784414c968bb8499a8fb28c79';

  // =========================================================================
  // 3. Platform Detection & Chip Glow Highlight
  // =========================================================================
  const platformChips = {
    tiktok: document.getElementById('chip-tiktok'),
    instagram: document.getElementById('chip-instagram'),
    youtube: document.getElementById('chip-youtube'),
    facebook: document.getElementById('chip-facebook'),
    twitter: document.getElementById('chip-twitter'),
    threads: document.getElementById('chip-threads')
  };

  function updatePlatformChips(text) {
    const val = (text || '').toLowerCase();
    
    // Clear active classes
    Object.values(platformChips).forEach(chip => chip && chip.classList.remove('active'));

    if (val.includes('tiktok.com') || val.includes('douyin.com')) {
      platformChips.tiktok?.classList.add('active');
    } else if (val.includes('instagram.com') || val.includes('instagr.am')) {
      platformChips.instagram?.classList.add('active');
    } else if (val.includes('youtube.com') || val.includes('youtu.be')) {
      platformChips.youtube?.classList.add('active');
    } else if (val.includes('facebook.com') || val.includes('fb.watch') || val.includes('fb.com')) {
      platformChips.facebook?.classList.add('active');
    } else if (val.includes('twitter.com') || val.includes('x.com')) {
      platformChips.twitter?.classList.add('active');
    } else if (val.includes('threads.net')) {
      platformChips.threads?.classList.add('active');
    }
  }

  inputUrl.addEventListener('input', () => {
    const val = inputUrl.value.trim();
    btnClearInput.classList.toggle('hidden', val.length === 0);
    updatePlatformChips(val);
    hideError();
  });

  btnClearInput.addEventListener('click', () => {
    inputUrl.value = '';
    btnClearInput.classList.add('hidden');
    updatePlatformChips('');
    inputUrl.focus();
  });

  // =========================================================================
  // 4. Clipboard Paste Button
  // =========================================================================
  btnPaste.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        inputUrl.value = text.trim();
        btnClearInput.classList.remove('hidden');
        updatePlatformChips(text);
        hideError();
        showToast(i18n[currentLang].toast_copied, 'info');
      }
    } catch (err) {
      showToast(i18n[currentLang].toast_clipboard_error, 'error');
    }
  });

  // Sample Chips
  document.querySelectorAll('.sample-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const sampleUrl = chip.getAttribute('data-url');
      if (sampleUrl) {
        inputUrl.value = sampleUrl;
        btnClearInput.classList.remove('hidden');
        updatePlatformChips(sampleUrl);
        hideError();
        // Trigger auto submit
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    });
  });

  // =========================================================================
  // 5. Video Info Extraction (/api/info)
  // =========================================================================
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = inputUrl.value.trim();
    if (!url) return;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      showError(i18n[currentLang].toast_invalid_url);
      return;
    }

    hideError();
    hidePreview();
    setFetchLoading(true);

    try {
      const res = await fetch('/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to fetch video details.');
      }

      currentVideoData = data;
      renderPreview(data);

    } catch (err) {
      showError(err.message || 'Error occurred while analyzing video.');
    } finally {
      setFetchLoading(false);
    }
  });

  function renderPreview(data) {
    previewThumb.src = data.thumbnail || 'logo.png';
    previewTitle.textContent = data.title || 'Social Video';
    previewUploader.textContent = data.uploader || 'Creator';
    previewDuration.textContent = data.duration || '00:00';

    // Platform Badge
    const p = data.platform || { name: 'Social Media', icon: 'video', color: '#6366f1' };
    platformBadgeName.textContent = p.name;
    platformBadge.style.backgroundColor = p.color;

    // Render Format Options
    formatOptionsContainer.innerHTML = '';
    selectedFormatId = 'best';

    data.formats.forEach((fmt, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `format-card-btn ${index === 0 ? 'selected' : ''}`;
      btn.setAttribute('data-format-id', fmt.id);

      let recommendedTag = '';
      if (fmt.isRecommended) {
        recommendedTag = `<span class="badge-recommended">POPULAR</span>`;
      }

      btn.innerHTML = `
        ${recommendedTag}
        <span class="format-tag-title">${fmt.quality}</span>
        <span class="format-tag-desc">${fmt.ext.toUpperCase()} • ${fmt.type === 'audio' ? 'MP3 Audio' : 'No Watermark'}</span>
      `;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.format-card-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedFormatId = fmt.id;
      });

      formatOptionsContainer.appendChild(btn);
    });

    previewCard.classList.remove('hidden');
    downloadProgressBox.classList.add('hidden');

    // Smooth scroll to preview
    previewCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // =========================================================================
  // 6. Download Trigger & Progress Simulation (/api/download)
  // =========================================================================
  btnStartDownload.addEventListener('click', async () => {
    if (!currentVideoData) return;

    const url = currentVideoData.url;
    const formatId = selectedFormatId || 'best';

    btnStartDownload.disabled = true;
    downloadProgressBox.classList.remove('hidden');
    updateProgress(15, i18n[currentLang].progress_preparing);

    try {
      let currentProgress = 20;
      const progressInterval = setInterval(() => {
        if (currentProgress < 85) {
          currentProgress += Math.floor(Math.random() * 9) + 3;
          updateProgress(currentProgress, i18n[currentLang].progress_processing);
        }
      }, 400);

      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, formatId })
      });

      clearInterval(progressInterval);
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Download processing failed.');
      }

      updateProgress(100, i18n[currentLang].progress_done);

      // Save to local storage history
      saveToHistory({
        title: currentVideoData.title,
        thumbnail: currentVideoData.thumbnail,
        platform: currentVideoData.platform,
        url: currentVideoData.url,
        ext: data.ext,
        time: new Date().toLocaleDateString(currentLang === 'vi' ? 'vi-VN' : 'en-US')
      });

      // Trigger automatic file download
      const customFilename = `${currentVideoData.title.substring(0, 40).replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_')}.${data.ext}`;
      const finalDownloadUrl = `${data.downloadUrl}&filename=${encodeURIComponent(customFilename)}`;
      
      const link = document.createElement('a');
      link.href = finalDownloadUrl;
      link.setAttribute('download', customFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(i18n[currentLang].progress_done, 'success');

      setTimeout(() => {
        downloadProgressBox.classList.add('hidden');
        btnStartDownload.disabled = false;
      }, 3500);

    } catch (err) {
      showError(err.message || 'Download failed.');
      downloadProgressBox.classList.add('hidden');
      btnStartDownload.disabled = false;
    }
  });

  function updateProgress(percent, statusMsg) {
    progressTrackFill.style.width = `${percent}%`;
    progressPercentNumber.textContent = `${percent}%`;
    progressStatusText.textContent = statusMsg;
  }

  // =========================================================================
  // 7. Recent Downloads History (LocalStorage)
  // =========================================================================
  const HISTORY_KEY = 'scorix_dl_history_v1';

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveToHistory(item) {
    const list = getHistory();
    // Filter duplicates
    const filtered = list.filter(i => i.url !== item.url);
    filtered.unshift(item);
    if (filtered.length > 8) filtered.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
    renderHistory();
  }

  function renderHistory() {
    const history = getHistory();
    if (history.length === 0) {
      historySection.classList.add('hidden');
      return;
    }

    historySection.classList.remove('hidden');
    historyCardsList.innerHTML = '';

    history.forEach(item => {
      const card = document.createElement('div');
      card.className = 'history-item-card';
      card.innerHTML = `
        <div class="history-item-thumb">
          <img src="${item.thumbnail || 'logo.png'}" alt="Thumbnail" />
        </div>
        <div class="history-item-details">
          <div class="history-item-title" title="${item.title}">${item.title}</div>
          <div class="history-item-meta">
            <span style="color: ${item.platform?.color || '#00f2fe'}">${item.platform?.name || 'Social'}</span> • ${item.time}
          </div>
        </div>
        <button type="button" class="history-item-btn" title="Tải lại video này">
          <i class="fa-solid fa-arrow-down"></i>
        </button>
      `;

      card.querySelector('.history-item-btn').addEventListener('click', () => {
        inputUrl.value = item.url;
        btnClearInput.classList.remove('hidden');
        updatePlatformChips(item.url);
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      });

      historyCardsList.appendChild(card);
    });
  }

  btnClearAllHistory.addEventListener('click', () => {
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
    showToast('Lịch sử đã được xóa.', 'info');
  });

  // =========================================================================
  // 8. Modals & QR Code Generator
  // =========================================================================
  btnOpenShortcutModal.addEventListener('click', () => {
    shortcutModal.classList.remove('hidden');
  });

  btnCloseShortcutModal.addEventListener('click', () => {
    shortcutModal.classList.add('hidden');
  });

  shortcutModal.addEventListener('click', (e) => {
    if (e.target === shortcutModal) shortcutModal.classList.add('hidden');
  });

  // QR Code Modal
  btnShowQrModal.addEventListener('click', () => {
    qrModal.classList.remove('hidden');
    if (!qrCodeInstance) {
      qrCodeContainer.innerHTML = '';
      qrCodeInstance = new QRCode(qrCodeContainer, {
        text: ICLOUD_SHORTCUT_URL,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  });

  btnCloseQrModal.addEventListener('click', () => {
    qrModal.classList.add('hidden');
  });

  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) qrModal.classList.add('hidden');
  });

  // Copy API endpoint
  btnCopyApi.addEventListener('click', async () => {
    const apiCode = document.getElementById('api-endpoint-text').textContent;
    try {
      await navigator.clipboard.writeText(apiCode);
      btnCopyApi.textContent = i18n[currentLang].btn_copied;
      showToast(i18n[currentLang].toast_copied, 'success');
      setTimeout(() => {
        btnCopyApi.textContent = i18n[currentLang].btn_copy;
      }, 2000);
    } catch (e) {
      showToast('Error copying text.', 'error');
    }
  });

  // =========================================================================
  // 9. Platform Guides Tabs & FAQ Accordion
  // =========================================================================
  document.querySelectorAll('.guide-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.guide-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.guide-tab-pane').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId)?.classList.add('active');
    });
  });

  // FAQ Accordion
  document.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // =========================================================================
  // 10. UI Helper Functions
  // =========================================================================
  function setFetchLoading(isLoading) {
    const label = btnFetch.querySelector('.btn-content-label');
    const spinner = btnFetch.querySelector('.spinner-icon');
    if (isLoading) {
      btnFetch.disabled = true;
      label.classList.add('hidden');
      spinner.classList.remove('hidden');
    } else {
      btnFetch.disabled = false;
      label.classList.remove('hidden');
      spinner.classList.add('hidden');
    }
  }

  function showError(msg) {
    errorText.textContent = msg;
    errorBox.classList.remove('hidden');
  }

  function hideError() {
    errorBox.classList.add('hidden');
  }

  btnCloseError.addEventListener('click', hideError);

  function hidePreview() {
    previewCard.classList.add('hidden');
  }

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-item ${type}`;

    let icon = 'fa-solid fa-circle-info';
    if (type === 'success') icon = 'fa-solid fa-circle-check';
    if (type === 'error') icon = 'fa-solid fa-triangle-exclamation';

    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    toastStack.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  }

  // Initialize
  applyLanguage(currentLang);
  renderHistory();
});
