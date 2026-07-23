# Portfolio Walkthrough Video Recorder

This directory contains a utility script to automatically record a complete, animated scrolling video walkthrough of your portfolio website (including theme switching) and save it directly to your Desktop.

## 🛠️ How to Record in the Future

Whenever you update your website and want to capture a new walkthrough video to share:

### 1. Install Dependencies
First, ensure you have installed the required recording tools (Playwright):
```bash
npm install
npx playwright install chromium
```

### 2. Start the Dev Server
The recorder works by capturing your local website running in development mode. Start the local server:
```bash
npm run dev
```
*(Make sure the server is running on `http://localhost:5173/AryahiJogi/`)*

### 3. Run the Recorder
Open a separate terminal window and run:
```bash
npm run record
```

### 4. Locate Your Video
The script will automate the browser, record the interaction, and save the video file directly to your Desktop:
* **Filename**: `portfolio_walkthrough.webm`
* *(Note: If no Desktop folder is detected, it will fall back and save the video inside your project root directory.)*
