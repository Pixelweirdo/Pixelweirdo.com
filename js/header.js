// PixelWeirdo — shared header + mobile nav + search
(function () {
  var depth = window.location.pathname.indexOf('/posts/') !== -1 ? '../' : '';
  var path  = window.location.pathname;

  function isActive(page) {
    if (page === 'index.html') return path === '/' || path.endsWith('/index.html') || path.endsWith('/pixelweirdo/') || path.endsWith('/pixelweirdo');
    if (page === 'blog.html')  return path.includes('/blog') || path.includes('/posts/');
    if (page === 'games.html') return path.includes('/games');
    if (page === 'about.html') return path.includes('/about');
    if (page === 'game.html')  return path.includes('/game') && !path.includes('pixeljumper');
    if (page === 'pixeljumper.html') return path.includes('pixeljumper');
    return false;
  }
  function navLink(page, label, extraClass) {
    var cls = 'nav-link' + (isActive(page) ? ' active' : '') + (extraClass ? ' ' + extraClass : '');
    return '<a href="' + depth + page + '" class="' + cls + '">' + label + '</a>';
  }

  // ── Search index ──────────────────────────────────────────
  var POSTS = [
    { title: 'Seek Strength… The Rest Will Follow',       slug: 'dark-souls',        cat: 'Life Lessons',    excerpt: 'Dark Souls III is brutal, beautiful, and secretly one of the best arguments for asking for help.' },
    { title: "Here's to a New Home and a Broken Back",    slug: 'moving-out',        cat: 'Life Lessons',    excerpt: 'Moving is terrible. Moving Out is a game about moving. One of these is fun.' },
    { title: "What's for Dinner?",                        slug: 'overcooked',        cat: 'Life Lessons',    excerpt: 'Cooking together is a relationship test, a bonding exercise, and occasionally a kitchen fire.' },
    { title: 'A Strong, Independent Princess',            slug: 'princess-peach',    cat: 'Life Lessons',    excerpt: 'Princess Peach started as a damsel. Forty years later she saves Mario.' },
    { title: 'Just One More Level',                       slug: 'world-of-warcraft', cat: 'Skills & Science',excerpt: "World of Warcraft is engineered to keep you playing. Here's the neuroscience of why." },
    { title: 'If Ethics Become Optional',                 slug: 'last-of-us',        cat: 'Life Lessons',    excerpt: 'What actually holds people to their values — genuine ethics or just consequences?' },
    { title: 'The Struggles of a Sim',                    slug: 'the-sims',          cat: 'Life Lessons',    excerpt: "My mum introduced me to The Sims. Now I'm in my thirties and the game is disturbingly accurate." },
    { title: 'A Perfectionist Bandicoot',                 slug: 'crash-bandicoot',   cat: 'Skills & Science',excerpt: "I traced my perfectionism to its source. It's a mutated orange marsupial." },
    { title: "Gotta Catch 'Em All",                       slug: 'pokemon',           cat: 'Skills & Science',excerpt: 'Pokémon Red was my first obsession — and a masterclass in motivation science.' },
    { title: "The Dragonborn's Guide to Graphics",        slug: 'skyrim',            cat: 'Graphics & Tech', excerpt: 'Skyrim is fifteen years old and still looks good. Here is the technical wizardry behind why.' },
    { title: 'To Be Good or Not to Be Good…',            slug: 'fallout-3',         cat: 'Life Lessons',    excerpt: "Fallout 3's karma system asks who you actually are when consequences disappear." },
    { title: 'The Dark That Teaches',                     slug: 'amnesia',           cat: 'Life Lessons',    excerpt: 'Amnesia: The Dark Descent is a horror game that says something real about fear and avoidance.' },
    { title: 'One More Day',                              slug: 'stardew-valley',    cat: 'Life Lessons',    excerpt: 'Stardew Valley is a game about a farm. It is also a game about burnout.' },
    { title: 'The God Who Kept Dying',                    slug: 'hades',             cat: 'Skills & Science',excerpt: 'Hades is the best game about failure ever made. Psychologists are taking notes.' },
    { title: 'For the Love of the Game',                  slug: 'undertale',         cat: 'Life Lessons',    excerpt: 'Undertale breaks the fourth wall and asks whether you are actually a good person.' },
    { title: 'Boost, Rotate, Score',                      slug: 'rocket-league',     cat: 'Skills & Science',excerpt: 'Rocket League is a sport. A genuinely, measurably skill-based sport.' },
  ];

  // Expose count globally so pages can show dynamic totals
  window.PWLEVELS = POSTS.length;

  // ── Render ─────────────────────────────────────────────────
  document.write(
    '<div class="top-bar"><div class="top-bar-inner">' +
    '★ NEW: Seek Strength — Dark Souls &amp; asking for help &nbsp;·&nbsp; ' +
    '★ Just One More Level — WoW addiction science &nbsp;·&nbsp; ' +
    '★ Become a Patron for exclusive content &nbsp;·&nbsp; ' +
    '★ pixelweirdo.com &nbsp;&nbsp;&nbsp;&nbsp;' +
    '★ NEW: Seek Strength — Dark Souls &amp; asking for help &nbsp;·&nbsp; ' +
    '★ Just One More Level — WoW addiction science &nbsp;·&nbsp; ' +
    '★ Become a Patron for exclusive content &nbsp;·&nbsp; ' +
    '★ pixelweirdo.com' +
    '</div></div>' +

    '<header class="site-header">' +
    '  <div class="header-inner">' +
    '    <a href="' + depth + 'index.html" class="logo" style="text-decoration:none">' +
    '      <span class="logo-main">PixelWeirdo</span>' +
    '      <span class="logo-pixel-tag">by Pixelated Wisdom</span>' +
    '    </a>' +

    // Desktop nav
    '    <nav class="nav">' +
    '      ' + navLink('index.html', 'Home') +
    '      ' + navLink('blog.html',  'Blog') +
    '      ' + navLink('games.html', 'Games') +
    '      ' + navLink('about.html', 'About') +
    '      ' + navLink('pixeljumper.html', '▶ Pixel Jumper') +
    '    </nav>' +

    // Search icon
    '    <button class="search-toggle" id="pw-search-toggle" aria-label="Search" onclick="pwSearchOpen()">' +
    '      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
    '    </button>' +

    // Patreon CTA (hidden on mobile via CSS)
    '    <a href="https://www.patreon.com/c/PixelWeirdo" target="_blank" rel="noopener noreferrer" class="header-cta">Join Patreon</a>' +

    // Hamburger button
    '    <button class="nav-hamburger" id="pw-hamburger" aria-label="Open menu" aria-expanded="false" onclick="pwNavToggle()">' +
    '      <span></span><span></span><span></span>' +
    '    </button>' +
    '  </div>' +
    '</header>' +

    // Mobile drawer — sits below header, slides down
    '<nav class="mobile-nav-drawer" id="pw-mobile-drawer" aria-hidden="true">' +
    '  ' + navLink('index.html', 'Home') +
    '  ' + navLink('blog.html',  'Blog') +
    '  ' + navLink('games.html', 'Games') +
    '  ' + navLink('about.html', 'About') +
    '  ' + navLink('game.html',  '▶ Pixel Jumper', 'game-link') +
    '  <a href="https://www.patreon.com/c/PixelWeirdo" target="_blank" rel="noopener noreferrer" class="nav-link mobile-nav-cta">Join Patreon →</a>' +
    '</nav>' +

    // Search overlay
    '<div class="search-overlay" id="pw-search-overlay">' +
    '  <div class="search-modal">' +
    '    <div class="search-bar-row">' +
    '      <svg class="search-icon-sm" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
    '      <input class="search-input" id="pw-search-input" type="text" placeholder="Search posts…" autocomplete="off" oninput="pwSearch(this.value)"/>' +
    '      <button class="search-close" onclick="pwSearchClose()">✕</button>' +
    '    </div>' +
    '    <div class="search-results" id="pw-search-results">' +
    '      <p class="search-hint">Start typing to search all posts…</p>' +
    '    </div>' +
    '  </div>' +
    '</div>'
  );

  // ── Mobile nav toggle ─────────────────────────────────────
  window.pwNavToggle = function () {
    var drawer  = document.getElementById('pw-mobile-drawer');
    var btn     = document.getElementById('pw-hamburger');
    var isOpen  = drawer.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    drawer.setAttribute('aria-hidden', !isOpen);
    // Close when tapping outside
    if (isOpen) {
      document.addEventListener('click', pwNavOutside, true);
    }
  };

  function pwNavOutside(e) {
    var drawer = document.getElementById('pw-mobile-drawer');
    var btn    = document.getElementById('pw-hamburger');
    if (drawer && !drawer.contains(e.target) && !btn.contains(e.target)) {
      drawer.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.removeEventListener('click', pwNavOutside, true);
    }
  }

  // ── Search ────────────────────────────────────────────────
  window.pwSearchOpen = function () {
    var overlay = document.getElementById('pw-search-overlay');
    if (!overlay) return;
    overlay.classList.add('open');
    setTimeout(function () { var inp = document.getElementById('pw-search-input'); if (inp) inp.focus(); }, 80);
    document.addEventListener('keydown', pwSearchEsc);
  };
  window.pwSearchClose = function () {
    var overlay = document.getElementById('pw-search-overlay');
    if (overlay) overlay.classList.remove('open');
    var inp = document.getElementById('pw-search-input');
    if (inp) inp.value = '';
    var res = document.getElementById('pw-search-results');
    if (res) res.innerHTML = '<p class="search-hint">Start typing to search all posts…</p>';
    document.removeEventListener('keydown', pwSearchEsc);
  };
  function pwSearchEsc(e) { if (e.key === 'Escape') window.pwSearchClose(); }
  document.addEventListener('click', function (e) {
    var overlay = document.getElementById('pw-search-overlay');
    if (overlay && overlay.classList.contains('open') && e.target === overlay) window.pwSearchClose();
  });
  window.pwSearch = function (query) {
    var results = document.getElementById('pw-search-results');
    if (!results) return;
    if (!query || query.trim().length < 2) { results.innerHTML = '<p class="search-hint">Start typing to search all posts…</p>'; return; }
    var q = query.trim().toLowerCase();
    var matches = POSTS.filter(function (p) {
      return p.title.toLowerCase().indexOf(q) !== -1 || p.excerpt.toLowerCase().indexOf(q) !== -1 || p.cat.toLowerCase().indexOf(q) !== -1;
    });
    if (!matches.length) { results.innerHTML = '<p class="search-hint">No posts found for "<strong>' + escQ(query) + '</strong>"</p>'; return; }
    results.innerHTML = matches.map(function (p) {
      return '<a class="search-result" href="' + depth + 'posts/' + p.slug + '.html">' +
        '<span class="search-result-cat">' + p.cat + '</span>' +
        '<span class="search-result-title">' + highlight(p.title, q) + '</span>' +
        '<span class="search-result-excerpt">' + highlight(p.excerpt, q) + '</span>' +
        '</a>';
    }).join('');
  };
  function highlight(text, q) { return escQ(text).replace(new RegExp('(' + escRe(q) + ')', 'gi'), '<mark>$1</mark>'); }
  function escQ(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
}());
