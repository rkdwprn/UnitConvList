const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '..', 'assets');
const inputPath = path.join(assetsDir, 'splash-icon.png');
const tempPath = path.join(assetsDir, 'splash-icon-white-temp.png');

sharp(inputPath)
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(tempPath)
  .then(() => {
    fs.renameSync(tempPath, inputPath);
    console.log('Done: splash-icon.png transparent areas → white');
  })
  .catch((err) => {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.error(err);
    process.exit(1);
  });
