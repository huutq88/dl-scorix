# Scorix DL - Professional iOS Shortcut Setup Guide

> **English & Tiếng Việt Setup Guide** for downloading watermark-free HD/4K videos from **TikTok, Instagram, YouTube, Facebook, Twitter/X, and Threads** directly to your **Photos / Camera Roll (Album Ảnh)** on iPhone & iPad!

---

## ⚡ 1-Click Installation / Cài Đặt 1-Chạm (Recommended)

Tap the official Apple iCloud link below on your iPhone / iPad:

👉 **[https://www.icloud.com/shortcuts/99b04fd784414c968bb8499a8fb28c79](https://www.icloud.com/shortcuts/99b04fd784414c968bb8499a8fb28c79)**

1. Tap **Get Shortcut / Nhận Phím Tắt**.
2. Tap **Add Shortcut / Thêm Phím Tắt** to your Apple Shortcuts library.
3. Done! Scorix DL is ready to use in your iOS Share Sheet.

---

## 📲 How to Use / Cách Sử Dụng

1. Open **TikTok**, **Instagram**, **YouTube**, or **Facebook** on your iPhone / iPad.
2. Tap the **Share (Chia sẻ)** button on any video or reel.
3. Select **Scorix DL** from the iOS Share Sheet menu.
4. A notification `"🚀 Scorix DL: Downloading video..."` will appear while processing.
5. The video will be saved directly into your **Photos (Album Ảnh / Cuộn Camera)** with haptic feedback: `"✅ Saved to Photos!"`.

---

## 🛠️ API Endpoint for Custom Shortcuts / Lập Trình Viên

You can also use the high-performance Scorix DL backend API directly:

```http
GET / POST https://dl-api.scorix.live/shortcut?url=<VIDEO_URL>&format=mp4
```

- **Query Parameters**:
  - `url` *(required)*: The social media video link.
  - `format` *(optional)*: `mp4` (video default) or `mp3` (audio only).
- **Response**: Binary stream (`Content-Disposition: attachment; filename="ScorixDL_xxx.mp4"`), directly savable by Apple Shortcuts or curl.
