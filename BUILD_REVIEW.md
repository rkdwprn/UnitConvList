# EAS 빌드 전 검토 (재검토)

## ✅ 문제 없음

| 항목 | 상태 |
|------|------|
| **package.json** | react 19.1.0, react-dom 19.1.0, overrides로 peer 충돌 방지됨 |
| **package-lock.json** | 커밋되어 있음 → EAS에서 `npm ci` 정상 동작 |
| **app.json** | version 0.0.4, versionCode 1, package `com.unitconvlist.app`, icon/splash 경로 유효 |
| **eas.json** | production 프로필 AAB, autoIncrement, appVersionSource remote |
| **assets** | icon.png, splash-icon.png 존재 |
| **린트** | app/context/constants 오류 없음 |
| **.gitignore** | node_modules 제외, package-lock.json은 추적됨(필수) |

---

## ⚠️ 참고 사항 (선택)

1. **버전 표기 통일**  
   - `package.json`과 `app.json`의 `expo.version`을 **0.0.4**로 맞춰 두었습니다.  
   - 앱 내 설정 화면 버전은 `app.json`을 참조합니다.

2. **설정 화면 버전 읽기**  
   - `app/(tabs)/settings.tsx`에서 `import appConfig from '../../app.json'`로 버전을 읽고 있습니다.  
   - Expo 빌드에서는 정상 동작합니다.  
   - 나중에 `expo-constants`의 `Constants.expoConfig?.version`으로 바꿀 수 있습니다(선택).

---

## 🔧 빌드 전 최종 체크리스트

- [x] `npm ci` 오류 해결 (react-dom 19.1.0 고정)
- [x] lock 파일 커밋·푸시됨
- [x] app.json / eas.json 설정 유효
- [x] 아이콘·스플래시 경로 및 파일 존재
- [ ] **로컬에서 한 번 실행**: `npx expo start` → Android에서 동작 확인(권장)
- [ ] **EAS 로그인**: `npx eas login` (이미 했다면 생략)

---

**결론:** 현재 상태로 EAS 빌드를 다시 실행해도 됩니다.  
위 참고 사항은 선택이며, 반드시 수정할 필요는 없습니다.
