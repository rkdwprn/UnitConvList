# UnitConvList 버전 기록 (Revision Log)

**규칙:** 새 버전을 기록할 때 `app.json`의 `expo.version`도 해당 버전으로 업데이트한다.

---

## 0.0.1 (2025-02-23)

### 요약
- **UnitConvList** 앱 초기 버전.
- 물리 단위 변환 목록을 관리하고 실시간 변환 결과를 보여주는 Android/iOS 앱 (Expo Go 디버깅 지원).

### 구현 내용
- **메인 페이지**
  - 사용자 단위 변환 목록 표시.
  - 각 항목: 숫자 입력 칸, 원본 단위 → 변환된 값·단위 표시 (예: kg —→ 1,000 g).
  - 오른쪽 드래그 핸들로 순서 변경 (react-native-draggable-flatlist).
  - 항목 길게 누르면 삭제 확인 다이얼로그.
  - 목록 최대 100개, 오른쪽 하단 FAB(+)로 추가 페이지 이동.
- **추가 페이지**
  - 단위 종류 선택 (길이, 넓이, 무게, 부피, 온도, 압력, 속도, 데이터양, 시간).
  - 선택적 제목, 원본 단위·변환 단위 선택 후 목록에 추가.
- **설정 페이지**
  - 밝은/어두운 테마 전환.
  - 한글/영어 언어 전환.
- **단위 체계**
  - 9개 단위 종류, 종류별 SI 기준 단위 및 다수 보조 단위 정의.
  - 변환 로직 및 결과 포맷(천 단위 구분 등) 적용.
- **기타**
  - AsyncStorage로 목록·테마·언어 저장.
  - Expo Router 기반 탭 네비게이션 (메인 / 추가 / 설정).

### GitHub 요약 (v0.0.1)
```
UnitConvList v0.0.1 — 초기 버전

- 메인: 변환 목록, 실시간 변환(예: kg→g), 드래그 순서 변경, 길게 눌러 삭제, FAB으로 추가(최대 100개)
- 추가: 9종 단위(길이/넓이/무게/부피/온도/압력/속도/데이터/시간), 선택 제목, 원본·변환 단위 선택
- 설정: 밝은/어두운 테마, 한글/영어
- Expo Router, AsyncStorage, SI 기준 단위 변환
```

---

## 0.0.2 (2025-02-23)

### 요약
- **Expo SDK 54** 및 **Expo Go(SDK 54)** 호환으로 업그레이드.
- 의존성 정리 및 런타임/번들 오류 수정.

### 구현·변경 내용
- **의존성**
  - Expo SDK 52 → **54** (React 19.1.0, React Native 0.81.5).
  - expo-router 4 → **6**, expo-asset·expo-status-bar·expo-localization 등 SDK 54 권장 버전 적용.
  - react-native-reanimated **4.x**, react-native-gesture-handler·react-native-screens·react-native-safe-area-context 등 업데이트.
  - **expo-linking** 추가 (expo-router 6 의존).
  - **react-native-worklets** 추가 및 **0.5.1** 고정 (Expo Go 네이티브와 버전 일치).
- **설정**
  - **metro.config.js** 추가: `unstable_enablePackageExports: false` (Hermes "runtime not ready" 완화).
  - package.json: React 19.1.0, TypeScript ~5.9.2 등 정리.
- **기타**
  - Android Expo Go(SDK 54)에서 정상 실행 목표로 호환성 맞춤.

### GitHub 요약 (v0.0.2)
```
UnitConvList v0.0.2 — Expo SDK 54 / Expo Go 호환

- Expo SDK 54, React 19.1.0, RN 0.81.5, expo-router 6
- expo-linking·react-native-worklets@0.5.1 추가, Reanimated 4.x·Gesture Handler 등 업데이트
- metro.config.js 추가(runtime not ready 대응), Worklets JS/네이티브 버전 일치(0.5.1)
```

---

## 0.0.3 (2025-02-24)

### 요약
- **설정** 페이지에 앱 정보(버전, 개발자, 이메일) 추가.
- **로고** 정리: U + 원형 화살표 조합, 흰색 배경 PNG 아이콘 적용.
- **Google Play 스토어** 업로드 준비: EAS Build 설정 및 가이드 추가.

### 구현·변경 내용
- **설정 페이지**
  - 앱 정보 섹션: 버전(`app.json` 연동), 개발자(perfectLemon), 이메일(rkdwprn@gmail.com, 탭 시 메일 앱 연동).
  - 다국어: `settings.appInfo`, `version`, `developer`, `email` (ko/en).
- **로고·아이콘**
  - U + Circular Arrow 로고 이미지(PNG)로 `icon.png`, `splash-icon.png` 적용.
  - `assets/logo.svg` 유지(경로 기반 모던 아이콘, 필요 시 `scripts/generate-logo.js`로 PNG 재생성 가능).
- **Play 스토어**
  - **eas.json**: production 프로필(AAB, `autoIncrement`), submit 프로필.
  - **app.json**: `expo.android.versionCode: 1` 추가.
  - **package.json**: `build:android` 스크립트 추가.
  - **PLAYSTORE.md**: EAS 로그인 → AAB 빌드 → Play Console 등록·업로드 절차 정리.

### GitHub 요약 (v0.0.3)
```
UnitConvList v0.0.3 — 앱 정보, 로고, Play 스토어 준비

- 설정: 앱 정보(버전/개발자 perfectLemon/이메일), 메일 링크
- 로고: U+원형화살표 PNG 아이콘·스플래시 적용
- EAS Build(eas.json), versionCode, build:android, PLAYSTORE.md 가이드
```

---

## 0.0.4 (2026-02-25)

### 요약
- **버전 기록 규칙** 정비. "버전기록" 명령 시 RevisionLog.md 하단에 새 버전 추가·app.json 버전 연동·GitHub 요약·Git 원격 절차를 Cursor 규칙으로 정리.

### 구현·변경 내용
- **.cursor/rules/version-log.mdc**
  - "버전기록" 입력 시 동작: RevisionLog.md 하단에 버전 번호 올려 추가(예: 0.0.4).
  - app.json의 **expo.version** 수정을 **필수**로 명시.
  - 각 버전 섹션에 GitHub 요약 블록 포함.
  - Git 원격: `https://github.com/rkdwprn/UnitConvList.git` 명시, 커밋 메시지·스테이징 절차 정리.

### GitHub 요약 (v0.0.4)
```
UnitConvList v0.0.4 — 버전 기록 규칙 정비

- 버전기록 명령: RevisionLog.md 하단 추가, app.json expo.version 필수 수정
- GitHub 요약·Git 원격(UnitConvList) 절차를 Cursor 규칙(version-log.mdc)에 정리
```

---

## 0.0.5 (2026-02-25)

### 요약
- **AdMob** 하단 배너 광고 추가로 수익화 지원.
- 메인 헤더 문구 "Unit Converter List"로 변경, Expo/빌드 설정 정리.

### 구현·변경 내용
- **AdMob 배너**
  - **react-native-google-mobile-ads** 도입, app.json 플러그인(테스트 앱 ID) 설정.
  - **components/AdBanner.tsx**: ANCHORED_ADAPTIVE_BANNER, Expo Go에서는 미표시.
  - 탭 레이아웃 하단에 배너 고정. 프로덕션 배너 단위 ID 적용(ca-app-pub-5922905617998234/6202262757).
  - **docs/ADMOB.md**: 앱 ID·광고 단위 ID 교체 및 수익화 절차 안내.
- **UI·문구**
  - 메인 페이지 상단 헤더: "Unit Calc" → "Unit Converter List".
- **빌드·설정**
  - Expo Doctor 대응: 아이콘 정사각형(1024×1024) 재생성(scripts/generate-logo.js), expo-font·expo-constants 추가.
  - Git 원격 UnitConvList.git, slug unitconvlist, 버전 기록 규칙 정리.
- **기타**
  - **ChattingLog.md**: 채팅 기록(입력/답변·시간·요약) 형식 정리.
  - **docs/EXPO_QR_보는_방법.md**: QR/수동 URL·터널 실행 방법 안내.

### GitHub 요약 (v0.0.5)
```
UnitConvList v0.0.5 — AdMob 배너, 헤더 문구, 빌드 정리

- AdMob: 하단 배너(react-native-google-mobile-ads), 배너 단위 ID 적용, docs/ADMOB.md
- 메인 헤더 "Unit Converter List", Expo Doctor(아이콘·expo-font/constants) 대응
- ChattingLog.md, Expo QR 가이드, Git 원격 UnitConvList
```

---

## 0.0.6 (2026-02-25)

### 요약
- **스토어 등록** 자료 생성(Store_contents): 앱 아이콘 512px, 기능 그래픽, 스크린샷 플레이스홀더·설명 문구.
- 앱 아이콘을 UC 로고(unitcalc-logo.png)로 통일, 시작 화면(스플래시)을 현재 아이콘으로 변경.
- R8(난독화)·가독화 파일 안내, Play 서명 키(.der·.jks) 해결 가이드 추가.

### 구현·변경 내용
- **스토어 자료**
  - **Store_contents/** 폴더: app_icon_512.png(512×512), feature_graphic_1024x500.png(1024×500).
  - 휴대전화/7인치/10인치 스크린샷 플레이스홀더(2장씩), README·스토어_설명_문구.md.
  - **scripts/generate-store-contents.js**: 스토어용 자산 일괄 생성.
  - **docs/STORE_DESCRIPTIONS.md**: 간단한 설명(80자 이내)·자세한 설명 한·영.
- **아이콘·시작 화면**
  - **scripts/generate-icon-from-png.js**: unitcalc-logo.png → 1024×1024 icon.png·splash-icon.png 생성.
  - **app.json** splash.image: splash-icon.png → **icon.png**(시작 화면을 현재 앱 아이콘과 동일하게).
- **문서**
  - **docs/가독화_매핑_파일_Play_업로드.md**: R8·매핑 파일·Play 업로드 절차.
  - **docs/PLAY_SIGNING_KEY_오류_해결.md**: 서명 키 불일치, .der(인증서) 사용 불가, .jks 위치·업로드 키 재설정.
  - **docs/RELEASE_NOTES_EN.md**: 출시 노트 영문·한글, Play 언어별 입력 안내.
- **빌드**
  - **expo-build-properties**: android.enableMinifyInReleaseBuilds(true), extraProguardRules(React Native 유지).

### GitHub 요약 (v0.0.6)
```
UnitConvList v0.0.6 — 스토어 자료, 아이콘·스플래시, R8·서명 가이드

- Store_contents: 앱 아이콘 512, 기능 그래픽 1024×500, 스크린샷 플레이스홀더, 스토어 설명(80자·전체)
- 아이콘: unitcalc-logo 기반, 시작 화면을 icon.png로 통일
- R8(minify)·매핑 파일·Play 서명 키(.der/.jks) 해결 문서, 출시 노트 한·영
```
