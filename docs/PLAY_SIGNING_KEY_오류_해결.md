# Android App Bundle 서명 키 불일치 해결

Play Console 오류:
- **필요한 서명 키 SHA1:** `E8:5D:57:43:88:A0:E3:E8:AC:5D:B0:41:F3:87:A4:19:98:05:F5:9E`
- **현재 AAB 서명 키 SHA1:** `D6:5E:70:54:E8:2F:9D:CE:E2:DD:69:F8:F5:91:87:61:B9:C6:98:00`

→ **이전에 Play에 등록된 키(E8:5D:…)**로 서명해야 하는데, **지금 빌드에는 다른 키(D6:5E:…)**가 사용된 상태입니다.

---

## 1. 원인

- Play Console에는 **처음 업로드했을 때의 서명 키**가 “업로드 키”로 등록됩니다.
- 그 이후 빌드도 **같은 키**로 서명해야 합니다.
- EAS Build를 새로 쓰거나, 프로젝트/계정을 바꾸면 **새 키(D6:5E:…)**가 생성될 수 있고, 이 키로 만든 AAB는 Play가 거부합니다.

---

## 2. 해결: EAS에서 “기존 키스토어” 사용하기

**E8:5D:…** 지문을 가진 키스토어(.jks 또는 .keystore) 파일을 찾아서, EAS가 그 키로 서명하도록 설정해야 합니다.

### 2-1. 키스토어 파일이 있을 때

1. 터미널에서 실행:
   ```bash
   npx eas credentials
   ```
2. **Platform:** Android 선택  
3. **Build profile:** production 선택  
4. **Credentials:** “Keystore” 관련 메뉴에서 **Set up a new keystore** 또는 **Update** 선택 후,  
   **Use existing keystore** / **기존 키스토어 사용** 선택  
5. **키스토어 경로**와 **비밀번호**, **키 별칭(alias)**·**키 비밀번호** 입력  
6. Expo 서버에 업로드할지 묻으면, **Upload to EAS** 선택하면 이후 빌드에서 이 키가 사용됩니다.

### 2-2. credentials.json으로 로컬에 두고 쓰는 방법

- [Expo: Using existing credentials](https://docs.expo.dev/app-signing/existing-credentials/)  
- [Local credentials (credentials.json)](https://docs.expo.dev/app-signing/local-credentials/)  
에서 `credentials.json` 형식을 보고,  
  - `android.keystorePath`  
  - `android.keystorePassword`  
  - `android.keyAlias`  
  - `android.keyPassword`  
를 **E8:5D:…** 가 나오는 키스토어 기준으로 채웁니다.  
- 그 다음 `eas credentials`에서 “Update credentials on Expo servers with values from credentials.json”으로 올리면, EAS가 이 키로 서명합니다.

### 2-3. 키스토어 지문 확인

기존 `.jks` / `.keystore` 파일이 **E8:5D:…** 인지 확인하려면:

```bash
keytool -list -v -keystore your-keystore.jks
```

출력된 **SHA1**이 `E8:5D:57:43:88:A0:E3:E8:AC:5D:B0:41:F3:87:A4:19:98:05:F5:9E` 와 같으면, 이 키스토어를 EAS에 설정하면 됩니다.

---

## 3. .der 파일(인증서)만 있을 때 — 서명에는 사용 불가

**질문:** E8:5D:… 인증서가 **.der 파일**로만 있는데, 이걸로 서명할 수 있나요?

**답:** **아니요.** .der 파일만으로는 AAB에 서명할 수 없습니다.

- **.der** = **인증서**(공개 키 + 식별 정보). Play Console에서 “업로드 키 인증서”를 다운로드하면 이 형식입니다.
- **서명**에는 **비공개 키(Private Key)**가 필요합니다. 비공개 키는 **키스토어(.jks / .keystore)** 안에만 있고, .der에는 들어 있지 않습니다.
- 따라서 .der는 “어떤 키가 Play에 등록돼 있는지” 확인·등록용일 뿐, **서명 도구로 쓸 수 없습니다.**

**가능한 선택지:**

1. **E8:5D:… 를 만든 원래 키스토어**를 찾기  
   - .der는 보통 그 키스토어에서 **내보낸 인증서**입니다.  
   - 그때 사용한 **.jks / .keystore** 파일(비밀번호, alias 기억)을 찾으면 EAS에 그 키를 등록해 사용할 수 있습니다.

2. **키스토어를 찾을 수 없으면 → 업로드 키 재설정**  
   - Play Console에서 **“업로드 키를 분실/유출했다”**고 하고, **새 업로드 키 등록**을 요청할 수 있습니다.  
   - **개발자 계정 소유자**만 Play Console에서 “업로드 키 재설정”을 시작할 수 있습니다.  
   - 재설정이 승인되면: **새 키스토어**를 하나 만들고, 그 키의 **인증서(.pem 등)**를 Play에 등록한 뒤, 앞으로는 **그 새 키스토어**로 AAB에 서명하면 됩니다.  
   - [Play 앱 서명 – 분실/유출된 업로드 키](https://support.google.com/googleplay/android-developer/answer/9842756) (Lost or compromised upload key?) 참고.

요약: **.der만으로는 서명 불가** → 원래 키스토어를 찾거나, Play에서 **업로드 키 재설정** 후 **새 키스토어**를 만들어 사용해야 합니다.

---

## 4. .jks / .keystore 파일은 어디에 있나?

키스토어는 **자동으로 만들어지는 위치**가 따로 없고, **한 번 만들 때 저장한 곳**에만 있습니다. 아래 순서대로 찾아보면 됩니다.

### 4-1. EAS(Expo) 서버에 있을 수 있는 경우

**처음 업로드가 EAS Build로만 했다면** 키스토어는 **Expo 서버**에만 있고, 로컬에는 없을 수 있습니다.

1. 터미널에서 실행:
   ```bash
   npx eas credentials
   ```
2. **Platform:** Android → **Build profile:** production 선택  
3. **Keystore** 항목에서 **현재 사용 중인 credentials** 확인  
4. 여기 있는 키의 SHA1이 **E8:5D:…** 이면 → 이미 EAS가 그 키로 서명하고 있는 상태입니다.  
   - 이 경우 “잘못된 키로 서명되었다”는 오류는 **다른 Expo 프로젝트**로 빌드했을 때 나왔을 수 있습니다.  
   - **지금 쓰는 프로젝트**(unitconvlist 등)와 **처음 업로드할 때 썼던 프로젝트**(예: unitcalc)가 다르면, EAS는 프로젝트마다 키를 따로 둡니다.  
5. **다른 Expo 프로젝트**에서 처음 업로드했다면:  
   - 그 프로젝트로 `eas credentials` 실행하거나,  
   - [expo.dev](https://expo.dev) → 해당 프로젝트 → **Credentials**에서 Android Keystore 확인  
   - 필요하면 **Download**로 키스토어를 받아서, **지금 쓰는 프로젝트**에 “기존 키스토어 사용”으로 등록

### 4-2. 이 PC에서 직접 빌드했다면

- **프로젝트 폴더**
  - `android/app/*.jks`, `android/app/*.keystore`
  - 프로젝트 루트의 `*.jks`, `*.keystore`
- **홈 디렉터리**
  - Windows: `C:\Users\사용자이름\`
  - `Documents`, `Desktop`, `Downloads` 등에 `upload-keystore.jks`, `release.keystore` 같은 이름
- **Android Studio**
  - 예전에 **Build → Generate Signed Bundle/APK**로 만들었다면, 그때 지정한 경로(보통 프로젝트 또는 사용자 폴더)

### 4-3. 다른 PC / 다른 사람이 처음 업로드했다면

- 그 PC 또는 그 사람이 **키스토어를 저장한 위치**를 찾거나,
- 그때 **EAS**를 썼다면 그 **Expo 계정/프로젝트**에 credentials가 있을 수 있으니, 위 4-1처럼 확인

### 4-4. 지문으로 확인하기

`.jks` / `.keystore` 후보를 찾았다면, 아래로 **SHA1**이 **E8:5D:57:43:88:A0:E3:E8:AC:5D:B0:41:F3:87:A4:19:98:05:F5:9E** 인지 확인:

```bash
keytool -list -v -keystore "경로/파일이름.jks"
```

비밀번호 입력 후 나오는 **SHA1**이 위와 같으면, 그 파일이 Play에 등록된 업로드 키입니다.

---

## 5. 키스토어를 찾을 수 없을 때

- **예전에 EAS로만 빌드했다면:**  
  같은 Expo 계정·같은 프로젝트에서 처음 빌드할 때 만들어진 키가 EAS에 있을 수 있습니다.  
  `eas credentials` → Android → Keystore에서 “현재 사용 중인 credentials”를 확인해 보세요.  
  여기 있는 키의 SHA1이 **E8:5D:…** 이면, 그대로 두고 **같은 프로젝트/같은 프로필**로 다시 빌드하면 됩니다.

- **다른 PC/다른 Expo 프로젝트에서 처음 업로드했다면:**  
  그때 사용한 키스토어를 그 환경에서 내보내거나, 백업을 찾아야 합니다.

- **정말 키를 잃어버렸다면:**  
  Google Play는 “업로드 키”를 바꾸는 것을 제한합니다.  
  [Play Console 도움말 – 업로드 키 재설정](https://support.google.com/googleplay/android-developer/answer/9842756)을 보고, 가능하면 **키 재설정 요청** 절차를 진행해야 합니다.  
  (앱이 이미 출시된 경우 복잡할 수 있으므로, 가능하면 키 파일을 찾는 쪽이 안전합니다.)

---

## 6. 설정 후 할 일

1. **E8:5D:…** 키스토어를 EAS에 설정 (위 2번대로).  
2. **다시 AAB 빌드:**
   ```bash
   npm run build:android
   ```
3. 새로 만든 AAB를 Play Console에 업로드.

이렇게 하면 “제대로 된 서명 키로 App Bundle에 서명한 다음 다시 시도해 보세요” 오류가 해결됩니다.
