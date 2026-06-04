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
