# Scorix DL - Professional iOS Shortcut Setup Guide

Upgrade your iOS Shortcut with **Haptic Vibrations**, **Toast Notifications**, and **Auto Camera Roll Save** for a 100% professional experience!

---

## ⚡ Professional 5-Step Shortcut Actions

Create a Shortcut named **"Scorix DL"** in the iOS Shortcuts App with these 5 actions:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. [Show Notification]                                      │
│    "🚀 Scorix DL: Downloading video..."                    │
├─────────────────────────────────────────────────────────────┤
│ 2. [Get Contents of URL]                                    │
│    URL: https://dl-api.scorix.live/shortcut?url=[Shortcut Input] │
│    Method: GET                                              │
├─────────────────────────────────────────────────────────────┤
│ 3. [Save to Photo Album]                                    │
│    Save [Contents of URL] to Recents / Camera Roll          │
├─────────────────────────────────────────────────────────────┤
│ 4. [Vibrate Device] (Haptic Feedback)                       │
│    Vibrate device on completion                             │
├─────────────────────────────────────────────────────────────┤
│ 5. [Show Notification]                                      │
│    "✅ Scorix DL: Video saved to Photos!"                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Detailed Step-by-Step Instructions

1. Open the **Shortcuts (Phím tắt)** app on your iPhone.
2. Tap **+** to create a new shortcut -> Name it **"Scorix DL"**.
3. Tap **(i)** Info -> Enable **Show in Share Sheet** (Input types: URLs, Text, Web Pages).
4. Add Action **Show Notification**:
   - Title: `Scorix DL`
   - Body: `🚀 Downloading video...`
5. Add Action **Get Contents of URL**:
   - URL: `https://dl-api.scorix.live/shortcut?url=[Shortcut Input]`
6. Add Action **Save to Photo Album**:
   - Input: `[Contents of URL]`
   - Target: `Recents` or `Camera Roll`
7. Add Action **Vibrate Device**:
   - Provides instant haptic tactile feedback when download finishes.
8. Add Action **Show Notification**:
   - Title: `Scorix DL`
   - Body: `✅ Saved to Photos!`

---

## 🎨 Customizing Icon & Branding

- **Color**: Select **Cyan Blue** (`#00A0E9`).
- **Icon / Glyph**: Select **Download Arrow** or **Lightning Bolt**.
