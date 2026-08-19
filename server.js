const express = require('express');
const cors = require('cors');
const { spawn, exec, execFile } = require('child_process');
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

// Find binary path silently
let YTDLP_PATH = 'yt-dlp';
if (fs.existsSync('/opt/homebrew/bin/yt-dlp')) {
  YTDLP_PATH = '/opt/homebrew/bin/yt-dlp';
}

// Helper: Detect Social Platform from URL
function detectPlatform(url) {
  const lowercaseUrl = url.toLowerCase();
  if (lowercaseUrl.includes('youtube.com') || lowercaseUrl.includes('youtu.be')) {
    return { name: 'YouTube', key: 'youtube', icon: 'youtube', color: '#ff0000' };
  }
  if (lowercaseUrl.includes('tiktok.com')) {
    return { name: 'TikTok', key: 'tiktok', icon: 'tiktok', color: '#00f2fe' };
  }
  if (lowercaseUrl.includes('instagram.com')) {
    return { name: 'Instagram', key: 'instagram', icon: 'instagram', color: '#e1306c' };
  }
  if (lowercaseUrl.includes('facebook.com') || lowercaseUrl.includes('fb.watch') || lowercaseUrl.includes('fb.com')) {
    return { name: 'Facebook', key: 'facebook', icon: 'facebook', color: '#1877f2' };
  }
  return { name: 'Social Media', key: 'generic', icon: 'video', color: '#6366f1' };
}

// Helper: Format duration (seconds to MM:SS or HH:MM:SS)
function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return 'N/A';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * API: Fetch Video Info / Metadata
 * POST /api/info
 * Body: { url: string }
 */
app.post('/api/info', (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string' || !url.trim().startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL. Please enter a valid link starting with http:// or https://' });
  }

  const cleanUrl = url.trim();
  const platform = detectPlatform(cleanUrl);

  const args = [
    '--dump-json',
    '--no-warnings',
    '--no-playlist',
    cleanUrl
  ];

  execFile(YTDLP_PATH, args, { maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        error: 'Unable to fetch video details. Please verify the link or check if the video is private.'
      });
    }

    try {
      const data = JSON.parse(stdout);
      
      const responseData = {
        title: data.title || 'Social Media Video',
        thumbnail: data.thumbnail || (data.thumbnails && data.thumbnails.length > 0 ? data.thumbnails[data.thumbnails.length - 1].url : ''),
        duration: formatDuration(data.duration),
        uploader: data.uploader || data.channel || data.creator || data.user || platform.name,
        platform: platform,
        url: cleanUrl,
        formats: [
          { id: 'best', label: 'MP4 - Best Quality (HD/4K)', type: 'video' },
          { id: '1080p', label: 'MP4 - Full HD (1080p)', type: 'video' },
          { id: '720p', label: 'MP4 - HD (720p)', type: 'video' },
          { id: '480p', label: 'MP4 - Standard (480p)', type: 'video' },
          { id: 'mp3', label: 'MP3 - Audio Only (320kbps)', type: 'audio' }
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
  const { url, formatId } = req.body;
  if (!url || !url.trim().startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL provided.' });
  }

  const cleanUrl = url.trim();
  const fileId = crypto.randomBytes(8).toString('hex');
  const isAudio = formatId === 'mp3';
  const ext = isAudio ? 'mp3' : 'mp4';
  const outputPattern = path.join(DOWNLOADS_DIR, `${fileId}.%(ext)s`);

  let formatArg = 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best';
  if (formatId === '1080p') {
    formatArg = 'bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/best[height<=1080]/best';
  } else if (formatId === '720p') {
    formatArg = 'bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720]/best';
  } else if (formatId === '480p') {
    formatArg = 'bestvideo[height<=480][ext=mp4]+bestaudio[ext=m4a]/best[height<=480]/best';
  }

  const args = [
    '--no-playlist',
    '--no-warnings',
    '--extractor-args', 'youtube:player_client=android,web'
  ];
  if (isAudio) {
    args.push('-x', '--audio-format', 'mp3', '--audio-quality', '0');
  } else {
    args.push('-f', formatArg, '--merge-output-format', 'mp4');
  }
  args.push('-o', outputPattern, cleanUrl);

  const process = execFile(YTDLP_PATH, args);

  process.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Download failed. Please try again or select another quality format.' });
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
  const customFilename = req.query.filename || `video_${id}.${ext}`;
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
 * GET or POST /api/shortcut?url=...&format=mp4
 */
app.all('/api/shortcut', (req, res) => {
  const url = req.query.url || req.body.url;
  const format = req.query.format || req.body.format || 'mp4';

  if (!url || !url.trim().startsWith('http')) {
    return res.status(400).json({ error: 'Missing video URL' });
  }

  const cleanUrl = url.trim();
  const fileId = crypto.randomBytes(6).toString('hex');
  const isAudio = format === 'mp3';
  const ext = isAudio ? 'mp3' : 'mp4';
  const outputPath = path.join(DOWNLOADS_DIR, `shortcut_${fileId}.${ext}`);

  const args = [
    '--no-playlist',
    '--no-warnings',
    '--extractor-args', 'youtube:player_client=android,web'
  ];
  if (isAudio) {
    args.push('-x', '--audio-format', 'mp3', '-o', outputPath, cleanUrl);
  } else {
    args.push('-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best', '--merge-output-format', 'mp4', '-o', outputPath, cleanUrl);
  }

  const process = execFile(YTDLP_PATH, args);

  process.on('close', (code) => {
    if (code !== 0 || !fs.existsSync(outputPath)) {
      return res.status(500).json({ error: 'Shortcut download failed' });
    }

    res.setHeader('Content-Disposition', `attachment; filename="SocialVideo_${fileId}.${ext}"`);
    res.setHeader('Content-Type', isAudio ? 'audio/mpeg' : 'video/mp4');

    const stream = fs.createReadStream(outputPath);
    stream.pipe(res);

    stream.on('end', () => {
      setTimeout(() => {
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      }, 10000);
    });
  });
});

// Periodic cleanup of download files older than 1 hour
setInterval(() => {
  fs.readdir(DOWNLOADS_DIR, (err, files) => {
    if (err) return;
    const now = Date.now();
    files.forEach(file => {
      const filePath = path.join(DOWNLOADS_DIR, file);
      fs.stat(filePath, (err, stat) => {
        if (!err && now - stat.mtimeMs > 3600000) {
          fs.unlink(filePath, () => {});
        }
      });
    });
  });
}, 1800000);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🚀 MediaGrabPro Downloader Server active at:`);
  console.log(`💻 Local: http://localhost:${PORT}`);
  console.log(`📱 iOS Shortcut API: http://localhost:${PORT}/api/shortcut?url=<VIDEO_URL>`);
  console.log(`====================================================`);
});
