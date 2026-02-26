# 가독화 파일(매핑 파일) — R8/ProGuard 및 Play Console 업로드

Play Console에서 **"이 App Bundle 유형과 연결된 가독화 파일이 없습니다"** 메시지가 나오는 경우, R8/ProGuard를 사용하면서 **매핑 파일(mapping.txt)**을 Play에 등록해 두면 비정상 종료·ANR 로그를 읽기 쉬워집니다. R8을 사용하면 앱 크기 감소에도 도움이 됩니다.

---

## 1. 이 프로젝트에서 적용한 설정

### R8(난독화) 활성화

- **expo-build-properties** 플러그인을 사용해 **릴리스 빌드**에서 R8(minify)을 켜 두었습니다.
- **app.json** 예시:
  - `android.enableMinifyInReleaseBuilds: true`
  - React Native/Hermes 유지용 **extraProguardRules** 추가

이제 **EAS Build로 Android 프로덕션 AAB**를 만들면, 빌드 과정에서 **매핑 파일**이 생성됩니다(경로: `android/app/build/outputs/mapping/release/mapping.txt`).

---

## 2. 매핑 파일을 Play Console에 넣는 방법

### 방법 A: EAS 빌드 결과물에서 매핑 파일 받기

1. **빌드 실행**
   ```bash
   npm run build:android
   ```
2. [expo.dev](https://expo.dev) → 해당 프로젝트 → **Builds** → 방금 만든 Android 빌드 선택
3. **Artifacts** / **빌드 산출물**에서 **mapping.txt** 또는 아카이브를 다운로드할 수 있는지 확인  
   - EAS가 매핑 파일을 아티팩트로 올리도록 설정돼 있다면 여기서 받을 수 있습니다.
4. **Play Console** → **출시** → **앱 번들 탐색기** → 해당 AAB 선택 → **다운로드** 탭 → **ReTrace mapping 파일** / **가독화 파일** 업로드에 **mapping.txt** 업로드

### 방법 B: Play Console에서 수동 업로드만 하기

- R8은 이미 **expo-build-properties** 설정으로 켜져 있으므로, AAB 안에 매핑 정보가 포함되는 경우도 있습니다(빌드 도구/버전에 따라 다름).
- **매핑 파일을 따로 받을 수 없으면**:  
  Play Console → **테스트 및 출시** → **설정** → **앱 무결성** (또는 **앱 서명**) → **가독화 파일** / **ReTrace mapping 파일** 업로드 항목이 있으면, 그곳에 **mapping.txt**를 업로드합니다.  
  (메뉴 이름은 Play Console 버전에 따라 다를 수 있습니다.)

### 방법 C: 로컬에서 AAB·매핑 파일 함께 만들기

- `npx expo prebuild` 후 `android` 폴더가 생긴 상태에서:
  ```bash
  cd android && ./gradlew bundleRelease
  ```
- 생성 위치:
  - AAB: `android/app/build/outputs/bundle/release/app-release.aab`
  - 매핑: `android/app/build/outputs/mapping/release/mapping.txt`
- 이 **mapping.txt**를 Play Console의 **ReTrace mapping 파일** 업로드 위치에 업로드합니다.

---

## 3. 요약

| 항목 | 내용 |
|------|------|
| **R8 사용 여부** | ✅ **app.json**의 **expo-build-properties**로 릴리스 빌드에 R8(minify) 적용됨 |
| **매핑 파일** | 빌드 시 `android/app/build/outputs/mapping/release/mapping.txt` 에 생성됨 |
| **Play에 등록** | Play Console → 앱 번들 탐색기(또는 앱 무결성/설정) → **가독화 파일** / **ReTrace mapping 파일**에 **mapping.txt** 업로드 |

이렇게 하면 **"가독화 파일이 없습니다"** 안내를 해소하고, 비정상 종료·ANR 분석 시 스택 트레이스를 더 읽기 쉽게 만들 수 있습니다.
