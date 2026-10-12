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
            <div style="width: 52px;"></div>
          </div>
          <div class="shot__img-wrap">
            <img class="shot__img" src="${esc(shot.src)}" alt="${esc(s.name)} 실제 프로덕션 화면" draggable="false">
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
