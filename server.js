const express = require('express');
const cors = require('cors');
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Ensure downloads directory exists
const DOWNLOADS_DIR = path.join(__dirname, 'downloads');
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

// Find yt-dlp binary path safely
let YTDLP_PATH = 'yt-dlp';
if (fs.existsSync('/opt/homebrew/bin/yt-dlp')) {
  YTDLP_PATH = '/opt/homebrew/bin/yt-dlp';
} else if (fs.existsSync('/usr/local/bin/yt-dlp')) {
  YTDLP_PATH = '/usr/local/bin/yt-dlp';
} else if (fs.existsSync('/usr/bin/yt-dlp')) {
  YTDLP_PATH = '/usr/bin/yt-dlp';
}

const COOKIES_PATH = path.join(__dirname, 'cookies.txt');
function getCookieArgs() {
  if (fs.existsSync(COOKIES_PATH)) {
    return ['--cookies', COOKIES_PATH];
  }
  return [];
}

const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

// Helper: Detect Social Platform from URL
function detectPlatform(url) {
  if (!url || typeof url !== 'string') {
    return { name: 'Social Media', key: 'generic', icon: 'video', color: '#6366f1', badgeClass: 'platform-generic' };
  }
  const lowercaseUrl = url.toLowerCase();
  if (lowercaseUrl.includes('youtube.com') || lowercaseUrl.includes('youtu.be')) {
    return { name: 'YouTube', key: 'youtube', icon: 'youtube', color: '#ff0000', badgeClass: 'platform-youtube' };
  }
  if (lowercaseUrl.includes('tiktok.com') || lowercaseUrl.includes('douyin.com')) {
    return { name: 'TikTok', key: 'tiktok', icon: 'tiktok', color: '#00f2fe', badgeClass: 'platform-tiktok' };
  }
  if (lowercaseUrl.includes('instagram.com') || lowercaseUrl.includes('instagr.am')) {
    return { name: 'Instagram', key: 'instagram', icon: 'instagram', color: '#e1306c', badgeClass: 'platform-instagram' };
  }
  if (lowercaseUrl.includes('facebook.com') || lowercaseUrl.includes('fb.watch') || lowercaseUrl.includes('fb.com') || lowercaseUrl.includes('fb.me')) {
    return { name: 'Facebook', key: 'facebook', icon: 'facebook', color: '#1877f2', badgeClass: 'platform-facebook' };
  }
  if (lowercaseUrl.includes('twitter.com') || lowercaseUrl.includes('x.com')) {
    return { name: 'Twitter / X', key: 'twitter', icon: 'x-twitter', color: '#1da1f2', badgeClass: 'platform-twitter' };
  }
  if (lowercaseUrl.includes('threads.net')) {
    return { name: 'Threads', key: 'threads', icon: 'threads', color: '#ffffff', badgeClass: 'platform-threads' };
  }
  return { name: 'Social Media', key: 'generic', icon: 'video', color: '#6366f1', badgeClass: 'platform-generic' };
}

// Helper: Format duration (seconds to MM:SS or HH:MM:SS)
function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Helper: Extract clean HTTP/HTTPS URL from any input string (handles Share Sheet text)
function extractUrl(input) {
  if (!input || typeof input !== 'string') return null;
  const match = input.match(/https?:\/\/[^\s"']+/i);
  return match ? match[0].trim() : null;
}

/**
 * Healthcheck API
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Scorix DL API',
    version: '2.5.0',
    timestamp: new Date().toISOString()
  });
});

/**
 * API: Fetch Video Info / Metadata
 * POST /api/info
 * Body: { url: string }
 */
app.post('/api/info', (req, res) => {
  const cleanUrl = extractUrl(req.body.url);
  if (!cleanUrl) {
    return res.status(400).json({ error: 'Invalid URL. Please provide a valid link starting with http:// or https://' });
  }

  const platform = detectPlatform(cleanUrl);

  const args = [
    '--dump-json',
    '--no-warnings',
    '--no-playlist',
    '--user-agent', DEFAULT_USER_AGENT,
    ...getCookieArgs(),
    cleanUrl
  ];

  if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
    args.splice(1, 0, '--extractor-args', 'youtube:player_client=android,web');
  }

  execFile(YTDLP_PATH, args, { maxBuffer: 25 * 1024 * 1024, timeout: 25000 }, (error, stdout, stderr) => {
    if (error) {
      console.error('yt-dlp info error:', stderr || error.message);
      return res.status(500).json({
        error: 'Unable to fetch video details. Please verify the link or check if the video is set to private.'
      });
    }

    try {
      const data = JSON.parse(stdout);
      
      let thumbnail = data.thumbnail || '';
      if (!thumbnail && data.thumbnails && data.thumbnails.length > 0) {
        thumbnail = data.thumbnails[data.thumbnails.length - 1].url;
      }

      const responseData = {
        title: data.title || `${platform.name} Video`,
        thumbnail: thumbnail,
        duration: formatDuration(data.duration),
        durationSec: data.duration || 0,
        uploader: data.uploader || data.channel || data.creator || data.user || platform.name,
        platform: platform,
        url: cleanUrl,
        formats: [
          { id: 'best', label: 'MP4 - HD (No Watermark)', quality: 'HD / Original', ext: 'mp4', type: 'video', isRecommended: true },
          { id: '1080p', label: 'MP4 - Full HD (1080p)', quality: '1080p', ext: 'mp4', type: 'video' },
          { id: '720p', label: 'MP4 - Fast HD (720p)', quality: '720p', ext: 'mp4', type: 'video' },
          { id: '480p', label: 'MP4 - Standard (480p)', quality: '480p', ext: 'mp4', type: 'video' },
          { id: 'mp3', label: 'MP3 - Audio Only (320kbps)', quality: 'HQ Audio', ext: 'mp3', type: 'audio' }
        ]
      };

      return res.json(responseData);
    } catch (parseErr) {
      return res.status(500).json({ error: 'Failed to parse video response.' });
    }
  });
});

/**
 * API: Request Video Download
 * POST /api/download
 * Body: { url: string, formatId: string }
 */
app.post('/api/download', (req, res) => {
  const { formatId = 'best' } = req.body;
  const cleanUrl = extractUrl(req.body.url);
  if (!cleanUrl) {
    return res.status(400).json({ error: 'Invalid URL provided.' });
  }

  const fileId = crypto.randomBytes(8).toString('hex');
  const isAudio = formatId === 'mp3';
  const ext = isAudio ? 'mp3' : 'mp4';
  const outputPattern = path.join(DOWNLOADS_DIR, `${fileId}.%(ext)s`);

  const isYouTube = cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be');

  let formatArg = 'bestvideo+bestaudio/best';
  if (formatId === '1080p') {
    formatArg = 'bestvideo[height<=1080]+bestaudio/best[height<=1080]/best';
  } else if (formatId === '720p') {
    formatArg = 'bestvideo[height<=720]+bestaudio/best[height<=720]/best';
  } else if (formatId === '480p') {
    formatArg = 'bestvideo[height<=480]+bestaudio/best[height<=480]/best';
  }

  const args = [
    '--no-playlist',
    '--no-warnings',
    '--user-agent', DEFAULT_USER_AGENT,
    ...getCookieArgs()
  ];
  if (isYouTube) {
    args.push('--extractor-args', 'youtube:player_client=android,web');
  }

  if (isAudio) {
    args.push('-x', '--audio-format', 'mp3', '--audio-quality', '0');
  } else {
    args.push('-f', isYouTube ? formatArg : 'b/best', '--merge-output-format', 'mp4');
  }
  args.push('-o', outputPattern, cleanUrl);

  const processChild = execFile(YTDLP_PATH, args, { timeout: 60000 });

  processChild.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Download failed. Please try again or select another format.' });
    }

    const targetFile = path.join(DOWNLOADS_DIR, `${fileId}.${ext}`);
    if (fs.existsSync(targetFile)) {
      return res.json({
        success: true,
        fileId: fileId,
        downloadUrl: `/api/file/${fileId}?ext=${ext}`,
        ext: ext
      });
    } else {
      const files = fs.readdirSync(DOWNLOADS_DIR).filter(f => f.startsWith(fileId));
      if (files.length > 0) {
        const actualExt = path.extname(files[0]).substring(1);
        return res.json({
          success: true,
          fileId: fileId,
          downloadUrl: `/api/file/${fileId}?ext=${actualExt}`,
          ext: actualExt
        });
      }
      return res.status(500).json({ error: 'Processed file could not be found.' });
    }
  });
});

/**
 * API: Download file binary
 * GET /api/file/:id?ext=mp4&filename=customName
 */
app.get('/api/file/:id', (req, res) => {
  const { id } = req.params;
  const ext = req.query.ext || 'mp4';
  const customFilename = req.query.filename || `ScorixDL_${id}.${ext}`;
  const filePath = path.join(DOWNLOADS_DIR, `${id}.${ext}`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found or expired.');
  }

  const safeFilename = encodeURIComponent(customFilename.replace(/[/\\?%*:|"<>]/g, '_'));
  res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"; filename*=UTF-8''${safeFilename}`);
  res.setHeader('Content-Type', ext === 'mp3' ? 'audio/mpeg' : 'video/mp4');

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);

  readStream.on('end', () => {
    setTimeout(() => {
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, () => {});
      }
    }, 30000);
  });
});

/**
 * API: iOS Shortcut Endpoint
 * GET or POST /api/shortcut or /shortcut?url=...&format=mp4
 */
app.all(['/api/shortcut', '/shortcut'], (req, res) => {
  let inputUrl = req.query.url || req.body.url;
  if (req.originalUrl && req.originalUrl.includes('url=')) {
    const rawQuery = req.originalUrl.substring(req.originalUrl.indexOf('url=') + 4);
    try {
      inputUrl = decodeURIComponent(rawQuery);
    } catch (e) {
      inputUrl = rawQuery;
    }
  }

  const format = req.query.format || req.body.format || 'mp4';
  const cleanUrl = extractUrl(inputUrl);

  if (!cleanUrl) {
    return res.status(400).json({ error: 'Missing or invalid video URL' });
  }

  const fileId = crypto.randomBytes(6).toString('hex');
  const isAudio = format === 'mp3';
  const ext = isAudio ? 'mp3' : 'mp4';
  const outputPath = path.join(DOWNLOADS_DIR, `shortcut_${fileId}.${ext}`);

  const isYouTube = cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be');
  const args = [
    '--no-playlist',
    '--no-warnings',
    '--user-agent', DEFAULT_USER_AGENT,
    ...getCookieArgs()
  ];

  if (isYouTube) {
    args.push('--extractor-args', 'youtube:player_client=android,web');
    if (isAudio) {
      args.push('-x', '--audio-format', 'mp3', '-o', outputPath, cleanUrl);
    } else {
      args.push('-f', 'bestvideo+bestaudio/best', '--merge-output-format', 'mp4', '-o', outputPath, cleanUrl);
    }
  } else {
    if (isAudio) {
      args.push('-x', '--audio-format', 'mp3', '-o', outputPath, cleanUrl);
    } else {
      args.push('-f', 'b/best', '-o', outputPath, cleanUrl);
    }
  }

  const processChild = execFile(YTDLP_PATH, args, { timeout: 60000 });

  let processStderr = '';
  if (processChild.stderr) {
    processChild.stderr.on('data', (data) => { processStderr += data.toString(); });
  }

  processChild.on('close', (code) => {
    if (code !== 0 || !fs.existsSync(outputPath)) {
      console.error(`Shortcut download failed for URL: ${cleanUrl}, code: ${code}, stderr: ${processStderr}`);
      return res.status(500).json({ error: 'Shortcut download failed' });
    }

    const stat = fs.statSync(outputPath);

    res.setHeader('Content-Disposition', `attachment; filename="ScorixDL_${fileId}.${ext}"`);
    res.setHeader('Content-Type', isAudio ? 'audio/mpeg' : 'video/mp4');
    res.setHeader('Content-Length', stat.size);

    const stream = fs.createReadStream(outputPath);
    stream.pipe(res);

    stream.on('end', () => {
      setTimeout(() => {
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      }, 15000);
    });
  });
});

// Periodic cleanup of download files older than 30 minutes
setInterval(() => {
  fs.readdir(DOWNLOADS_DIR, (err, files) => {
    if (err) return;
    const now = Date.now();
    files.forEach(file => {
      const filePath = path.join(DOWNLOADS_DIR, file);
      fs.stat(filePath, (err, stat) => {
        if (!err && now - stat.mtimeMs > 1800000) {
          fs.unlink(filePath, () => {});
        }
      });
    });
  });
}, 900000);

// Start server with port error resilience
const serverInstance = app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🚀 Scorix DL Downloader Server active at:`);
  console.log(`💻 Local Web: http://localhost:${PORT}`);
  console.log(`📱 iOS Shortcut API: http://localhost:${PORT}/api/shortcut?url=<VIDEO_URL>`);
  console.log(`====================================================`);
});

serverInstance.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallbackPort = Number(PORT) + 1;
    console.warn(`⚠️ Port ${PORT} is busy, retrying on fallback port ${fallbackPort}...`);
    app.listen(fallbackPort, '0.0.0.0', () => {
      console.log(`🚀 Scorix DL Server running on fallback port: http://localhost:${fallbackPort}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
