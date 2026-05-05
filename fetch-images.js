#!/usr/bin/env node
/**
 * PixelWeirdo — Unsplash Image Fetcher
 * Downloads hero images for all game posts and saves them to images/posts/
 * Run: node fetch-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || 'd06e76cc942e40958bc345653ec45dee';
const OUTPUT_DIR = path.join(__dirname, 'images', 'posts');

// Map each post slug → best Unsplash search query
// Using atmospheric/thematic queries since Unsplash doesn't have game screenshots
const GAMES = [
  { slug: 'hollow-knight',          query: 'dark fantasy underground cave insect' },
  { slug: 'celeste',                query: 'mountain climbing snow peak adventure' },
  { slug: 'journey',                query: 'desert dunes sand golden sunset landscape' },
  { slug: 'outer-wilds',            query: 'space exploration stars nebula cosmos' },
  { slug: 'firewatch',              query: 'forest fire lookout tower wilderness sunset' },
  { slug: 'spiritfarer',            query: 'boat ocean sea sunset peaceful water' },
  { slug: 'disco-elysium',          query: 'rainy city street neon detective noir' },
  { slug: 'night-in-the-woods',     query: 'autumn small town forest fog moody night' },
  { slug: 'frostpunk',              query: 'frozen winter blizzard industrial city snow' },
  { slug: 'papers-please',          query: 'border checkpoint passport stamp bureaucracy' },
  { slug: 'stanley-parable',        query: 'office corridor empty hallway surreal' },
  { slug: 'inside',                 query: 'dark silhouette child running dystopian' },
  { slug: 'unpacking',              query: 'moving boxes room cozy home apartment' },
  { slug: 'animal-crossing',        query: 'tropical island beach summer sunny peaceful' },
  { slug: 'katamari-damacy',        query: 'colorful objects rainbow chaos playful' },
  { slug: 'stardew-valley',         query: 'farm garden countryside vegetables green field' },
  { slug: 'minecraft',              query: 'blocky landscape sunrise mountains creative building' },
  { slug: 'breath-of-the-wild',     query: 'open world cliffside green landscape adventure' },
  { slug: 'portal-2',               query: 'laboratory sci-fi white room futuristic clean' },
  { slug: 'red-dead-redemption-2',  query: 'western cowboy horses prairie mountain sunset' },
  { slug: 'dark-souls',             query: 'dark medieval castle ruins sword warrior' },
  { slug: 'hades',                  query: 'underground cave lava fire mythology greek' },
  { slug: 'undertale',              query: 'underground flowers cave cozy colorful heart' },
  { slug: 'among-us',               query: 'space station spaceship crew teamwork' },
  { slug: 'it-takes-two',           query: 'couple teamwork miniature toy small world' },
  { slug: 'moving-out',             query: 'moving furniture apartment boxes chaos fun' },
  { slug: 'overcooked',             query: 'cooking kitchen restaurant chef chaos' },
  { slug: 'last-of-us',             query: 'post-apocalyptic overgrown urban nature reclaiming' },
  { slug: 'the-sims',               query: 'suburban house neighborhood home life family' },
  { slug: 'fallout-3',              query: 'wasteland ruins abandoned city post-apocalyptic' },
  { slug: 'amnesia',                query: 'dark castle horror corridor stone medieval' },
  { slug: 'pokemon',                query: 'colorful creatures forest nature adventure' },
  { slug: 'princess-peach',         query: 'pink castle fantasy kingdom magical palace' },
  { slug: 'knack',                   query: 'ancient ruins golden artifacts glowing mystery' },
  { slug: 'world-of-warcraft',      query: 'epic fantasy dragon battle mountains sky' },
  { slug: 'skyrim',                 query: 'snowy mountain dragon nordic landscape epic' },
  { slug: 'crash-bandicoot',        query: 'jungle tropical temple ancient ruins vibrant' },
  { slug: 'rocket-league',          query: 'arena stadium neon lights sports car racing' },
  { slug: 'edith-finch',            query: 'old house quirky family home memory nostalgia' },
  { slug: 'tetris',                 query: 'colorful blocks puzzle geometric pattern' },
];

function fetchJSON(url, headers) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${data.slice(0, 200)}`)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(destPath);
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', (err) => { fs.unlinkSync(destPath); reject(err); });
    }).on('error', (err) => { fs.unlinkSync(destPath); reject(err); });
  });
}

async function fetchImageForGame(game) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(game.query)}&per_page=1&orientation=landscape&content_filter=high`;
  const headers = {
    'Authorization': `Client-ID ${UNSPLASH_KEY}`,
    'Accept-Version': 'v1'
  };

  try {
    const data = await fetchJSON(url, headers);
    if (!data.results || data.results.length === 0) {
      console.log(`  ⚠️  No results for ${game.slug}`);
      return null;
    }
    const photo = data.results[0];
    // Use regular size (1080px wide) — good quality, not too heavy
    const imageUrl = photo.urls.regular;
    const destPath = path.join(OUTPUT_DIR, `${game.slug}.jpg`);
    await downloadFile(imageUrl, destPath);
    const stats = fs.statSync(destPath);
    console.log(`  ✅ ${game.slug} (${Math.round(stats.size/1024)}KB) — by ${photo.user.name}`);
    return { slug: game.slug, photographer: photo.user.name, photographerUrl: photo.user.links.html };
  } catch (err) {
    console.log(`  ❌ ${game.slug}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('🎮 PixelWeirdo — Fetching Unsplash images for all game posts\n');
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const credits = [];
  // Process in batches of 5 to be polite to the API
  for (let i = 0; i < GAMES.length; i += 5) {
    const batch = GAMES.slice(i, i + 5);
    const results = await Promise.all(batch.map(fetchImageForGame));
    results.forEach(r => { if (r) credits.push(r); });
    // Small delay between batches
    if (i + 5 < GAMES.length) await new Promise(r => setTimeout(r, 500));
  }

  // Write credits file
  const creditsPath = path.join(OUTPUT_DIR, 'credits.json');
  fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 2));

  console.log(`\n✨ Done! ${credits.length}/${GAMES.length} images downloaded`);
  console.log(`📄 Credits saved to ${creditsPath}`);
}

main().catch(console.error);
