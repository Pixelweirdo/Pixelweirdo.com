// PixelWeirdo — shared footer
(function () {
  var depth = window.location.pathname.indexOf('/posts/') !== -1 ? '../' : '';
  document.write(
    '<footer class="site-footer">' +
    '  <div class="footer-inner">' +
    '    <div class="footer-grid">' +
    '      <div class="footer-brand">' +
    '        <span class="logo-main" style="font-size:1rem">PixelWeirdo</span>' +
    '        <span class="logo-pixel-tag" style="display:block;margin-top:4px;color:#f0ab5a">by Pixelated Wisdom</span>' +
    '        <p class="footer-tagline">Thoughtful writing about what video games teach us — about life, skills, and being human.</p>' +
    '        <img src="' + depth + 'images/logo.png" alt="Pixelated Wisdom" class="footer-logo"/>' +
    '      </div>' +
    '      <div class="footer-col">' +
    '        <div class="footer-col-title">NAVIGATE</div>' +
    '        <a href="' + depth + 'index.html">Home</a>' +
    '        <a href="' + depth + 'blog.html">Blog</a>' +
    '        <a href="' + depth + 'games.html">Games</a>' +
    '        <a href="' + depth + 'about.html">About</a>' +
    '      </div>' +
    '      <div class="footer-col">' +
    '        <div class="footer-col-title">TOPICS</div>' +
    '        <a href="' + depth + 'blog.html">Life Lessons</a>' +
    '        <a href="' + depth + 'blog.html">Graphics &amp; Tech</a>' +
    '        <a href="' + depth + 'blog.html">Skills &amp; Science</a>' +
    '      </div>' +
    '      <div class="footer-col">' +
    '        <div class="footer-col-title">SUPPORT</div>' +
    '        <a href="https://www.patreon.com/c/PixelWeirdo" target="_blank" rel="noopener noreferrer">Patreon ♥</a>' +
    '        <a href="' + depth + 'about.html">Affiliate Disclosure</a>' +
    '        <a href="' + depth + 'privacy.html">Privacy Policy</a>' +
    '        <a href="mailto:mao@pixelweirdo.com">Contact</a>' +
    '      </div>' +
    '    </div>' +
    '    <div class="footer-bottom">' +
    '      <span class="footer-copy">© 2025 PixelWeirdo · pixelweirdo.com · All rights reserved.</span>' +
    '      <span class="footer-pixel">MADE WITH ♥ + CODE</span>' +
    '    </div>' +
    '  </div>' +
    '</footer>'
  );
}());

// Replace all .ad-placeholder elements with real AdSense units
// Uses setTimeout to ensure DOM is fully ready after document.write
setTimeout(function () {
  var placeholders = document.querySelectorAll('.ad-placeholder');
  placeholders.forEach(function (placeholder) {
    var ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', 'ca-pub-8818629664606753');
    ins.setAttribute('data-ad-slot', '9387210479');
    ins.setAttribute('data-ad-format', 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');
    placeholder.parentNode.replaceChild(ins, placeholder);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
}, 0);

// Ad injection for post pages only (after second paragraph)
setTimeout(function () {
  if (window.location.pathname.indexOf('/posts/') === -1) return;
  var postBody = document.querySelector('.post-body');
  if (!postBody) return;
  var paragraphs = postBody.querySelectorAll('p');
  if (paragraphs.length < 2) return;
  // Don't add if one already exists nearby
  if (postBody.querySelector('.adsbygoogle')) return;
  var adDiv = document.createElement('div');
  adDiv.style.margin = '32px 0';
  adDiv.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8818629664606753" data-ad-slot="1079556604" data-ad-format="auto" data-full-width-responsive="true"></ins>';
  paragraphs[1].parentNode.insertBefore(adDiv, paragraphs[1].nextSibling);
  (window.adsbygoogle = window.adsbygoogle || []).push({});
}, 0);
