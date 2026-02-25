# AdMob 배너 수익화 안내

앱 하단에 AdMob 배너 광고가 적용되어 있습니다. **실제 수익을 받으려면** 아래 설정이 필요합니다.

---

## 1. AdMob 앱 등록

1. [Google AdMob](https://admob.google.com) 로그인
2. **앱** → **앱 추가** → **Android** 선택
3. 앱 이름(예: Unit Converter List), 패키지명 `com.unitconvlist.app` 입력 후 등록
4. 생성된 **앱 ID** 확인 (형식: `ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy`)

---

## 2. app.json에 앱 ID 반영

`app.json`의 `plugins`에서 `react-native-google-mobile-ads` 설정을 수정합니다.

- **androidAppId**: AdMob에서 발급한 Android 앱 ID로 교체
- **iosAppId**: iOS 앱을 등록했다면 해당 앱 ID로 교체 (Android만 쓸 경우 기존 테스트 ID 유지 가능)

현재는 **테스트용 앱 ID**가 들어 있어, 개발/테스트 시에는 광고가 테스트 광고로 표시됩니다.

---

## 3. 배너 광고 단위 생성

1. AdMob → **광고 단위** → **광고 단위 추가**
2. 형식: **배너**
3. 광고 단위 이름 입력 후 만들기
4. 생성된 **광고 단위 ID** 복사 (형식: `ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy`)

---

## 4. 코드에 광고 단위 ID 반영

`components/AdBanner.tsx`에서 상수 **BANNER_AD_UNIT_ID**를 수정합니다.

- **프로덕션** (`__DEV__ === false`)일 때 사용할 값을 AdMob에서 만든 **배너 광고 단위 ID**로 바꿉니다.
- 현재는 `'ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy'` 자리 표시자가 있으므로, 여기를 실제 배너 광고 단위 ID로 교체하면 됩니다.

---

## 5. 빌드 및 동작

- **Expo Go**: AdMob 네이티브 모듈이 없어 배너가 **표시되지 않습니다**. (정상 동작)
- **EAS Build로 만든 APK/AAB**: 배너가 하단에 표시되며, 위 설정을 마치면 실제 광고가 노출·수익화됩니다.

테스트 시에는 `app.json`과 `AdBanner.tsx`에 있는 **테스트 ID**를 그대로 두고, 배포 전에 위 단계대로 실제 앱 ID·광고 단위 ID로만 교체하면 됩니다.
