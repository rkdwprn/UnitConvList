/**
 * assets/unitcalc-logo.png 를 1024x1024 정사각형 icon.png, splash-icon.png 로 변환
 * (Expo 아이콘은 정사각형 필수)
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SIZE = 1024;
const assetsDir = path.join(__dirname, '..', 'assets');
const sourcePath = path.join(assetsDir, 'unitcalc-logo.png');
const iconPath = path.join(assetsDir, 'icon.png');
const splashPath = path.join(assetsDir, 'splash-icon.png');

if (!fs.existsSync(sourcePath)) {
  console.error('Missing assets/unitcalc-logo.png');
  process.exit(1);
}

async function run() {
  const meta = await sharp(sourcePath).metadata();
  const w = meta.width || 1;
  const h = meta.height || 1;
  const scale = Math.min(SIZE / w, SIZE / h);
  const newW = Math.round(w * scale);
  const newH = Math.round(h * scale);

  const resized = await sharp(sourcePath)
    .resize(newW, newH)
    .png()
    .toBuffer();

  const left = Math.round((SIZE - newW) / 2);
  const top = Math.round((SIZE - newH) / 2);
  const right = SIZE - newW - left;
  const bottom = SIZE - newH - top;

  const result = await sharp(resized)
    .extend({ top, bottom, left, right, background: { r: 255, g: 255, b: 255 } })
    .png()
    .toBuffer();

  await sharp(result).toFile(iconPath);
  await sharp(result).toFile(splashPath);
  console.log('Done: icon.png and splash-icon.png updated from unitcalc-logo.png (1024x1024)');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
