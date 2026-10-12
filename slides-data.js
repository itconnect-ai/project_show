/**
 * ITCONNECT — AI Service Showcase · 슬라이드 데이터
 * 
 * 1 서비스 = 2장 구성:
 *   [1장 Concept] : 스크린샷 없는 100% 통일된 에디토리얼 디자인 (개념·가치·프로세스)
 *   [2장 Reality] : 대형 브라우저 프레임의 실제 서비스 운영 화면 (실체·증거·스펙)
 *
 * 배경 큰 글자는 별도 딜레이 없이 슬라이드 전환과 100% 동기화되어 깔끔하게 이동합니다.
 */

window.SERVICES_RAW = [
  // 01. Startora
  {
    id: 'startora',
    name: 'Startora',
    category: 'AI Agent 경영관리 플랫폼',
    domain: 'startora.net',
    theme: { bg: '#0F241E', fg: '#ECE6D8', ac: '#C9F25B', sub: '#183A30' },
    lines: ['챗 하나로', '회사 업무가', '<mark>돌아갑니다.</mark>'],
    desc: '지식베이스 검색, 문서·양식 생성, 일정·재무 업무를 대화 하나로 처리하는 사내 AI 어시스턴트입니다.',
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
    },
    shot: {
      mockType: 'startora',
      src: 'assets/shots/startora.png',
      headline: '사내 전 직원이 매일 접속하는 실전 ERP',
      subtext: '회의록 STT 요약, 사규 검색, 연차 신청 및 재무 결재가 하나의 시스템에서 작동합니다.',
      badges: ['자체 Bearer 토큰 인증', 'Polyglot Monorepo', 'Hermes Agent 연동']
    }
  },

  // 02. Axio
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
    visual: {
      type: 'flow',
      steps: ['병목 업무 발굴', '산출물 자동 생성', '의사결정 시각화']
    },
    shot: {
      mockType: 'axio',
      src: 'assets/shots/consulting.png',
      headline: '실제 기업 고객 진단에 투입되는 컨설팅 시스템',
      subtext: '기업의 현업 프로세스를 인터뷰하고, AI가 우선순위와 도입 타당성 문서를 실시간 도출합니다.',
      badges: ['AX 성숙도 진단 모델', '경영진 보고서 빌더', 'PRD·FRD 자동 출력']
    }
  },

  // 03. BizPlan
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
    },
    shot: {
      mockType: 'bizplan',
      src: 'assets/shots/bizplan.png',
      headline: '중기부·창진원 표준 PSST 사업계획서 빌더',
      subtext: '정부과제 공고문 분석부터 3개년 추정 손익계산서까지 체계적으로 검토하고 관리합니다.',
      badges: ['표준 PSST 프레임워크', 'RAG 팩트 주입기', '3개년 재무 추정 수식']
    }
  },

  // 04. HOMEPAGE.WORKS
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
    visual: {
      type: 'channels',
      items: [
        { n: 'Select', d: '만들고 싶은 기능 선택' },
        { n: 'Estimate', d: '단가·일정 실시간 확인' },
        { n: 'Document', d: '요구사항 정의서 즉시 생성' },
        { n: 'Build', d: 'AI 바이브코딩 기반 납품' }
      ]
    },
    shot: {
      src: 'assets/shots/homepage.png',
      headline: '불투명한 외주 견적을 투명하게 바꾼 3분 견적기',
      subtext: '기능별 복잡도와 공수를 실시간 산출하여 고객이 납득할 수 있는 정찰제 기준을 제시합니다.',
      badges: ['3분 기능 선택 UI', '기존 외주 대비 40~60% 절감', '소스코드 100% 인도']
    }
  },

  // 05. Content Studio
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
    },
    shot: {
      mockType: 'content',
      src: 'assets/shots/content.png',
      headline: '사내 마케팅 콘텐츠 멀티채널 생성 파이프라인',
      subtext: '등록된 Google 계정 워크스페이스를 통해 사내 고유 문체와 키워드를 유지하며 동시 발행합니다.',
      badges: ['Google OAuth 인증', '채널별 퓨샷 프롬프트', '로컬 워크스페이스 연동']
    }
  },

  // 06. Landing Maker
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
    visual: { type: 'stages', count: 12, label: 'AI Pipeline Studio' },
    shot: {
      mockType: 'landing',
      src: 'assets/shots/landing.png',
      headline: '12단계 AI 파이프라인 기반 상세페이지 스튜디오',
      subtext: '제품과 타깃을 입력하면 설득 구조에 맞춘 카피라이팅과 섹션 디자인을 자동 완성합니다.',
      badges: ['12-Stage AI Pipeline', '고전환 설득 카피 엔진', '실시간 미리보기']
    }
  },

  // 07. GrowthLab
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
    visual: { type: 'chart' },
    shot: {
      mockType: 'growthlab',
      src: 'assets/shots/keypaper.png',
      headline: '유튜브 알고리즘 데이터 수집 & AI 성장 분석기',
      subtext: '경쟁 채널 및 바이럴 영상의 이상치(Outlier) 패턴을 수집해 기획 단계에서 알고리즘을 공략합니다.',
      badges: ['YouTube Data API v3', '키워드·트렌드 클러스터링', '역할별 맞춤 관리자']
    }
  },

  // 08. GEO Dashboard
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
    },
    shot: {
      mockType: 'geo',
      src: 'assets/shots/geo.png',
      headline: 'ChatGPT·Perplexity 시대의 검색 최적화 진단',
      subtext: '전통 검색을 넘어 생성형 AI 답변에서 자사 브랜드의 추천 점유율과 인용 출처를 실시간 추적합니다.',
      badges: ['Multi-LLM 질의 프로빙', '인용 출처(Citation) 역추적', 'GEO 점유율 지수화']
    }
  },

  // 09. 광고 관측실
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
    visual: { type: 'flow', steps: ['여러 플랫폼', '자동 수집', '한곳에서 관측'] },
    shot: {
      mockType: 'ads',
      src: 'assets/shots/ads.png',
      headline: '경쟁사 승리 소재와 광고 트렌드 실시간 트래커',
      subtext: '메타·구글 광고 라이브러리 데이터를 수집하여 오래 유지되는 고수익 광고 소재를 분석합니다.',
      badges: ['Cloudflare Zero-Trust 보호', '광고 수명(Runtime) 분석', '멀티 플랫폼 자동 집계']
    }
  },

  // 10. GovNotice
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
    visual: { type: 'flow', steps: ['전체 공고', '조건 선별', '맞춤 알림'] },
    shot: {
      mockType: 'gov',
      src: 'assets/shots/gov.png',
      headline: '전국 공고를 24시간 감시하는 지능형 지원사업 봇',
      subtext: '중기부·창진원·지자체 공고 중 자사 요건에 부합하는 공고만 3줄 요약하여 사내에 전달합니다.',
      badges: ['전국 공고 실시간 파싱', '기업 자격 요건 자동 필터', '디스코드 웹훅 연동']
    }
  },

  // 11. AI Information
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
    visual: { type: 'flow', steps: ['소식 · 논문', 'AI 정리', '블로그 발행'] },
    shot: {
      mockType: 'info',
      src: 'assets/shots/info.png',
      headline: '글로벌 AI 트렌드 수집 및 아티클 자동 생성 허브',
      subtext: 'arXiv 논문과 최신 모델 발표를 분석하여 실무 적용 관점의 기술 블로그 글로 변환합니다.',
      badges: ['글로벌 테크 미디어 크롤링', 'SEO 최적화 아티클 빌더', '사내 지식 브리핑']
    }
  },

  // 12. B-CREATOR
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
    visual: {
      type: 'channels',
      items: [
        { n: 'Learn', d: '단계별 실습 가이드' },
        { n: 'Code', d: 'AI와 함께 실시간 빌드' },
        { n: 'Review', d: '과정 기록 · 피드백' },
        { n: 'Archive', d: '결과물 포트폴리오 완성' }
      ]
    },
    shot: {
      src: 'assets/shots/bcreator.png',
      headline: '비전공자도 하루 만에 앱을 만드는 교육 플랫폼',
      subtext: '실습 환경 세팅 없이 웹 브라우저에서 레슨을 따라가며 결과물을 자신의 포트폴리오로 축적합니다.',
      badges: ['웹 브라우저 즉시 실습', 'AI 튜터 실시간 피드백', '포트폴리오 자동 아카이빙']
    }
  },

  // 13. 내 링크
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
    visual: {
      type: 'channels',
      items: [
        { n: '498 Links', d: '파비콘 내장 인덱스' },
        { n: 'Cmd + K', d: '10ms 즉시 검색' },
        { n: 'Pinned', d: '자주 쓰는 10개 핀' },
        { n: '23 In-House', d: '자사 운영 서비스 모음' }
      ]
    },
    shot: {
      src: 'assets/shots/favorite.png',
      headline: '사내 498개 도구와 23개 운영 사이트 단축키 관문',
      subtext: '흩어진 AI 서비스와 업무 도구를 0.01초 만에 찾아내는 전사 생산성 포털 대시보드입니다.',
      badges: ['Vercel Edge + Supabase', '인메모리 고속 검색', '역할별 분류 대시보드']
    }
  },

  // 14. ITCONNECT
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
    visual: {
      type: 'channels',
      items: [
        { n: 'Diagnose', d: '업무 프로세스 분석' },
        { n: 'Design', d: 'AI 자동화 시스템 설계' },
        { n: 'Educate', d: '임직원 바이브코딩 교육' },
        { n: 'Transfer', d: '사내 자생 운영 이관' }
      ]
    },
    shot: {
      src: 'assets/shots/itconnect.png',
      headline: '대한민국 기업의 AX 실행을 돕는 본사 플랫폼',
      subtext: '1회성 컨설팅이 아닌, 임직원이 직접 자기 업무를 개선할 수 있는 구조와 기술을 내재화합니다.',
      badges: ['청년창업사관학교 15기', '기업부설연구소 인증', '풀무원·프레인글로벌 진행']
    }
  }
];

// ─────────────────────────────────────────────────────────────────
// 슬라이드 배열 자동 생성:
// COVER (1) + [CONCEPT + SHOT] × 14 (28) + CLOSING (1) = 총 30장
// ─────────────────────────────────────────────────────────────────
const SLIDES = [];

// 1. COVER
SLIDES.push({
  kind: 'cover',
  theme: { bg: '#ECE8DF', fg: '#121212', ac: '#FF4A1C', sub: '#DED8CB' },
  eyebrow: 'ITCONNECT — AI Service Showcase',
  lines: ['우리는 AI를', '가르치기 전에,', '<mark>직접 만들어 씁니다.</mark>'],
  desc: 'AI로 직접 기획하고 개발해 매일 업무에 쓰고 있는 서비스 14개를 소개합니다.',
  bigword: 'Built with AI'
});

// 2. 14 Services (2 Slides each: Concept -> Reality Shot)
window.SERVICES_RAW.forEach((svc, index) => {
  const svcNum = index + 1;

  // Slide A: Concept & Value (통일된 에디토리얼 비주얼)
  SLIDES.push({
    kind: 'concept',
    serviceIndex: svcNum,
    id: svc.id,
    name: svc.name,
    category: svc.category,
    domain: svc.domain,
    theme: svc.theme,
    lines: svc.lines,
    desc: svc.desc,
    points: svc.points,
    stats: svc.stats,
    visual: svc.visual,
    bigword: svc.name
  });

  // Slide B: Production Reality Shot (대형 실제 화면)
  SLIDES.push({
    kind: 'shot',
    serviceIndex: svcNum,
    id: svc.id,
    name: svc.name,
    category: svc.category,
    domain: svc.domain,
    theme: svc.theme,
    shot: svc.shot,
    bigword: svc.name
  });
});

// 3. CLOSING
SLIDES.push({
  kind: 'closing',
  theme: { bg: '#FF4A1C', fg: '#140A05', ac: '#140A05', sub: '#E83F12' },
  eyebrow: 'ITCONNECT — itconnect.dev',
  lines: ['오늘 본 모든 것,', '여러분도', '<mark>만들 수 있습니다.</mark>'],
  desc: '이제, 여러분의 업무에서 시작해 보겠습니다.',
  bigword: 'Your turn'
});

window.SLIDES = SLIDES;
