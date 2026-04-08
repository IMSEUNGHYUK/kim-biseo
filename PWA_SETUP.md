# 🤖 김비서 PWA 설정 가이드

마케팅팀장 대시보드를 Progressive Web App(PWA)으로 설정하는 방법입니다.

## 📦 생성된 파일

| 파일명 | 설명 |
|--------|------|
| `manifest.json` | PWA 메타데이터 (앱 이름, 아이콘, 테마 색상) |
| `sw.js` | Service Worker (오프라인 캐싱, 백그라운드 동기화) |
| `icon-192.svg` | 192x192 아이콘 (SVG 원본) |
| `icon-512.svg` | 512x512 아이콘 (SVG 원본) |
| `generate-icons.html` | 아이콘 생성기 |

## 🚀 설정 단계

### 1️⃣ 아이콘 생성 (브라우저)

브라우저에서 `generate-icons.html`을 열고 실행합니다:

```
file:///path/to/generate-icons.html
```

**아이콘 생성:**
- 📥 "192x192 아이콘 생성" 클릭 → `icon-192.png` 다운로드
- 📥 "512x512 아이콘 생성" 클릭 → `icon-512.png` 다운로드
- 📥 다운로드한 PNG 파일을 프로젝트 루트에 저장

### 2️⃣ Service Worker 확인

```javascript
// 업무대시보드.html에 이미 포함됨
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### 3️⃣ manifest.json 확인

`manifest.json`에 다음이 포함되어 있습니다:

```json
{
  "name": "김비서 - 마케팅팀장 대시보드",
  "short_name": "김비서",
  "theme_color": "#1a1a2e",
  "background_color": "#0f1117",
  "display": "standalone",
  "icons": [...]
}
```

## 📱 홈 화면에 추가

### iOS (Safari)
1. Safari에서 `kim-biseo.vercel.app` 열기
2. 하단 공유 버튼 탭
3. "홈 화면에 추가" 선택
4. 이름 확인 후 "추가"

### Android (Chrome)
1. Chrome에서 `kim-biseo.vercel.app` 열기
2. 우측 상단 ⋮ 메뉴 탭
3. "앱 설치" 또는 "홈 화면에 추가" 선택
4. 확인

## ✨ PWA 기능

### 오프라인 지원
- **Network First**: 네트워크 시도 → 캐시 폴백
- 오프라인 상태에서도 마지막 본 대시보드 접근 가능

### 스탠드얼론 모드
- 홈 화면에서 앱 처럼 실행
- 주소창/네비게이션 숨김
- 풀스크린 경험

### 앱 아이콘 & 스플래시
- 192x192 + 512x512 아이콘
- 테마 색상: `#1a1a2e` (진한 네이비)
- 배경색: `#0f1117` (검은색)

### 바로가기 (Shortcuts)
설치 후 앱 아이콘을 길게 누르면:
- **오늘 할 일** → 할 일 탭 열기
- **매출 현황** → 매출 차트 열기

## 🔧 배포 체크리스트

- [x] `manifest.json` 추가
- [x] `sw.js` (Service Worker) 추가
- [x] PWA 메타 태그 추가 (HTML head)
- [x] Service Worker 등록 코드 추가 (HTML script)
- [ ] **PNG 아이콘 생성 및 업로드** ← 이 단계 필수!
- [x] HTTPS 배포 (Vercel = ✅)

## 🐛 문제 해결

### "앱 설치 버튼이 안 뜨는 경우"
- PNG 아이콘이 없는지 확인
- manifest.json의 아이콘 경로 확인
- HTTPS 연결 확인 (Vercel은 자동 HTTPS)
- 개발자 도구 > Application > Manifest 탭 확인

### "오프라인에서 작동하지 않는 경우"
- Service Worker 등록 확인 (개발자 도구 > Application > Service Worker)
- sw.js 파일 경로 확인
- 브라우저 캐시 초기화 후 재방문

### "아이콘이 흐릿한 경우"
- 192x192, 512x512 PNG 모두 제공되는지 확인
- 이미지 포맷 PNG 재확인

## 📊 테스트

### Lighthouse PWA 감사
```bash
# Chrome DevTools
1. F12 → Lighthouse
2. Progressive Web App 선택
3. Analyze page load
```

### 예상 결과
- ✅ **Installable**: 60점 이상
- ✅ **PWA Optimized**: 주요 지표 충족

## 🎯 다음 단계

1. **아이콘 생성** (필수)
   - `generate-icons.html` 실행
   - PNG 파일 다운로드 및 저장

2. **모바일에서 테스트**
   - iOS Safari or Android Chrome
   - 홈 화면에 추가
   - 오프라인 테스트

3. **배포 확인**
   - https://kim-biseo.vercel.app 방문
   - 설치 가능 확인
   - Lighthouse 감사

## 📚 참고

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev: PWA Checklist](https://web.dev/pwa-checklist/)
- [Manifest Spec](https://www.w3.org/TR/appmanifest/)
