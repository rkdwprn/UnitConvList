# UnitCalc 버전 기록 (Revision Log)

## 0.0.1 (2025-02-23)

### 요약
- **UnitCalc** 앱 초기 버전.
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
UnitCalc v0.0.1 — 초기 버전

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
UnitCalc v0.0.2 — Expo SDK 54 / Expo Go 호환

- Expo SDK 54, React 19.1.0, RN 0.81.5, expo-router 6
- expo-linking·react-native-worklets@0.5.1 추가, Reanimated 4.x·Gesture Handler 등 업데이트
- metro.config.js 추가(runtime not ready 대응), Worklets JS/네이티브 버전 일치(0.5.1)
```
