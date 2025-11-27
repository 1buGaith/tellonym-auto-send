# ⚡ Tellonym Sender v2.1: Modern Design - Multi-Page Automation 💥

## ⚠️ CRITICAL DISCLAIMER: USE AT YOUR OWN RISK ⚠️

**This script is designed for automated and repetitive message sending (spamming) on the Tellonym platform, including managing multiple browser tabs simultaneously.**

**The developer of this project takes absolutely NO responsibility for any consequences, including account suspension or bans, resulting from the use or misuse of this code. Use of automated tools may violate Tellonym's Terms of Service.**

---

## ⭐ Project Overview

This **UserScript** is engineered to automate the continuous sending of random messages on **Tellonym** profiles. Version 2.1 features a highly stylized, modern UI overlay for control and includes advanced functionality for spreading the load across multiple browser windows.

### 💡 Features

* **Aggressive Message Sending:** Continuously fills the message input field with random predefined messages (including placeholders for social media handles).
* **Multi-Page Support:** Allows the user to select and launch up to **10 simultaneous browser windows/tabs** to maximize sending rate.
* **Inter-Window Communication:** Uses the `postMessage` API to communicate between the main control panel and the spawned windows to manage the sending process across all pages.
* **Modern UI:** Injects a visually stunning interface with gradient backgrounds, glass effects, and dynamic animations (float, glow, pulse) for real-time monitoring.
* **Configurable Delay:** Users can easily adjust the time delay (in seconds) between each message submission using dedicated UI buttons.
* **Real-Time Statistics:** Tracks and displays the count of sent messages, failures, and success rate.

---

## ⚙️ Technical Mechanism Highlights

The script bypasses common protections by meticulously simulating user behavior:

* **DOM Interaction:** Uses robust selectors (`#root textarea`, `button[type="submit"]`) to locate dynamic elements on the Tellonym SPA.
* **Input Simulation:** Employs advanced JavaScript techniques (`Object.getOwnPropertyDescriptor` and dispatching keyboard events) to ensure the message text is accepted by the site's front-end framework.
* **Anti-Detection Measures:** Includes checks to stop sending upon detection of common warning phrases or CAPTCHA elements, resuming after a long wait period (10 minutes) to avoid immediate bans.

---

## 🛠️ Installation Guide

This script requires a UserScript manager such as **Tampermonkey** or **Greasemonkey**.

1.  **Install Manager:** Ensure you have the required manager extension installed on your browser (e.g., [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)).
2.  **Install Script:**
    * **Direct Link:** Click the direct link to the `.user.js` file: [Insert Link to your **`.user.js`** file here].
    * **Manual:** Copy the entire code and paste it into a new script slot in your manager dashboard.

---

## 🚀 Usage Instructions

1.  **Navigate:** Go to the target Tellonym profile page (`https://tellonym.me/username`).
2.  **Locate UI:** The control panel will appear in the top-left corner (it is draggable).
3.  **Set Parameters:**
    * Adjust the **Time Delay** (seconds) between messages using the `+` / `-` buttons.
    * Adjust the **Number of Pages** to open for concurrent sending.
4.  **Open Pages:** Click `🔗 فتح الصفحات` (Open Pages) to spawn the new windows/tabs. You must allow pop-ups for this.
5.  **Start Automation:** Click `⚡ بدء الكل` (Start All) to initiate message sending across all active windows simultaneously.
6.  **Stop:** Click `■ إيقاف` (Stop) or close the windows manually.

---

## 📜 Message List (Editable)

The messages are defined in the `msgs` array in the code. You can easily modify this list to change the content being sent:

```javascript
const msgs = [
    "By 7mo7",
    "discord : 7mo7",
    "intsa : 2lryy",
    "fux$k u",
    "Bb",
    "Hi",
    "Sp&m Tell"
];
