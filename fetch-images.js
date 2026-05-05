#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const RAWG_KEY = process.env.RAWG_API_KEY || 'd06e76cc942e40958bc345653ec45dee';
const OUTPUT_DIR = path.join(__dirname, 'images', 'posts');

const GAMES = [
  { slug: 'hollow-knight',         search: 'Hollow Knight' },
  { slug: 'celeste',               search: 'Celeste' },
  { slug: 'journey',               search: 'Journey 2012' },
  { slug: 'outer-wilds',           search: 'Outer Wilds' },
  { slug: 'firewatch',             search: 'Firewatch' },
  { slug: 'spiritfarer',           search: 'Spiritfarer' },
  { slug: 'disco-elysium',         search: 'Disco Elysium' },
  { slug: 'night-in-the-woods',    search: 'Night in the Woods' },
  { slug: 'frostpunk',             search: 'Frostpunk' },
  { slug: 'papers-please',         search: 'Papers Please' },
  { slug: 'stanley-parable',       search: 'The Stanley Parable' },
  { slug: 'inside',                search: 'Inside Playdead' },
  { slug: 'unpacking',             search: 'Unpacking 2021' },
  { slug: 'animal-crossing',       search: 'Animal Crossing New Horizons' },
  { slug: 'katamari-damacy',       search: 'Katamari Damacy' },
  { slug: 'stardew-valley',        search: 'Stardew Valley' },
  { slug: 'minecraft',             search: 'Minecraft' },
  { slug: 'breath-of-the-wild',    search: 'The Legend of Zelda Breath of the Wild' },
  { slug: 'portal-2',              search: 'Portal 2' },
  { slug: 'red-dead-redemption-2', search: 'Red Dead Redemption 2' },
  { slug: 'dark-souls',            search: 'Dark Souls III' },
  { slug: 'hades',                 search: 'Hades 2020' },
  { slug: 'undertale',             search: 'Undertale' },
  { slug: 'among-us',              search: 'Among Us' },
  { slug: 'it-takes-two',          search: 'It Takes Two' },
  { slug: 'moving-out',            search: 'Moving Out 2020' },
  { slug: 'overcooked',            search: 'Overcooked 2' },
  { slug: 'last-of-us',            search: 'The Last of Us Part I' },
  { slug: 'the-sims',              search: 'The Sims 4' },
  { slug: 'fallout-3',             search: 'Fallout 3' },
  { slug: 'amnesia',               search: 'Amnesia The Dark Descent' },
  { slug: 'pokemon',               search: 'Pokemon Red' },
  { slug: 'princess-peach',        search: 'Princess Peach Showtime' },
  { slug: 'knack',                 search: 'Knack 2013' },
  { slug: 'world-of-warcraft',     search: 'World of Warcraft' },
  { slug: 'skyrim',                search: 'The Elder Scrolls V Skyrim' },
  { slug: 'crash-bandicoot',       search: 'Crash Bandicoot N Sane Trilogy' },
  { slug: 'rocket-league',         search: 'Rocket League' },
  { slug: 'edith-finch',           search: 'What Remains of Edith Finch' },
  { slug: 'tetris',                search: 'Tetris Effect' },
];

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${data.slice(0, 200)}`)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const get = (u) => {
      https.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          return get(res.headers.location);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(destPath, () => {});
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
        file.on('error', (err) => { fs.unlink(destPath, () => {}); reject(err); });
      }).on('error', (err) => { fs.unlink(destPath, () => {}); reject(err); });
    };
    get(url);
  });
}

async function fetchGameImage(game) {
  const url = `https://api.rawg.io/api/games?key=${RAWG_KEY}&search=${encodeURIComponent(game.search)}&page_size=3&search_precise=true`;
  try {
    const data = await fetchJSON(url);
    if (!data.results || data.results.length === 0) {
      console.log(`  ⚠️  No results for ${game.slug}`);
      return null;
    }
    let best = data.results.find(r => r.background_image) || data.results[0];
    if (!best.background_image) {
      console.log(`  ⚠️  No image for ${game.slug}`);
      return null;
    }
    const destPath = path.join(OUTPUT_DIR, `${game.slug}.jpg`);
    await downloadFile(best.background_image, destPath);
    const kb = Math.round(fs.statSync(destPath).size / 1024);
    console.log(`  ✅ ${game.slug}.jpg (${kb}KB) — ${best.name}`);
    return { slug: game.slug, gameName: best.name, rawgId: best.id };
  } catch (err) {
    console.log(`  ❌ ${game.slug}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('🎮 PixelWeirdo — Fetching game covers from RAWG\n');
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const credits = [];
  for (let i = 0; i < GAMES.length; i += 4) {
    const batch = GAMES.slice(i, i + 4);
    const results = await Promise.all(batch.map(fetchGameImage));
    results.forEach(r => { if (r) credits.push(r); });
    if (i + 4 < GAMES.length) await new Promise(r => setTimeout(r, 300));
  }
  fs.writeFileSync(path.join(OUTPUT_DIR, 'credits.json'), JSON.stringify(credits, null, 2));
  console.log(`\n✨ Done! ${credits.length}/${GAMES.length} game covers downloaded`);
}

main().catch(console.error);
