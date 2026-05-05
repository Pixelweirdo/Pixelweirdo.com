// PixelWeirdo — main.js

// ── POLLS ─────────────────────────────────────────────────────
const pollData = {};
function vote(pollId, optionIndex, btn) {
  if (pollData[pollId] && pollData[pollId].voted) return;
  if (!pollData[pollId]) pollData[pollId] = { votes: [], voted: false };
  const poll = document.getElementById('poll-' + pollId);
  if (!poll) return;
  const options = poll.querySelectorAll('.poll-option');
  const counts = pollData[pollId].votes;
  if (!counts.length) options.forEach(() => counts.push(Math.floor(Math.random() * 40) + 5));
  counts[optionIndex]++;
  pollData[pollId].voted = true;
  const total = counts.reduce((a, b) => a + b, 0);
  options.forEach((opt, i) => {
    const pct = Math.round((counts[i] / total) * 100);
    opt.querySelector('.poll-bar-fill').style.width = pct + '%';
    opt.querySelector('.poll-pct').textContent = pct + '%';
    opt.classList.remove('poll-winner');
    opt.style.cursor = 'default';
  });
  const maxVotes = Math.max(...counts);
  options[counts.indexOf(maxVotes)].classList.add('poll-winner');
  poll.querySelector('.poll-total').textContent = total + ' votes';
  btn.parentElement.querySelector('.poll-bar').style.display = 'block';
  poll.querySelectorAll('.poll-vote-btn').forEach(b => b.disabled = true);
}

// ── QUIZZES ───────────────────────────────────────────────────
function checkAnswer(quizId, btn, isCorrect) {
  const quiz = document.getElementById('quiz-' + quizId);
  if (!quiz || quiz.dataset.answered) return;
  quiz.dataset.answered = '1';
  quiz.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
  const fb = quiz.querySelector('.quiz-feedback');
  if (isCorrect) {
    btn.classList.add('quiz-correct');
    fb.textContent = '\u2713 Correct! ' + btn.dataset.explain;
    fb.style.color = '#7c4dbe';
  } else {
    btn.classList.add('quiz-wrong');
    fb.textContent = '\u2717 Not quite. ' + btn.dataset.explain;
    fb.style.color = '#f0922b';
    quiz.querySelectorAll('.quiz-opt[data-correct="true"]').forEach(b => b.classList.add('quiz-correct'));
  }
  fb.style.display = 'block';
}

// ── NEWSLETTER ────────────────────────────────────────────────
function handleSubscribe(e) {
  e.preventDefault();
  const msg = document.getElementById('nl-msg');
  e.target.querySelector('input').value = '';
  if (msg) { msg.textContent = "\u2713 You're in! Welcome to the PixelWeirdo community."; setTimeout(() => msg.textContent = '', 5000); }
}

// ── BLOG FILTER ───────────────────────────────────────────────
function filterBlog(cat, btn) {
  document.querySelectorAll('#blog-list .post-row-card').forEach(r => {
    r.style.display = (cat === 'all' || r.dataset.cat === cat) ? 'flex' : 'none';
  });
  document.querySelectorAll('[onclick*="filterBlog"]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── HOME CATEGORY FILTER ──────────────────────────────────────
function filterHome(cat, btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const cards = document.querySelectorAll('#home-posts-grid .post-card');
  let visible = 0;
  cards.forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
    if (card.classList.contains('featured')) card.style.gridColumn = (cat === 'all') ? 'span 2' : (show ? '1' : 'none');
  });
  const noResults = document.getElementById('home-no-results');
  if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
}

// ── COMMENT SYSTEM (localStorage) ────────────────────────────
// Persists comments in the browser via localStorage.
// Key: "pw_comments:{postId}"   Value: JSON array of comment objects

var DB = (function () {
  function key(postId) {
    return 'pw_comments:' + postId;
  }

  function load(postId) {
    try {
      var raw = localStorage.getItem(key(postId));
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function save(postId, comments) {
    try {
      localStorage.setItem(key(postId), JSON.stringify(comments));
    } catch (e) {
      console.warn('Could not save comment:', e);
    }
  }

  function remove(postId, commentId) {
    var comments = load(postId);
    comments = comments.filter(function(c) { return c.id !== commentId; });
    save(postId, comments);
    return comments;
  }

  return { load: load, save: save, remove: remove };
}());

// ── Render comments ───────────────────────────────────────────
function renderComments(postId, comments) {
  var list = document.getElementById('comments-list-' + postId);
  var countEl = document.getElementById('comment-count-' + postId);
  if (!list) return;

  if (!comments || comments.length === 0) {
    list.innerHTML = '<p style="color:var(--ink3);font-size:0.875rem;font-style:italic;padding:8px 0">No comments yet — be the first!</p>';
  } else {
    list.innerHTML = '<div class="comment-list">' +
      comments.map(function(c) {
        return '<div class="comment-item">' +
          '<div class="comment-meta">' +
            '<strong>' + escHtml(c.name) + '</strong>' +
            '<span>' + c.date + '</span>' +
          '</div>' +
          '<div class="comment-text">' + escHtml(c.text) + '</div>' +
        '</div>';
      }).join('') +
    '</div>';
  }

  if (countEl) {
    var n = comments ? comments.length : 0;
    countEl.textContent = n + (n === 1 ? ' COMMENT' : ' COMMENTS');
  }
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Load comments on page ready ───────────────────────────────
function loadComments(postId) {
  var comments = DB.load(postId);
  renderComments(postId, comments);
}

// ── Submit a new comment ──────────────────────────────────────
function submitComment(postId) {
  var nameEl = document.getElementById('c-name-' + postId);
  var textEl = document.getElementById('c-text-' + postId);
  if (!nameEl || !textEl) return;

  var name = nameEl.value.trim();
  var text = textEl.value.trim();

  if (!name || !text) {
    alert('Please enter both your name and a comment.');
    return;
  }

  var comments = DB.load(postId);
  var now = new Date();
  var date = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  comments.push({
    id: Date.now(),
    name: name,
    text: text,
    date: date
  });

  DB.save(postId, comments);
  renderComments(postId, comments);

  nameEl.value = '';
  textEl.value = '';
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[id^="comments-list-"]').forEach(function (el) {
    var postId = el.id.replace('comments-list-', '');
    loadComments(postId);
  });
});
