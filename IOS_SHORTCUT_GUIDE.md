# iOS Shortcut Integration Guide (Apple Shortcuts)

Automate video downloads from TikTok, Instagram, YouTube, and Facebook on your iPhone / iPad and save them directly to your **Photos / Camera Roll** or **Files** without opening a browser!

---

## ⚡ 1-Click Installation (Recommended)

Tap the official iCloud link below on your iPhone / iPad to automatically import **Scorix DL** into your Apple Shortcuts app:

👉 **[https://www.icloud.com/shortcuts/c7ec2cda8ba94ebcad072244e9a40612](https://www.icloud.com/shortcuts/c7ec2cda8ba94ebcad072244e9a40612)**

---

## 📲 How to Use

1. Open **TikTok**, **Instagram**, or **YouTube** on your iPhone.
2. Tap the **Share** button on any video or reel.
3. Choose **Scorix DL** from the Share Sheet.
4. In a few seconds, a success checkmark will appear, and the video will be saved directly in your **Photos** app!

---

## 🛠️ Step-by-Step Manual Setup (Alternative)

If you prefer to create the shortcut manually:

1. Open the **Shortcuts** app on your iPhone.
2. Tap **+** to create a new shortcut named **"Scorix DL"**.
3. Tap **(i)** Info -> Enable **Show in Share Sheet** (Input types: URLs, Text).
4. Add Action **Get Contents of URL**:
   `https://dl-api.scorix.live/api/shortcut?url=[Shortcut Input]`
5. Add Action **Save to Photo Album**.
