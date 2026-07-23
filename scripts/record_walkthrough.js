const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const os = require('os');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  
  // Set up temporary video recording directory
  const videoDir = path.join(__dirname, 'temp_videos');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  
  console.log('Navigating to local portfolio site...');
  await page.goto('http://localhost:5173/AryahiJogi/');
  await page.waitForTimeout(2000); // Wait for page load and initial animations

  // Scroll down slowly to show the whole page
  console.log('Scrolling down page...');
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const steps = 60;
  const delay = 100; // ms
  const distance = scrollHeight / steps;

  for (let i = 0; i < steps; i++) {
    await page.evaluate((dist) => window.scrollBy(0, dist), distance);
    await page.waitForTimeout(delay);
  }

  await page.waitForTimeout(2000);

  // Toggle theme
  console.log('Toggling theme to Light mode...');
  const themeButton = page.locator('button[aria-label="Toggle Theme"]').first();
  await themeButton.click();
  await page.waitForTimeout(2000);

  // Scroll back up slowly in light theme
  console.log('Scrolling back up...');
  for (let i = 0; i < steps; i++) {
    await page.evaluate((dist) => window.scrollBy(0, -dist), distance);
    await page.waitForTimeout(delay);
  }

  await page.waitForTimeout(2000);

  // Close context to save the video file
  console.log('Saving video and closing browser...');
  await context.close();
  await browser.close();

  // Find the recorded video and copy it to the Desktop dynamically
  const files = fs.readdirSync(videoDir);
  const videoFile = files.find(file => file.endsWith('.webm'));
  if (videoFile) {
    const srcPath = path.join(videoDir, videoFile);
    
    // Find the current user's Desktop folder dynamically
    const destDir = path.join(os.homedir(), 'Desktop');
    const destPath = path.join(destDir, 'portfolio_walkthrough.webm');
    
    if (fs.existsSync(destDir)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`\n🎉 Success! Walkthrough video recorded and saved to: ${destPath}\n`);
    } else {
      // Fallback to project root if Desktop folder doesn't exist
      const fallbackPath = path.join(process.cwd(), 'portfolio_walkthrough.webm');
      fs.copyFileSync(srcPath, fallbackPath);
      console.log(`\n🎉 Success! Walkthrough video recorded and saved to project root: ${fallbackPath}\n`);
    }

    // Clean up temporary video files
    fs.rmSync(videoDir, { recursive: true, force: true });
  } else {
    console.error('Error: No video file was generated!');
  }
})();
