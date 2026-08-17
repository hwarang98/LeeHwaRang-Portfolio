export type LinkLabel = 'GitHub' | 'Steam' | 'Blog'

export interface ProjectLink {
  label: LinkLabel
  href: string
}

export type MediaLabel =
  | 'Gameplay'
  | 'Implementation'
  | 'Trailer'
  | 'Devlog'
  | 'Tooling'
  | 'Debug'
  | 'Validation'
  | 'Tuning'

export type ProjectMediaKind = 'video' | 'image'

export interface ProjectMedia {
  label: MediaLabel
  title: string
  href: string
  kind?: ProjectMediaKind
  thumbnail?: string
}

export interface CaseSection {
  key: string
  label: string
  /** bullets = 로그형 목록, tags = 태그 칩, table = 표 */
  kind: 'bullets' | 'tags' | 'table'
  /** 섹션 라벨 아래 표시되는 짧은 소개문 (선택) */
  note?: string
  /** bullets / tags 용 */
  items?: string[]
  /** table 용 — 헤더 행(없으면 key-value 표) */
  columns?: string[]
  /** table 용 — 각 행의 셀 문자열 배열 (셀 내 줄바꿈은 \n) */
  rows?: string[][]
}

export type ProjectCategory = 'unreal' | 'unity'

export interface Project {
  id: string
  /** 표시 순서 기준 */
  index: string
  category: ProjectCategory
  title: string
  /** 한글 부제(있는 경우) */
  subtitle?: string
  ueVersion: string
  /** 장르/형태 태그 (Single / Roguelike ...) */
  formTags: string[]
  /** 상세 메타 — 역할 */
  role: string
  /** 카드용 한 줄 요약 */
  summary: string
  /** 카드용 핵심 시스템 태그(요약) */
  systemTags: string[]
  status: string
  /** 호버/포인트 컬러 — 릴리즈=cyan, 개발중=amber 로 상태와 연동 */
  accent: 'cyan' | 'amber'
  /** 확대 상세용 섹션 — 내용을 생략하지 않고 충실히 담는다 */
  sections: CaseSection[]
  /** 외부 링크 — GitHub / Steam / Blog */
  links: ProjectLink[]
  /** YouTube 영상 — 프로젝트별 여러 개 가능 */
  media?: ProjectMedia[]
}

export const projects: Project[] = [
  // 1. Floor404 — RELEASED (항상 첫번째) -----------------------------------
  {
    id: 'PRJ_FLOOR404',
    index: '01',
    category: 'unreal',
    title: 'Floor404',
    ueVersion: 'UE5.7',
    formTags: ['Single', 'Steam Release'],
    role: 'Solo Developer — Gameplay · UI · Release',
    summary: '이상현상을 판별하며 층을 탈출하는 Steam 출시형 1인 개발 프로젝트.',
    systemTags: ['State Tree AI', 'Anomaly', 'CommonUI', 'Key Remapping'],
    status: 'RELEASED',
    accent: 'cyan',
    sections: [
      {
        key: 'overview',
        label: 'Overview',
        kind: 'bullets',
        items: [
          'Floor404 는 Unreal Engine 5.7과 C++를 기반으로 제작한 싱글 플레이 이상현상 탐색/탈출 게임입니다.',
          '플레이어는 층을 이동하며 이상현상을 확인하고, 정해진 수의 이상현상을 보고해야 다음 층으로 이동할 수 있습니다.',
          '프로젝트의 핵심은 단순한 기능 구현보다 층 진행 상태, 이상현상 활성화, 출구 해금, 몬스터 행동 단계, UI 결과 표시가 하나의 데이터 흐름으로 연결되는 구조를 만드는 데 두었습니다.',
        ],
      },
      {
        key: 'info',
        label: '설명',
        kind: 'table',
        rows: [
          ['기간', '1인 개발 / Steam 출시 승인 진행 중'],
          ['장르', '싱글 플레이 이상현상 탐색 / 탈출'],
          ['개발환경', 'Unreal Engine 5.7, C++'],
          ['팀 (역할)', '1인 개발 (기획, 시스템 설계, C++ 구현, Blueprint 연동, UI, 출시 준비)'],
          [
            '핵심 시스템',
            '층 진행 GameState, 태그 기반 이상현상 관리\nState Tree 기반 몬스터 AI\n트리거/인터페이스 기반 이벤트\nCommonUI 프론트엔드, 옵션/키 리매핑, 로딩 화면',
          ],
          ['사용 기술', 'Gameplay Tags, State Tree, AIController, CommonUI / CommonInput'],
          ['출시 상태', 'Steam 출시'],
          ['레퍼런스', '8번출구, 백룸'],
        ],
      },
      {
        key: 'focus',
        label: '개발 집중 포인트',
        kind: 'bullets',
        items: [
          'GameState를 중심으로 층 진행, 보고 수, 출구 해금, 몬스터 상태를 관리하는 구조 설계',
          'Actor Tag 기반으로 레벨에 배치된 이상현상을 자동 수집하고 층별로 활성화/비활성화',
          'Trigger, Interface, Delegate를 활용해 게임플레이 이벤트와 연출/UI의 결합도 최소화',
          'State Tree를 활용해 몬스터의 Hidden / Observe / Chase 상태 전환을 진행 데이터와 연동',
          'CommonUI 기반 위젯 스택과 SoftClass 비동기 로딩으로 메뉴, 모달, 결과 화면 관리',
          'Steam 출시를 고려한 옵션, 키 리매핑, 로딩 화면, 게임 종료/재시작 흐름 구현',
          '# 담당 역할 및 기여',
          '1인 개발자로서 게임 루프, 시스템 구조, UI/UX 흐름, 출시 준비 전 과정을 직접 수행',
        ],
      },
      {
        key: 'position',
        label: '포지션 연관 경험',
        kind: 'bullets',
        items: [
          'Unreal Engine 5 기반 게임 시스템 설계 및 구현 — 층 진행/보고/출구/클리어/게임오버 흐름을 AFloor404GameState와 AFloor404GameMode 중심으로 구성',
          '이벤트 처리와 데이터 흐름 설계 — OnFloorAdvanced, OnProgressChanged, OnGameClear, OnGameOver 델리게이트를 통해 Blueprint, UI, 몬스터 로직이 상태 변화를 구독하도록 설계',
          '확장 가능한 콘텐츠 구조 — Anomaly + Floor_N 태그만으로 이상현상을 층별 데이터로 등록하여, 코드 수정 없이 레벨 배치로 콘텐츠 확장 가능',
          'State Tree 기반 AI 흐름 구성 — AIC_Enemy가 ST_EnemyAI를 실행하고, GameState의 ProgressStep / Should Monster Chase 값을 받아 몬스터 행동 상태를 전환하도록 구성',
          'C++/Blueprint 역할 분리 — C++는 상태와 규칙을 보장하고, Blueprint는 몬스터 연출, UI 바인딩, 레벨 배치 튜닝을 담당하도록 구조화',
          '개발 문서화 관점 — 각 시스템의 목표, 동작 방식, 적용 효과를 분리해 설명 가능한 형태로 구현',
        ],
      },
      {
        key: 'highlight',
        label: '핵심 기능 하이라이트',
        kind: 'table',
        columns: ['카테고리', '구현 요약'],
        rows: [
          [
            'Game Progress System',
            '• AFloor404GameState에서 현재 층, 최대 층, 현재 보고 수, 필요 보고 수, 오답 수, 몬스터 진행 단계 관리\n• 층 이동 시 ResetFloorProgress → UpdateRequiredReportCount → UpdateProgressStep → OnFloorAdvanced 순서로 상태 갱신\n• 8층 최종 구간에서 조건 충족 시 몬스터 추격 상태로 전환',
          ],
          [
            'Anomaly Management',
            '• Anomaly 태그를 가진 액터를 수집하고 Floor_N 태그를 파싱해 FAnomalyData로 등록\n• 현재 층의 이상현상만 표시/충돌 활성화하고 다른 층의 이상현상은 비활성화\n• 보고된 이상현상은 중복 보고되지 않도록 bReported 상태로 관리',
          ],
          [
            'Interaction & Report Flow',
            '• Enhanced Input의 Interact 입력을 받아 카메라 기준 Sphere Trace 수행\n• 활성 이상현상 보고 성공 시 정답 카운트 증가 및 HUD 알림 출력\n• 잘못된 대상 보고 시 오답 카운트를 누적하여 결과/분석 데이터로 활용 가능',
          ],
          [
            'Trigger Event System',
            '• ExitTrigger, EscapeTrigger, MonsterTrigger, WallDisableTrigger로 기능별 트리거 분리\n• 출구 해금 여부, 현재 층, 최종 층 조건을 GameState에서 확인하여 이벤트 실행\n• 몬스터 활성화는 IFloor404MonsterActivatable 인터페이스로 호출해 대상 구현체와 결합도 감소',
          ],
          [
            'State Tree Enemy AI',
            '• AIC_Enemy에 StateTreeAIComponent를 구성하고 /Game/Enemy/StateTree/ST_EnemyAI 실행\n• GameState의 OnProgressChanged 이벤트를 받아 ProgressStep과 Should Monster Chase 값을 State Tree 입력 데이터로 전달\n• Hidden / Observe / Chase 단계 전환을 데이터 기반으로 구성해 층 진행에 따라 몬스터 행동이 자연스럽게 변화',
          ],
          [
            'CommonUI Frontend',
            '• UFrontendUISubsystem에서 GameplayTag 기반 위젯 스택 관리\n• SoftClass 비동기 로딩으로 Clear/GameOver/Confirm/Options 화면을 필요한 시점에 Push\n• PrimaryLayout 등록 전 요청은 Pending Queue에 보관했다가 스택 등록 후 Flush',
          ],
          [
            'Options & Input Settings',
            '• UOptionsDataRegistry에서 Audio, Video, Control, System 탭 데이터를 생성\n• UFrontendGameUserSettings Getter/Setter를 데이터 오브젝트와 연결해 옵션 값을 일관되게 반영\n• Enhanced Input User Settings를 활용해 키보드/마우스와 게임패드 키 리매핑 지원',
          ],
          [
            'Loading Screen System',
            '• UFrontendLoadingScreenSubsystem에서 PreLoadMap/PostLoadMap 이벤트와 Tick을 이용해 로딩 화면 표시 조건 관리\n• World, GameState, PlayerController, Pawn, Component BeginPlay 여부를 확인해 준비되지 않은 화면 노출 방지\n• 로딩 중 월드 렌더링을 비활성화하고 인터페이스로 로딩 상태를 전달',
          ],
        ],
      },
      {
        key: 'sys-progress',
        label: '층 진행 / 게임 상태 관리',
        kind: 'table',
        note: 'GameState를 게임 진행의 단일 기준점으로 두고, 출구 해금·몬스터 상태·클리어/게임오버 UI가 같은 상태 데이터를 바라보도록 설계했습니다.',
        columns: ['구현 요소', '동작 방식', '의도 / 효과'],
        rows: [
          [
            'FloorProgressData',
            '각 층의 RequiredReportCount와 ProgressStep을 FFloorProgressData 배열로 관리합니다. 기본값은 생성자에서 1~8층 데이터로 초기화하고, Blueprint Class Defaults에서 조정 가능하게 구성했습니다.',
            '층별 규칙을 코드 분기문이 아니라 데이터로 분리하여 난이도와 연출 흐름을 쉽게 조정할 수 있습니다.',
          ],
          [
            '출구 해금 조건',
            'RegisterCorrectReport()에서 현재 보고 수를 증가시키고 필요 보고 수에 도달하면 bExitUnlocked를 true로 설정합니다.',
            '출구, 벽 해제, 최종 탈출 트리거가 모두 동일한 해금 상태를 참조해 상태 불일치를 줄입니다.',
          ],
          [
            '층 이동 흐름',
            'AdvanceFloor()에서 현재 층 증가 후 진행 상태를 초기화하고, 필요 보고 수와 몬스터 진행 단계를 갱신한 뒤 OnFloorAdvanced를 Broadcast합니다.',
            '층 이동 시 필요한 상태 변경 순서를 한 함수에 모아 트리거/AI/UI가 예측 가능한 타이밍에 반응하도록 했습니다.',
          ],
          [
            '몬스터 단계 관리',
            'ProgressStep을 0=Hidden, 1=Observe, 2=Chase로 관리하고 변경 시 OnProgressChanged를 Broadcast합니다.',
            '몬스터 AI/Blueprint는 GameState의 단계만 구독하면 되므로, 추격/관찰/은신 전환 로직을 게임 진행과 느슨하게 연결할 수 있습니다.',
          ],
        ],
      },
      {
        key: 'sys-anomaly',
        label: '태그 기반 이상현상 관리',
        kind: 'table',
        note: '레벨에 배치된 액터가 스스로 어느 층의 이상현상인지 설명하도록 Actor Tag를 사용했습니다.',
        columns: ['구현 요소', '동작 방식', '의도 / 효과'],
        rows: [
          [
            '이상현상 자동 수집',
            'UGameplayStatics::GetAllActorsWithTag()로 Anomaly 태그 액터를 찾고, 액터의 Floor_N 태그를 파싱해 층 번호를 결정합니다.',
            '새 이상현상을 추가할 때 C++ 등록 코드를 수정하지 않고 레벨 배치와 태그 설정만으로 콘텐츠를 확장할 수 있습니다.',
          ],
          [
            'FAnomalyData 구조화',
            '이상현상 ID, 층 번호, 대상 액터, 보고 여부, 활성 여부를 FAnomalyData로 보관합니다.',
            '판정에 필요한 상태를 한 구조체에 묶어 보고 처리와 활성화 처리를 단순화했습니다.',
          ],
          [
            '층별 활성화',
            'ActivateAnomaliesForFloor()에서 현재 층의 이상현상은 표시/충돌 활성화하고, 다른 층의 이상현상은 숨김/충돌 비활성화합니다.',
            '하나의 레벨 안에서 층별 콘텐츠를 전환하면서도 불필요한 충돌과 오판정을 방지합니다.',
          ],
          [
            '보고 판정',
            'TryReportAnomaly()에서 대상 액터가 현재 활성 상태이고 아직 보고되지 않은 이상현상인지 확인합니다.',
            '정답 판정과 중복 보고 방지를 AnomalyManager가 책임져 Character와 GameState의 역할을 분리했습니다.',
          ],
        ],
      },
      {
        key: 'sys-trigger',
        label: '이벤트 / 트리거 흐름',
        kind: 'table',
        note: '레벨 트리거는 조건 확인과 이벤트 요청만 담당하고, 실제 상태 판단은 GameState와 GameMode가 처리하도록 분리했습니다.',
        columns: ['구현 요소', '동작 방식', '의도 / 효과'],
        rows: [
          [
            'ExitTrigger',
            '플레이어가 출구 영역에 진입하면 GameState의 출구 해금 여부를 확인하고, 해금된 경우 층 이동과 이상현상 재활성화, 스폰 지점 이동을 수행합니다.',
            '층 이동과 콘텐츠 전환이 하나의 진입점에서 처리되어 진행 흐름을 추적하기 쉽습니다.',
          ],
          [
            'EscapeTrigger',
            '최종 층이면서 출구가 해금된 상태에서만 GameMode의 HandleGameClear()를 호출합니다.',
            '클리어 조건을 명확히 제한하고, 클리어 연출과 UI 처리는 GameMode로 위임했습니다.',
          ],
          [
            'MonsterTrigger',
            '현재 층이 지정된 TriggerFloor와 일치할 때만 대상 Enemy의 IFloor404MonsterActivatable::Activate()를 실행합니다.',
            '트리거는 몬스터 구현체를 직접 알 필요가 없어, 다른 몬스터 타입이나 Blueprint 구현으로 교체하기 쉽습니다.',
          ],
          [
            'WallDisableTrigger',
            '특정 층에서 출구가 해금된 뒤 트리거를 밟으면 지정된 벽들을 숨기고 충돌을 비활성화합니다.',
            '진행 조건에 따른 공간 변화 연출을 GameState와 연결하되, 레벨별 대상 벽은 에디터에서 설정할 수 있습니다.',
          ],
        ],
      },
      {
        key: 'sys-ai',
        label: 'State Tree 몬스터 AI',
        kind: 'table',
        note: '몬스터 행동을 Blueprint 분기문으로 직접 제어하지 않고, State Tree가 현재 진행 상태를 입력으로 받아 행동 단계를 전환하도록 구성했습니다.',
        columns: ['구현 요소', '동작 방식', '의도 / 효과'],
        rows: [
          [
            'AIController + StateTreeAIComponent',
            'AIC_Enemy에서 StateTreeAIComponent를 보유하고, BeginPlay/Possess 흐름에서 /Game/Enemy/StateTree/ST_EnemyAI를 실행하도록 구성했습니다.',
            'AI 실행 진입점을 Controller에 두어 몬스터 Pawn 교체나 레벨 배치가 바뀌어도 동일한 State Tree 흐름을 재사용할 수 있습니다.',
          ],
          [
            'GameState 진행 데이터 연동',
            'AFloor404GameState의 OnProgressChanged(NewProgressStep, bNewShouldMonsterChase) 이벤트를 AIController가 수신하고, ProgressStep과 Should Monster Chase 값을 State Tree에서 참조할 수 있도록 전달합니다.',
            'AI가 층 번호나 보고 수를 직접 계산하지 않고, 게임 진행 시스템이 제공하는 요약 상태만 바라보게 해 의존성을 낮췄습니다.',
          ],
          [
            '행동 단계 분리',
            'ProgressStep을 기준으로 Hidden / Observe / Chase 단계로 나누고, 최종 추격 여부는 Should Monster Chase 값으로 별도 제어합니다.',
            '몬스터의 등장, 관찰, 추격 전환을 하나의 State Tree에서 관리해 행동 추가와 디버깅이 쉬워졌습니다.',
          ],
          [
            'Trigger와 State Tree 연결',
            'AFloor404MonsterTrigger는 지정된 층에서 몬스터 활성화 신호만 보내고, 실제 행동 판단은 State Tree와 GameState 진행 값이 담당합니다.',
            '레벨 이벤트와 AI 의사결정을 분리하여 특정 트리거가 복잡한 AI 로직을 직접 소유하지 않도록 했습니다.',
          ],
        ],
      },
      {
        key: 'sys-ui',
        label: 'CommonUI 프론트엔드 / 결과 화면',
        kind: 'table',
        columns: ['구현 요소', '동작 방식', '의도 / 효과'],
        rows: [
          [
            'GameplayTag 기반 위젯 스택',
            'Frontend.WidgetStack.Modal, GameMenu, GameHud, Frontend 태그로 화면 스택을 식별하고, PrimaryLayout에서 태그별 스택을 등록합니다.',
            '어떤 시스템이 UI를 호출하더라도 구체적인 위젯 컨테이너를 몰라도 되어 UI 구조 변경에 유연합니다.',
          ],
          [
            'Soft Widget 비동기 로딩',
            'DeveloperSettings의 FrontendWidgetMap에서 태그에 해당하는 SoftClass를 찾고, AssetManager의 StreamableManager로 비동기 로드 후 스택에 Push합니다.',
            '초기 로딩 부담을 줄이고, 필요한 UI만 필요한 순간에 로드할 수 있습니다.',
          ],
          [
            'Pending Push Queue',
            '위젯 클래스 로드가 PrimaryLayout의 스택 등록보다 먼저 끝나는 경우 요청을 Pending 배열에 저장하고, 스택 등록 시 Flush합니다.',
            '비동기 로딩과 UI 초기화 순서가 어긋나는 상황에서도 안정적으로 화면 전환이 가능합니다.',
          ],
          [
            'Clear / GameOver 흐름',
            'GameMode에서 입력 차단, 카메라 FadeOut, UIOnly 입력 전환 후 ClearScreen 또는 GameOverScreen을 Push합니다.',
            '게임 상태 종료와 UI 전환의 순서를 통제하여, 플레이어 입력이나 화면 전환이 중간에 꼬이지 않도록 했습니다.',
          ],
        ],
      },
      {
        key: 'sys-options',
        label: '옵션 / 키 리매핑',
        kind: 'table',
        columns: ['구현 요소', '동작 방식', '의도 / 효과'],
        rows: [
          [
            'OptionsDataRegistry',
            'Audio, Video, Control, System 탭을 데이터 오브젝트 컬렉션으로 생성하고, 선택된 탭의 자식 데이터를 재귀적으로 수집해 ListView에 제공합니다.',
            '옵션 화면은 데이터 목록을 표시하는 역할에 집중하고, 실제 옵션 구성은 Registry가 담당하도록 분리했습니다.',
          ],
          [
            '동적 Getter/Setter',
            'FOptionsDataInteractionHelper로 UFrontendGameUserSettings의 Getter/Setter 함수명을 연결해 옵션 값 읽기와 쓰기를 공통 방식으로 처리합니다.',
            '새 옵션 추가 시 UI 위젯 코드를 크게 수정하지 않고 데이터 오브젝트 추가로 대응할 수 있습니다.',
          ],
          [
            '키 리매핑',
            'Enhanced Input User Settings의 KeyProfile과 MappingRow를 순회하며 키보드/마우스, 게임패드 입력을 UListDataObject_KeyRemap으로 생성합니다.',
            '플랫폼/입력 장치별 설정을 분리하고, 플레이어가 패키지 빌드에서 직접 조작 체계를 수정할 수 있습니다.',
          ],
          [
            'Reset 처리',
            '옵션 변경 시 기본값과 달라진 데이터만 ResettableDataArray에 보관하고, Reset 액션으로 현재 탭의 변경 사항을 되돌립니다.',
            '대량 옵션 화면에서도 변경된 항목만 추적해 UX와 상태 관리를 단순화했습니다.',
          ],
        ],
      },
      {
        key: 'sys-loading',
        label: '로딩 화면 / 맵 전환',
        kind: 'table',
        columns: ['구현 요소', '동작 방식', '의도 / 효과'],
        rows: [
          [
            '맵 로딩 감지',
            'PreLoadMapWithContext와 PostLoadMapWithWorld에 바인딩해 맵 로딩 시작/완료 상태를 추적합니다.',
            '레벨 전환 중 검은 화면이나 초기화 전 화면 노출을 방지합니다.',
          ],
          [
            '준비 상태 체크',
            'World BeginPlay, LocalPlayer, GameState, PlayerController, PlayerState, Pawn, Pawn Component BeginPlay 여부를 순차적으로 확인합니다.',
            '플레이 가능한 상태가 되기 전까지 로딩 화면을 유지해 초기 프레임의 불안정한 UI/월드 노출을 줄입니다.',
          ],
          [
            '렌더링 제어',
            '로딩 중에는 GameViewportClient->bDisableWorldRendering을 true로 설정하고, 완료 후 false로 복구합니다.',
            '월드가 완전히 준비되기 전에 중간 상태가 플레이어에게 보이지 않도록 제어합니다.',
          ],
          [
            '인터페이스 알림',
            'PlayerController와 Pawn이 LoadingScreenInterface를 구현하면 로딩 화면 활성/비활성 이벤트를 전달합니다.',
            '로딩 상태에 맞춰 입력, 사운드, 연출 등 다른 시스템이 후속 처리를 붙일 수 있는 확장 지점을 제공합니다.',
          ],
        ],
      },
      {
        key: 'trouble',
        label: '트러블슈팅 / 설계 고민',
        kind: 'bullets',
        items: [
          '# 1. 레벨 콘텐츠가 늘어날수록 이상현상 등록 코드가 복잡해지는 문제',
          '문제 — 이상현상을 코드에 직접 등록하면 층별 콘텐츠가 늘어날 때마다 C++ 수정과 빌드가 필요합니다. 레벨 배치, 충돌, 활성화 상태가 분산되면 정답 판정 오류가 발생하기 쉽습니다.',
          '해결 — 액터 태그 Anomaly와 Floor_N만으로 이상현상을 자동 수집하도록 AFloor404AnomalyManager를 설계했습니다. 현재 층의 이상현상만 표시/충돌 활성화하고, 보고 상태를 Manager 내부에서 관리했습니다.',
          '결과 — 레벨 콘텐츠 추가가 C++ 코드 수정이 아니라 에디터 배치 작업 중심으로 바뀌었습니다. 기획/레벨 디자인 관점에서 반복 배치와 테스트가 쉬운 구조가 되었습니다.',
          '# 2. 층 이동, 출구 해금, 몬스터 추격, UI 결과가 서로 다른 타이밍에 실행되는 문제',
          '문제 — 출구 트리거, 몬스터 트리거, 클리어 트리거가 각자 상태를 들고 있으면 진행 조건이 어긋날 수 있습니다.',
          '해결 — 진행 상태는 GameState가 단일 기준으로 들고, 트리거는 GameState를 조회해 조건을 확인한 뒤 필요한 이벤트만 요청하도록 분리했습니다. 상태 변경은 Delegate로 알리고, UI/Blueprint/몬스터는 해당 이벤트를 구독하도록 설계했습니다.',
          '결과 — 게임 진행의 기준점이 명확해졌고, 특정 이벤트가 실행되지 않는 문제를 추적하기 쉬워졌습니다.',
          '# 3. 비동기 UI 로딩과 레이아웃 등록 순서가 어긋나는 문제',
          '문제 — SoftClass 비동기 로딩은 완료 시점이 일정하지 않아, PrimaryLayout의 위젯 스택 등록보다 먼저 Push 요청이 처리될 수 있습니다.',
          '해결 — 스택을 찾지 못한 Push 요청은 PendingWidgetPushes에 저장하고, RegisterWidgetStack() 이후 FlushPendingPushesForStack()으로 처리했습니다.',
          '결과 — UI 초기화 순서에 덜 민감한 구조가 되었고, 메뉴/모달/결과 화면 호출 코드를 일관된 방식으로 유지할 수 있었습니다.',
        ],
      },
      {
        key: 'learned',
        label: '배운 점',
        kind: 'bullets',
        items: [
          '작은 규모의 1인 개발 프로젝트라도, 출시 단계까지 가려면 게임 루프뿐 아니라 옵션, 로딩, UI 포커스, 재시작/종료 흐름까지 하나의 제품 경험으로 연결해야 한다는 점을 체감.',
          '게임 규칙은 C++에서 명확히 보장하고, 레벨 배치와 연출은 Blueprint/에디터에서 조정 가능하게 열어두는 구조가 반복 개발에 효과적.',
          '시스템을 만들 때 “지금 돌아가는가”보다 “다음 층, 다음 이상현상, 다음 UI가 추가될 때 어디를 수정해야 하는가”를 먼저 생각하는 습관을 얻음.',
        ],
      },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/hwarang98/FrontedIUI' },
      { label: 'Steam', href: 'https://store.steampowered.com/app/4882720/Floor404/' },
    ],
    media: [
      { label: 'Gameplay', title: '게임 플레이 영상', href: 'https://youtu.be/2A9vWSUT9fs' },
    ],
  },

  // 2. Ashen Cathedral ------------------------------------------------------
  {
    id: 'PRJ_ASHEN',
    index: '02',
    category: 'unreal',
    title: 'Ashen Cathedral',
    ueVersion: 'UE5.7',
    formTags: ['Single', 'Roguelike', 'Soulslike'],
    role: 'Solo · Gameplay / Combat Systems Programmer',
    summary: '보스 런과 보상 카드로 확장되는 로그라이크 소울라이크. GAS 위의 자세 붕괴·처형·보상 설계.',
    systemTags: ['GAS Combat', 'Boss Phase', 'Reward Card', 'StateTree AI', 'Automation Test', 'Editor Utility'],
    status: 'IN_DEVELOPMENT',
    accent: 'amber',
    sections: [
      {
        key: 'overview',
        label: 'Overview',
        kind: 'bullets',
        items: [
          'Ashen Cathedral 은 Unreal Engine 5와 C++ 기반으로 제작한 3인칭 액션 전투 로그라이크 프로젝트입니다.',
          '프로젝트의 핵심은 단순히 공격 기능을 구현하는 것이 아니라, GAS(Gameplay Ability System)를 중심으로 입력, 애니메이션, 데미지 계산, 상태 태그, AI, 보스 진행 흐름이 안정적으로 연결되는 전투 구조를 만드는 데 두었습니다.',
          '플레이어의 콤보, 패링/블록, 타겟락, 처형, 보스 처치 이후의 보상/전환 흐름까지 전투 경험 전반을 하나의 시스템으로 설계하며, 기능이 추가되더라도 기존 구조를 크게 흔들지 않는 확장성을 목표로 했습니다.',
          '특히 보스 처치 후 3장의 보상 카드를 제시하고, 선택한 효과가 Run 전체에 유지되다가 Run 종료 시 명확히 회수되는 로그라이크 보상 구조를 별도 컴포넌트로 분리해 구현했습니다.',
          '레벨 전환을 넘어 유지되어야 하는 Run 상태, 보스 클리어 보상, 첫 클리어 기록, 카드 중첩은 GameInstanceSubsystem 기반으로 보관하고, 로비 복귀 시점에만 메타 성장으로 정산되도록 구성했습니다.',
        ],
      },
      {
        key: 'info',
        label: '설명',
        kind: 'table',
        rows: [
          ['기간', '2026.06 ~ ing'],
          ['장르', '3인칭 세키로 전투 스타일 보스런 로그라이크'],
          ['개발환경', 'Unreal Engine 5.7'],
          ['팀 (역할)', '1인'],
          [
            '핵심 시스템',
            'GAS 전투 시스템, 데이터 기반 데미지 계산, 처형 어빌리티, 타겟락, 보스 페이즈 전환, StateTree 보스 AI, 로그라이크 카드 선택, RunState / MetaProgression, 자동화 테스트 / 에디터 유틸리티',
          ],
          [
            '사용 기술',
            'Gameplay Ability System, Gameplay Tag, Motion Matching, StateTree, GameplayEffect ExecutionCalculation, GameInstanceSubsystem, Automation Test Framework, Editor Module / Slate Tooling',
          ],
          ['레퍼런스', 'Elden Ring, lies of p, Sekiro'],
        ],
      },
      {
        key: 'focus',
        label: '개발 집중 포인트',
        kind: 'bullets',
        items: [
          'GAS의 CanActivateAbility, EndAbility, AbilityTask 콜백을 직접 제어하여 공격, 콤보, 취소, 재활성화 흐름을 안정적으로 구성',
          'GameplayTag 기반으로 캐릭터 상태와 입력 가능 여부를 관리하여 전투 시스템 간 결합도 감소',
          'SetByCaller와 커스텀 ExecutionCalculation을 활용해 데미지, 콤보 배율, 방어율, 패링/블록 보정, 부가 효과를 하나의 계산 파이프라인으로 처리',
          'Chooser Table, GameplayTag, Motion Matching을 활용해 캐릭터 상태와 GAS의 Ability/Tag 정보를 평가하고, 전투 상황에 맞는 Pose Search Database 및 애니메이션이 선택되도록 구성',
          'Motion Matching 기반 로코모션과 Fab 애니메이션 리소스를 결합하기 위해 입력 상태, 캐릭터 상태, 전투 액션 전환 조건을 조정',
          '애니메이션 몽타주, 데미지 타이밍, AI 정지/복구, Motion Warping, 카메라/히트스톱 연출이 얽힌 처형 시스템을 AbilityTask 기반 비동기 흐름으로 제어',
          'Gameplay Camera를 활용해 전투, 탐색, 처형 등 상황별 카메라 리그를 분리하고, 상태 변화에 따라 자연스럽게 전환·블렌딩되도록 구성',
          'GameMode는 전투 진행 흐름, GameState는 전투 상태와 보스 참조를 소유하도록 분리하여 보스전의 상태 기준점을 명확히 구성',
          'ACRewardCardComponent를 전투 시스템과 독립된 보상 모듈로 설계하여 보스/카드 추가 시 데이터와 컴포넌트 설정만으로 확장 가능하게 구성',
          'ACBossPhaseComponent에서 체력 0, 체력 비율, 수동 요청 기반 페이즈 전환을 관리하고, LevelSequence / TransitionAbility / AI 일시정지 / 실패 안전 타이머를 하나의 흐름으로 묶음',
          'ACRunStateSubsystem으로 카드 중첩, 다음 보스 인덱스, 미정산 보상, 첫 클리어 기록을 레벨 전환 너머로 보존하고 Run 종료 시 정산/폐기 경로를 명확히 분리',
          'StateTree Task에서 GameplayTag로 Enemy Ability를 활성화하고 델리게이트 기반으로 종료를 감지해, 긴 몽타주 동안 매 프레임 폴링하지 않는 AI 실행 구조 구성',
          '에디터 전용 모듈에 보스 에셋 검증, 몽타주/StateTree 검사, 라이브 어트리뷰트 편집, 웹 디버그 토글을 묶은 Boss Combat Workbench를 구축해 반복 테스트 속도를 높임',
          'Automation Test Framework로 StateTree 배선, 보스 에셋, 공격 몽타주, 어트리뷰트 초기화, 체간/가드 계산 공식을 검증해 수동 확인에 의존하던 전투 회귀 테스트를 자동화',
        ],
      },
      {
        key: 'highlight',
        label: '핵심 기능 하이라이트',
        kind: 'bullets',
        items: [
          '# 1. GAS 기반 액션 전투 구조',
          '공격, 회피, 패링, 블록, 처형 등 주요 액션을 GameplayAbility 단위로 분리',
          'CanActivateAbility에서 상태 태그와 입력 조건을 검증하고, EndAbility에서 후처리와 다음 입력 가능 상태를 정리',
          '콤보 캔슬 구조를 어빌리티 내부 책임으로 리팩토링하여 별도 입력 버퍼 컴포넌트 없이 상태 흐름을 단순화',
          '전투 상태를 GameplayTag로 표현해 조건 분기와 시스템 간 통신을 명확히 구성',
          '# 2. 데이터 기반 데미지 계산 파이프라인',
          'SetByCaller로 공격별 데미지, 콤보 배율, 그로기 수치, 카운터 보정 값을 런타임에 전달',
          '커스텀 GameplayEffectExecutionCalculation에서 최종 데미지와 부가 효과를 계산',
          '방어율 클램프, 패링/블록 상태 보정, 화상/그로기 같은 부가 효과를 하나의 실행 계산에서 처리',
          '공격 종류나 밸런스 수치가 바뀌어도 계산 구조를 재사용할 수 있도록 데이터 중심으로 구성',
          '# 3. 처형(Execution) 어빌리티',
          '처형 어빌리티는 AI, 애니메이션, 모션워핑, 카메라, 데미지 타이밍이 동시에 맞아야 하는 복합 시스템으로 구현',
          'AbilityTask_WaitGameplayEvent로 AnimNotify가 보내는 데미지 타이밍 이벤트를 대기',
          'AbilityTask_PlayMontageAndWait의 Completed / Cancelled / Interrupted 콜백을 분기하여 몽타주 종료 상황별 후처리 수행',
          '플레이어와 적의 몽타주 종료 시점이 다를 수 있어 OnPlayerMontageCompleted와 OnEnemyMontageEnded를 분리',
          'bExecutionFinished 가드로 중복 종료를 방지하고, 사망 상태일 경우 이동 복구 책임을 Death 어빌리티에 위임',
          '# 4. 타겟락 및 상황별 입력 제어',
          '박스 트레이스로 후보 대상을 탐색하고, 벡터 연산을 통해 플레이어 기준 좌/우 전환 대상을 계산',
          '타겟락 상태에서는 카메라와 캐릭터 회전이 대상 중심으로 동작하도록 제어',
          'Enhanced Input Mapping Context를 계층적으로 관리하여 전투 상태에 따라 입력을 전환',
          '런타임에 필요한 GameplayEffect를 적용해 타겟락, 패링, 블록, 처형 가능 상태가 전투 흐름에 반영되도록 구성',
          '# 5. GameMode / GameState 기반 보스 전투 플로우',
          'AACGameState가 EACBattleState와 현재 보스 참조를 소유하고, GameMode는 전투 진행 흐름 제어에 집중하도록 역할 분리',
          '보스 사망과 클리어 연출 완료를 각각 OnDeathDelegate, OnDeathAnimationCompletedDelegate로 분리',
          '“보스가 죽었다”와 “사망 연출까지 끝났다”를 구분하여 UI, 보상 카드, 다음 보스 전환 타이밍을 정확히 제어',
          'IsAlreadyBound 체크로 델리게이트 중복 바인딩을 방지',
          'bProgressRequested, bRunStartRequested 플래그로 레벨 전환 중 중복 호출로 인한 이중 스폰/이중 레벨 오픈을 방지',
          'NextBossSequence 배열과 인덱스를 기반으로 보스 시퀀스를 관리하고, 다음 보스 스폰 위치를 이전 보스의 Transform으로 재사용',
          '최종 보스 이후 로비로 복귀하는 로그라이크 런 구조 구현',
          '# 6. 로그라이크 보상 카드 시스템',
          'ACRewardCardComponent에서 보스 처치 후 3장의 보상 카드를 생성하고, 선택 결과를 Run 전체에 유지',
          '보상 시스템을 전투 로직과 독립된 컴포넌트로 분리하여 새로운 보스나 카드가 추가되어도 같은 흐름을 재사용할 수 있도록 설계',
          'SelectRarity()는 누적 가중치(Cumulative Weight) 방식으로 희귀도를 추첨하고, GenerateCandidateCards()는 해당 희귀도 후보가 없을 경우 전체 카드 풀로 폴백',
          '전설 카드는 Run당 1회만 등장하도록 제한하고, 카드별 MaxStack에 도달한 카드는 후보에서 자동 제외',
          '카드 데이터는 UDataTable과 FACRewardCardData 로우 구조체로 관리하여 카드명, 설명, 희귀도, MaxStack, 가중치를 CSV로 일괄 편집 가능하게 구성',
          'RowName을 런타임 CardID로 재사용해 별도 ID 필드 관리 부담을 줄임',
          'ApplyCardEffects()에서 GameplayEffectClass와 GrantedAbilityClass를 모두 지원해 능력치 강화형 카드와 패시브 트리거형 카드를 같은 코드 경로에서 처리',
          '적용된 FActiveGameplayEffectHandle과 FGameplayAbilitySpecHandle을 배열로 추적하고, CleanupRunEffects()에서 Run 종료 시 일괄 제거',
          '카드 선택 중에는 FInputModeUIOnly와 마우스 커서 표시로 UI 입력 모드로 전환하고, 선택 완료 후 FInputModeGameOnly로 복구',
          'FOnSelectionClosed 델리게이트로 선택 UI 종료 이벤트를 외부 시스템에 1회 통지하고 즉시 Unbind하여 콜백 중복 호출을 방지',
          'ACPlayerAbility_RewardCard_ParryBuff는 AbilityTask_WaitGameplayTagAdded로 패링 성공 태그(Shared.Status.CanCounterAttack)를 감지하고, 트리거될 때마다 버프 GE를 적용한 뒤 다시 구독하는 이벤트 기반 패시브 패턴으로 구현',
          '# 7. 보스 페이즈 전환 시스템',
          'ACBossPhaseComponent가 ZeroHealthHandler 역할을 맡아 체력 0이 곧바로 사망으로 이어지지 않고, 남은 전환이 있으면 페이즈 전환으로 소비되도록 구성',
          '전환 조건을 HealthZero, HealthPercentage, Manual로 분리해 보스별로 체력 기반 전환, 특정 비율 전환, 외부 이벤트 기반 전환을 모두 설정 가능하게 설계',
          '전환 중에는 AI 로직과 이동을 멈추고, 컷신(LevelSequence) 재생 이후 TransitionAbility를 실행한 뒤 체력 회복과 PhaseStateTag 부여를 완료 처리',
          'CurrentPhase와 전환 진행 여부를 복제하고, MaxTransitionDuration 안전 타이머로 컷신/어빌리티 콜백 누락 시 보스가 무적 상태로 멈추는 상황을 방지',
          '# 8. RunState / MetaProgression 구조',
          'ACRunStateSubsystem에서 Run 활성 상태, 다음 보스 인덱스, 클리어 보스 수, 획득 카드 스택, 미정산 재화, 첫 클리어 후보를 GameInstance 생명주기로 보관',
          '보스 처치 보상은 즉시 확정 지급하지 않고 PendingCurrencies에 적립한 뒤, 로비로 무사히 복귀하거나 최종 보스를 클리어했을 때 SettleAndEndRun으로 메타 성장에 반영',
          '플레이어 사망 시 AbandonRun으로 미정산 보상과 첫 클리어 후보를 폐기하여 로그라이크의 위험-보상 구조가 시스템적으로 유지되도록 구성',
          '# 9. StateTree AI / 자동화 테스트 / 에디터 유틸리티',
          'StateTree 전용 Task에서 Enemy Ability AssetTag를 검색해 활성화하고, WaitOwnedTag 또는 Ability Spec 활성 상태를 기준으로 종료를 감지',
          'AshenCathedral.Assets.StateTreeWiring, BossAssets, AttackMontages, AttributeWiring 자동화 테스트를 구성해 에셋 배선과 데이터 누락을 에디터 테스트 단계에서 검출',
          'AshenCathedral.Combat.PostureDamage / GuardDamage / BaseValueClamp 테스트로 체간 저항, 체간 붕괴 이벤트, 가드 브레이크, 주기형 GE BaseValue 클램프 같은 전투 공식을 검증',
          'ACWebDebugSubsystem으로 체력, 스태미나, 체간, 어빌리티 활성 구간, GameplayTag 변화, 피격 이벤트를 브라우저 대시보드로 스트리밍할 수 있도록 구성',
          'Ashen_CathedralEditor 모듈에 Tools 메뉴에서 열 수 있는 Slate 기반 Boss Combat Workbench를 추가하고, 보스 에셋 검증, StateTree 검증, 몽타주 감사, 스탯 매트릭스, 라이브 Attribute 주입을 한 화면에 통합',
        ],
      },
      {
        key: 'detail',
        label: '시스템 상세',
        kind: 'bullets',
        items: [
          '# 어빌리티 생명주기와 콤보 캔슬',
          '콤보 입력, 취소, 재활성화 타이밍을 Ability의 생명주기 안에서 처리',
          '입력 버퍼를 외부 컴포넌트로 분리하지 않고, Ability가 현재 공격 단계와 다음 공격 가능 여부를 판단',
          '상태 태그를 통해 공격 중, 캔슬 가능, 피격 중, 처형 중 같은 전투 상태를 구분',
          '결과적으로 콤보 시스템의 책임 범위가 명확해지고, 디버깅 지점이 Ability 내부로 모임',
          '# SetByCaller + ExecCalc 데미지 구조',
          '공격 어빌리티는 데미지에 필요한 값을 SetByCaller로 전달',
          'ExecCalc는 공격자/피격자의 Attribute와 GameplayTag를 읽어 최종 데미지를 계산',
          '패링, 블록, 카운터, 그로기, 화상 같은 전투 보정이 같은 계산 흐름 안에서 처리됨',
          '신규 공격이나 상태 효과가 추가될 때도 계산 파이프라인을 유지한 채 데이터와 태그를 확장하는 방식으로 대응 가능',
          '# 체간(Posture) 전투 메커니즘 설계 — Damage Calculation 파이프라인 확장',
          '패링/블록 판정에 따른 데미지·체간 분기 처리를 GameplayEffect Execution Calculation 내부에서 일괄 계산',
          '처음엔 GameplayEvent + 전용 어빌리티로 공격자에게 역공 체간 데미지를 적용했으나, 모든 전투 캐릭터에 어빌리티를 부여해야 하는 확장성 문제(신규 적 타입이 부여 목록에서 누락되면 조용히 실패)를 발견하고 Source ASC에 GameplayEffect를 직접 적용하는 방식으로 재설계',
          'SetByCaller 태그로 동적 데미지 값을 전달하고, 상태 태그(Parry / Blocking / SuperArmor / CounterAttackBonus)로 무효화·우회 조건을 세분화해 공격 애니메이션 중(SuperArmor)인 공격자에게도 카운터 체간 데미지가 정상 적용되도록 처리',
          'Execution Calculation의 “출력은 Target만 수정 가능” 제약을 우회하면서도 별도 부여 로직 없이 모든 액터에 일관 적용되는 구조를 확보, 배율·취약도 같은 밸런스 파라미터도 계산 로직 한 곳에 집중',
          '# AbilityTask 기반 비동기 흐름 제어',
          '애니메이션 몽타주 재생과 실제 데미지 적용 타이밍을 분리',
          'AnimNotify가 GameplayEvent를 보내면 AbilityTask가 이를 수신해 데미지 처리',
          '몽타주가 정상 종료, 취소, 인터럽트되는 경우를 각각 분기하여 후처리 누락을 방지',
          '처형 도중 플레이어/적 중 한쪽의 몽타주가 먼저 끝나는 상황까지 고려해 콜백을 분리',
          '# 처형 시스템의 정리(Cleanup) 안정성',
          '처형 종료 함수가 여러 경로에서 호출될 수 있으므로 bExecutionFinished로 중복 종료 방지',
          '플레이어 몽타주가 먼저 끝나도 적 몽타주 종료를 기다릴 수 있게 플레이어/적 종료 콜백을 분리',
          '대상이 사망 상태에 들어간 경우, 이동 복구나 상태 정리는 Death 어빌리티가 담당하도록 책임 분리',
          '복합 연출 중 상태가 꼬이는 문제를 줄이고, 처형 도중 인터럽트/사망/몽타주 종료 타이밍 차이에 대응',
          '# 보스 런 진행 구조',
          'GameState는 현재 전투 상태와 보스 참조를 소유하는 상태 저장소 역할',
          'GameMode는 보스 시작, 다음 보스 진행, 보상 카드, 레벨 전환 같은 흐름 제어 담당',
          '사망 이벤트와 사망 애니메이션 완료 이벤트를 분리하여 연출 타이밍과 게임 진행 타이밍을 분리',
          '멱등성 플래그를 두어 같은 이벤트가 여러 번 호출되어도 한 번만 처리되도록 설계',
          '# 로그라이크 보상 카드 생명주기 관리',
          '보상 카드는 ACRewardCardComponent가 생성, 선택, 적용, 회수까지 책임지는 독립 모듈로 구성',
          'CanCardBeOffered()에서 희귀도, 전설 카드 Run당 1회 제한, MaxStack 도달 여부를 필터링하고, 추첨 로직과 후보 필터링을 분리',
          'DataAsset 기반 카드 목록 구조로 시작했지만, 카드 수가 늘어날수록 대량 편집과 밸런싱이 불편하다고 판단해 UDataTable 기반으로 전환',
          'GameplayEffectClass와 GrantedAbilityClass를 모두 지원해 단순 스탯 증가 카드와 이벤트 반응형 패시브 카드를 같은 데이터 구조로 처리',
          'MSVC에서 TSubclassOf<UACGameplayAbility>가 TSubclassOf<UGameplayAbility>로 암시 변환되지 않는 문제를 명시적 캐스팅으로 해결',
          'Run 종료 시 적용된 GE/Ability 핸들을 모두 추적해 CleanupRunEffects()에서 제거함으로써 보상 효과가 다음 Run으로 새는 문제를 방지',
          'bSelectionActive 플래그로 보스 사망 이벤트가 중복 호출되더라도 보상 UI가 중복 생성되지 않도록 재진입을 차단',
          '# 보스 페이즈 전환 컴포넌트',
          '보스의 체력 0 처리를 ACBossPhaseComponent가 먼저 가로채고, 남은 PhaseTransition이 있으면 사망 대신 전환 상태로 진입',
          '전환 데이터는 TriggerType, TransitionSequence, TransitionAbility, RestoreHealthPercent, PhaseStateTag로 구성해 보스 Blueprint에서 페이즈별로 편집 가능',
          '컷신 종료, 어빌리티 종료, 강제 타임아웃 경로가 모두 CompletePhaseTransition으로 모이도록 구성해 중복 완료와 무한 무적 상태를 방지',
          'PhaseStateTag를 누적 부여해 StateTree 조건, GAS ActivationBlockedTags, GameplayEffect Tag Requirement가 동일한 페이즈 상태를 참조하도록 설계',
          '# StateTree 기반 보스 AI 실행',
          'BT Task로 매 틱 Ability 종료를 폴링하던 구조를 StateTree Task + Delegate/Timer 기반 대기 구조로 교체',
          'AbilityTagToActivate로 Enemy Ability를 찾고, WaitOwnedTag가 설정된 경우 해당 상태 태그가 사라질 때까지 Running을 유지',
          '긴 몽타주 액션 중에도 AI 태스크가 불필요하게 Tick을 돌지 않도록 구성해 공격/대기/방향 보정/워프 타겟 갱신을 명확한 상태 단위로 관리',
          '# RunState와 메타 성장 정산',
          '레벨 전환 때 파괴되는 PlayerCharacter/GameMode에 런 상태를 두지 않고, GameInstanceSubsystem에 카드 스택과 보스 진행도를 저장',
          '보스 보상은 PendingCurrencies에 먼저 쌓고, 로비 복귀 또는 최종 보스 클리어 시점에만 MetaProgressionSubsystem으로 확정 지급',
          '첫 클리어 기록 역시 PendingClearedBossTags에 보류했다가 정산 시 SaveGame에 반영해, 사망으로 Run을 잃었을 때 기록이 잘못 남지 않도록 처리',
          '# 디버그 / 에디터 툴링',
          'ACWebDebugSubsystem은 Shipping 빌드에서 통째로 빠지는 조건부 디버그 서버로 구성하고, HTTP 정적 서빙과 WebSocket 스트리밍을 통해 전투 타임라인을 브라우저에서 확인',
          'Boss Combat Workbench는 Blueprint Editor Utility Widget 에셋이 아니라 C++ Slate SCompoundWidget 기반 Nomad Tab으로 구현했으며, Level Editor의 Tools 메뉴에서 열 수 있도록 등록',
          'Workbench에서 맵 열기, PIE 시작/중지, 스테이지 재시작, 보스 체력 비율 조정, 강제 페이즈 전환, 웹 디버그 토글, RunLogs 열기, 보스/아레나/몽타주/StateTree 검증을 한 화면에서 수행',
          'ACBossAssetValidator로 보스 Blueprint의 StartupData, RewardData, AIController, Phase 전환 배선을 검사해 데이터 누락을 런타임 전에 찾을 수 있도록 구성',
          '자동화 테스트로 StateTree 배선, DecayPair, AttributeWiring, BossAssets, AttackMontages와 체간/가드 계산 공식을 반복 검증해 보스 추가와 밸런스 수정 후 회귀 위험을 줄임',
        ],
      },
      {
        key: 'trouble',
        label: '트러블슈팅 / 설계 고민',
        kind: 'bullets',
        items: [
          '# 1. 콤보 캔슬 타이밍이 프레임 단위로 흔들리는 문제',
          '문제 — 입력 버퍼 컴포넌트와 Ability가 모두 콤보 상태에 관여하면서, 취소 가능 타이밍과 다음 Ability 재활성화 시점이 복잡해졌습니다.',
          '해결 — 콤보 캔슬 판단을 Ability 내부로 옮기고, CanActivateAbility / EndAbility / GameplayTag를 기준으로 상태를 정리했습니다.',
          '결과 — 전투 상태 관리 책임이 명확해졌고, 콤보 입력과 취소 흐름을 Ability 단위에서 추적할 수 있게 되었습니다.',
          '# 2. 처형 중 애니메이션과 데미지 타이밍이 어긋나는 문제',
          '문제 — 처형은 플레이어와 적의 몽타주, 데미지 적용, AI 정지, 카메라/히트스톱 연출이 동시에 맞아야 하므로 단순 함수 호출로는 타이밍 안정성이 떨어졌습니다.',
          '해결 — AnimNotify가 보내는 GameplayEvent를 AbilityTask_WaitGameplayEvent로 대기하고, 몽타주 종료는 AbilityTask_PlayMontageAndWait의 콜백으로 분기했습니다.',
          '결과 — 실제 타격 타이밍과 데미지 적용 시점이 분리되어 연출과 로직을 안정적으로 맞출 수 있었습니다.',
          '# 3. 보스 사망 이후 UI/보상/다음 보스 진행이 중복 호출되는 문제',
          '문제 — 보스 사망 이벤트와 레벨 전환 타이밍이 겹치면 보상 카드가 두 번 뜨거나 다음 보스가 중복 스폰될 가능성이 있었습니다.',
          '해결 — 사망 이벤트와 사망 애니메이션 완료 이벤트를 분리하고, 델리게이트 중복 바인딩 방지 및 멱등성 플래그를 추가했습니다.',
          '결과 — 전투 종료, 연출 종료, 보상 표시, 다음 보스 진행 흐름이 순차적으로 정리되어 런 진행 안정성이 높아졌습니다.',
          '# 4. 보상 카드 효과가 다음 Run으로 남는 문제',
          '문제 — 로그라이크 구조에서는 Run 중 획득한 버프가 Run 종료 후 반드시 제거되어야 하지만, GameplayEffect와 GrantedAbility가 여러 카드에서 동적으로 적용되면 회수 지점이 분산될 수 있었습니다.',
          '해결 — 카드 적용 시 생성된 FActiveGameplayEffectHandle과 FGameplayAbilitySpecHandle을 전부 배열에 저장하고, Run 종료 시 CleanupRunEffects()에서 일괄 제거하도록 구성했습니다.',
          '결과 — 보상 효과의 생명주기가 Run 단위로 명확히 제한되었고, 다음 Run으로 버프나 패시브 어빌리티가 누수되는 문제를 방지했습니다.',
          '# 5. 카드 데이터 관리 방식 전환',
          '문제 — 초기 DataAsset 기반 구조는 카드 수가 늘어날수록 카드명, 설명, 희귀도, 가중치, MaxStack 같은 데이터를 대량 편집하기 어려웠습니다.',
          '해결 — FACRewardCardData 기반 UDataTable 구조로 전환하고, CSV 편집과 RowName 기반 CardID 사용이 가능하도록 변경했습니다.',
          '결과 — 기획 데이터 편집과 밸런싱이 쉬워졌고, 카드 추가 시 코드 수정 부담이 줄었습니다.',
          '# 6. GAS 어트리뷰트 BaseValue 드리프트 버그',
          '체간 자연 감소를 위해 Periodic GameplayEffect(Additive Modifier)를 도입한 뒤, 게이지가 화면상 0으로 고정되는데도 내부 값은 계속 음수로 발산하는 현상을 어빌리티 시스템 디버그 HUD(Current/Base 괄호 표기)로 포착',
          'PreAttributeChange(CurrentValue 클램프)만으로는 주기형 Modifier가 직접 변경하는 BaseValue를 제어할 수 없다는 GAS 내부 동작 차이를 규명하고, PreAttributeBaseChange 오버라이드를 추가해 근본 원인을 해결',
          '동일 구조를 쓰는 다른 어트리뷰트(스태미나)와 비교 검증해 실제 드리프트가 발생하는 지점만 선별 수정, 불필요한 범위 확장 방지',
          '어트리뷰트 내부 값의 일관성을 보장하고, 이후 유사한 주기형 GE 설계 시 재사용 가능한 디버깅 기준(디버그 HUD 괄호 해석)을 확립',
          '# 7. 크로스 액터 참조 및 상태 가드',
          'Source ASC에 GameplayEffect를 직접 적용하는 역공 로직에서, 전투 중 공격자 액터가 파괴되거나 ASC를 찾지 못할 수 있는 상황을 고려해 ASC → Actor → ASC 재조회 단계마다 유효성 체크를 연쇄적으로 배치',
          '단일 실패 지점에서 크래시나 강제 진행 대신 각 단계에서 안전하게 조기 반환하도록 처리해, 예외 상황이 전투 흐름 전체를 끊지 않도록 설계',
          '사망 / 체간 붕괴 / 처형 중 / 무적 / 슈퍼아머 등 상태 태그 조합으로 유효하지 않은 시점의 데미지 중복 적용을 사전 차단하고, 체력 비율 계산에는 0 나눗셈 방지 분기를 적용',
          '동시다발적 전투 상황(다중 히트, 즉시 처형, 사망 직전 피격 등)에서도 정의되지 않은 동작 없이 안정적으로 동작하도록 보장',
          '# 8. 페이즈 전환 중 보스가 멈추거나 무적 상태로 남을 수 있는 문제',
          '문제 — 컷신, TransitionAbility, AI 정지/복구가 얽힌 페이즈 전환에서 콜백 하나가 누락되면 보스가 전환 상태에 갇힐 수 있었습니다.',
          '해결 — 컷신 종료, 어빌리티 종료, MaxTransitionDuration 타임아웃이 모두 동일한 완료 함수로 수렴하도록 만들고, bPhaseTransitionInProgress와 PendingTransitionIndex로 중복 진입을 차단했습니다.',
          '결과 — 연출 실패나 어빌리티 취소 상황에서도 전투가 복구되며, 전환 상태와 최종 사망 상태의 경계가 명확해졌습니다.',
          '# 9. 보스 데이터 누락과 전투 공식 회귀를 수동으로만 확인하던 문제',
          '문제 — 보스 Blueprint에 StartupData, RewardData, AIController, Phase 설정 중 하나가 빠지거나 체간/가드 계산식이 수정되어도, 기존에는 PIE에서 직접 플레이하기 전까지 문제를 발견하기 어려웠습니다.',
          '해결 — BossAssetValidator와 Boss Combat Workbench로 에셋 배선, StateTree, 몽타주, 어트리뷰트 초기화 데이터를 즉시 검사하고, Automation Test Framework로 보스 에셋과 전투 공식 테스트를 반복 실행할 수 있게 구성했습니다.',
          '결과 — 보스 추가와 밸런싱 작업에서 반복 확인 비용이 줄었고, 에셋 누락과 전투 계산 회귀를 실제 플레이 테스트 전에 먼저 걸러낼 수 있게 되었습니다.',
        ],
      },
      {
        key: 'summary',
        label: '불릿 포인트',
        kind: 'bullets',
        note: 'Ashen Cathedral에서는 GAS를 단순 어빌리티 실행 도구로 사용하는 데 그치지 않고, 전투 상태, 데미지 계산, 애니메이션 타이밍, AI 제어, 보스 진행 흐름, 로그라이크 보상 카드 생명주기를 하나의 확장 가능한 게임플레이 구조로 묶는 데 집중했습니다.',
        items: [
          '# UE5 GAS 전투 + Motion Matching 애니메이션 흐름 · 패링 중심 고속 공방 · 보스 런 로그라이크',
          'GameplayTag, SetByCaller, 커스텀 ExecutionCalculation을 활용한 공격/피격/스태미나/패링/블록 기반 전투 계산 구조 구현',
          'Chooser Table, GameplayTag, Motion Matching을 활용해 캐릭터 상태와 전투 상황에 맞는 Pose Search Database 및 애니메이션 선택 구조 구성',
          'GAS의 Ability/Tag 상태와 Motion Matching 평가 흐름을 연계하여 공격, 회피, 피격, 처형 등 액션 상황에 맞는 애니메이션이 선택되도록 구현',
          'Motion Matching 기반 로코모션과 Fab 애니메이션 리소스를 전투 흐름에 맞게 결합하고, 입력/상태/전환 조건을 조정해 자연스러운 액션 흐름 구성',
          '애니메이션, AI, Motion Warping, Gameplay Camera를 연계한 처형(Execution) 어빌리티 구현',
          'Gameplay Camera를 활용해 전투, 탐색, 처형 등 상황별 카메라 리그 전환 및 블렌딩 구조 구성',
          'GameMode/GameState 역할 분리와 Delegate 기반 이벤트 체인으로 보스 전투 진입, 클리어, 보상 흐름 제어',
          'ACBossPhaseComponent 기반 보스 페이즈 전환, 컷신, 전환 어빌리티, AI 정지/복구, 실패 안전 타이머 구현',
          'DataTable 기반 로그라이크 보상 카드와 Run 단위 효과 적용/회수 구조 구현',
          'ACRunStateSubsystem / MetaProgressionSubsystem으로 레벨 전환을 넘는 카드 스택, 보스 진행도, 미정산 보상 정산 구조 구현',
          'StateTree Task, WebDebugSubsystem, 자동화 테스트, Slate 기반 Editor Workbench를 통해 보스 AI 실행과 전투 디버깅/검증 파이프라인 구축',
        ],
      },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/hwarang98/Ashen_Cathedral' }],
    media: [
      {
        label: 'Gameplay',
        title: '게임 플레이 영상',
        href: 'https://youtu.be/p6ewq5JoPP8?si=1343cPG8kCLH6nBR',
      },
      {
        label: 'Tooling',
        title: 'Boss Combat Workbench',
        href: '/portfolio-media/ashen/boss-combat-workbench.png',
        kind: 'image',
      },
      {
        label: 'Debug',
        title: 'WebDebug 전투 타임라인',
        href: '/portfolio-media/ashen/web-debug-timeline.png',
        kind: 'image',
      },
      {
        label: 'Tuning',
        title: '보스 튜닝 프리뷰',
        href: '/portfolio-media/ashen/boss-tuning-preview.png',
        kind: 'image',
      },
      {
        label: 'Tooling',
        title: 'Attribute Matrix & Live Editor',
        href: '/portfolio-media/ashen/attribute-matrix-live-editor.png',
        kind: 'image',
      },
      {
        label: 'Tooling',
        title: '라이브 어트리뷰트 편집',
        href: '/portfolio-media/ashen/live-attribute-editor.png',
        kind: 'image',
      },
      {
        label: 'Validation',
        title: '아레나 검증 결과',
        href: '/portfolio-media/ashen/arena-validation.png',
        kind: 'image',
      },
    ],
  },

  // 3. Arc: The Crimson Cathedral ------------------------------------------
  {
    id: 'PRJ_ARC',
    index: '03',
    category: 'unreal',
    title: 'Arc: The Crimson Cathedral',
    ueVersion: 'UE5.6',
    formTags: ['Co-op', 'Soulslike'],
    role: 'Gameplay / Network Programmer',
    summary: '협동 환경에서 전투·이동·상태가 동기화되는 Co-op 3인칭 소울라이크.',
    systemTags: ['GAS', 'Replication', 'RPC', 'Traversal', 'Co-op'],
    status: 'IN_DEVELOPMENT',
    accent: 'amber',
    sections: [
      {
        key: 'overview',
        label: 'Overview',
        kind: 'bullets',
        items: [
          'Arc: The Crimson Cathedral 는 언리얼 엔진 5와 C++를 기반으로 제작된 3인칭 소울라이크 게임입니다.',
          '게임플레이 어빌리티 시스템(GAS)을 핵심 아키텍처로 사용하여 역동적이고 확장 가능한 전투 시스템을 구현하는 데 중점을 두었습니다.',
          '플레이어는 정교한 콤보, 타겟락, 처형 시스템 등을 통해 스타일리시한 전투를 경험할 수 있으며, 스테이트 트리 기반의 지능형 AI와 상호작용하며 플레이하게 됩니다.',
        ],
      },
      {
        key: 'info',
        label: '설명',
        kind: 'table',
        rows: [
          ['기간', '2025.11 ~ 2026.01'],
          ['장르', '3인칭 액션 RPG 소울라이크'],
          ['개발환경', 'Unreal Engine 5.6'],
          ['팀 (역할)', '7인 개발 (프로젝트 리더, 플레이어, 전투 시스템 구축, 프로젝트 기반 작업)'],
          ['핵심 시스템', 'GAS, Motion Matching, State Tree'],
          ['사용 기술', 'Gameplay Ability System, State Tree, Gameplay Camera'],
          ['레퍼런스', "Elden Ring, lies of p, demon's souls"],
        ],
      },
      {
        key: 'focus',
        label: '개발 집중 포인트',
        kind: 'bullets',
        items: [
          'Gameplay Ability System(GAS)을 기반으로 한 확장 가능한 스킬/전투 시스템',
          'Motion Matching을 활용한 자연스러운 움직임 구현',
          '핵심 플레이 경험 강화를 위한 고급 기능 구현',
          'Data-oriented programming',
          '컴포넌트 기반 아키텍처 구조 설계',
          'State Tree 기반 AI 패턴 설계',
        ],
      },
      {
        key: 'highlight',
        label: '핵심 기능 하이라이트',
        kind: 'table',
        columns: ['카테고리', '구현 요약'],
        rows: [
          [
            'Gameplay Ability System',
            '• 소울 라이크 스타일 전투 시스템 구현 및 멀티 플레이 대응\n• Ability 33종, AttributeSet 15종, ExecutionCalculation 1개',
          ],
          [
            'Networking',
            '• Listen Server\n• 리플리케이션을 통한 멀티플레이어 상태 동기화\n• 캐릭터 걸음 속도(걷기, 뛰기, 질주) · MovementMode, Ability 태그 동기화\n• 예측 및 보정 로직 구현',
          ],
          [
            'Animation',
            '• Motion Matching(UEFN 샘플) 애니메이션 리타게팅\n• Traversal(Parkour) Action\n• AnimLayerInterface 로 CPU 부하 감소\n• 전투 애니메이션팩 적용',
          ],
          [
            'Parkour (Traversal Action)',
            '• GAS와 통합\n• 스플라인이 적용된 구조물에만 파쿠르 기능 도입 (CPU 부하 감소)',
          ],
          ['Gameplay Camera', '• Movement 모드에 따른 카메라 뷰 동적 변경'],
        ],
      },
      {
        key: 'perf',
        label: '퍼포먼스 최적화',
        kind: 'table',
        note: '데미지 처리 결과 최적화 결과',
        columns: ['상태', 'Before', 'After', '개선'],
        rows: [['Weapon overlap', '0.64 ms', '0.48 ms', '▼ 25%']],
      },
      {
        key: 'gas',
        label: 'Gameplay Ability System',
        kind: 'table',
        columns: ['구현 요소', '동작 방식', '적용 효과'],
        rows: [
          [
            'GAS Core Attribute Architecture\n(GAS 핵심 Attribute 아키텍처)',
            '• 단일 UAttributeSet 클래스에서 모든 캐릭터 속성 관리\n• 상태 속성: CurrentHealth/MaxHealth, CurrentMana/MaxMana, CurrentStamina/MaxStamina\n• 전투 속성: BaseDamage, DamageTaken, AttackPower, DefensePower, AttackSpeed\n• 그로기 속성: CurrentGroggy, MaxGroggy, GroggyDamageTaken\n• 이동 속성: MoveSpeed\n• 재화 속성: CurrentCurrency, MaxCurrency',
            '• 모든 캐릭터(플레이어/몬스터/NPC)가 동일한 AttributeSet 공유 → 일관된 스탯 시스템\n• 신규 속성 추가 시 한 곳만 수정하면 전체 적용\n• 모든 Attribute 변경은 Server Authority에서만 수행\n• 클라이언트는 예측 및 시각적 피드백만 담당',
          ],
          [
            'Data-Driven Damage System (SetByCaller)\n(SetByCaller 기반 데이터 중심 데미지 시스템)',
            '• UCMGECalculation_DamageTaken : UGameplayEffectExecutionCalculation 에서 SetByCaller 태그로 BaseDamage, ComboCount, GroggyDamage, CounterAttackBonus 를 런타임에 수신\n• 최종 데미지 = BaseDamage × 콤보보정 × AttackPower × (1 - DefensePower)',
            '• 하나의 데미지 GE로 모든 공격 처리 가능 → GE 재사용성 극대화\n• 무기/스킬/레벨별 데미지를 코드 수정 없이 DataAsset만 변경하여 즉시 적용\n• 밸런싱을 코드가 아닌 데이터 중심으로 설계하여 라이브 서비스 환경에서도 빠른 수치 조정 가능',
          ],
          [
            'Combo Attack System\n(연속 공격을 통한 전투 리듬 형성 및 리스크/리턴 설계)',
            '• UCMPlayerAbility_ComboAttack_Base 에서 CurrentComboCount 를 서버 권한으로 관리\n• 경공격: (콤보-1) × 5% + 100%\n• 강공격: 콤보 × 15% + 100% 보정\n• Client_SyncComboCount RPC로 클라이언트 예측 보정',
            '• 경공격은 연속성, 강공격은 폭발력으로 전략적 선택지 제공\n• 리슨 서버 환경에서 서버 권한 검증으로 부정행위 방지',
          ],
          [
            'Perfect Parry / Standard Block System\n(타이밍 기반 퍼펙트 패링과 상태 기반 일반 블록 분리 처리)',
            '• TryBlockOrParry()에서 Player_Status_PerfectParryWindow 태그 보유 시 퍼펙트 패링(데미지 완전 무효화), Player_Status_Blocking 시 일반 블록(75% 감소)\n• IsValidBlock()으로 방향 검증 후 성공 판정',
            '• 타이밍 기반 극적인 전투 경험 제공\n• 퍼펙트 패링 성공 시 CanCounterAttack 태그 부여 → 2배 데미지 카운터 공격 연계',
          ],
          [
            'Groggy Accumulation System\n(특정 공격 누적 시 그로기 상태 진입 및 전투 페이즈 전환)',
            '• HandleGroggyDamage()에서 강공격/카운터 공격의 GroggyDamage 를 CurrentGroggy 에 누적\n• MaxGroggy 도달 시 Shared_Event_GroggyTriggered 이벤트 → UCMAbility_Groggy 자동 활성화\n• 정적 태그 컨테이너로 Invincible/SuperArmor 면역 처리',
            '• 보스전에서 그로기 유발 → 집중 공격 전략 패턴 구현\n• 면역 태그로 특정 상황에서 그로기 무효화 가능',
          ],
          [
            'Directional Hit Reaction System\n(피격 방향에 따른 4방향 히트 리액션 재생)',
            '• UCMFunctionLibrary::ComputeHitReactDirectionTag()로 공격자-피격자 각도 계산\n• Front/Left/Right/Back 4방향 태그 자동 결정 → 해당 방향 몽타주 재생',
            '• 공격 방향에 따른 자연스러운 피격 애니메이션 재생\n• 4개 몽타주만으로 360° 히트 리액션 커버',
          ],
        ],
      },
      {
        key: 'net',
        label: 'Networking & Replication',
        kind: 'table',
        columns: ['동기화 데이터 (What)', '전송 방식 (How)', '반영 처리 (Apply)', '설계 의도 및 효과 (Why)'],
        rows: [
          [
            'Attribute 15종',
            '• FReplicatedAcceleration USTRUCT으로 XY는 각도+크기, Z는 정량화해 압축 전송 (8+8+8 bit)',
            '• OnRep_xxx() 콜백에서 GAMEPLAYATTRIBUTE_REPNOTIFY 매크로 호출 → GAS 내부 브로드캐스트로 UI/이펙트 자동 갱신',
            '• 기본 UE5 DOREPLIFETIME은 매 틱 복제 → OnChanged 조건으로 대역폭 절감\n• GAS 표준 패턴 준수로 AttributeSet ↔ UI 자동 바인딩',
          ],
          [
            '캐릭터가 현재 가지고 있는 무기 배열 + 현재 장착 무기',
            '• DOREPLIFETIME으로 TArray 전체 복제, ReplicatedUsing = OnRep_CurrentEquippedWeaponTag로 장착 태그 변경 감지',
            '• OnRep_CurrentEquippedWeaponTag(OldTag) → HandleClientSideEquipEffects()에서 이전 무기 해제(애님 레이어 Unlink, 소켓 변경) + 새 무기 장착(애님 레이어 Link, 입력 컨텍스트 추가)',
            '• Tag 기반 무기 식별로 O(1) 조회 가능\n• Listen Server는 즉시 적용, 원격 클라는 OnRep으로 지연 없는 시각 동기화\n• 입력 컨텍스트는 IsLocallyControlled() 체크로 로컬 전용 처리',
          ],
          [
            'CurrentComboCount (콤보 횟수)',
            '• Client, Reliable RPC Client_SyncComboCount(int32)로 서버→클라이언트 직접 전송\n• 서버에서 콤보 증가/리셋 시마다 호출',
            '• 클라이언트에서 CurrentComboCount = NewComboCount 즉시 반영 → 로컬 UI/애니메이션 예측에 활용',
            '• 복제 변수가 아닌 RPC로 즉시 동기화 → 콤보 타이밍 정확도 ↑\n• 서버 권한으로 부정행위 방지 (클라가 콤보 조작 불가)\n• 카운터 어택/콤보 리셋 시에도 동일 RPC로 일관된 처리',
          ],
          [
            'WeaponCollision + OverlappedActors (한 공격당 히트 액터 목록)',
            '• Server, Reliable RPC ServerToggleCollision(bool, EToggleDamageType)\n• AnimNotifyState AN_ToggleCollision에서 NotifyBegin/End 시 호출',
            '• 서버에서 HandleToggleCollision() → 무기 BoxCollision QueryOnly ↔ NoCollision 전환, 비활성화 시 OverlappedActors.Empty()로 다음 공격 준비',
            '• 콜리전 판정은 서버 권한으로 처리 → 히트 판정 신뢰성 확보\n• OverlappedActors.Contains() 체크로 한 공격당 1회 히트 보장\n• 애님 노티파이 기반으로 몽타주 특정 구간만 콜리전 활성화',
          ],
          [
            'CachedRollInputDirection (회피 입력 방향)',
            '• FVector_NetQuantize100으로 양자화 압축 (각 축 100cm=1단위, ~6bytes)\n• Server, Reliable RPC로 클라→서버 전송 후 Replicated 변수로 전파',
            '• 서버에서 수신 → CachedRollInputDirection 저장 → 자동 복제, Roll Ability에서 GetCachedRollInputDirection()으로 회피 방향 결정',
            '• FVector_NetQuantize100으로 대역폭 50% 절감 (~12bytes → ~6bytes)\n• 이전 입력 방향 캐싱으로 일관된 회피 방향 보장\n• 서버 권한으로 최종 방향 결정 → 동기화 일관성',
          ],
          [
            'DeathMontage (사망 애니메이션)',
            '• NetMulticast, Reliable Multicast_PlayDeathMontage(UAnimMontage*)',
            '• Multicast 콜백에서 AnimInstance->Montage_Play()로 모든 클라이언트 동시 재생, 서버에서 MontageLength + DestroyDelay 타이머로 캐릭터 파괴 스케줄',
            '• 사망 애니메이션은 Reliable로 반드시 재생 보장\n• 몽타주 포인터만 전송 → 최소 대역폭으로 동기화\n• 서버에서 몽타주 길이 기반 정확한 파괴 타이밍 계산',
          ],
        ],
      },
      {
        key: 'combat-comp',
        label: 'Combat Component',
        kind: 'table',
        note: '무기 관리, 충돌 판정, 락온 시스템을 컴포넌트로 분리하여 캐릭터와 전투 로직의 결합도를 낮추고 재사용성 향상.',
        columns: ['구현 요소 (What)', '동작 방식 (How)', '효과 (Result)'],
        rows: [
          [
            '무기 등록/관리',
            '• TArray<FReplicatedWeaponEntry> CharacterCarriedWeaponList로 복수 무기 관리\n• RegisterSpawnedWeapon(Tag, Weapon)으로 태그 기반 등록\n• CurrentEquippedWeaponTag를 ReplicatedUsing으로 네트워크 동기화',
            '• 무기 교체 시 자동으로 클라이언트에 상태 전파\n• 태그 기반 조회로 무기 시스템 확장 용이',
          ],
          [
            '무기 충돌 토글',
            '• ToggleWeaponCollision(bool, EToggleDamageType)으로 충돌 활성/비활성\n• ServerToggleCollision() Server RPC로 서버에서 충돌 상태 변경\n• OverlappedActors 배열로 한 공격에 중복 히트 방지',
            '• AnimNotify에서 정확한 타이밍에 충돌 활성화\n• 멀티히트 방지로 밸런스 있는 데미지 시스템',
          ],
          [
            '파티클 비동기 프리로딩',
            '• StartAsyncParticlePreloading()으로 게임 시작 시 모든 스킬 파티클 비동기 로드\n• PendingParticlesToLoad 배열을 순차적으로 로드\n• 타이머 기반으로 프레임 드롭 없이 백그라운드 로딩',
            '• 스킬 사용 시 발생할 수 있는 파티클 로딩 지연을 사전에 제거하여 전투 연출의 즉시성 확보\n• 타이머 기반 순차 로딩으로 한 프레임에 로드가 집중되는 문제를 방지하고 프레임 안정성 개선',
          ],
        ],
      },
      {
        key: 'parkour',
        label: 'Parkour / Traversal',
        kind: 'table',
        note: '에픽게임즈의 GameAnimationSample 프로젝트를 참고하여, 어빌리티 시스템 및 모션워핑 기반으로 캐릭터가 Vault, Hurdle, Climb 등의 파쿠르 액션(Traversal Action)을 수행할 수 있도록 통합 구현.',
        columns: ['구현 요소 (What)', '동작 방식 (How)', '효과 (Result)'],
        rows: [
          [
            '장애물 액터 자동 셋업 (Traversable Actor)',
            '• 액터에 스플라인을 추가한 pawn에서만 파쿠르 작동',
            '• 디자이너는 컴포넌트만 붙이면 장애물 자동 등록 → 파쿠르 대상화 작업 완전 자동화, 레벨 제작 부담 감소',
          ],
          [
            'Chooser Table 기반 Traversal',
            '• 캐릭터가 전방 Trace로 장애물 데이터(높이, 거리, 경사, 방향, 공간 여유 등) 수집\n• 수집한 컨텍스트를 Chooser Table에 전달해 최적 동작(몽타주/애니 테이블/변형 파라미터)을 선택\n• 선택 결과를 캐시한 뒤 서버 권한 환경에서는 RPC/서버 승인 후 동일 결과로 재생(동기화)',
            '• 항상 같은 파쿠르가 아니라 환경에 따라 알맞은 동작이 자동 선택되어 자연스러운 트래버설 구현\n• 조건 추가(예: 무기 상태/스태미나/캐릭터 타입)에 따라 행동 다양성 확장이 쉬움',
          ],
          [
            '모션 워핑',
            '• Traversal 시작 시 MotionWarpingComponent에 Warp Target(예: 장애물 상단, 랜딩 지점, 손 짚는 위치)을 등록\n• 몽타주 재생 중 특정 구간에서 캐릭터 Root Motion이 Warp Target에 수렴하도록 위치/회전 보정\n• 장애물의 미세한 위치 차이에도 애니메이션과 월드 지오메트리의 불일치를 최소화',
            '• 캐릭터가 “허공에 손 짚기 / 발 헛디딤” 같은 문제 없이 장애물과 정확히 맞물리는 파쿠르 연출 가능\n• 동일 몽타주를 다양한 높이/거리 장애물에 재사용해 콘텐츠 제작 비용 절감',
          ],
        ],
      },
      {
        key: 'anim',
        label: 'Animation Pipeline',
        kind: 'table',
        note: 'Unreal Engine의 Linked Anim Layer 시스템을 활용하여, 무기 장착/해제 시 동적으로 애니메이션 레이어를 연결/해제함으로써 무장 상태에 따른 완전히 다른 애니메이션 세트를 런타임에 교체. 필요한 레이어만 로드하여 불필요한 애니메이션 메모리 사용 방지.',
        columns: ['구현 요소 (What)', '동작 방식 (How)', '효과 (Result)'],
        rows: [
          [
            'Linked Anim Layer 클래스 (UCMPlayerLinkedAnimLayer)',
            '• UCMAnimInstanceBase를 상속받아 베이스 로코모션 데이터 공유\n• GetPlayerAnimInstance()로 메인 AnimInstance 참조 획득\n• 블루프린트에서 무기별 전용 애니메이션 로직 구현 (Idle, Walk, Attack 등)',
            '• 무기마다 독립적인 애니메이션 블루프린트 관리\n• 메인 AnimInstance 수정 없이 무기별 애니메이션 확장 가능',
          ],
          [
            '무기 DataAsset의 AnimLayer 설정',
            '• UCMDataAsset_WeaponData에 TSubclassOf<UCMPlayerLinkedAnimLayer> WeaponAnimLayerToLink 필드 정의\n• 에디터에서 무기별 전용 AnimLayer 클래스 지정\n• 무기 데이터에 EquippedSocketName, UnequippedSocketName 등 장착 위치 정보도 포함',
            '• 데이터 주도 설계로 코드 수정 없이 무기별 애니메이션 설정\n• 기획자가 에디터에서만 작업하여 새 무기 추가 가능',
          ],
          [
            '동적 AnimLayer 링크/언링크',
            '• OnRep_CurrentEquippedWeaponTag() 콜백에서 무기 교체 감지\n• 이전 무기: GetMesh()->UnlinkAnimClassLayers(OldWeaponData->WeaponAnimLayerToLink)\n• 새 무기: GetMesh()->LinkAnimClassLayers(NewWeaponData->WeaponAnimLayerToLink)',
            '• 무기 장착 시 즉시 애니메이션 세트 전환\n• 비무장 → 검 → 활 등 무기 타입별 완전히 다른 애니메이션 실시간 교체',
          ],
          [
            '네트워크 동기화',
            '• CurrentEquippedWeaponTag를 ReplicatedUsing으로 서버→클라이언트 자동 동기화\n• HandleClientSideEquipEffects()에서 모든 클라이언트가 동일한 레이어 교체 실행\n• 입력 컨텍스트도 함께 추가/제거하여 무기별 입력 매핑 적용',
            '• 멀티플레이 환경에서 모든 플레이어가 일관된 애니메이션 확인\n• 호스트/클라이언트 간 시각적 동기화 보장',
          ],
        ],
      },
      {
        key: 'animtag',
        label: 'Animation Tag 상태 관리',
        kind: 'table',
        note: 'NativeGameplayTags를 활용하여 Foley 사운드, Motion Matching, 상태 관리 등 애니메이션 관련 태그를 체계적으로 분류하고 관리.',
        columns: ['구현 요소 (What)', '동작 방식 (How)', '효과 (Result)'],
        rows: [
          [
            'Foley 사운드 태그',
            '• Foley_Event_Walk, Foley_Event_Run, Foley_Event_Jump 등 이벤트별 태그 정의\n• AnimNotify에서 태그 발생 → 사운드 시스템에서 태그 기반 사운드 재생',
            '• 무기마다 독립적인 애니메이션 블루프린트 관리\n• 메인 AnimInstance 수정 없이 무기별 애니메이션 확장 가능',
          ],
          [
            '무기 DataAsset의 AnimLayer 설정',
            '• UCMDataAsset_WeaponData에 TSubclassOf<UCMPlayerLinkedAnimLayer> WeaponAnimLayerToLink 필드 정의\n• 에디터에서 무기별 전용 AnimLayer 클래스 지정\n• 무기 데이터에 EquippedSocketName, UnequippedSocketName 등 장착 위치 정보도 포함',
            '• 데이터 주도 설계로 코드 수정 없이 무기별 애니메이션 설정\n• 기획자가 에디터에서만 작업하여 새 무기 추가 가능',
          ],
          [
            '동적 AnimLayer 링크/언링크',
            '• OnRep_CurrentEquippedWeaponTag() 콜백에서 무기 교체 감지\n• 이전 무기: GetMesh()->UnlinkAnimClassLayers(OldWeaponData->WeaponAnimLayerToLink)\n• 새 무기: GetMesh()->LinkAnimClassLayers(NewWeaponData->WeaponAnimLayerToLink)',
            '• 무기 장착 시 즉시 애니메이션 세트 전환\n• 비무장 → 검 → 활 등 무기 타입별 완전히 다른 애니메이션 실시간 교체',
          ],
          [
            '네트워크 동기화',
            '• CurrentEquippedWeaponTag를 ReplicatedUsing으로 서버→클라이언트 자동 동기화\n• HandleClientSideEquipEffects()에서 모든 클라이언트가 동일한 레이어 교체 실행\n• 입력 컨텍스트도 함께 추가/제거하여 무기별 입력 매핑 적용',
            '• 멀티플레이 환경에서 모든 플레이어가 일관된 애니메이션 확인\n• 호스트/클라이언트 간 시각적 동기화 보장',
          ],
        ],
      },
      {
        key: 'camera',
        label: 'Gameplay Camera',
        kind: 'table',
        note: '새로운 카메라 시스템인 Gameplay Camera를 활용하여 상황별 카메라를 모드 단위로 분리.',
        columns: ['구현 요소 (What)', '동작 방식 (How)', '효과 (Result)'],
        rows: [
          [
            'Gameplay Camera Interface',
            '• Character ↔ Camera Director 간 Interface 기반 상태 통신\n• Character에서 이동/전투/락온 등 현재 상태를 Interface로 전달\n• Camera Director가 수신한 상태에 따라 Camera Mode 전환',
            '• 캐릭터 로직과 카메라 로직 완전 분리\n• 캐릭터 코드 수정 없이 카메라 확장 가능\n• 상태 추가 시 카메라 대응 비용 최소화',
          ],
          [
            'Camera Director (중앙 제어 구조)',
            '• PlayerCameraManager 기반 Camera Director 구현\n• 활성 Camera Mode를 우선순위 기반으로 관리\n• Camera Mode Stack을 통해 부드러운 블렌딩 처리',
            '• 카메라 전환 시 튐 현상 제거\n• 복수의 카메라 요구사항(락온, 피격 등) 충돌 방지\n• 복잡한 카메라 로직을 단일 진입점에서 관리',
          ],
          [
            'Camera Mode 단위 설계',
            '• 스프린트 / 전투 / 락온 / 피격 등 카메라를 독립적인 Mode로 분리\n• 각 Mode는 FOV, Offset, LookAt, Follow 규칙을 개별 보유',
            '• 상황별 카메라 튜닝이 용이\n• 특정 모드 수정 시 다른 카메라에 영향 없음\n• 소울라이크 특유의 전투 시야 안정성 확보',
          ],
          [
            'Lock-On 전용 Camera Mode',
            '• Lock-On 대상 기준 LookAt Pivot 설정\n• 캐릭터–적–공간을 동시에 프레이밍하도록 Offset 동적 계산\n• 거리 기반 FOV 보정',
            '• 전투 중 시야 이탈 문제 해결\n• 적과의 거리/위치 변화에도 안정적인 화면 구성\n• 전투 가독성 및 조작 신뢰도 향상',
          ],
          [
            'Spring Arm & Collision 대응',
            '• Spring Arm Collision 활성화\n• 벽/지형 충돌 시 자동 거리 보정',
            '• 카메라가 벽에 파고드는 문제 제거\n• 실내/좁은 지형에서도 시야 안정성 유지',
          ],
          [
            'Gameplay Tag 연동',
            '• GAS Gameplay Tag 기반으로 Camera Mode 전환 트리거 처리\n• 예: State.LockOn, State.HitReact 등',
            '• 어빌리티/상태 추가 시 카메라 자동 대응 가능\n• 전투 시스템과 카메라의 자연스러운 연동',
          ],
          [
            '로컬 전용 카메라 처리',
            '• 카메라 로직을 로컬에서만 처리 (비 리플리케이션)\n• 서버 동기화 제거',
            '• 멀티플레이 환경에서도 네트워크 부하 없음\n• 클라이언트 반응성 향상',
          ],
        ],
      },
      {
        key: 'ts-gas',
        label: '트러블슈팅 · GAS 네트워크',
        kind: 'bullets',
        items: [
          '시나리오 — GAS 기반 차지 스킬(Issen) 구현 중 리슨 서버 환경에서 부분 차지 시 데미지 미적용 문제 발생. 서버 / 원격 클라이언트 환경별 동작 불일치 확인 → 네트워크 복제 로직 분석',
          '주요 이슈(Before) · AbilityTask 몽타주 콜백 불일치 — 차지 루프 몽타주에서 잘못된 OnMontageCancelled 사용, 부분 차지 시 어빌리티가 의도치 않게 종료됨',
          '주요 이슈(Before) · Server RPC 중복 호출 — ReplicationPolicy = ReplicateYes 환경에서 서버·클라이언트 모두 RPC 호출, 서버에서 스킬 로직 이중 실행',
          '주요 이슈(Before) · 상태 변수 비동기화 — InputReleased가 클라이언트에서만 실행되어 bIsCharging 상태 불일치',
          '개선 및 해결(After) — 차지 몽타주 루프에 일관된 콜백(OnChargeMontageCancelled) 적용',
          '개선 및 해결(After) — Server RPC 호출 시 권한 체크로 중복 실행 방지',
          '개선 및 해결(After) — Server RPC에서 차지 상태(bIsCharging) 서버·클라이언트 동기화',
          '개선 및 해결(After) — 리슨 서버 / 원격 클라이언트 부분·풀 차지 모두 정상 데미지 처리',
          '성과 — GAS 네트워크 복제, RPC 타이밍, 상태 동기화 이슈를 체계적으로 분석·해결',
          '성과 — 멀티플레이 환경에서 차지형 스킬의 안정적인 동작 보장',
        ],
      },
      {
        key: 'ts-roll',
        label: '트러블슈팅 · Roll 어빌리티',
        kind: 'bullets',
        items: [
          '시나리오 — 리슨 서버 환경에서 8방향 Roll 어빌리티(Motion Warping 적용) 구현. 클라이언트가 측·후방 Roll 시 화면 버벅임 + 서버와 이동 방향 불일치 발생',
          '주요 이슈(Before) · 입력 방향 타이밍 문제 — LocalPredicted 정책에서 서버가 GetLastMovementInputVector()를 잘못된 타이밍에 조회, 서버에서 입력값이 zero → 항상 Forward 방향으로 처리',
          '주요 이슈(Before) · Motion Warping 비복제 문제 — Warp Target이 로컬 전용 함수로 설정되어 서버·클라이언트 타겟 불일치, 서버 권한 보정으로 화면 스터터링 발생',
          '주요 이슈(Before) · Ability 인스턴스 변수 복제 한계 — Ability 내부 변수는 자동 복제되지 않아 상태 동기화 실패',
          '개선 및 해결(After) — Roll 입력 시점에 Movement Input 방향을 즉시 캐싱',
          '개선 및 해결(After) — 캐싱된 방향을 Server RPC로 Ability 실행 전에 전달',
          '개선 및 해결(After) — 입력 방향 저장 위치를 Ability → Character(Replicated Actor)로 이동',
          '개선 및 해결(After) — NetExecutionPolicy를 ServerInitiated로 변경하여 실행 순서 안정화',
          '개선 및 해결(After) — FVector_NetQuantize100 사용으로 입력 방향 정밀도 문제 해결',
          '성과 — 리슨 서버 환경에서 8방향 Roll 완벽 동기화',
          '성과 — Motion Warping 기반 Root Motion 안정화',
          '성과 — 네트워크 지연 상황에서도 클라이언트–서버 동작 일치',
        ],
      },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/hwarang98/Crimson-Cathedral' }],
    media: [
      { label: 'Gameplay', title: '게임 플레이 영상', href: 'https://youtu.be/EKn21if_jY8?si=2DjHLbhfJkGU1jAR' },
      { label: 'Implementation', title: '구현 상세 영상', href: 'https://youtu.be/cmxPgSjfBXo?si=R5RmfadthpbNun5a' },
    ],
  },

  // 4. JEOKYEONG: 붉은 그림자 ------------------------------------------------
  {
    id: 'PRJ_JEOKYEONG',
    index: '04',
    category: 'unreal',
    title: 'JEOKYEONG',
    subtitle: '붉은 그림자',
    ueVersion: 'UE5.6',
    formTags: ['Single', 'Soulslike'],
    role: 'Solo · Gameplay / Client Programmer',
    summary: '보스 공략 중심의 GAS 기반 싱글 소울라이크. 근접 액션의 기반 전투 구조.',
    systemTags: ['GAS', 'Motion Matching', 'Behavior Tree', 'Parry', 'Execution'],
    status: 'IN_DEVELOPMENT',
    accent: 'amber',
    sections: [
      {
        key: 'overview',
        label: 'Overview',
        kind: 'bullets',
        items: [
          'Samurai 는 언리얼 엔진 5와 C++를 기반으로 제작된 3인칭 소울라이크 게임입니다.',
          '게임플레이 어빌리티 시스템(GAS)을 핵심 아키텍처로 사용하여 역동적이고 확장 가능한 전투 시스템을 구현하는 데 중점을 두었습니다.',
          '플레이어는 정교한 콤보, 타겟락, 처형 시스템 등을 통해 스타일리시한 전투를 경험할 수 있으며, 비헤이비어 트리 기반의 지능형 AI와 상호작용하며 플레이하게 됩니다.',
        ],
      },
      {
        key: 'info',
        label: '설명',
        kind: 'table',
        rows: [
          ['기간', '2025.05 ~ 2025.09'],
          ['장르', '3인칭 액션 RPG 소울라이크'],
          ['개발환경', 'Unreal Engine 5.6'],
          ['팀', '1인개발'],
          ['핵심 시스템', 'GAS, Motion Matching, Behavior Tree'],
          ['사용 기술', 'Gameplay Ability System, AI Behavior Tree, Enhanced Input, Motion Warping'],
          ['레퍼런스', "Elden Ring, lies of p, demon's souls"],
        ],
      },
      {
        key: 'focus',
        label: '개발 집중 포인트',
        kind: 'bullets',
        items: [
          'Gameplay Ability System(GAS)을 기반으로 한 확장 가능한 스킬/전투 시스템',
          'Motion Matching을 활용한 자연스러운 움직임 구현',
          'Data-oriented programming',
          '컴포넌트 기반 아키텍처 구조 설계',
          '비헤이비어 트리(BT) 기반의 적 공격 패턴 구축',
          '핵심 플레이 경험 강화를 위한 고급 기능 구현',
          '담당 역할 및 기여 — 프로젝트의 모든 시스템을 직접 설계하고 구현',
        ],
      },
      {
        key: 'gas',
        label: 'GAS 아키텍처',
        kind: 'table',
        columns: ['구현 항목', '동작 방식', '의도 / 효과'],
        rows: [
          [
            '모듈식 설계',
            '캐릭터의 모든 행동(공격, 구르기, 방어, 특수 능력 등)을 GameplayAbility로 추상화하여 설계했습니다. (UWarriorGameplayAbility, UWarriorHeroGameplayAbility 등)',
            '새로운 액션 추가 시 기존 코드 수정 최소화 → 유지보수성과 확장성 확보',
          ],
          [
            '데이터 기반 능력 관리',
            'UWarriorAbilitySystemComponent를 통해 어빌리티, 어트리뷰트(UWarriorAttributeSet), 게임플레이 이펙트를 중앙에서 관리하여, 코드 변경 없이 능력의 추가 및 수정이 용이하도록 설계했습니다.',
            '밸런스 조정 및 신규 능력 추가 시 코드 수정 없이 데이터 테이블로 대응 가능',
          ],
          [
            '어트리뷰트 시스템',
            '체력, 분노, 공격력, 방어력 등의 핵심 스탯을 UWarriorAttributeSet으로 관리하고, GEExecCalculate (UGEExecCalculate_DamageTaken)를 통해 복잡한 데미지 계산 로직을 구현했습니다.',
            '데미지 계산 로직을 분리해 재사용성 증가, 다른 캐릭터에도 손쉽게 적용',
          ],
          [
            '게임플레이 태그 활용',
            'GameplayTag를 적극적으로 활용하여 캐릭터의 상태(ex: Player.Status.Blocking, Enemy.Status.Finishable), 어빌리티 쿨다운, 입력 이벤트 등을 관리하며 시스템 간의 의존성을 낮췄습니다.',
            '조건 분기 로직 단순화, 모듈 간 결합도 감소',
          ],
          [
            '스킬 사용 Cost',
            'Gameplay Effect를 사용해 분노 사용 비용 측정',
            '스킬별 자원 관리 일관성 확보, UI 및 밸런싱 반영 용이',
          ],
          [
            '총 사용 갯수',
            '52개의 GameplayAbility 존재',
            '복잡한 전투 패턴 지원 가능, 풍부한 플레이 경험 제공',
          ],
        ],
      },
      {
        key: 'combat',
        label: '전투 시스템',
        kind: 'table',
        columns: ['구현 항목', '동작 방식', '의도 / 효과'],
        rows: [
          [
            '전투 컴포넌트',
            'UPawnCombatComponent를 기반으로 플레이어(UHeroCombatComponent)와 적(UEnemyCombatComponent)의 전투 로직을 분리하여 확장성을 확보했습니다.',
            '캐릭터 유형별 전투 로직을 독립적으로 관리 가능 → 코드 중복 최소화 및 신규 전투 타입 손쉽게 추가 가능',
          ],
          [
            '무기 시스템',
            'AWarriorWeaponBase 클래스를 통해 무기의 충돌 판정 및 히트 이벤트를 처리하고, OnWeaponHitTarget 델리게이트를 통해 전투 컴포넌트에 결과를 통지하는 방식으로 구현했습니다.',
            '전투 로직과 무기 로직을 분리하여 재사용성 확보 → 무기 종류 추가/교체가 용이하고 유지보수성 향상',
          ],
          [
            '데이터 주도 초기화',
            'UDataAsset_StartUpDataBase와 그 자식 클래스(UDataAsset_HeroStartUpData, UDataAsset_EnemyStartUpData)를 사용하여 캐릭터 생성 시 부여할 기본 어빌리티와 스탯을 데이터 에셋으로 관리합니다.',
            '코드 수정 없이 데이터 변경만으로 초기 능력 세팅 가능 → 밸런스 조정 및 테스트 효율성 극대화',
          ],
        ],
      },
      {
        key: 'finisher',
        label: '처형 시스템',
        kind: 'table',
        columns: ['구현 항목', '동작 방식', '의도 / 효과'],
        rows: [
          [
            '조건 기반 활성화',
            'UWarriorFinisherGameplayAbility에서 적의 상태(Enemy.Status.Finishable 태그)와 플레이어와의 거리, 각도 등을 CanActivateAbility 함수에서 정밀하게 체크하여 처형 가능 여부를 판단합니다.',
            '불필요한 상황에서의 오작동 방지 → 플레이어가 “의도된 순간”에만 연출을 경험하도록 설계',
          ],
          [
            '모션 워핑(Motion Warping)',
            '처형 시 플레이어와 적 캐릭터의 위치 및 방향이 어긋나지 않도록 UMotionWarpingComponent를 사용하여 애니메이션 재생 중에 실시간으로 위치와 방향을 보정, 자연스러운 연출을 구현했습니다.',
            '시네마틱에 가까운 몰입감 제공 → 연출 품질 향상 및 게임플레이의 몰입도 강화',
          ],
          [
            '애니메이션 페어링',
            'FFinisherMontagePair 구조체를 통해 플레이어와 적의 처형 애니메이션을 한 쌍으로 관리하며, 다양한 캐릭터 조합에 맞는 처형 애니메이션을 유연하게 선택하고 재생할 수 있도록 설계했습니다.',
            '새로운 적 캐릭터 추가 시에도 손쉽게 대응 가능 → 애니메이션 확장성과 유지보수성 확보',
          ],
        ],
      },
      {
        key: 'targetlock',
        label: '타겟락',
        kind: 'table',
        columns: ['구현 항목', '동작 방식', '의도 / 효과'],
        rows: [
          [
            '어빌리티 기반 구현',
            '타겟락 기능을 UHeroGameplayAbility_TargetLock이라는 별도의 게임플레이 어빌리티로 구현하여 다른 시스템과의 결합도를 낮췄습니다.',
            '입력 및 전투 시스템과의 독립성 확보 → 유지보수 용이, 재사용 가능',
          ],
          [
            '탐지 및 전환',
            'BoxTrace로 탐지하여 가장 가까운 적을 타겟으로 설정하며, 입력에 따라 좌우의 다른 적으로 타겟을 부드럽게 전환하는 기능을 구현했습니다.',
            '플레이어가 원하는 적을 직관적으로 선택 가능 → 전투 조작감 및 편의성 강화',
          ],
          [
            '카메라 및 회전 제어',
            '타겟락 상태에서는 컨트롤러 회전을 오버라이드하여 항상 타겟을 주시하도록 만들고, 캐릭터는 타겟을 중심으로 자유롭게 움직일 수 있도록 구현했습니다.',
            '영화적인 전투 연출과 직관적인 조작 경험 제공',
          ],
        ],
      },
      {
        key: 'parry',
        label: '패링 & 반격',
        kind: 'table',
        columns: ['구현 항목', '동작 방식', '의도 / 효과'],
        rows: [
          [
            '기본 방어 판정',
            '벡터 연산을 통한 방향 기반 방어 성공 판정\n• 플레이어가 방어(Player_Ability_Block) 시 Player_Status_Blocking 태그가 부여됩니다.\n• 적의 공격이 감지되면(OnHitTargetActor), UWarriorFunctionLibrary::IsValidBlock 함수를 통해 공격자와 플레이어의 방향 벡터를 내적(Dot Product)하여 서로 마주보고 있는지 계산합니다.\n• 판정이 성공하면, 공격을 받은 플레이어에게 Player_Event_SuccessfulBlock 게임플레이 이벤트를 전송하여 방어 성공 사실을 알립니다.',
            '단순한 방어를 넘어서 “방향성” 있는 전투 구현 → 기술적 숙련도 요구',
          ],
          [
            '패링 창 (Parry Window)',
            "Gameplay Tag와 시간을 이용한 정밀 판정 구간 설정\n• 방어 어빌리티가 시작되는 순간, Player_Status_Blocking 태그와 함께 Player_Status_Parrying 태그를 플레이어에게 부여합니다.\n• 약 0.2~0.3초의 짧은 지연(Delay) 후 Player_Status_Parrying 태그를 제거하여, 오직 방어 시작 직후의 짧은 시간 동안만 패링이 가능하도록 '패링 창'을 구현합니다.",
            '짧은 반응 시간 제공 → 난이도와 긴장감을 부여',
          ],
          [
            '패링 성공 처리',
            "이벤트 수신과 상태 태그를 조합한 조건부 어빌리티 활성화\n• Player_Event_SuccessfulBlock 이벤트를 수신했을 때만 발동하는 GA_ParrySuccess 어빌리티를 설계했습니다.\n• 이 어빌리티의 활성화 조건(CanActivateAbility)에 플레이어가 Player_Status_Parrying 태그를 소유하고 있을 것을 추가하여, '패링 창' 내에 들어온 '성공적인 방어'만을 '패링'으로 확정합니다.\n• 패링에 성공하면, GA_ParrySuccess 어빌리티는 공격한 적에게 GameplayEffect를 적용하여 일정 시간 동안 Enemy_Status_Vulnerable(약점 노출) 상태 태그를 부여하고 AI를 일시적으로 무력화시킵니다.",
            '성공 시 보상을 제공 → 학습 욕구와 도전 의욕 고취',
          ],
          [
            '반격 (Counter)',
            "타겟의 상태 태그를 활용한 조건부 특수 공격\n• 플레이어가 공격 입력을 했을 때, 타겟이 Enemy_Status_Vulnerable 태그를 가지고 있는지 검사하는 GA_CounterAttack 어빌리티를 구현했습니다.\n• 조건이 충족되면 일반 공격 대신 더 강력한 데미지를 주거나 특별한 연출을 가진 반격 어빌리티가 발동됩니다.\n• 이를 통해 '패링 성공'이라는 어려운 조건 달성에 대한 강력하고 직관적인 보상을 제공하여 전투의 깊이를 더했습니다.",
            '패링 성공 → 강력한 반격 보상 루프 형성 → 전투 깊이와 몰입감 강화',
          ],
        ],
      },
      {
        key: 'input',
        label: '입력 시스템',
        kind: 'table',
        columns: ['구현 항목', '동작 방식', '의도 / 효과'],
        rows: [
          [
            'Enhanced Input',
            '언리얼 엔진 5의 Enhanced Input 시스템을 사용했습니다.',
            '최신 입력 시스템 활용 → 플랫폼 대응력 및 확장성 확보',
          ],
          [
            '입력 데이터화',
            'UDataAsset_InputConfig 데이터 에셋을 통해 입력 액션과 GameplayTag를 매핑하여, 하드코딩 없이 입력을 유연하게 관리하고 어빌리티 시스템과 연동되도록 설계했습니다.',
            '하드코딩 제거 → 새로운 입력 액션 추가 및 변경 시 유연성 확보',
          ],
          [
            '커스텀 입력 컴포넌트',
            'UWarriorInputComponent를 커스터마이즈하여 BindNativeInputAction, BindAbilityInputAction 같은 템플릿 함수를 통해 입력 바인딩 과정을 간소화했습니다.',
            '중복 코드 감소 및 유지보수성 향상',
          ],
        ],
      },
      {
        key: 'ui',
        label: 'UI 시스템',
        kind: 'table',
        columns: ['구현 항목', '동작 방식', '의도 / 효과'],
        rows: [
          [
            'UI 컴포넌트 아키텍처',
            'UPawnUIComponent를 기반으로 UHeroUIComponent, UEnemyUIComponent를 파생시켜 UI 관련 로직을 캐릭터로부터 분리했습니다. IPawnUIInterface 인터페이스를 통해 어떤 캐릭터 클래스든 자신의 UI 컴포넌트에 일관된 방식으로 접근할 수 있도록 하여 결합도를 낮췄습니다.',
            'UI와 캐릭터 로직 분리 → 결합도 최소화 및 재사용성 극대화',
          ],
          [
            '이벤트 기반 업데이트',
            'OnCurrentHealthChanged와 같은 델리게이트를 사용하여 UI 업데이트를 처리합니다. UWarriorAttributeSet에서 체력 어트리뷰트가 변경되면 이 델리게이트를 Broadcast하고, 위젯 블루프린트에서 이 이벤트를 받아 UI를 갱신합니다. 이는 매 프레임 데이터를 체크하는 방식(Tick)보다 훨씬 효율적입니다.',
            'Tick 방식 대비 성능 최적화 및 반응성 있는 UI 구현',
          ],
          [
            'C++과 UMG 위젯 연동',
            'UWarriorWidgetBase C++ 클래스를 모든 UMG 위젯의 부모로 사용하여 공통 기능을 제공합니다. BlueprintImplementableEvent를 활용하여 C++ 컴포넌트(UHeroUIComponent)를 위젯 블루프린트로 안전하게 전달하고, 위젯에서는 이를 통해 필요한 데이터나 델리게이트에 바인딩합니다.',
            'C++과 블루프린트 간 명확한 역할 분리 → 협업 및 유지보수 효율 상승',
          ],
          [
            '동적 위젯 관리',
            'UHeroGameplayAbility_TargetLock 어빌리티는 필요에 따라 타겟락 위젯을 동적으로 생성(CreateWidget)하고 화면에 추가/제거하는 로직을 담당합니다. 적 캐릭터의 체력 바는 UWidgetComponent를 사용하여 3D 월드 공간에 직접 부착하는 방식으로 구현했습니다.',
            '전투 상황에 따른 유연한 UI 제공 → 몰입도 높은 사용자 경험',
          ],
        ],
      },
      {
        key: 'funclib',
        label: 'Function Library',
        kind: 'table',
        columns: ['구현 항목', '동작 방식', '의도 / 효과'],
        rows: [
          [
            '핵심 기능 중앙화',
            '프로젝트 전반에서 반복적으로 사용되는 기능들(GAS 상호작용, 전투 판정, 데이터 관리 등)을 UWarriorFunctionLibrary라는 블루프린트 함수 라이브러리에 static 함수로 구현하여 중앙에서 관리합니다.',
            '코드 재사용성 극대화 및 유지보수 효율성 증대',
          ],
          [
            '주요 기능',
            '• GAS 상호작용 간소화: NativeGetWarriorASCFromActor, AddGameplayTagToActorIfNone 등의 함수로 ASC 획득 및 태그 조작을 단순화합니다.\n• 전투 로직 지원: IsTargetPawnHostile, ComputeHitReactDirectionTag, IsValidBlock 함수를 통해 적대 관계, 피격 방향, 방어 성공 여부 등을 쉽게 계산합니다.\n• 데이터 및 게임 관리: SaveCurrentGameDifficulty, GetScalableFloatValueAtLevel 등을 통해 게임 데이터 접근 및 저장을 용이하게 합니다.',
            '복잡한 로직 캡슐화 및 블루프린트 연동성 강화 → C++의 강력한 기능을 블루프린트에서 손쉽게 사용하여 개발 유연성 확보\n\n1. 복잡한 C++ 로직의 블루프린트 노출: UFUNCTION(BlueprintCallable) 등의 지정자를 통해 C++로 작성된 복잡한 로직(ex: ComputeHitReactDirectionTag의 벡터 연산)을 기획자나 아티스트가 쉽게 사용할 수 있는 블루프린트 노드로 제공합니다.\n\n2. 팀 협업 및 개발 효율성 증대: 프로그래머는 복잡하고 최적화된 기능을 C++에 집중하고, 기획자는 이를 가져와 블루프린트에서 게임플레이를 빠르게 조립하고 테스트할 수 있어 팀의 협업 효율과 개발 속도를 크게 향상시킵니다.',
          ],
        ],
      },
      {
        key: 'hardship',
        label: '어려웠던 점',
        kind: 'bullets',
        items: [
          'Parrying & Counter Attack System — 적 AI의 공격 타이밍(0.5초) 내에 방어 키 입력 시 퍼펙트 패링으로 판정',
          '퍼펙트 패링 후 0.4초 내 공격 키 입력 시 Counter Attack 발동',
          '짧은 입력 타이밍과 연계 판정 처리 로직 구현의 난이도 존재',
          'Lock ON System — 매 프레임(Tick)마다 적 AI를 자동으로 추적하며 시선 고정',
          '타겟팅된 적에 맞춰 실시간 UI 업데이트',
          '마우스 입력에 따라 자연스럽게 다른 적으로 시선과 UI 전환',
          'Execution System — 적 AI 체력이 30% 이하일 경우 처형 가능 상태를 GAS Tag로 표시',
          '처형 키 입력 시 플레이어와 적 AI 애니메이션 동기화 후 실행',
          '애니메이션 타이밍과 상태 동기화 구현이 핵심 난제',
        ],
      },
      {
        key: 'improvement',
        label: '개선 아이디어',
        kind: 'bullets',
        items: [
          'Tick 함수 내 반복적인 캐스팅 및 컴포넌트 접근 최적화',
          '문제점 — UHeroGameplayAbility_TargetLock::OnTargetLockTick 함수 내에서 매번 GetHeroCharacterFromActorInfo(), GetHeroControllerFromActorInfo() 등을 호출하여 캐릭터와 컨트롤러를 가져옵니다.',
          '개선 방안 — 어빌리티 활성화 시점(ActivateAbility)에 필요한 액터/컴포넌트 포인터를 한 번만 가져와 멤버 변수에 캐싱하고, Tick 에서는 캐시된 포인터를 유효성 검사 후 사용',
          '게임 로직과 UI 시스템의 강한 결합(Coupling) 분리',
          '문제점 — UI가 없는 AI 캐릭터(예: 몬스터)가 이 AttributeSet 을 사용하면 PawnUIComponent 를 찾지 못해 checkf 구문에서 게임이 강제 종료됩니다. 유연성을 크게 해치는 설계로 판단',
          '개선 방안 — 이벤트 기반 접근으로 결합도 완화: (1) AttributeSet 은 값 변경만 처리, (2) AbilitySystemComponent 가 어트리뷰트 변경 시 브로드캐스트하는 델리게이트 제공(OnHealthAttributeChanged 등), (3) PawnUIComponent 는 생성 시(BeginPlay) 소유 액터의 AbilitySystemComponent 에 접근하여 해당 델리게이트에 자신의 UI 업데이트 함수를 바인딩',
        ],
      },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/hwarang98/Samurai' }],
    media: [
      { label: 'Gameplay', title: '게임 플레이 영상', href: 'https://youtu.be/w2NYsS3zeXg' },
      { label: 'Implementation', title: '구현 상세 영상', href: 'https://youtu.be/9-LcVSxIbC4' },
    ],
  },
  // 5. ONIKIRI --------------------------------------------------------------
  {
    id: 'PRJ_ONIKIRI',
    index: '05',
    category: 'unity',
    title: 'ONIKIRI',
    subtitle: '귀참 키우기',
    ueVersion: 'Unity 6',
    formTags: ['Mobile', 'Idle RPG', 'Pixel Art'],
    role: 'Solo Developer — Unity Client · Systems · Tooling',
    summary: '대형 수치 성장, 이중 천장 가챠, Firebase 계정·랭킹과 테스트 기반 밸런싱을 구축한 Unity 6 모바일 방치 RPG.',
    systemTags: ['Unity 6', 'BigDouble', 'Firebase', 'Dual-Pity Gacha', 'Balance Sim', 'Edit / PlayMode Tests'],
    status: 'IN_DEVELOPMENT',
    accent: 'amber',
    sections: [
      {
        key: 'overview',
        label: 'Overview',
        kind: 'bullets',
        items: [
          'ONIKIRI(귀참 키우기)는 Unity 6와 Universal 2D(URP)를 기반으로 제작 중인 세로형 모바일 방치 RPG 프로젝트입니다.',
          '플레이어는 고정된 사무라이가 우측에서 몰려오는 요괴를 자동으로 베는 전투 루프를 보고, 골드·경험치·보석을 통해 공격력, 공격속도, 치명타, 스킬, 장비, 전직, 동료, 심화 축을 성장시킵니다.',
          '프로젝트의 핵심은 자동 전투를 넘어 대형 수치, 확률형 성장, 세이브, 오프라인 보상, Firebase 계정·랭킹과 스테이지 밸런스가 서로 어긋나지 않도록 하나의 계산 모델과 테스트로 묶는 데 두었습니다.',
          '모바일 세로 화면을 기준으로 Safe Area, Pixel Perfect Camera, 전투 영역, 성장 패널, 하단 탭 구조를 고정하고 9:16~9:21 화면비에서 UI가 무너지지 않도록 빌더와 검증 코드를 함께 작성했습니다.',
        ],
      },
      {
        key: 'info',
        label: '설명',
        kind: 'table',
        rows: [
          ['기간', '2026.08 ~ ing'],
          ['장르', '2D 픽셀 세로형 모바일 방치 RPG'],
          ['개발환경', 'Unity 6.0 / 6000.5.2f1, Universal 2D, URP 17.6.0, C#'],
          ['팀 (역할)', '1인 개발 / 클라이언트 시스템, 전투, 성장, UI, 에디터 툴링, 테스트'],
          [
            '핵심 시스템',
            '자동 전투, BigDouble 수치 체계, 15종 스킬/이중 천장 가챠, 귀문 승급 게이트, 세이브/오프라인 보상, Firebase 계정·리더보드',
          ],
          [
            '사용 기술',
            'Unity 2D, URP, Firebase Auth/Firestore, Android Credential Manager/JNI, ScriptableObject, JsonUtility Save, Unity Test Framework, EditorWindow / Scene Builder',
          ],
          ['플랫폼 목표', 'Android/iOS 모바일 우선, 이후 Steam 프리미엄 확장 고려'],
        ],
      },
      {
        key: 'focus',
        label: '개발 집중 포인트',
        kind: 'bullets',
        items: [
          'long/double 범위를 초과하는 방치형 수치를 처음부터 자체 BigDouble 타입으로 통일해 골드, 데미지, 비용, 경험치 계산의 표현 범위를 확보',
          'PlayerCombat에서 데미지는 애니메이션 이벤트가 아니라 누적 타이머가 결정하도록 설계해 공격속도 스탯과 실제 초당 타격 횟수가 어긋나는 문제를 줄임',
          'HitStop, ScreenShake, ImpactSpark, DamageNumber, SakuraBurst를 한 타격 경로에 묶되 공격속도가 올라갈수록 연출 시간이 예산 안에서 짧아지도록 CombatFeel 규칙 적용',
          'StageSimulation을 런타임 코드로 두어 실제 곡선과 같은 상수·공식으로 보스 여유, 파밍 시간, 성장 축 효율, 사망 여부를 계산하고 EditMode 테스트로 고정',
          'SaveSystem은 PlayerPrefs 대신 JSON 파일 저장을 사용하고, 임시 파일 작성 후 교체하는 방식으로 모바일 저장 중단 시 세이브 파일이 반쪽짜리 JSON으로 남는 위험을 줄임',
          'GameSession에서 저장/복원 순서를 중앙화하고 OnApplicationPause, OnApplicationFocus, OnApplicationQuit을 모두 처리해 모바일 종료 경로에서 진행이 유실되지 않도록 구성',
          '15종 스킬 로스터와 ★4 30회/★5 100회 이중 천장을 구현하고, 마르코프 상태 모델로 장기 실효 확률과 기대 성장량을 계산',
          'Firebase Auth·Firestore 기반 랭킹과 익명→Google 계정 연동/복구를 구현하고, 로컬·익명·복구 계정 기록 중 최고 도달층을 보존',
          '6개 귀문 승급 게이트에 3연전, 소프트캡, 격노, 폐쇄, 무료 재도전 상태 기계를 연결하고 Android 실기로 UI/전투 흐름 검증',
          'EditorWindow 기반 OnikiriTestPanel과 다수의 Builder 스크립트로 전투, UI, 지역, 보스, 세이브, 방치 보상, 스크린샷, 밸런스 상태를 빠르게 재현할 수 있게 구성',
          '최근 전량 실행에서 EditMode 761개·PlayMode 30개를 통과하고, PlayMode 이후 EditMode 재실행으로 테스트 순서 의존 회귀까지 검증',
        ],
      },
      {
        key: 'highlight',
        label: '핵심 기능 하이라이트',
        kind: 'bullets',
        items: [
          '# 1. BigDouble 기반 방치형 수치 체계',
          '가수부와 지수부를 분리한 BigDouble 구조로 10^수천 이상의 골드·데미지·비용 값을 안정적으로 표현',
          '정규화, 사칙연산, 비교, Pow, Parse/ToString, JsonUtility 직렬화 호환을 구현해 게임 상태와 세이브 데이터에서 같은 타입을 사용',
          'NumberFormatter로 K/M/B 이후 알파벳 티어와 과도하게 큰 수의 과학적 표기까지 처리해 UI 표기와 내부 값의 경계를 분리',
          '# 2. 자동 발도 전투와 타격감 예산',
          '사거리 내 가장 가까운 요괴를 찾아 자동 공격하고, 공격 간격은 프레임 경계가 아니라 누적 시간 기반으로 처리해 실제 공격 횟수를 스탯에 맞춤',
          '스윙 애니메이션은 데미지 타이밍보다 먼저 시작하는 장식 레이어로 두고, 실제 데미지·불꽃·꽃잎·숫자·효과음은 같은 프레임에서 처리',
          '공격속도가 높아질수록 히트스톱, 흔들림, 불꽃 지속 시간을 예산 기반으로 줄여 후반부에도 화면이 과도하게 멈추거나 이펙트가 겹치지 않도록 설계',
          '# 3. 스테이지 / 보스 게이트',
          '일반 파밍은 잡몹 10마리 처치 후 보스 도전 버튼을 열고, 보스전은 Farming / Intro / Approaching / Fighting / Cleared / Failed 상태로 관리',
          '보스가 화면 밖에서 걸어 들어오는 시간은 제한 시간 밖에 두어, 플레이어가 공격할 수 없는 구간이 30초 타이머를 갉아먹지 않도록 수정',
          '보스 실패 시 골드나 스테이지를 잃지 않고, 실패 이유와 부족한 축을 안내해 방치 RPG의 성장 피드백으로 연결',
          '# 4. 성장 축과 밸런스 시뮬레이션',
          '공격력, 공격속도, 치명타 확률, 치명타 피해, 골드 획득, 스킬, 장비, 전직, 동료, 초월, 연격을 각각 독립 축으로 구성',
          'StageSimulation에서 곡선을 직접 돌려 스테이지별 파밍 시간, 보스 처치 여유, 생존 여유, 골드 회수 시간, 죽은 버튼 여부를 검사',
          '치명타 Lv.1000, 초월 치명타, 연격 같은 엔드게임 심화 축은 기존 세이브의 가치를 보존하는 마이그레이션과 함께 설계',
          '# 5. 세이브 / 오프라인 보상',
          'SaveData 버전을 관리하고, 새 필드 추가 시 마이그레이션으로 기존 진행을 유지',
          '앱 종료 시점의 초당 골드·경험치 수입을 저장해 복귀 시점에 오프라인 보상을 계산하고, 현재 스탯으로 재계산해 보상이 부풀거나 줄어드는 문제를 방지',
          'OnApplicationPause / Focus / Quit 모두에서 저장을 호출해 모바일 실제 종료 경로를 커버',
          '# 6. 에디터 툴링과 검증',
          'OnikiriTestPanel에서 공격속도 실측, FPS, 오디오 출력, 풀 증식, 스테이지 점프, 보스 도전, 방치 보상 조작, 스크린샷 캡처를 한 곳에서 확인',
          'BattleContentBuilder, BossConfigBuilder, RegionBackgroundBuilder 등 빌더 스크립트로 UI/전투/배경/보스 데이터를 재생성하고 검증 가능한 구조로 관리',
          'EditMode 761개·PlayMode 30개 최근 전량 실행으로 곡선 밴드, 저장 마이그레이션, BigDouble 정확도, Pixel Perfect 레이아웃, 전투 상태 기계를 자동 검증',
          '# 7. 15종 스킬과 이중 천장 가챠',
          '기존 8종에 신규 7종을 더하고 검식·혈식·귀오의 계열 탭, 고유 VFX와 아이콘, 장착·강화 흐름을 하나의 로스터로 구성',
          '★4 소프트 천장 30회, ★5 하드 천장 100회, 온보딩 무료 10연을 구현하고 SaveData v20 마이그레이션으로 기존 플레이어의 진행을 보존',
          'SkillGachaPityModel에서 천장 카운터의 과도기 분포와 장기 정상해를 분리해 실제 뽑기와 확률 안내, 경제 시뮬레이션이 같은 모델을 사용하도록 설계',
          '# 8. Firebase 계정과 리더보드',
          'Firestore에 최고 도달층을 높을 때만 제출하고 상위 100명·내 순위·닉네임을 조회하며, 오프라인 write는 로컬 큐에 남겨 재연결 시 전송',
          '익명 계정에 Google 계정을 연결하거나 기존 계정으로 복구하고, 로컬·버려질 익명 문서·복구 문서의 최고 기록을 병합해 진행 손실 방지',
          'Android Credential Manager를 호출하는 얇은 Java 플러그인과 C# 공급자 인터페이스를 분리해 네이티브 인증과 게임의 계정 정책을 독립적으로 테스트',
          '# 9. 귀문 승급 게이트',
          '6개 전직 티어를 재화 구매가 아닌 귀문 3연전 돌파 보상으로 재설계하고, SaveData v21에서 기존 티어의 의미를 안전하게 이관',
          '입장 시점 화력을 한 번만 읽어 과화력 소프트캡을 적용하고, 격노·폐쇄·무보상·무료 재도전 계약을 일반 보스전과 분리',
          'Android 실기에서 중복 화면 개방과 폰트 글리프 누락을 찾아 수정하고, 승리·실패·폐쇄·재도전과 일반 전투 회귀를 PlayMode로 검증',
        ],
      },
      {
        key: 'detail',
        label: '시스템 상세',
        kind: 'bullets',
        items: [
          '# BigDouble과 포맷터',
          'BigDouble은 1 <= |mantissa| < 10 형태로 값을 정규화하고 exponent를 long으로 보관해 방치형 특유의 매우 큰 수를 다룸',
          '큰 값에 작은 값을 더할 때 유효 자릿수 밖의 항은 흡수되도록 처리해 double 정밀도 한계를 게임 장르에 맞게 수용',
          'Pow는 비용 곡선의 hot path이므로 작은 값은 Math.Pow 빠른 경로를 사용하고, 큰 값은 log10 기반 계산으로 확장',
          '# 세이브 안정성',
          'SaveSystem은 Application.persistentDataPath에 JSON 파일을 저장하고, 저장 시 temp 파일을 먼저 쓴 뒤 기존 파일과 교체',
          '로드 시 파일이 없거나 손상됐거나 미래 버전이면 예외를 밖으로 던지지 않고 새 게임 데이터로 복구',
          'GameSession은 레벨 → 강화 → 스킬 → 장비 → 전직 → 동료 → 퀘스트 순서로 복원해, 서로의 배수를 읽는 시스템이 초기값을 잠깐 적용하는 문제를 줄임',
          '# 보스전 상태 기계',
          'BossFight는 보스 도전 가능 여부를 StageProgress의 할당량과 최전선 여부로 제한해 이미 클리어한 스테이지에서 보스 보상을 반복 수급하는 문제를 차단',
          'Approaching 상태를 별도로 둬 보스 워크인과 실제 제한 시간을 분리하고, 접근 실패 시 안전 타임아웃으로 Fighting 상태에 합류',
          '보스 클리어 보너스는 처치 골드와 분리해 스테이지를 넘은 보상으로 지급하고, 골드 획득 축 배수가 동일하게 적용되도록 처리',
          '# 성장 밸런스와 테스트',
          'StageSimulation은 보고서용 일회성 계산이 아니라 런타임과 테스트가 공유하는 모델로 유지',
          '구매 정책 비교군을 두어 특정 축을 샀을 때 실제 진행이 빨라지는지, 안 사면 손해인지, 축 자체가 게임에 가치를 더하는지 분리해 검증',
          '온보딩 잡몹 체력 완화, 비용 정수화, 치명타 Lv.1000, 심화 축 같은 변경은 보고서와 테스트 기준을 함께 갱신해 의도한 밴드를 벗어나지 않도록 관리',
          '# 가챠 확률 모델',
          'SkillGachaPityModel은 저장된 두 천장 카운터를 상태로 삼아 매 회차의 과도기 확률을 전개하고, SolveSteady에서 장기 실효 확률과 기대 XP를 계산',
          '하드 천장을 끈 비교군이 기존 단일 천장 닫힌 식을 재현하는지 검사해, 신규 모델이 기존 확률 사다리를 조용히 바꾸지 않도록 고정',
          '# Firebase 계정 / 랭킹',
          'LeaderboardPolicy와 AccountLinkPolicy를 Firebase 타입이 없는 순수 규칙으로 분리해 최고 기록 제출, 복구 허용 오류, 기록 병합을 EditMode에서 검증',
          'CloudScores는 Firebase 초기화·인증·IO마다 타임아웃을 두고, 서버 조회와 캐시를 구분해 네트워크 실패가 게임 루프를 멈추지 않도록 처리',
          '# 귀문 전투 계약',
          'TrialDamageScale은 입장 화력 기준 배율을 한 번만 만들고 모든 피해 출처가 정확히 한 번 적용하도록 장부를 남겨 이중 보정과 누락을 검사',
          'PlayMode에서 3연전 전환, 공격 간격, 격노 누적, 폐쇄, 무보상, 비활성화 복구, 일반 보스 회귀를 실제 씬 배선과 함께 검증',
        ],
      },
      {
        key: 'trouble',
        label: '트러블슈팅 / 설계 고민',
        kind: 'bullets',
        items: [
          '# 1. 공격속도 스탯과 실제 타격 횟수가 어긋나는 문제',
          '문제 — 스윙 상태 기계가 끝나야 다음 공격이 시작되는 구조에서는 공격 하나가 정수 프레임에 묶여 실제 공격 횟수가 설정값의 70~85% 수준에 머물 수 있었습니다.',
          '해결 — 데미지는 누적 타이머가 결정하고 애니메이션은 impactPoint만큼 먼저 재생되는 장식 레이어로 분리했습니다.',
          '결과 — 공격속도 강화가 실제 DPS와 더 잘 맞고, 프레임 경계 때문에 스탯 신뢰도가 깨지는 문제를 줄였습니다.',
          '# 2. 방치형 수치가 long 범위를 초과하는 문제',
          '문제 — 골드와 데미지는 장시간 플레이 시 long/double 기반 일반 수치 체계로는 표현과 비교가 불안정해질 수 있습니다.',
          '해결 — 프로젝트 초기에 BigDouble을 도입하고 저장, 포맷, 비용 계산, 테스트까지 같은 타입을 사용하도록 통일했습니다.',
          '결과 — 성장 축이 수천 레벨로 확장되어도 값 표현과 UI 표기, 세이브 왕복이 안정적으로 유지됩니다.',
          '# 3. 오프라인 보상 계산이 현재 스탯으로 부풀 수 있는 문제',
          '문제 — 복귀 시점의 현재 스탯으로 초당 수입을 다시 계산하면, 자리를 비운 동안 실제로 벌던 수입보다 보상이 과대/과소 지급될 수 있습니다.',
          '해결 — 종료 시점의 goldPerSecond와 expPerSecond를 세이브에 저장하고, 복귀 시 해당 값을 기준으로 방치 보상을 계산했습니다.',
          '결과 — 오프라인 보상이 플레이 중 파밍의 축소판으로 유지되고, 성장 순서에 따라 보상이 왜곡되는 문제를 줄였습니다.',
          '# 4. 보고서 계산과 실제 게임 곡선이 달라지는 문제',
          '문제 — 밸런스 계산을 일회용 스크립트로 작성하면 실제 에셋/곡선/전투 코드와 상수가 어긋나도 바로 드러나지 않습니다.',
          '해결 — StageSimulation을 런타임 코드로 두고, 테스트가 실제 에셋과 곡선이 같은 값을 쓰는지 검사하도록 만들었습니다.',
          '결과 — 보스 여유, 파밍 시간, 죽은 버튼, 성장 축 효율을 수치로 검증하며 밸런스 변경의 부작용을 빠르게 확인할 수 있게 되었습니다.',
          '# 5. 모바일 UI / Safe Area / 세로 화면 대응',
          '문제 — 에디터의 safeArea와 실제 기기 Safe Area가 다르게 나올 수 있고, 9:16~9:21 화면비에서 상단바·하단바·전투 영역이 쉽게 어긋날 수 있습니다.',
          '해결 — 기준 해상도 1080x1920, Pixel Perfect Camera, SafeAreaFitter, GameViewSizes, 빌더 검증을 함께 사용해 화면비별 배치를 확인했습니다.',
          '결과 — 월드는 화면 끝까지 그리고 UI만 Safe Area 안으로 들어오게 하여 검은 띠나 터치 영역 침범을 줄였습니다.',
          '# 6. 가챠 비교군이 10만 회 루프에서 멈추지 않던 문제',
          '문제 — XP를 제거한 비교군에서 스킬 해금까지 건너뛰어 귀오의 재고가 영원히 소진되지 않았고, 종료 조건을 기다리는 시뮬레이션이 Unity를 응답 불가 상태로 만들었습니다.',
          '해결 — 해금은 XP가 아니라 보유 상태라는 계약을 분리하고, 모든 비교군이 동일한 재고 전이를 거치도록 수정했습니다.',
          '결과 — 확률·경제 비교군의 종료가 보장되고, 이중 천장 모델의 정상해와 과도기 검증을 안정적으로 반복할 수 있게 되었습니다.',
          '# 7. 익명 계정 복구에서 진행을 잃을 수 있는 문제',
          '문제 — 인증 실패를 모두 기존 계정 로그인으로 처리하면 일시적인 네트워크 오류에도 현재 익명 uid와 그 진행을 버릴 수 있었습니다.',
          '해결 — credential-already-in-use 계열만 복구로 보내고, uid 교체 전에 로컬·익명 서버·복구 서버의 도달층을 읽어 최댓값으로 병합했습니다.',
          '결과 — 최초 연동은 uid를 유지하고 재설치 복구는 기존 uid로 돌아가면서, 어느 경로에서도 최고 진행이 후퇴하지 않습니다.',
          '# 8. 테스트 실행 순서에 따라 결과가 달라지던 문제',
          '문제 — PlayMode가 남긴 PlayerPrefs 설정을 EditMode 테스트가 읽어, 단독 실행에서는 통과하지만 PlayMode 직후 한 건이 실패했습니다.',
          '해결 — 설정 해석을 입력만 받는 순수 함수로 분리하고 각 테스트가 자신의 상태를 명시적으로 구성하도록 변경했습니다.',
          '결과 — PlayMode 30개 실행 직후 EditMode 761개를 다시 실행해 전량 통과하며 순서 의존성을 제거했습니다.',
        ],
      },
      {
        key: 'summary',
        label: '불릿 포인트',
        kind: 'bullets',
        note: 'ONIKIRI는 자동 전투를 넘어 대형 수치·확률형 성장·세이브·클라우드 계정과 테스트 기반 밸런싱을 하나의 파이프라인으로 연결한 Unity 모바일 시스템 프로젝트입니다.',
        items: [
          '# Unity 6 모바일 세로형 방치 RPG · 확률형 성장 · Firebase · 테스트 기반 밸런싱',
          '가수부/지수부 기반 BigDouble 구현으로 골드, 데미지, 비용, 경험치의 대형 수치 처리',
          '자동 발도 전투, 공격속도 기반 스윙 압축, 히트스톱/흔들림/이펙트 예산 조정으로 후반 타격감 유지',
          '15종 스킬 로스터, ★4 30회/★5 100회 이중 천장, 무료 10연과 마르코프 확률 모델 구현',
          'Firebase Auth/Firestore 기반 최고 도달층 랭킹과 익명→Google 계정 연동·복구·최고 기록 병합 구현',
          'SaveSystem / GameSession 기반 원자적 JSON 저장, v1→v21 마이그레이션, 오프라인 보상 계산 구조 구현',
          '6개 귀문 승급 게이트와 소프트캡·격노·폐쇄·재도전 전투 계약을 상태 기계로 구현',
          '최근 전량 실행 기준 EditMode 761개·PlayMode 30개로 성장 곡선, 세이브, UI 배선, 전투 회귀 검증',
          'OnikiriTestPanel과 Builder 도구로 전투/성장/UI/지역/세이브 상태를 에디터에서 빠르게 재현하고 확인할 수 있는 개발 파이프라인 구축',
        ],
      },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/hwarang98/Onikiri' }],
    media: [
      { label: 'Gameplay', title: '게임 데모 플레이 영상', href: 'https://www.youtube.com/watch?v=G5aKGZsbOEc' },
      { label: 'Gameplay', title: '스킬 VFX 티어 비교', href: '/portfolio-media/onikiri/skill-vfx-tiers.gif', kind: 'image' },
      { label: 'Validation', title: '귀문 승급 전투 UI', href: '/portfolio-media/onikiri/promotion-trial.png', kind: 'image' },
      { label: 'Implementation', title: '스킬 계열 탭', href: '/portfolio-media/onikiri/skill-family-tabs.png', kind: 'image' },
      { label: 'Implementation', title: 'Android 부팅 시퀀스', href: '/portfolio-media/onikiri/boot-sequence-device.gif', kind: 'image' },
    ],
  },
]
