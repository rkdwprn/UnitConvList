/**
 * Play Store 등록용 자료 생성
 * - 앱 아이콘 512x512
 * - 기능 그래픽 1024x500
 * - 스크린샷 플레이스홀더 (실제 스크린샷으로 교체 필요)
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const rootDir = path.join(__dirname, '..');
const assetsDir = path.join(rootDir, 'assets');
const storeDir = path.join(rootDir, 'Store_contents');
const iconSrc = path.join(assetsDir, 'icon.png');
const logoSrc = path.join(assetsDir, 'unitcalc-logo.png');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function generateAppIcon() {
  const out = path.join(storeDir, 'app_icon_512.png');
  await sharp(iconSrc).resize(512, 512).png().toFile(out);
  console.log('Created:', out);
}

async function generateFeatureGraphic() {
  const out = path.join(storeDir, 'feature_graphic_1024x500.png');
  const src = fs.existsSync(logoSrc) ? logoSrc : iconSrc;
  const meta = await sharp(src).metadata();
  const w = meta.width || 1;
  const h = meta.height || 1;
  const scale = Math.min(1024 / w, 500 / h) * 0.85;
  const newW = Math.round(w * scale);
  const newH = Math.round(h * scale);
  const left = Math.round((1024 - newW) / 2);
  const top = Math.round((500 - newH) / 2);
  const resized = await sharp(src).resize(newW, newH).png().toBuffer();
  const bg = await sharp({
    create: { width: 1024, height: 500, channels: 3, background: { r: 255, g: 255, b: 255 } }
  })
    .png()
    .toBuffer();
  await sharp(bg)
    .composite([{ input: resized, left, top }])
    .png()
    .toFile(out);
  console.log('Created:', out);
}

async function generatePlaceholder(width, height, outPath) {
  await sharp({
    create: { width, height, channels: 3, background: { r: 240, g: 242, b: 245 } }
  })
    .png()
    .toFile(outPath);
}

async function generateScreenshotPlaceholders() {
  const phoneDir = path.join(storeDir, 'phone_screenshots');
  const tablet7Dir = path.join(storeDir, 'tablet_7inch_screenshots');
  const tablet10Dir = path.join(storeDir, 'tablet_10inch_screenshots');
  ensureDir(phoneDir);
  ensureDir(tablet7Dir);
  ensureDir(tablet10Dir);

  const phoneSize = { w: 1080, h: 1920 };
  const tablet7Size = { w: 1080, h: 1920 };
  const tablet10Size = { w: 1080, h: 7680 };

  for (let i = 1; i <= 2; i++) {
    await generatePlaceholder(phoneSize.w, phoneSize.h, path.join(phoneDir, `phone_${i}.png`));
    await generatePlaceholder(tablet7Size.w, tablet7Size.h, path.join(tablet7Dir, `tablet7_${i}.png`));
    await generatePlaceholder(tablet10Size.w, tablet10Size.h, path.join(tablet10Dir, `tablet10_${i}.png`));
  }
  console.log('Created placeholder screenshots (2 each). Replace with actual app screenshots.');
}

async function writeReadme() {
  const readme = `# Play Store 등록용 자료 (Store_contents)

이 폴더에는 Play Console **스토어 등록정보** 업로드에 사용할 수 있는 자산이 있습니다.

## 생성된 파일

### 1. 앱 아이콘
| 파일 | 규격 | 비고 |
|------|------|------|
| \`app_icon_512.png\` | 512×512px, PNG/JPEG, 최대 1MB | 기본 스토어 등록정보 → 앱 아이콘 |

### 2. 기능 그래픽 (Feature graphic)
| 파일 | 규격 | 비고 |
|------|------|------|
| \`feature_graphic_1024x500.png\` | 1024×500px, PNG/JPEG, 최대 15MB | 그래픽 이미지 1장 |

### 3. 휴대전화 스크린샷 (2~8장)
| 폴더 | 규격 | 비고 |
|------|------|------|
| \`phone_screenshots/\` | 16:9 또는 9:16, 320~3840px, 장당 최대 8MB | **플레이스홀더 포함. 실제 앱 화면으로 교체하세요.** |

- 예시 해상도: 1080×1920 (9:16 세로)
- 앱 실행 후 기기/에뮬레이터에서 캡처한 이미지로 \`phone_1.png\`, \`phone_2.png\` 등을 교체

### 4. 7인치 태블릿 스크린샷 (최대 8장)
| 폴더 | 규격 | 비고 |
|------|------|------|
| \`tablet_7inch_screenshots/\` | 16:9 또는 9:16, 320~3840px, 장당 최대 8MB | **플레이스홀더 포함. 필요 시 실제 스크린샷으로 교체.** |

### 5. 10인치 태블릿 스크린샷 (최대 8장)
| 폴더 | 규격 | 비고 |
|------|------|------|
| \`tablet_10inch_screenshots/\` | 16:9 또는 9:16, **1080×7680px**, 장당 최대 8MB | **플레이스홀더 포함. 필요 시 실제 스크린샷으로 교체.** |

## 스크린샷 교체 방법

1. 앱을 에뮬레이터 또는 실기기에서 실행
2. 메인 화면, 추가 화면, 설정 화면 등 원하는 화면에서 스크린샷 촬영
3. PNG/JPEG로 저장 후 위 규격에 맞게 리사이즈(필요 시)
4. \`phone_screenshots\`, \`tablet_7inch_screenshots\`, \`tablet_10inch_screenshots\` 폴더의 플레이스홀더 파일을 실제 이미지로 교체

## Play Console 업로드 위치

- **Play Console** → **성장** → **스토어 등록정보** → **기본 스토어 등록정보**
- 앱 아이콘, 기능 그래픽, 휴대전화/태블릿 스크린샷 항목에 위 파일 업로드
`;

  fs.writeFileSync(path.join(storeDir, 'README.md'), readme, 'utf8');
  console.log('Created: Store_contents/README.md');
}

async function run() {
  if (!fs.existsSync(iconSrc)) {
    console.error('Missing assets/icon.png. Run: node scripts/generate-icon-from-png.js');
    process.exit(1);
  }
  ensureDir(storeDir);
  await generateAppIcon();
  await generateFeatureGraphic();
  await generateScreenshotPlaceholders();
  await writeReadme();
  console.log('\nStore_contents generation done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
