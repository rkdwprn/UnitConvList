# Expo 개발 서버 QR 코드 보는 방법

Cursor 등 일부 터미널에서는 QR 코드가 잘 안 보일 수 있습니다. 아래 방법 중 하나를 사용하세요.

---

## 1. 외부 터미널에서 실행 (가장 확실)

Expo는 **터미널 UI**로 QR을 그리기 때문에, QR 지원이 좋은 터미널에서 실행하면 보입니다.

1. **Windows Terminal** 또는 **PowerShell** / **CMD**를 **Cursor 밖에서** 연다.
2. 프로젝트 폴더로 이동:
   ```bash
   cd d:\work\01_UnitConvList
   ```
3. 개발 서버 실행:
   ```bash
   npm start
   ```
4. QR 코드가 터미널에 표시된다. **Expo Go** 앱으로 스캔한다.

**참고:** 터미널 창 크기를 너무 작게 하면 QR이 깨져 보일 수 있으니, 창을 넓히고 폰트 크기는 적당히 유지하세요.

---

## 2. URL 직접 입력 (QR 없이 연결)

QR이 안 보여도 **같은 Wi‑Fi**라면 URL만 입력해 연결할 수 있습니다.

1. PC에서 개발 서버 실행:
   ```bash
   npm start
   ```
2. PC의 IP 확인 (PowerShell):
   ```powershell
   (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch 'Loopback' -and $_.IPAddress -notmatch '^169\.' } | Select-Object -First 1).IPAddress
   ```
   예: `192.168.50.45`
3. 휴대폰 **Expo Go** 앱 실행 → **"Enter URL manually"** (또는 "URL 입력") 선택.
4. 다음 형식으로 입력 (IP와 포트는 위에서 확인한 값으로):
   ```
   exp://192.168.50.45:8081
   ```
5. **Connect**로 연결.

---

## 3. 터널 모드 (다른 네트워크/회사망)

PC와 휴대폰이 **다른 Wi‑Fi**이거나 방화벽이 있을 때는 터널 모드를 쓰세요.

```bash
npx expo start --tunnel
```

- 처음 실행 시 `@expo/ngrok` 설치 여부를 물으면 **Y** 입력.
- 터미널에 표시되는 **exp://...** 주소를 Expo Go의 "Enter URL manually"에 입력해 연결.

---

## 4. Cursor 터미널에서 실행 시

Cursor 내장 터미널에서 `npm start`를 해도 **동작은 같지만**, QR이 블록 문자로 제대로 안 그려질 수 있습니다. 이때는:

- **방법 2**처럼 PC IP와 `exp://PC_IP:8081` 로 수동 연결하거나,
- **방법 1**처럼 같은 프로젝트를 **Windows Terminal** 등 외부 터미널에서 한 번 더 연 뒤, 그 터미널에서 QR을 확인하세요. (서버는 하나만 두고, QR만 외부 터미널에서 보는 식으로 사용 가능)

---

## 요약

| 상황 | 추천 방법 |
|------|-----------|
| QR이 보이면 좋겠다 | 외부 터미널(Windows Terminal 등)에서 `npm start` |
| QR 없이 연결하고 싶다 | 같은 Wi‑Fi에서 `exp://PC_IP:8081` 수동 입력 |
| 다른 네트워크/회사망 | `npx expo start --tunnel` 후 표시된 URL 입력 |
