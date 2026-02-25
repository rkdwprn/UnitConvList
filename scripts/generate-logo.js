const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SIZE = 1024;
const assetsDir = path.join(__dirname, '..', 'assets');
const svgPath = path.join(assetsDir, 'logo.svg');
const pngPath = path.join(assetsDir, 'logo-output.png');

if (!fs.existsSync(svgPath)) {
  console.error('Missing assets/logo.svg');
  process.exit(1);
}

sharp(svgPath)
  .resize(SIZE, SIZE)
  .png()
  .toFile(pngPath)
  .then(() => {
    return Promise.all([
      sharp(pngPath).toFile(path.join(assetsDir, 'icon.png')),
      sharp(pngPath).toFile(path.join(assetsDir, 'splash-icon.png')),
    ]);
  })
  .then(() => {
    fs.unlinkSync(pngPath);
    console.log('Done: icon.png and splash-icon.png updated from logo.svg');
  })
  .catch((err) => {
    if (fs.existsSync(pngPath)) fs.unlinkSync(pngPath);
    console.error(err);
    process.exit(1);
  });
