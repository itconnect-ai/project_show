/**
 * ITCONNECT — AI Service Showcase · 슬라이드 데이터
 *
 * ▸ 순서 변경: 배열 안 객체의 위치만 옮기면 됩니다. (번호는 자동 계산)
 * ▸ 모든 문구는 각 서비스의 실제 사이트 문구를 기반으로 작성했습니다.
 *   수치를 추가할 때는 실제 근거가 있는 값만 넣어 주세요.
 *
 * theme : bg(배경) / fg(글자) / ac(포인트) / sub(보조 면)
 * visual.type :
 *   shot     실제 사이트 화면 (assets/shots/*.png)
 *   chat     대화형 일러스트
 *   doc      문서 프로세스 일러스트
 *   channels 채널 타이포그래피
 *   stages   파이프라인 단계 일러스트
 *   chart    데이터 차트 일러스트
 *   answer   AI 답변 일러스트
 *   flow     3단계 흐름 타이포그래피
 */

window.SLIDES = [
  /* ───────────────────────── COVER ───────────────────────── */
  {
    kind: 'cover',
    theme: { bg: '#ECE8DF', fg: '#121212', ac: '#FF4A1C', sub: '#DED8CB' },
    eyebrow: 'ITCONNECT — AI Service Showcase',
    lines: ['우리는 AI를', '가르치기 전에,', '<mark>직접 만들어 씁니다.</mark>'],
    desc: 'AI로 직접 기획하고 개발해 매일 업무에 쓰고 있는 서비스 14개를 소개합니다.',
    bigword: 'Built with AI'
  },

  /* ───────────────────────── SERVICES ───────────────────────── */
  {
    id: 'startora',
    name: 'Startora',
    category: 'AI Agent 경영관리 플랫폼',
    domain: 'startora.net',
    theme: { bg: '#0F241E', fg: '#ECE6D8', ac: '#C9F25B', sub: '#183A30' },
    lines: ['챗 하나로', '회사 업무가', '<mark>돌아갑니다.</mark>'],
    desc: '지식베이스 검색, 문서·양식 생성, 일정·재무 업무를 대화 하나로 처리하는 AI 업무 어시스턴트입니다.',
    points: [
      { k: '01', t: '사내 지식베이스 검색' },
      { k: '02', t: '문서·양식 생성과 결재' },
      { k: '03', t: '인사·재무·회의록 관리' }
    ],
    visual: {
      type: 'chat',
      messages: [
        { who: 'me', text: '이번 주 회의록 요약하고 할 일만 정리해 줘' },
        { who: 'ai', text: '회의 3건을 요약했습니다. 담당자별 할 일 7건을 정리했어요.' },
        { who: 'me', text: '다음 주 수요일 연차 신청서도 올려 줘' },
        { who: 'ai', text: '연차 신청서를 작성해 결재 라인에 올렸습니다.' }
      ]
    }
  },
  {
    id: 'axio',
    name: 'Axio',
    category: '가치 중심 AX 컨설팅 코파일럿',
    domain: 'consulting.itconnect.dev',
    theme: { bg: '#1C35F5', fg: '#F4F2EC', ac: '#FFE24A', sub: '#1529C9' },
    lines: ['AI 도입,', '도구가 아니라', '<mark>가치부터 찾습니다.</mark>'],
    desc: 'AI와 대화하며 병목 업무를 발굴하고 가치를 검증해, 문제 정의부터 평가까지 체계적으로 AX를 수행합니다.',
    points: [
      { k: '01', t: '병목 업무 발굴 · 가치 검증' },
      { k: '02', t: 'PRD·FRD·TRD 산출물 자동 생성' },
      { k: '03', t: '의사결정 과정 기록 · 시각화' }
    ],
    visual: { type: 'shot', src: 'assets/shots/consulting.png', pos: 'left top' }
  },
  {
    id: 'bizplan',
    name: 'BizPlan',
    category: 'AI 사업계획서 작성 서비스',
    domain: 'itconnect.co.kr',
    theme: { bg: '#F0E7D6', fg: '#1B1916', ac: '#D24A2A', sub: '#E3D7C1' },
    lines: ['공고문과', '회사 자료만', '<mark>준비하세요.</mark>'],
    desc: '회사 자료와 공고문을 바탕으로 팩트를 정리하고, AI와 함께 사업계획서를 작성·검토·제출까지 관리합니다.',
    points: [
      { k: '01', t: '회사 자료 기반 팩트 정리' },
      { k: '02', t: 'AI와 함께 작성 · 검토' },
      { k: '03', t: '제출까지 프로세스 관리' }
    ],
    visual: {
      type: 'doc',
      title: '2026 창업지원사업 사업계획서',
      steps: ['공고문 분석', '회사 팩트 정리', '섹션별 초안 작성', 'AI 검토 · 보완', '제출 관리']
    }
  },
  {
    id: 'homepage',
    name: 'HOMEPAGE.WORKS',
    category: 'AI 활용 외주 개발',
    domain: 'homepage.works',
    theme: { bg: '#121412', fg: '#F1F0EA', ac: '#3BE29A', sub: '#1D211E' },
    lines: ['내 서비스,', '얼마면 만들까?', '<mark>3분이면 압니다.</mark>'],
    desc: '만들고 싶은 서비스를 고르면 AI가 필요한 기능을 추천하고, 예상 일정과 견적을 바로 보여 줍니다.',
    stats: [
      { v: '3분', l: 'AI 견적 확인' },
      { v: '4~6주', l: '평균 개발 기간' },
      { v: '40~60%', l: '기존 외주 대비 비용 절감' }
    ],
    visual: { type: 'shot', src: 'assets/shots/homepage.png', pos: 'center top' }
  },
  {
    id: 'content',
    name: 'Content Studio',
    category: 'AI 콘텐츠 생성 서비스',
    domain: 'content.itconnect.dev',
    theme: { bg: '#F3EEE8', fg: '#16131A', ac: '#E5336B', sub: '#E7DFD6' },
    lines: ['주제 하나로', '네 개의 채널을', '<mark>한 번에.</mark>'],
    desc: '하나의 주제로 블로그·쓰레드·인스타그램·페이스북 콘텐츠를 만들고, 검수와 문체 학습까지 이어갑니다.',
    points: [
      { k: '01', t: '4개 채널 동시 생성' },
      { k: '02', t: '채널별 검수' },
      { k: '03', t: '우리 회사 문체 학습' }
    ],
    visual: {
      type: 'channels',
      items: [
        { n: 'Blog', d: '검색에 맞춘 긴 글' },
        { n: 'Threads', d: '짧고 빠른 대화체' },
        { n: 'Instagram', d: '캡션 · 해시태그' },
        { n: 'Facebook', d: '공유형 소식' }
      ]
    }
  },
  {
    id: 'landing',
    name: 'Landing Maker',
    category: 'AI 상세페이지 제작',
    domain: 'landingmaker.biz',
    theme: { bg: '#FF5A2B', fg: '#170C07', ac: '#FFF3E6', sub: '#E84A1D' },
    lines: ['대화로 기획하면', '상세페이지가', '<mark>디자인됩니다.</mark>'],
    desc: 'AI와 대화하며 상세페이지를 기획하고 디자인까지 이어지는, 12단계 AI 파이프라인 스튜디오입니다.',
    points: [
      { k: '01', t: '대화형 기획' },
      { k: '02', t: '12단계 AI 파이프라인' },
      { k: '03', t: '상세페이지 디자인 출력' }
    ],
    visual: { type: 'stages', count: 12, label: 'AI Pipeline Studio' }
  },
  {
    id: 'growthlab',
    name: 'GrowthLab',
    category: 'YouTube 채널 성장 분석',
    domain: 'keypaper.biz',
    theme: { bg: '#0B0B0B', fg: '#F2F0EB', ac: '#FF3B2E', sub: '#1A1A1A' },
    lines: ['유튜브 성장을', '감이 아니라', '<mark>데이터로.</mark>'],
    desc: 'YouTube 채널·영상·키워드·트렌드를 데이터로 수집·분석하고, AI로 성장 인사이트를 뽑아냅니다.',
    points: [
      { k: '01', t: '채널 · 영상 분석' },
      { k: '02', t: '키워드 · 트렌드 수집' },
      { k: '03', t: 'AI 성장 인사이트' }
    ],
    visual: { type: 'chart' }
  },
  {
    id: 'geo',
    name: 'GEO Dashboard',
    category: 'AI 검색 노출 측정',
    domain: 'geo.itconnect.dev',
    theme: { bg: '#DCD5F6', fg: '#16113A', ac: '#4A2BFF', sub: '#CBC2F0' },
    lines: ['AI는 우리 회사를', '추천하고', '<mark>있을까요?</mark>'],
    desc: '생성형 AI 검색의 답변 속에서 우리 브랜드가 얼마나 노출되는지 측정하고 진단하는 GEO·SEO 대시보드입니다.',
    points: [
      { k: '01', t: 'AI 검색 노출 측정' },
      { k: '02', t: 'GEO · SEO 진단' },
      { k: '03', t: '노출 변화 추적' }
    ],
    visual: {
      type: 'answer',
      q: 'AX 컨설팅과 사내 AI 교육을 함께 하는 회사를 알려 줘',
      brand: 'ITCONNECT'
    }
  },
  {
    id: 'ads',
    name: '광고 관측실',
    category: '광고 데이터 수집 플랫폼',
    domain: 'ads.itconnect.dev',
    theme: { bg: '#E9B52E', fg: '#17140C', ac: '#17140C', sub: '#D9A51F' },
    lines: ['흩어진 광고를', '한곳에서', '<mark>관측합니다.</mark>'],
    desc: '여러 플랫폼에 집행되는 광고를 수집해 한곳에 모아 보는 광고 데이터 수집 플랫폼입니다.',
    points: [
      { k: '01', t: '여러 플랫폼 광고 수집' },
      { k: '02', t: '한 화면에서 비교' },
      { k: '03', t: '마케팅 레퍼런스 축적' }
    ],
    visual: { type: 'flow', steps: ['여러 플랫폼', '자동 수집', '한곳에서 관측'] }
  },
  {
    id: 'gov',
    name: 'GovNotice',
    category: '정부지원사업 정보 수집',
    domain: 'gov.itconnect.dev',
    theme: { bg: '#0F2E4C', fg: '#F1ECE1', ac: '#F4B63C', sub: '#163B5F' },
    lines: ['우리 회사에 맞는', '지원사업만', '<mark>골라 옵니다.</mark>'],
    desc: '매일 올라오는 정부지원사업 공고를 수집하고, 우리 회사에 맞는 공고를 골라 알려 줍니다.',
    points: [
      { k: '01', t: '지원사업 공고 자동 수집' },
      { k: '02', t: '우리 회사 기준 선별' },
      { k: '03', t: '메신저 알림' }
    ],
    visual: { type: 'flow', steps: ['전체 공고', '조건 선별', '맞춤 알림'] }
  },
  {
    id: 'info',
    name: 'AI Information',
    category: 'AI 정보 매거진',
    domain: 'info.itconnect.dev',
    theme: { bg: '#191C20', fg: '#EEEDE8', ac: '#7FE0C4', sub: '#23272D' },
    lines: ['AI 소식과 논문이', '매일 블로그 글로', '<mark>바뀝니다.</mark>'],
    desc: 'AI 소식과 논문을 모아 정리하고, 그 내용을 바탕으로 블로그 글을 자동으로 생성합니다.',
    points: [
      { k: '01', t: 'AI 소식 · 논문 수집' },
      { k: '02', t: '핵심 내용 정리' },
      { k: '03', t: '블로그 글 자동 생성' }
    ],
    visual: { type: 'flow', steps: ['소식 · 논문', 'AI 정리', '블로그 발행'] }
  },
  {
    id: 'bcreator',
    name: 'B-CREATOR',
    category: 'AI 바이브코딩 학습 플랫폼',
    domain: 'b-creator.com',
    theme: { bg: '#FFD93B', fg: '#141414', ac: '#141414', sub: '#F0C920' },
    lines: ['배우고, 만들고,', '완성한 것은', '<mark>포트폴리오로.</mark>'],
    desc: '단계별 가이드, 실습 기록, 프로젝트 저장소가 한곳에 정리되는 AI 바이브코딩 전용 학습 플랫폼입니다.',
    points: [
      { k: '01', t: '단계별 레슨 가이드' },
      { k: '02', t: '실습 기록 · 제출 피드백' },
      { k: '03', t: '결과물 포트폴리오화' }
    ],
    visual: { type: 'shot', src: 'assets/shots/bcreator.png', pos: 'center top' }
  },
  {
    id: 'favorite',
    name: '내 링크',
    category: '사내 링크 대시보드',
    domain: 'favorite.itconnect.dev',
    theme: { bg: '#E6E8EB', fg: '#0E1A28', ac: '#0049FF', sub: '#D6DADF' },
    lines: ['자주 쓰는 링크,', '⌘K 한 번이면', '<mark>찾습니다.</mark>'],
    desc: '사내 구성원이 자주 쓰는 AI 도구와 업무 링크를 한곳에서 찾는 대시보드입니다.',
    stats: [
      { v: '498', l: '정리된 링크' },
      { v: '23', l: '직접 운영 중인 서비스' },
      { v: '⌘K', l: '이름·태그·주소 검색' }
    ],
    visual: { type: 'shot', src: 'assets/shots/favorite.png', pos: 'left top' }
  },
  {
    id: 'itconnect',
    name: 'ITCONNECT',
    category: 'AX 컨설팅 · AI 자동화 교육',
    domain: 'itconnect.dev',
    theme: { bg: '#0C0C0C', fg: '#EFEBE3', ac: '#FF4A1C', sub: '#191919' },
    lines: ['직접 만들어 본 팀이', '기업의 AX를', '<mark>함께합니다.</mark>'],
    desc: '업무 진단, AI 자동화 시스템 설계·개발, 임직원 교육과 운영 이관까지 연결해 기업의 AX 실행을 돕습니다.',
    stats: [
      { v: '140→8분', l: '주문·발주 처리 시간 (구축 사례)' },
      { v: '400h+', l: '연간 반복 업무 절감 (구축 사례)' },
      { v: '15기', l: '청년창업사관학교' }
    ],
    visual: { type: 'shot', src: 'assets/shots/itconnect.png', pos: 'center top' }
  },

  /* ───────────────────────── CLOSING ───────────────────────── */
  {
    kind: 'closing',
    theme: { bg: '#FF4A1C', fg: '#140A05', ac: '#140A05', sub: '#E83F12' },
    eyebrow: 'ITCONNECT — itconnect.dev',
    lines: ['오늘 본 모든 것,', '여러분도', '<mark>만들 수 있습니다.</mark>'],
    desc: '이제, 여러분의 업무에서 시작해 보겠습니다.',
    bigword: 'Your turn'
  }
];
