# iOS Shortcut Integration Guide (Apple Shortcuts)

Automate video downloads from TikTok, Instagram, YouTube, and Facebook on your iPhone / iPad and save them directly to your **Photos / Camera Roll** or **Files** without opening a browser!

---

## 🚀 How It Works

1. While browsing TikTok, Instagram Reels, or YouTube Shorts on your iPhone, tap the **Share** button.
2. Select the Shortcut named **"MediaGrab Downloader"**.
3. The shortcut sends the URL to your local server.
4. The server processes the video and streams the clean MP4 file directly back to your iPhone.
5. Your iPhone automatically saves the video file into your Camera Roll (Photos).

---

## 🛠️ Step-by-Step Setup on iPhone / iPad

### Step 1: Find Your Mac's Local IP Address
1. On your Mac, open **System Settings** -> **Wi-Fi** -> Click **Details...** next to your connected Wi-Fi network.
2. Copy your Mac's IP address (e.g., `192.168.1.15`).

### Step 2: Create a New Shortcut in the Shortcuts App
1. Open the **Shortcuts** app on your iPhone.
2. Tap the **+** button at the top right to create a new shortcut. Name it **"MediaGrab Downloader"**.
3. Tap the Info icon **(i)** at the bottom -> Enable **Show in Share Sheet**.
4. Set **Input Types**: Select **URLs**, **Web Pages**, **Text**.

### Step 3: Add Actions in Order

1. **Add action: "Get Contents of URL"**
   - Set URL to:
     `https://dl-api.scorix.live/api/shortcut?url=[Shortcut Input]`
   - Method: **GET** (or POST).

2. **Add action: "Save to Photo Album"**
   - Set target to **Contents of URL**.
   - Select Album: **Recents** or **Camera Roll**.

3. Tap **Done** to save.

---

## 📲 How to Use

1. Open **TikTok**, **Instagram**, or **YouTube** on your iPhone.
2. Tap the **Share** button on any video or reel.
3. Choose **MediaGrab Downloader**.
4. In a few seconds, a success checkmark will appear, and the video will be saved directly in your **Photos** app!
