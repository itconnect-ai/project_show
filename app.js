/**
 * ITCONNECT — AI Service Showcase · 슬라이드 엔진
 * 1 서비스 = 2장 구성 (개념·가치 장표 ➔ 대형 실체 캡처 장표)
 * 
 * 포인터 / 클릭 조작 (수강생 화면 전용):
 *   다음: 마우스 좌클릭, →, PageDown, Space, Enter, 마우스 앞으로가기 버튼
 *   이전: 마우스 우클릭, ←, PageUp, Backspace, 마우스 뒤로가기 버튼
 *   화면 가리기: B 또는 .
 *   전체화면: F
 */
(function () {
  'use strict';

  const SLIDES = window.SLIDES || [];
  const stage = document.getElementById('stage');
  const deck = document.getElementById('deck');
  const elNow = document.getElementById('now');
  const elTotal = document.getElementById('total');
  const elBar = document.getElementById('bar');
  const blackout = document.getElementById('blackout');

  const CURTAIN_MS = 1050;
  const ENTER_MS = 2200;

  let current = -1;
  let leavingTimer = null;
  let enteringTimer = null;

  const pad = (n) => String(n).padStart(2, '0');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ------------------------------------------------------------------
     1. 슬라이드 템플릿 렌더링
     ------------------------------------------------------------------ */
  function headlineHtml(lines, d0) {
    return lines.map((l, i) =>
      `<span class="rv" style="--i:${i};--d0:${d0}s"><span>${l}</span></span>`
    ).join('');
  }

  // Cover / Closing
  function renderCover(s, isClosing) {
    const rawServices = window.SERVICES_RAW || [];
    const items = rawServices.map((x, i) =>
      `<div class="cv__item"><span>${pad(i + 1)}</span><b>${esc(x.name)}</b></div>`
    ).join('');

    return `
      <div class="bigword cv__bigword"><div class="px" style="--depth:-18">${esc(s.bigword)}</div></div>
      <div class="cv__eyebrow fx-up" style="--d:.45s"><i class="fx-line" style="--d:.5s"></i>${esc(s.eyebrow)}</div>
      <h2 class="headline cv__headline">${headlineHtml(s.lines, .55)}</h2>
      <p class="desc cv__desc fx-up" style="--d:1.05s">${esc(s.desc)}</p>
      ${isClosing ? '' : `
        <div class="cv__marquee fx-in" style="--d:.9s"><div class="cv__track">${items}${items}</div></div>
        <div class="cv__count fx-up" style="--d:1.2s">${rawServices.length}<small>SERVICES</small></div>
      `}
    `;
  }

  // 1장: Concept & Value (통일된 에디토리얼 디자인)
  function renderConcept(s) {
    const pointsHtml = s.stats
      ? s.stats.map((p, i) => `
          <div class="svc__point fx-up" style="--d:${1.05 + i * .09}s">
            <div class="svc__stat-v">${esc(p.v)}</div>
            <div class="svc__stat-l">${esc(p.l)}</div>
          </div>`).join('')
      : (s.points || []).map((p, i) => `
          <div class="svc__point fx-up" style="--d:${1.05 + i * .09}s">
            <div class="svc__point-k">${esc(p.k)}</div>
            <div class="svc__point-t">${esc(p.t)}</div>
          </div>`).join('');

    return `
      <div class="bigword svc__bigword"><div class="px" style="--depth:-22">${esc(s.bigword || s.name)}</div></div>

      <div class="svc__left">
        <div class="svc__eyebrow fx-up" style="--d:.45s">
          <span class="svc__num">${pad(s.serviceIndex)}</span>
          <span class="svc__rule fx-line" style="--d:.55s"></span>
          <div>
            <div class="svc__name">${esc(s.name)}</div>
            <div class="svc__cat">${esc(s.category)}</div>
          </div>
        </div>
        <h2 class="headline svc__headline">${headlineHtml(s.lines, .58)}</h2>
        <p class="desc svc__desc fx-up" style="--d:.95s">${esc(s.desc)}</p>
      </div>

      <div class="svc__points">${pointsHtml}</div>

      <div class="svc__visual fx-visual" style="--d:.62s">
        <div class="px" style="--depth:14">${renderVisual(s)}</div>
      </div>

      <a class="svc__domain fx-up" style="--d:1.3s" href="https://${esc(s.domain)}" target="_blank" rel="noopener noreferrer" data-nonav>
        <span class="svc__domain-hint">REALITY SHOT →</span>
        <span>${esc(s.domain)}</span>
      </a>
    `;
  }

  // 2장: Production Reality Shot (대형 실제 화면 공개)
  function renderShot(s) {
    const shot = s.shot || {};
    const badgesHtml = (shot.badges || []).map(b => `<span class="shot__badge">${esc(b)}</span>`).join('');
    
    const isMock = Boolean(shot.mockType);
    const canvasInner = isMock
      ? renderMockDashboard(shot.mockType, s)
      : `<img class="shot__img" src="${esc(shot.src)}" alt="${esc(s.name)} 실제 프로덕션 화면" draggable="false">`;

    return `
      <div class="bigword svc__bigword"><div class="px" style="--depth:-22">${esc(s.bigword || s.name)}</div></div>

      <!-- Top Status Bar -->
      <div class="shot__topbar fx-up" style="--d:.4s">
        <div class="shot__eyebrow">
          <span class="shot__live-badge">Live Production Reality</span>
          <div class="shot__service-tag">
            <span>${pad(s.serviceIndex)}</span>${esc(s.name)}
            <small class="shot__category-pill">${esc(s.category)}</small>
          </div>
        </div>
        <a class="shot__domain-link" href="https://${esc(s.domain)}" target="_blank" rel="noopener noreferrer" data-nonav>
          <span>https://${esc(s.domain)}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      </div>

      <!-- Large Center Browser Canvas (1680px) -->
      <div class="shot__viewport fx-visual" style="--d:.55s">
        <div class="shot__frame">
          <div class="shot__bar">
            <div class="shot__dots"><i></i><i></i><i></i></div>
            <div class="shot__url-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>https://${esc(s.domain)}/</span>
            </div>
            <div class="shot__scroll-hint">
              <span class="shot__scroll-dot"></span>
              <span>Auto-Scroll</span>
            </div>
          </div>
          <div class="shot__img-wrap" data-wrap-id="${s.id}">
            <div class="shot__scroll-canvas ${isMock ? 'is-mock' : 'is-img'}">
              ${canvasInner}
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Specs Bar -->
      <div class="shot__footer fx-up" style="--d:.95s">
        <div class="shot__footer-info">
          <h3 class="shot__footer-headline">${esc(shot.headline || '실제 운영 중인 서비스 프로덕션')}</h3>
          <p class="shot__footer-subtext">${esc(shot.subtext || '')}</p>
        </div>
        <div class="shot__badges">${badgesHtml}</div>
      </div>
    `;
  }

  // 전문 디자이너급 실전 대시보드 UI 렌더러 (사내 로그인 가림막 완전 대체)
  function renderMockDashboard(type, s) {
    switch (type) {
      case 'startora':
        return `
          <div class="dash dash--startora">
            <div class="dash__nav">
              <div class="dash__brand"><span class="dash__logo-badge s">S</span><b>Startora ERP</b><span class="dash__live-tag">● Hermes Agent Live</span></div>
              <div class="dash__search"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> ⌘K 사규·회의록·근태·결재 검색...</div>
              <div class="dash__user"><span class="dash__avatar">CW</span><span>최원재 대표</span></div>
            </div>
            <div class="dash__body">
              <div class="dash__side">
                <div class="dash__menu is-act"><i class="dash__menu-icon">📊</i>경영 대시보드</div>
                <div class="dash__menu"><i class="dash__menu-icon">💬</i>Hermes AI 대화</div>
                <div class="dash__menu"><i class="dash__menu-icon">📝</i>전자결재 <span class="dash__chip">2</span></div>
                <div class="dash__menu"><i class="dash__menu-icon">🎙️</i>회의록 STT 요약</div>
                <div class="dash__menu"><i class="dash__menu-icon">📚</i>사내 지식베이스</div>
                <div class="dash__menu"><i class="dash__menu-icon">💼</i>근태·연차 관리</div>
              </div>
              <div class="dash__main">
                <div class="dash__kpis">
                  <div class="dash__kpi"><span>사내 에이전트 가동</span><b>4대</b><small>Hermes 1.2 / Whisper STT</small></div>
                  <div class="dash__kpi"><span>금일 처리 업무</span><b>148건</b><small>전주 대비 +24%</small></div>
                  <div class="dash__kpi"><span>사규 검색 정확도</span><b>99.4%</b><small>RAG 벡터 임베딩</small></div>
                  <div class="dash__kpi"><span>절감된 반복 공수</span><b>18.5h</b><small>금일 전사 기준</small></div>
                </div>
                <div class="dash__card">
                  <div class="dash__card-h">
                    <div class="dash__card-title"><b>Hermes AI Agent 실시간 업무 오케스트레이션</b></div>
                    <span class="dash__status-tag live">LIVE STREAM</span>
                  </div>
                  <div class="dash__chat-stream">
                    <div class="dash__c-bubble u">
                      <div class="dash__c-meta">최원재 대표 <time>10:24</time></div>
                      <p>경영전략회의 녹음 파일 텍스트 변환하고 팀장별 액션 아이템만 뽑아서 슬랙으로 공유해 줘</p>
                    </div>
                    <div class="dash__c-bubble b">
                      <div class="dash__c-meta">Hermes STT & RAG Agent <time>10:25</time></div>
                      <p>음성 녹음 파일(48분 12초) 변환을 완료했습니다. 핵심 안건 3건과 팀장별 할 일 7건을 추출하여 <strong>#management-notice</strong> 채널로 전송했습니다.</p>
                      <div class="dash__tasks">
                        <div class="dash__task-item">✓ 개발팀: 3분기 API 인프라 증설 품의서 작성</div>
                        <div class="dash__task-item">✓ 마케팅팀: 랜딩메이커 CVR A/B 테스트 지표 취합</div>
                        <div class="dash__task-item">✓ 경영지원: 2분기 부가세 신고 자료 마감</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

      case 'axio':
        return `
          <div class="dash dash--axio">
            <div class="dash__nav">
              <div class="dash__brand"><span class="dash__logo-badge a">A</span><b>Axio AX Consulting</b><span class="dash__live-tag">● Project Active</span></div>
              <div class="dash__proj-info">고객사: <strong>A-Mobility</strong> (물류 CS 병목 진단 및 AX 전환 파이프라인)</div>
              <div class="dash__user"><span class="dash__avatar">AX</span><span>Lead Consultant</span></div>
            </div>
            <div class="dash__steps-bar">
              <div class="dash__step is-done"><span>01</span>병목 업무 인터뷰 발굴</div>
              <div class="dash__step is-done"><span>02</span>가치 검증 & ROI 산출</div>
              <div class="dash__step is-now"><span>03</span>PRD·TRD 산출물 자동 생성</div>
              <div class="dash__step"><span>04</span>임직원 AX 역량 이관</div>
            </div>
            <div class="dash__body">
              <div class="dash__grid-2">
                <div class="dash__card">
                  <div class="dash__card-h"><b>AI 코파일럿 컨설팅 대화 캔버스</b><span class="dash__status-tag">INTERVIEW</span></div>
                  <div class="dash__chat-stream">
                    <div class="dash__c-bubble u">
                      <div class="dash__c-meta">AX 컨설턴트</div>
                      <p>월 12,000건의 반품/환불 인입 중 단순 규정 질의를 자동화할 때의 3단계 폴백 구조와 예외 시나리오는?</p>
                    </div>
                    <div class="dash__c-bubble b">
                      <div class="dash__c-meta">Axio AX Architecture Engine</div>
                      <p>반품 정책 매트릭스 14종을 벡터화하여 1차 RAG 응답을 생성하고, 신선식품 파손 건에 한해 상담원 핫라인으로 에스컬레이션하는 3단계 폴백 구조를 권장합니다. 산출물 PRD 3.2절에 자동 반영했습니다.</p>
                    </div>
                  </div>
                </div>
                <div class="dash__card">
                  <div class="dash__card-h"><b>실시간 생성 문서 뷰어 : PRD v1.4</b><span class="dash__status-tag">DOC PREVIEW</span></div>
                  <div class="dash__doc-content">
                    <h4>3.2 AI 반품 분류 엔진 아키텍처 및 예외 처리 정책</h4>
                    <div class="dash__pipeline-nodes">
                      <span class="node">Inbound Chat</span>➔
                      <span class="node">Intent Classifier (98.2%)</span>➔
                      <span class="node">RAG Policy Engine</span>➔
                      <span class="node act">ERP Webhook</span>
                    </div>
                    <div class="dash__metrics-3">
                      <div><span>연간 반복 절감</span><b>1,420시간</b></div>
                      <div><span>월 절감 비용</span><b>3,400만원</b></div>
                      <div><span>도입 회수 기간</span><b>3.2개월</b></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dash__card" style="margin: 0 24px 24px;">
                <div class="dash__card-h"><b>AX 도입 타당성 및 조직 변화 관리 매트릭스</b><span class="dash__status-tag">FEASIBILITY</span></div>
                <div class="dash__kpis">
                  <div class="dash__kpi"><span>1단계 진단 완료</span><b>14개 부서</b><small>전사 인터뷰 100%</small></div>
                  <div class="dash__kpi"><span>자동화 적격 업무</span><b>32건</b><small>우선순위 1~3등급</small></div>
                  <div class="dash__kpi"><span>예상 생산성 향상</span><b>+340%</b><small>CS 처리 속도 기준</small></div>
                  <div class="dash__kpi"><span>임직원 저항 지수</span><b>12% (낮음)</b><small>코파일럿 보조 방식</small></div>
                </div>
              </div>
            </div>
          </div>`;

      case 'bizplan':
        return `
          <div class="dash dash--bizplan">
            <div class="dash__nav">
              <div class="dash__brand"><span class="dash__logo-badge b">B</span><b>BizPlan Pro</b><span class="dash__live-tag">● PSST Framework</span></div>
              <div class="dash__proj-info">과제: <strong>2026 초기창업패키지 사업계획서</strong> (37페이지 자동 완성)</div>
              <div class="dash__score-pill">통과 확률 94.2% (가점 12점 포함)</div>
            </div>
            <div class="dash__body">
              <div class="dash__side">
                <div class="dash__tree-title">PSST 목차 트리</div>
                <div class="dash__tree-node is-act">1. 창업아이템 개요 및 문제인식 <b>98점</b></div>
                <div class="dash__tree-node">2. 실현가능성 및 기술 차별성 <b>95점</b></div>
                <div class="dash__tree-node">3. 성장전략 및 BM 모델 <b>97점</b></div>
                <div class="dash__tree-node">4. 팀 구성 및 지원금 집행계획 <b>100점</b></div>
              </div>
              <div class="dash__main">
                <div class="dash__paper">
                  <div class="dash__paper-badge">PSST SECTION 1-1. 창업아이템의 개발동기 및 필요성</div>
                  <h3>국내 B2B 생성형 AI 도입 장벽 해소를 위한 원클릭 자동화 솔루션</h3>
                  <p>국내 B2B 생성형 AI 도입률은 12% 수준에 불과하나, 글로벌 시장(48%) 대비 가파른 추격세를 보이고 있음. 특히 실무진의 AI 활용 장벽인 '사내 보안 규정'과 '복잡한 프롬프트 작성'을 원클릭 솔루션으로 해결하는 본 아이템은 연평균 38.6% 성장하는 국내 업무 자동화 시장의 핵심 해자가 됨.</p>
                  <table class="dash__table">
                    <thead><tr><th>비교 항목</th><th>기존 SI 외주 개발</th><th>BizPlan AI 솔루션</th><th>개선 효과</th></tr></thead>
                    <tbody>
                      <tr><td>도입 소요 기간</td><td>4~8주 (SI 수작업)</td><td>즉시 SaaS 클라우드 도입</td><td>95% 기간 단축</td></tr>
                      <tr><td>초기 구축 비용</td><td>5,000만원 이상</td><td>월 구독형 합리적 단가</td><td>초기 비용 장벽 제거</td></tr>
                      <tr><td>보안 규정 준수</td><td>외부 API 전송 우려</td><td>사내 프라이빗 LLM & Zero-Trust</td><td>금융·공공 즉시 적용</td></tr>
                    </tbody>
                  </table>
                  <div class="dash__paper-stats">
                    <div><span>1년차 매출 추정</span><b>8.2억원</b></div>
                    <div><span>2년차 매출 추정</span><b>24.5억원</b></div>
                    <div><span>3년차 매출 추정</span><b>65.0억원</b></div>
                    <div><span>연평균 성장률(CAGR)</span><b>38.6%</b></div>
                  </div>
                </div>
                <div class="dash__card" style="margin-top:16px;">
                  <div class="dash__card-h"><b>중기부 공고 기준 가점 및 결격사유 사전 검증 패널</b><span class="dash__status-tag live">100% PASS</span></div>
                  <div class="dash__audit-list">
                    <div class="dash__audit-item">✓ <strong>공고문 필수 규격 점검</strong>: PSST 양식 분량, 표 서식, 3개년 사업비 편성 한도 위반 0건 확인</div>
                    <div class="dash__audit-item">✓ <strong>가점 항목 12점 확보</strong>: 벤처기업 인증(+3점), 특허 출원 1건(+4점), 청년 고용 창출(+5점)</div>
                    <div class="dash__audit-item">✓ <strong>AI 심사위원 총평</strong>: 문제 정의의 정량적 근거와 BM 지속 가능성이 탁월하여 서면 통과 유력</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

      case 'landing':
        return `
          <div class="dash dash--landing">
            <div class="dash__nav">
              <div class="dash__brand"><span class="dash__logo-badge l">L</span><b>Landing Maker Studio</b><span class="dash__live-tag">● 12 Stages Active</span></div>
              <div class="dash__proj-info">프로젝트: <strong>B2B AI 업무자동화 솔루션 랜딩페이지</strong></div>
              <div class="dash__user"><span class="dash__chip-act">예상 CVR +38.4%</span></div>
            </div>
            <div class="dash__pipeline-scroll">
              <span class="stage done">01 페르소나</span>
              <span class="stage done">02 문제정의</span>
              <span class="stage done">03 헤드카피</span>
              <span class="stage done">04 가치제안</span>
              <span class="stage done">05 피처그리드</span>
              <span class="stage done">06 소셜프루프</span>
              <span class="stage done">07 가격표</span>
              <span class="stage act">08 CTA최적화</span>
            </div>
            <div class="dash__body">
              <div class="dash__grid-2">
                <div class="dash__lp-canvas">
                  <div class="dash__lp-box">
                    <span class="dash__lp-pill">No-Code AI Automation</span>
                    <h2>개발자 없이 3분 만에 완성하는<br>우리 회사 맞춤형 AI 업무 파이프라인</h2>
                    <p>반복적인 엑셀 정리부터 사내 지식 검색까지, 실무자가 직접 대화로 만드는 초고속 업무 자동화</p>
                    <div class="dash__lp-btns">
                      <button class="dash__lp-btn primary">14일 무료 체험 시작</button>
                      <button class="dash__lp-btn secondary">라이브 데모 보기</button>
                    </div>
                  </div>
                </div>
                <div class="dash__card">
                  <div class="dash__card-h"><b>AI 설득 논리 & CVR 예측 진단</b><span class="dash__status-tag">AI ANALYSIS</span></div>
                  <div class="dash__kpis-2">
                    <div class="dash__kpi"><span>예상 전환율 (CVR)</span><b>4.82%</b><small>동종 업계 대비 +62%</small></div>
                    <div class="dash__kpi"><span>스크롤 뎁스 도달률</span><b>84.5%</b><small>이탈률 15% 미만 유지</small></div>
                  </div>
                  <div class="dash__audit-list">
                    <div class="dash__audit-item">✓ 헤드라인에 '3분'이라는 구체적 시간 숫자를 배치하여 진입 장벽 40% 완화</div>
                    <div class="dash__audit-item">✓ 상단 CTA에 '신용카드 불필요' 배지를 부착해 초기 가입 마찰 최소화</div>
                    <div class="dash__audit-item">✓ 12개 스테이지 설득 흐름으로 방문자 체류시간 2.4배 향상</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

      case 'content':
        return `
          <div class="dash dash--content">
            <div class="dash__nav">
              <div class="dash__brand"><span class="dash__logo-badge c">C</span><b>Content Studio</b><span class="dash__live-tag">● Multi-Channel Sync</span></div>
              <div class="dash__proj-info">원소스 기획: <strong>2026 기업용 생성형 AI 도입 실무 성공 가이드</strong></div>
              <div class="dash__score-pill">4개 채널 동시 렌더링 완료</div>
            </div>
            <div class="dash__body">
              <div class="dash__channels-grid">
                <div class="dash__ch-box">
                  <div class="dash__ch-header"><span class="dash__ch-tag naver">BLOG</span><b>3,400자 SEO 전문 아티클</b></div>
                  <h4>[네이버/티스토리] 2026년 기업 AI 도입, 실패하는 회사 vs 성공하는 회사</h4>
                  <p>도구 도입보다 병목 업무 가치 측정이 선행되어야 하는 이유와 사내 보안 프라이빗 LLM 설계 5원칙...</p>
                  <div class="dash__ch-footer"><span>H2/H3 구조화 완료</span><b>SEO 96점</b></div>
                </div>
                <div class="dash__ch-box">
                  <div class="dash__ch-header"><span class="dash__ch-tag insta">INSTA</span><b>8장 카드뉴스 슬라이드</b></div>
                  <h4>[슬라이드 1~8] 비전공자 팀장이 AI로 야근을 없앤 비결</h4>
                  <p>카드 1: 표지 비주얼 훅<br>카드 2~6: 업무 자동화 5단계 워크플로우<br>카드 7~8: 핵심 요약 및 저장 유도</p>
                  <div class="dash__ch-footer"><span>비주얼 프롬프트 생성</span><b>저장율 상위 1%</b></div>
                </div>
                <div class="dash__ch-box">
                  <div class="dash__ch-header"><span class="dash__ch-tag shorts">SHORTS</span><b>58초 유튜브 쇼츠 스크립트</b></div>
                  <h4>[대본 & B-Roll] AI 도입하고 돈만 날린 회사들의 공통점</h4>
                  <p>0~3초: "AI 쓰면 일 줄어든다더니 왜 야근은 그대로일까요?" (극적 대비 영상 연출)<br>3~45초: 핵심 솔루션 제시</p>
                  <div class="dash__ch-footer"><span>Whisper 호흡 최적화</span><b>첫 3초 훅</b></div>
                </div>
                <div class="dash__ch-box">
                  <div class="dash__ch-header"><span class="dash__ch-tag threads">THREADS</span><b>5단 바이럴 스레드 포스트</b></div>
                  <h4>[스레드/링크드인] 회사에 AI 도입할 때 90%가 놓치는 1가지</h4>
                  <p>1/ 챗GPT 유료 계정만 뿌린다고 업무가 바뀌지 않습니다.<br>2/ 진짜 문제는 데이터 파이프라인의 연결입니다...</p>
                  <div class="dash__ch-footer"><span>인게이지먼트 최적화</span><b>리포스트 유도</b></div>
                </div>
              </div>
            </div>
          </div>`;

      case 'growthlab':
        return `
          <div class="dash dash--growth">
            <div class="dash__nav">
              <div class="dash__brand"><span class="dash__logo-badge g">G</span><b>GrowthLab YouTube Analytics</b><span class="dash__live-tag">● Data API v3 Live</span></div>
              <div class="dash__proj-info">분석 채널: <strong>테크 & 비즈니스 인사이트 (구독자 18.4만명)</strong></div>
              <div class="dash__score-pill">이상치(Outlier) 패턴 감지</div>
            </div>
            <div class="dash__body">
              <div class="dash__main">
                <div class="dash__kpis">
                  <div class="dash__kpi"><span>월간 채널 조회수</span><b>2,410,000</b><small>전월 대비 +38.2%</small></div>
                  <div class="dash__kpi"><span>평균 시청 지속시간</span><b>48.6%</b><small>업계 상위 3% 유지</small></div>
                  <div class="dash__kpi"><span>평균 클릭률 (CTR)</span><b>8.4%</b><small>썸네일 A/B 위닝</small></div>
                  <div class="dash__kpi"><span>알고리즘 추천 점유</span><b>78.2%</b><small>탐색 및 피드 노출</small></div>
                </div>
                <div class="dash__card">
                  <div class="dash__card-h"><b>바이럴 이상치(Outlier) 영상 분석 및 AI 성장 인사이트</b><span class="dash__status-tag">RADAR</span></div>
                  <table class="dash__table">
                    <thead><tr><th>영상 제목</th><th>조회수 / 평균비</th><th>시청지속시간</th><th>유입 키워드</th><th>AI 진단 인사이트</th></tr></thead>
                    <tbody>
                      <tr>
                        <td><strong>AI 바이브코딩으로 1인 창업 3일 만에 끝내는 법</strong></td>
                        <td><b style="color:#FF3B2E">148만 (평균 대비 380%)</b></td>
                        <td>54.2%</td>
                        <td>바이브코딩, Cursor, 풀스택</td>
                        <td>개발 비전공자의 '대리 만족'과 '실행 가능성'을 자극한 심리적 위닝 소재</td>
                      </tr>
                      <tr>
                        <td><strong>2026년 사라질 직업 vs 연봉 2배 뛸 사람</strong></td>
                        <td><b>84만 (평균 대비 210%)</b></td>
                        <td>49.8%</td>
                        <td>AI 자동화, 생산성, 미래일자리</td>
                        <td>위기감 유발 훅 ➔ 실질적인 해결책 제시 구조로 알고리즘 지속 추천 획득</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>`;

      case 'geo':
        return `
          <div class="dash dash--geo">
            <div class="dash__nav">
              <div class="dash__brand"><span class="dash__logo-badge geo">G</span><b>GEO Dashboard (AI Search Engine Optimization)</b><span class="dash__live-tag">● Multi-LLM Live</span></div>
              <div class="dash__proj-info">모니터링 브랜드: <strong>(주)아이티커넥트 (ITCONNECT)</strong></div>
              <div class="dash__score-pill">GEO 종합 지수 86.4점</div>
            </div>
            <div class="dash__body">
              <div class="dash__main">
                <div class="dash__kpis">
                  <div class="dash__kpi"><span>ChatGPT (GPT-4o)</span><b>86%</b><small>추천 순위 1위 유지</small></div>
                  <div class="dash__kpi"><span>Perplexity AI</span><b>92%</b><small>출처 링크 4건 인용</small></div>
                  <div class="dash__kpi"><span>Claude 3.5 Sonnet</span><b>78%</b><small>엔지니어링 전문성 평가</small></div>
                  <div class="dash__kpi"><span>Gemini 2.5 Pro</span><b>88%</b><small>지원사업·파트너십 매칭</small></div>
                </div>
                <div class="dash__card">
                  <div class="dash__card-h"><b>생성형 AI 질의 프로빙 및 브랜드 추천 점유율 매트릭스</b><span class="dash__status-tag">PROBING LOG</span></div>
                  <div class="dash__probe-box">
                    <div class="dash__probe-q">질의: <em>"기업 맞춤형 AX 컨설팅과 실무 AI 바이브코딩 교육을 모두 수행하는 국내 대표 기업은?"</em></div>
                    <div class="dash__probe-ans">
                      <span class="dash__engine-tag">Perplexity AI 응답:</span>
                      <p>"...대표적으로 <strong>(주)아이티커넥트(ITCONNECT)</strong>가 손꼽힙니다. 풀무원, 프레인글로벌 등 다수 기업의 AX 컨설팅을 수행하였으며, 사내 독자 개발한 ERP(Startora), 견적기(HOMEPAGE.WORKS), 학습 플랫폼(B-CREATOR) 등 23개 이상의 실전 AI 서비스를 직접 운영하는 실무 중심 기술력을 보유하고 있습니다."</p>
                      <div class="dash__sources">인용 출처: <u>itconnect.dev</u>, <u>b-creator.com</u>, <u>venture-square</u></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

      case 'ads':
        return `
          <div class="dash dash--ads">
            <div class="dash__nav">
              <div class="dash__brand"><span class="dash__logo-badge ad">AD</span><b>광고 관측실 Enterprise</b><span class="dash__live-tag">● Meta & Google Ads Live</span></div>
              <div class="dash__proj-info">추적 중인 경쟁 브랜드: <strong>34개사</strong> | 수집 소재: <strong>1,842건</strong></div>
              <div class="dash__score-pill">위닝 소재 142건 분석 완료</div>
            </div>
            <div class="dash__body">
              <div class="dash__main">
                <div class="dash__grid-2">
                  <div class="dash__ad-card">
                    <div class="dash__ad-header meta">META ADS · 84일 연속 집행 중 (위닝)</div>
                    <h4>"아직도 퇴근 못 하고 엑셀 붙잡고 계신가요?"</h4>
                    <p>단순 데이터 정리에 쓰던 매일 3시간, 파이썬이나 코딩 몰라도 3분 만에 자동화하는 사내 AI 세팅법을 무료로 공개합니다.</p>
                    <div class="dash__ad-meta">
                      <span>추정 ROAS: <b>420%</b></span>
                      <span>첫 3초 훅: <b>문제 대비형 영상</b></span>
                      <span>포맷: <b>9:16 Reels</b></span>
                    </div>
                  </div>
                  <div class="dash__ad-card">
                    <div class="dash__ad-header google">GOOGLE ADS · 62일 연속 집행 중 (위닝)</div>
                    <h4>"우리 회사 맞춤형 AI 도입 견적, 3분이면 나옵니다"</h4>
                    <p>불투명한 외주 견적에 속지 마세요. 원하는 기능만 클릭하면 개발 공수와 정찰제 견적이 실시간으로 계산됩니다.</p>
                    <div class="dash__ad-meta">
                      <span>추정 CVR: <b>5.2%</b></span>
                      <span>키워드: <b>AI 외주 개발, 바이브코딩</b></span>
                      <span>포맷: <b>반응형 검색 광고</b></span>
                    </div>
                  </div>
                </div>
                <div class="dash__card" style="margin-top:16px;">
                  <div class="dash__card-h"><b>AI 크리에이티브 파생 생성기</b><span class="dash__status-tag">AUTO GENERATOR</span></div>
                  <div class="dash__gen-content">
                    <div class="dash__gen-label">위닝 소재 구조 분해 기반 신규 제안 카피:</div>
                    <p>"신입사원 뽑는 데 3개월, AI 어시스턴트 세팅은 오늘 오후 3시 끝납니다. Startora로 사내 사규와 회의록을 대화 하나로 끝내보세요."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

      case 'gov':
        return `
          <div class="dash dash--gov">
            <div class="dash__nav">
              <div class="dash__brand"><span class="dash__logo-badge gov">G</span><b>GovNotice 지능형 정부과제 봇</b><span class="dash__live-tag">● 전국 공고 24h 크롤링</span></div>
              <div class="dash__proj-info">타깃 기업: <strong>(주)아이티커넥트 (3년 미만 벤처인증 기업)</strong></div>
              <div class="dash__score-pill">최고 적합도 98.4% 매칭</div>
            </div>
            <div class="dash__body">
              <div class="dash__grid-2">
                <div class="dash__card">
                  <div class="dash__card-h"><b>맞춤 추천 1순위 지원사업 정밀 진단</b><span class="dash__status-tag">BEST MATCH</span></div>
                  <div class="dash__gov-box">
                    <span class="dash__gov-org">중소벤처기업부 · 2026 디딤돌 R&D 지원사업</span>
                    <h3>2026 창업성장기술개발사업 디딤돌 (빅데이터·인공지능)</h3>
                    <div class="dash__metrics-3">
                      <div><span>지원 규모</span><b>최대 1.5억원</b></div>
                      <div><span>수행 기간</span><b>12개월</b></div>
                      <div><span>접수 마감</span><b style="color:#F4B63C">D-14 (남음)</b></div>
                    </div>
                    <div class="dash__fit-points">
                      <p>✓ <strong>기업 자격 요건</strong>: 창업 3년 이하, 매출 20억 미만 요건 100% 충족</p>
                      <p>✓ <strong>기술 가점 항목</strong>: 생성형 AI 파이프라인 특허 출원 1건 보유로 가점 +2점 확보 가능</p>
                      <p>✓ <strong>청년고용 가점</strong>: 39세 이하 임직원 고용 비율 80% 이상으로 우선 선발 대상</p>
                    </div>
                  </div>
                </div>
                <div class="dash__card">
                  <div class="dash__card-h"><b>RAG 대화형 공고문 원문 질의 패널</b><span class="dash__status-tag">RAG AI Q&A</span></div>
                  <div class="dash__chat-stream">
                    <div class="dash__c-bubble u">
                      <div class="dash__c-meta">대표자 질의</div>
                      <p>연구개발비 항목 중 외부 클라우드 GPU 서버 비용과 데이터 구매 비용을 몇 %까지 편성할 수 있나요?</p>
                    </div>
                    <div class="dash__c-bubble b">
                      <div class="dash__c-meta">GovNotice RAG 엔진</div>
                      <p>공고문 18페이지 '연구비 산정기준'에 의거, <strong>연구장비·재료비 비목</strong>으로 클라우드 GPU 사용료를 총 정부지원금의 최대 40%(약 6,000만원)까지 계상 가능하며, 연구활동비 내 데이터 가공 용역비 편성이 전액 인정됩니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

      case 'info':
        return `
          <div class="dash dash--info">
            <div class="dash__nav">
              <div class="dash__brand"><span class="dash__logo-badge info">I</span><b>AI Information Radar</b><span class="dash__live-tag">● Global Research Radar</span></div>
              <div class="dash__proj-info">수집 소스: <strong>arXiv · GitHub Trending · HackerNews · HuggingFace</strong></div>
              <div class="dash__score-pill">24h 실시간 수집 중</div>
            </div>
            <div class="dash__body">
              <div class="dash__main">
                <div class="dash__card">
                  <div class="dash__card-h"><b>금일 핵심 글로벌 AI 테크 브리핑 & 사내 비즈니스 적용 시사점</b><span class="dash__status-tag">DAILY BRIEF</span></div>
                  <div class="dash__feed-card">
                    <div class="dash__feed-head">
                      <span class="dash__arxiv-badge">arXiv 2603.08412</span>
                      <h4>경량 추론 모델(Small Reasoning Model)의 온디바이스 에이전트 도입 실무 분석</h4>
                      <time>금일 08:30 수집</time>
                    </div>
                    <p>8B 파라미터 미만 모델에서 Multi-Step CoT를 활용해 복잡한 의사결정 추론을 94% 신뢰도로 수행하는 아키텍처 실증 논문.</p>
                    <div class="dash__insight-box">
                      <b>사내 비즈니스 시사점:</b> Startora ERP의 회의록 STT 후처리 엔진을 8B 온프레미스 모델로 대체 시, 월간 클라우드 API 호출 비용 42% 절감 및 데이터 사내 격리 보안 요건 완벽 충족.
                    </div>
                  </div>
                </div>
                <div class="dash__kpis" style="margin-top:16px;">
                  <div class="dash__kpi"><span>수집 논문 및 뉴스</span><b>142편</b><small>금일 24시간 누적</small></div>
                  <div class="dash__kpi"><span>자동 발행 블로그 글</span><b>4편</b><small>SEO 최적화 완료</small></div>
                  <div class="dash__kpi"><span>사내 지식베이스 적재</span><b>28건</b><small>임직원 Q&A 즉시 반영</small></div>
                  <div class="dash__kpi"><span>요약 처리 시간</span><b>1.8초</b><small>자동 파이프라인</small></div>
                </div>
              </div>
            </div>
          </div>`;

      default:
        return `<div style="padding:40px;color:#fff;">대시보드 로딩 중...</div>`;
    }
  }

  // Visual Graphic Generator (No raw screenshots on Concept slides)
  function renderVisual(s) {
    const v = s.visual || {};
    switch (v.type) {
      case 'chat':
        return `
          <div class="v-chat">
            <div class="v-chat__head fx-up" style="--d:.8s"><span class="v-chat__dot">S</span>Startora Assistant</div>
            ${v.messages.map((m, i) => `
              <div class="v-chat__msg ${m.who} fx-up" style="--d:${.95 + i * .22}s">${esc(m.text)}</div>
            `).join('')}
            <span class="v-caption fx-in" style="--d:1.9s">Architecture Concept</span>
          </div>`;

      case 'doc':
        return `
          <div class="v-doc">
            <div class="v-doc__back fx-wipe" style="--d:.7s"></div>
            <div class="float">
              <div class="v-doc__paper">
                <div class="v-doc__kicker">BUSINESS PLAN</div>
                <div class="v-doc__title">${esc(v.title)}</div>
                <div class="v-doc__lines"><i></i><i></i><i></i></div>
                <ul class="v-doc__steps">
                  ${v.steps.map((t, i) => {
                    const now = i === v.steps.length - 1;
                    return `<li class="${now ? 'is-now' : ''} fx-up" style="--d:${1 + i * .1}s">
                      <span class="v-doc__check"></span>${esc(t)}${now ? '<em>IN PROGRESS</em>' : ''}
                    </li>`;
                  }).join('')}
                </ul>
              </div>
            </div>
            <span class="v-caption fx-in" style="--d:1.8s">Process Architecture</span>
          </div>`;

      case 'channels':
        return `
          <div class="v-ch">
            ${v.items.map((c, i) => `
              <div class="v-ch__row fx-up" style="--d:${.8 + i * .12}s">
                <span class="v-ch__k">${pad(i + 1)}</span>
                <span class="v-ch__n">${esc(c.n)}</span>
                <span class="v-ch__d">${esc(c.d)}</span>
              </div>`).join('')}
            <span class="v-caption fx-in" style="--d:1.7s">Multi-Channel Matrix</span>
          </div>`;

      case 'stages': {
        const heights = [34, 42, 38, 52, 48, 60, 58, 72, 64, 80, 88, 100];
        return `
          <div class="v-st">
            <div class="v-st__num fx-up" style="--d:.7s">${v.count}</div>
            <div class="v-st__label fx-up" style="--d:.95s">${esc(v.label)}<small>기획부터 디자인까지 ${v.count}단계</small></div>
            <div class="v-st__bars">
              ${heights.slice(0, v.count).map((h, i) => `<i style="height:${h}%;--i:${i}"></i>`).join('')}
            </div>
            <div class="v-st__ticks fx-in" style="--d:1.4s">
              ${Array.from({ length: v.count }, (_, i) => `<span>${pad(i + 1)}</span>`).join('')}
            </div>
            <span class="v-caption fx-in" style="--d:1.8s">12-Stage Pipeline</span>
          </div>`;
      }

      case 'chart': {
        const vals = [22, 30, 26, 38, 34, 46, 42, 55, 60, 58, 72, 84];
        const W = 840, H = 440, gap = 18;
        const bw = (W - gap * (vals.length - 1)) / vals.length;
        const bars = vals.map((val, i) => {
          const h = (val / 100) * H;
          return `<rect class="v-chart__bar" style="--i:${i}" x="${i * (bw + gap)}" y="${H - h}" width="${bw}" height="${h}" rx="4"/>`;
        }).join('');
        const pts = vals.map((val, i) => [i * (bw + gap) + bw / 2, H - (val / 100) * H - 40]);
        const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
        const last = pts[pts.length - 1];
        return `
          <div class="v-chart">
            <div class="v-chart__panel">
              <div class="v-chart__top fx-up" style="--d:.85s">
                <span class="v-chart__title">Channel Growth Intelligence</span>
                <span class="v-chart__legend"><span>트렌드</span><span>영상 성과</span></span>
              </div>
              <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
                ${bars}
                <path class="v-chart__line" d="${d}"/>
                <circle class="v-chart__dot fx-in" style="--d:2.6s" cx="${last[0]}" cy="${last[1]}" r="10"/>
              </svg>
            </div>
            <span class="v-caption fx-in" style="--d:1.8s">Algorithm Reverse Engineering</span>
          </div>`;
      }

      case 'answer':
        return `
          <div class="v-ans">
            <div class="v-ans__q fx-up" style="--d:.85s">${esc(v.q)}</div>
            <div class="v-ans__card fx-up" style="--d:1.15s">
              <div class="v-ans__label">Generative Engine Answer</div>
              <div class="v-ans__lines">
                <div class="v-ans__line"><i></i></div>
                <div class="v-ans__line"><span class="v-ans__brand">${esc(v.brand)}</span><i></i></div>
                <div class="v-ans__line"><i style="flex:.8"></i></div>
                <div class="v-ans__line"><i style="flex:.55"></i></div>
              </div>
              <div class="v-ans__meter"><span>브랜드 추천 점유율</span><b>측정 및 진단</b></div>
            </div>
            <span class="v-caption fx-in" style="--d:1.9s">GEO Intelligence</span>
          </div>`;

      case 'flow':
        return `
          <div class="v-flow">
            ${v.steps.map((t, i) => `
              ${i ? `<div class="v-flow__arrow fx-in" style="--d:${.95 + i * .2}s"></div>` : ''}
              <div class="v-flow__row fx-up" style="--d:${.8 + i * .2}s">
                <span class="v-flow__k">${pad(i + 1)}</span>
                <span class="v-flow__t">${esc(t)}</span>
              </div>`).join('')}
            <span class="v-caption fx-in" style="--d:1.8s">Automation Architecture</span>
          </div>`;

      default:
        return '';
    }
  }

  // Build All Slides (Total 30)
  function build() {
    deck.innerHTML = SLIDES.map((s, idx) => {
      const t = s.theme;
      const mono = t.ac.toLowerCase() === t.fg.toLowerCase();
      const cls = ['slide', s.kind || 'concept', mono ? 'is-mono' : ''].join(' ');
      let body = '';
      if (s.kind === 'cover') body = renderCover(s, false);
      else if (s.kind === 'closing') body = renderCover(s, true);
      else if (s.kind === 'shot') body = renderShot(s);
      else body = renderConcept(s);

      return `
        <section class="${cls}" data-index="${idx}"
          style="--bg:${t.bg};--fg:${t.fg};--ac:${t.ac};--sub:${t.sub}">
          <div class="slide__inner">${body}</div>
          <div class="slide__flash slide__flash--b"></div>
          <div class="slide__flash slide__flash--a"></div>
        </section>`;
    }).join('');
    elTotal.textContent = pad(SLIDES.length);
  }

  /* ------------------------------------------------------------------
     2. 슬라이드 전환 제어
     ------------------------------------------------------------------ */
  const slideEls = () => deck.children;

  function clearClasses(el, list) { list.forEach((c) => el.classList.remove(c)); }

  function go(target, dir) {
    if (target < 0 || target >= SLIDES.length || target === current) return;
    const els = slideEls();
    const next = els[target];
    const prev = current >= 0 ? els[current] : null;
    dir = dir || (target > current ? 'next' : 'prev');

    clearTimeout(leavingTimer);
    clearTimeout(enteringTimer);
    Array.from(els).forEach((el) => {
      if (el !== next && el !== prev) {
        clearClasses(el, ['is-current', 'is-leaving', 'enter-next', 'enter-prev', 'leave-next', 'leave-prev', 'entering']);
      }
    });

    clearClasses(next, ['is-leaving', 'leave-next', 'leave-prev', 'enter-next', 'enter-prev', 'entering']);
    void next.offsetWidth;
    next.classList.add('is-current', 'entering');
    if (prev) next.classList.add(dir === 'next' ? 'enter-next' : 'enter-prev');

    if (prev) {
      clearClasses(prev, ['is-current', 'enter-next', 'enter-prev', 'entering']);
      prev.classList.add('is-leaving', dir === 'next' ? 'leave-next' : 'leave-prev');
      leavingTimer = setTimeout(() => {
        clearClasses(prev, ['is-leaving', 'leave-next', 'leave-prev']);
        clearClasses(next, ['enter-next', 'enter-prev']);
      }, CURTAIN_MS + 60);
    }
    enteringTimer = setTimeout(() => next.classList.remove('entering'), ENTER_MS);

    current = target;
    applyChrome();
    if (history.replaceState) history.replaceState(null, '', '#' + (current + 1));

    // 슬라이드 전환 시 모든 스크롤 캔버스 초기화
    document.querySelectorAll('.shot__scroll-canvas').forEach(c => {
      c.style.transform = '';
      c.style.animation = '';
      delete c.dataset.manualY;
    });
  }

  function applyChrome() {
    const s = SLIDES[current];
    const t = s.theme;
    document.documentElement.style.setProperty('--page-bg', t.bg);
    stage.style.setProperty('--chrome-fg', t.fg);

    // Indicator label in header
    const chromeLabel = document.querySelector('.chrome__label');
    if (chromeLabel) {
      if (s.kind === 'concept') {
        chromeLabel.textContent = `${s.name} · CONCEPT & VALUE`;
      } else if (s.kind === 'shot') {
        chromeLabel.textContent = `${s.name} · PRODUCTION REALITY`;
      } else if (s.kind === 'cover') {
        chromeLabel.textContent = `ITCONNECT AI SHOWCASE`;
      } else {
        chromeLabel.textContent = `NEXT STEP & ACTION`;
      }
    }

    elNow.textContent = pad(current + 1);
    elBar.style.width = ((current + 1) / SLIDES.length * 100) + '%';
  }

  const next = () => go(current + 1, 'next');
  const prev = () => go(current - 1, 'prev');

  /* ------------------------------------------------------------------
     3. 입력 바인딩 (무선 프리젠터 / 마우스 / 키보드)
     ------------------------------------------------------------------ */
  function bindInput() {
    // 마우스 휠로 브라우저 프레임 내부 수동 스크롤 (강의 중 자유로운 상하 탐색)
    window.addEventListener('wheel', (e) => {
      const wrap = e.target.closest('.shot__img-wrap');
      if (!wrap) return;
      const canvas = wrap.querySelector('.shot__scroll-canvas');
      if (!canvas) return;

      canvas.style.animation = 'none';
      const curY = parseFloat(canvas.dataset.manualY || '0');
      const maxScroll = Math.max(0, canvas.scrollHeight - wrap.clientHeight);
      const nextY = Math.min(0, Math.max(-maxScroll, curY - e.deltaY));
      canvas.style.transform = `translateY(${nextY}px)`;
      canvas.dataset.manualY = nextY;
      e.preventDefault();
    }, { passive: false });

    window.addEventListener('keydown', (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const k = e.key;
      if (blackout.classList.contains('on') && !['b', 'B', '.'].includes(k)) {
        blackout.classList.remove('on');
        e.preventDefault();
        return;
      }
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); next(); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
      else if (k === 'Home') { e.preventDefault(); go(0, 'prev'); }
      else if (k === 'End') { e.preventDefault(); go(SLIDES.length - 1, 'next'); }
      else if (k === 'f' || k === 'F') { toggleFullscreen(); }
      else if (k === 'b' || k === 'B' || k === '.') { blackout.classList.toggle('on'); }
    });

    // 좌클릭: 다음 (외부 링크 제외)
    window.addEventListener('click', (e) => {
      if (e.button !== 0) return;
      if (e.target.closest('[data-nonav]')) return;
      if (blackout.classList.contains('on')) { blackout.classList.remove('on'); return; }
      next();
    });

    // 우클릭: 이전
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (blackout.classList.contains('on')) { blackout.classList.remove('on'); return; }
      prev();
    });

    // 마우스 4/5번 사이드 버튼
    window.addEventListener('mouseup', (e) => {
      if (e.button === 3) { e.preventDefault(); prev(); }
      else if (e.button === 4) { e.preventDefault(); next(); }
    });

    // 터치 스와이프
    let tx = 0;
    window.addEventListener('touchstart', (e) => { tx = e.changedTouches[0].clientX; }, { passive: true });
    window.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
    }, { passive: true });

    // URL Hash 이동
    window.addEventListener('hashchange', () => {
      const n = parseInt(location.hash.slice(1), 10) - 1;
      if (!Number.isNaN(n) && n !== current) go(n);
    });

    // 마우스 패럴랙스 & 커서 자동 숨김
    let hideTimer = null;
    window.addEventListener('mousemove', (e) => {
      const mx = (e.clientX / window.innerWidth - .5) * 2;
      const my = (e.clientY / window.innerHeight - .5) * 2;
      stage.style.setProperty('--mx', mx.toFixed(3));
      stage.style.setProperty('--my', my.toFixed(3));
      document.body.classList.remove('cursor-hidden');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => document.body.classList.add('cursor-hidden'), 1800);
    });
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  }

  function fit() {
    const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = `scale(${s}) translate(-50%, -50%)`;
  }

  function preloadImages() {
    (window.SERVICES_RAW || []).forEach((s) => {
      if (s.shot && s.shot.src) { const img = new Image(); img.src = s.shot.src; }
    });
  }

  build();
  fit();
  window.addEventListener('resize', fit);
  bindInput();
  preloadImages();

  const start = parseInt(location.hash.slice(1), 10) - 1;
  go(!Number.isNaN(start) && start >= 0 && start < SLIDES.length ? start : 0);
})();
