/**
 * ITCONNECT — AI Service Showcase · 슬라이드 엔진
 *
 * 조작 (수강생 화면 전용 · UI 버튼 없음)
 *   다음 : 마우스 클릭, →, ↓, PageDown, Space, Enter, 마우스 '앞으로' 버튼
 *   이전 : 마우스 우클릭, ←, ↑, PageUp, Backspace, 마우스 '뒤로' 버튼
 *   처음/끝 : Home / End
 *   전체화면 : F        화면 가리기 : B 또는 .
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

  const CURTAIN_MS = 1150;
  const ENTER_MS = 2600;

  let current = -1;
  let leavingTimer = null;
  let enteringTimer = null;

  const pad = (n) => String(n).padStart(2, '0');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ------------------------------------------------------------------
     렌더링
     ------------------------------------------------------------------ */
  function headlineHtml(lines, d0) {
    return lines.map((l, i) =>
      `<span class="rv" style="--i:${i};--d0:${d0}s"><span>${l}</span></span>`
    ).join('');
  }

  function renderCover(s, isClosing) {
    const services = SLIDES.filter((x) => !x.kind);
    const items = services.map((x, i) =>
      `<div class="cv__item"><span>${pad(i + 1)}</span><b>${esc(x.name)}</b></div>`
    ).join('');

    return `
      <div class="bigword cv__bigword fx-big"><div class="px" style="--depth:-18">${esc(s.bigword)}</div></div>
      <div class="cv__eyebrow fx-up" style="--d:.45s"><i class="fx-line" style="--d:.5s"></i>${esc(s.eyebrow)}</div>
      <h2 class="headline cv__headline">${headlineHtml(s.lines, .55)}</h2>
      <p class="desc cv__desc fx-up" style="--d:1.05s">${esc(s.desc)}</p>
      ${isClosing ? '' : `
        <div class="cv__marquee fx-in" style="--d:.9s"><div class="cv__track">${items}${items}</div></div>
        <div class="cv__count fx-up" style="--d:1.2s">${services.length}<small>SERVICES</small></div>
      `}
    `;
  }

  function renderService(s, num) {
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
      <div class="bigword svc__bigword fx-big"><div class="px" style="--depth:-22">${esc(s.name)}</div></div>

      <div class="svc__left">
        <div class="svc__eyebrow fx-up" style="--d:.45s">
          <span class="svc__num">${pad(num)}</span>
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
        <span>${esc(s.domain)}</span>
      </a>
    `;
  }

  function renderVisual(s) {
    const v = s.visual || {};
    switch (v.type) {
      case 'shot':
        return `
          <div class="v-shot">
            <div class="v-shot__block fx-wipe" style="--d:.75s"></div>
            <div class="float">
              <div class="v-shot__frame">
                <div class="v-shot__bar"><span class="v-shot__url">${esc(s.domain)}</span></div>
                <img class="v-shot__img" src="${esc(v.src)}" alt="${esc(s.name)} 실제 화면" style="object-position:${v.pos || 'center top'}" draggable="false">
              </div>
            </div>
          </div>`;

      case 'chat':
        return `
          <div class="v-chat">
            <div class="v-chat__head fx-up" style="--d:.8s"><span class="v-chat__dot">S</span>Startora Assistant</div>
            ${v.messages.map((m, i) => `
              <div class="v-chat__msg ${m.who} fx-up" style="--d:${.95 + i * .22}s">${esc(m.text)}</div>
            `).join('')}
            <span class="v-caption fx-in" style="--d:1.9s">Illustration</span>
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
            <span class="v-caption fx-in" style="--d:1.8s">Illustration</span>
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
            <span class="v-caption fx-in" style="--d:1.7s">One topic → Four channels</span>
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
            <span class="v-caption fx-in" style="--d:1.8s">Illustration</span>
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
                <span class="v-chart__title">Channel Growth</span>
                <span class="v-chart__legend"><span>트렌드</span><span>영상 성과</span></span>
              </div>
              <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
                ${bars}
                <path class="v-chart__line" d="${d}"/>
                <circle class="v-chart__dot fx-in" style="--d:2.6s" cx="${last[0]}" cy="${last[1]}" r="10"/>
              </svg>
            </div>
            <span class="v-caption fx-in" style="--d:1.8s">Illustration</span>
          </div>`;
      }

      case 'answer':
        return `
          <div class="v-ans">
            <div class="v-ans__q fx-up" style="--d:.85s">${esc(v.q)}</div>
            <div class="v-ans__card fx-up" style="--d:1.15s">
              <div class="v-ans__label">AI Answer</div>
              <div class="v-ans__lines">
                <div class="v-ans__line"><i></i></div>
                <div class="v-ans__line"><span class="v-ans__brand">${esc(v.brand)}</span><i></i></div>
                <div class="v-ans__line"><i style="flex:.8"></i></div>
                <div class="v-ans__line"><i style="flex:.55"></i></div>
              </div>
              <div class="v-ans__meter"><span>브랜드 언급</span><b>감지됨</b></div>
            </div>
            <span class="v-caption fx-in" style="--d:1.9s">Illustration</span>
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
          </div>`;

      default:
        return '';
    }
  }

  function build() {
    let svcNum = 0;
    deck.innerHTML = SLIDES.map((s, idx) => {
      const t = s.theme;
      const mono = t.ac.toLowerCase() === t.fg.toLowerCase();
      const cls = ['slide', s.kind || 'service', mono ? 'is-mono' : ''].join(' ');
      let body;
      if (s.kind === 'cover') body = renderCover(s, false);
      else if (s.kind === 'closing') body = renderCover(s, true);
      else body = renderService(s, ++svcNum);
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
     전환
     ------------------------------------------------------------------ */
  const slideEls = () => deck.children;

  function clearClasses(el, list) { list.forEach((c) => el.classList.remove(c)); }

  function go(target, dir) {
    if (target < 0 || target >= SLIDES.length || target === current) return;
    const els = slideEls();
    const next = els[target];
    const prev = current >= 0 ? els[current] : null;
    dir = dir || (target > current ? 'next' : 'prev');

    // 이전 전환이 진행 중이면 즉시 정리
    clearTimeout(leavingTimer);
    clearTimeout(enteringTimer);
    Array.from(els).forEach((el) => {
      if (el !== next && el !== prev) {
        clearClasses(el, ['is-current', 'is-leaving', 'enter-next', 'enter-prev', 'leave-next', 'leave-prev', 'entering']);
      }
    });

    // 진입 슬라이드: 애니메이션 재시작
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
    enteringTimer = setTimeout(() => next.classList.remove('entering'), ENTER_MS + 400);

    current = target;
    applyChrome();
    if (history.replaceState) history.replaceState(null, '', '#' + (current + 1));
  }

  function applyChrome() {
    const t = SLIDES[current].theme;
    document.documentElement.style.setProperty('--page-bg', t.bg);
    stage.style.setProperty('--chrome-fg', t.fg);
    elNow.textContent = pad(current + 1);
    elBar.style.width = ((current + 1) / SLIDES.length * 100) + '%';
  }

  const next = () => go(current + 1, 'next');
  const prev = () => go(current - 1, 'prev');

  /* ------------------------------------------------------------------
     입력 (프레젠터 · 마우스 · 키보드)
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

    // 좌클릭: 다음 (링크 제외)
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

    // 마우스 사이드 버튼 (뒤로 / 앞으로)
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

    // 주소창 #번호로 직접 이동
    window.addEventListener('hashchange', () => {
      const n = parseInt(location.hash.slice(1), 10) - 1;
      if (!Number.isNaN(n) && n !== current) go(n);
    });

    // 마우스 패럴랙스 + 커서 자동 숨김
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

  /* ------------------------------------------------------------------
     1920×1080 캔버스 스케일
     ------------------------------------------------------------------ */
  function fit() {
    const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = `scale(${s}) translate(-50%, -50%)`;
  }

  /* ------------------------------------------------------------------
     시작
     ------------------------------------------------------------------ */
  function preloadImages() {
    SLIDES.forEach((s) => {
      if (s.visual && s.visual.src) { const img = new Image(); img.src = s.visual.src; }
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
