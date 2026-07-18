# Interactive Project Garden — Developer Archive

Vite + React + TypeScript + Three.js 기반의 몰입형 3D 개발자 포트폴리오.
어두운 밤 정원을 탐험하듯, 중앙 갈림길에서 뻗은 각 길 끝의 오브젝트가
게임/Unreal 개발 프로젝트 카테고리를 상징합니다.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Three.js** · **@react-three/fiber** · **@react-three/drei** · **@react-three/postprocessing**
- **framer-motion** (UI 마이크로 인터랙션 / 패널 전환)
- **zustand** (선택 상태 · 사운드 · 뷰 모드)
- **maath/easing** (guided-tour 카메라 보간)

## Scripts

```bash
npm run dev      # 개발 서버
npm run build    # 타입체크 + 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # oxlint
```

## 구조

```
src/
├─ App.tsx                     # 레이아웃 · ESC 핸들러 · 오버레이 조립
├─ App.css                     # UI 오버레이 스타일
├─ index.css                   # 폰트 · 디자인 토큰(색상 변수)
├─ data/projects.ts            # ★ 프로젝트 데이터 + 카메라 프리셋
├─ store/useStore.ts           # zustand 전역 상태
├─ hooks/useIsMobile.ts        # 반응형 감지
└─ components/
   ├─ Scene.tsx                # Canvas · 조명 · 지면 · 경로 · 포스트프로세싱
   ├─ CameraRig.tsx            # 프리셋 사이 guided-tour 이동 + parallax
   ├─ ProjectStation.tsx       # 스테이션 배치 · hover/click · 라벨 · glow
   ├─ stations/Stations.tsx    # 5종 3D 오브젝트 (오벨리스크/랜턴/관측소/터미널/에너지 원)
   └─ ui/
      ├─ Navigation.tsx        # 상단 네비게이션
      ├─ ChapterNav.tsx        # 좌측 세로 챕터 01–05
      ├─ ProjectPanel.tsx      # 우측 상세 패널
      ├─ BottomControls.tsx    # 하단 사운드/리스트뷰/연락처
      ├─ ListView.tsx          # 2D 리스트 (모바일 접근성)
      └─ Loader.tsx            # 최초 로딩 오버레이
```

## 실제 내용으로 교체하기

포트폴리오 내용은 대부분 **`src/data/projects.ts`** 한 곳에서 관리됩니다.

1. `projects` 배열의 각 항목(`name`, `tagline`, `description`, `features`, `tech`,
   `caseUrl` 등)을 실제 프로젝트로 교체합니다.
2. `station` 값으로 어떤 3D 오브젝트를 쓸지 선택합니다
   (`obelisk` · `lantern` · `observatory` · `terminal` · `pool`).
3. `position`(정원 내 월드 좌표)과 `preset`(연결된 카메라 뷰)을 지정합니다.
4. 카메라 시점은 `cameraPresets`의 `position`/`target` 값으로 미세 조정합니다.

새 오브젝트 종류를 추가하려면 `stations/Stations.tsx`에 컴포넌트를 만들고
`StationType`과 `Station` 라우터에 등록하면 됩니다.

## 인터랙션

- 마우스 이동 → 카메라 미세 parallax
- 오브젝트 hover → glow · outline · 라벨
- 오브젝트 click → 카메라가 해당 프리셋 앞으로 부드럽게 이동 + 우측 패널 등장
- `ESC` 또는 CLOSE → overview 복귀
- 모바일 → parallax 축소, 리스트 뷰로 접근성 우선
