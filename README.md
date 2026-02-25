# UnitConvList

물리 단위 변환 계산기를 목록으로 관리하는 앱입니다.  
Android / iOS (Expo Go에서 디버깅 가능).

## 기능
- **메인**: 변환 목록 보기, 숫자 입력 시 실시간 변환 (예: 10 → kg —→ 1,000 g), 드래그로 순서 변경, 길게 눌러 삭제, 최대 100개, FAB으로 추가.
- **추가**: 단위 종류·원본 단위·변환 단위 선택, 선택적 제목으로 목록에 추가.
- **설정**: 밝은/어두운 테마, 한글/영어.

## 지원 단위 종류 (SI 기준)
- 길이(m), 넓이(m²), 무게(kg), 부피(m³), 온도(K), 압력(Pa), 속도(m/s), 데이터양(B), 시간(s).

## 실행 방법
```bash
npm install
npx expo start
```
Expo Go 앱에서 QR 코드로 열거나, `npx expo run:android` 로 에뮬레이터/기기 실행.

## 버전 기록
[RevisionLog.md](./RevisionLog.md) 참고.
