# Google Play 스토어 업로드 가이드 (UnitConvList)

## 사전 준비

1. **Google Play 개발자 계정**  
   - [Google Play Console](https://play.google.com/console) 가입 (1회 등록비 약 $25)
2. **Expo 계정**  
   - [expo.dev](https://expo.dev) 가입 후 로그인

---

## 1단계: EAS CLI 로그인 및 빌드

### 1-1. EAS 로그인

```bash
npx eas login
```

Expo 계정으로 로그인합니다.

### 1-2. 프로젝트에 EAS 연결 (최초 1회)

```bash
npx eas build:configure
```

이미 `eas.json`이 있으면 건너뛰어도 됩니다.

### 1-3. Android 프로덕션 빌드 (AAB 생성)

```bash
npx eas build --platform android --profile production
```

- 빌드는 Expo 클라우드에서 진행됩니다.
- **AAB(Android App Bundle)** 파일이 생성되며, Play 스토어는 AAB만 허용합니다.
- `eas.json`의 `autoIncrement: true`로 매 빌드마다 `versionCode`가 자동 증가합니다.
- 빌드 완료 후 [expo.dev](https://expo.dev) → 해당 프로젝트 → Builds에서 AAB를 다운로드할 수 있습니다.

---

## 2단계: Play Console에서 앱 등록

1. [Google Play Console](https://play.google.com/console) 접속
2. **앱 만들기** → 앱 이름(예: UnitConvList), 기본 언어, 앱/게임 여부 선택
3. 정책 동의 후 **앱 만들기** 완료

---

## 3단계: 앱 내용 입력

Play Console 왼쪽 메뉴에서 다음을 채웁니다.

| 항목 | 설명 |
|------|------|
| **대시보드** | 앱 상태 확인 |
| **정책** → 앱 콘텐츠 | 개인정보처리방침 URL, 광고 여부 등 (필수 시 입력) |
| **정책** → 타겟층 및 콘텐츠 | 타겟 연령, 설문 제출 |
| **정책** → 뉴스 앱 선언 | 해당 없으면 “아니요” |
| **앱 콘텐츠** → 개인정보처리방침 | URL 필요 시 추가 |
| **출시** → 프로덕션 | 새 버전 만들기 → AAB 업로드 |

### AAB 업로드

1. **출시** → **프로덕션** (또는 **내부 테스트**로 먼저 테스트)
2. **새 버전 만들기**
3. **App bundle** 섹션에서 EAS 빌드에서 받은 **AAB 파일 업로드**
4. **출시 이름** 입력 (예: `1.0.0 (1)`)
5. 저장 후 **검토** → **출시** 진행

---

## 4단계: 스토어 등록정보 (필수)

**성장** → **스토어 등록정보** → **기본 스토어 등록정보**에서:

- **앱 이름**: UnitConvList
- **간단한 설명** / **전체 설명**: 앱 소개
- **앱 아이콘**: 512×512 PNG (현재 `assets/icon.png` 사용 가능, 512 권장)
- **기능 그래픽** (선택): 1024×500
- **스크린샷**: 휴대전화 최소 2장 (권장 4장 이상)

---

## 5단계: 버전 관리

- **사용자용 버전**: `app.json` → `expo.version` (예: `0.0.1` → `1.0.0`)
- **Android 빌드 번호**: `versionCode` — EAS `autoIncrement` 사용 시 자동 증가, 수동이면 `app.json`의 `expo.android.versionCode`를 올립니다.

업데이트 시:

1. `app.json`에서 `version` 수정
2. `npx eas build --platform android --profile production` 다시 실행
3. Play Console에서 새 AAB 업로드 후 새 버전으로 출시

---

## 요약 명령어

```bash
# 로그인 (최초 1회)
npx eas login

# Android 프로덕션 AAB 빌드 (아래 둘 중 하나)
npm run build:android
# 또는
npx eas build --platform android --profile production
```

빌드가 끝나면 Expo 대시보드에서 AAB를 받아 Play Console에 업로드하면 됩니다.
