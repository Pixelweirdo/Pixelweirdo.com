#!/usr/bin/env python3
"""
PixelWeirdo — Game Image Generator
Creates styled cover images for each game post using PIL.
Each image has: gradient background + pixel grid overlay + game title + decorative elements
Output: images/posts/<slug>.jpg  (1200×675px, 16:9)
"""

import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "images", "posts")
os.makedirs(OUTPUT_DIR, exist_ok=True)

W, H = 1200, 675

# Each game: slug, display name, gradient colors (dark→light), accent color, icon char
GAMES = [
    ("hollow-knight",         "Hollow Knight",          "#050508", "#0e0a18", "#8b7cf8", "◆"),
    ("celeste",               "Celeste",                "#0a0520", "#c8496b", "#ff6b9d", "▲"),
    ("journey",               "Journey",                "#1a0e05", "#c8820a", "#f0ab5a", "◈"),
    ("outer-wilds",           "Outer Wilds",            "#030308", "#1a1428", "#7ec8e3", "★"),
    ("firewatch",             "Firewatch",              "#1a0800", "#c85a00", "#ff8c42", "◉"),
    ("spiritfarer",           "Spiritfarer",            "#020d1a", "#0a3a6e", "#7ec8e3", "⛵"),
    ("disco-elysium",         "Disco Elysium",          "#0a0514", "#1e0a3a", "#d4a5ff", "◎"),
    ("night-in-the-woods",    "Night in the Woods",     "#0f0a1a", "#2a1a4a", "#c084fc", "◐"),
    ("frostpunk",             "Frostpunk",              "#0d1520", "#1a2a40", "#93c5fd", "❄"),
    ("papers-please",         "Papers, Please",         "#1a1200", "#3a2a00", "#d4a854", "▣"),
    ("stanley-parable",       "The Stanley Parable",    "#1a1a2e", "#16213e", "#94a3b8", "▷"),
    ("inside",                "Inside",                 "#0a0a0a", "#1a1a1a", "#cbd5e1", "◼"),
    ("unpacking",             "Unpacking",              "#2d1b3d", "#5e3b7a", "#c084fc", "◧"),
    ("animal-crossing",       "Animal Crossing",        "#0d2b0d", "#2d6e2d", "#86efac", "◉"),
    ("katamari-damacy",       "Katamari Damacy",        "#1a003a", "#5a00a0", "#f0abfc", "◎"),
    ("stardew-valley",        "Stardew Valley",         "#0a1a0a", "#1a4a1a", "#86efac", "◈"),
    ("minecraft",             "Minecraft",              "#0a1a0a", "#1a4a1a", "#78cc44", "⛏"),
    ("breath-of-the-wild",    "Breath of the Wild",     "#0a1a0e", "#1a4a2a", "#86efac", "◆"),
    ("portal-2",              "Portal 2",               "#0d1f2d", "#1a3a4a", "#67e8f9", "◎"),
    ("red-dead-redemption-2", "Red Dead Redemption 2",  "#1a0e05", "#3a200a", "#d97706", "★"),
    ("dark-souls",            "Dark Souls",             "#0d0d1a", "#1a1030", "#f59e0b", "⚔"),
    ("hades",                 "Hades",                  "#1a0a0a", "#4a0a0a", "#f87171", "◉"),
    ("undertale",             "Undertale",              "#0a0a1a", "#1a0a3a", "#f9a8d4", "♥"),
    ("among-us",              "Among Us",               "#050514", "#0a0a28", "#60a5fa", "◈"),
    ("it-takes-two",          "It Takes Two",           "#1a0a2a", "#3a1a5a", "#c084fc", "◧"),
    ("moving-out",            "Moving Out",             "#1a2a3a", "#2e5c7a", "#7dd3fc", "◉"),
    ("overcooked",            "Overcooked",             "#1a0a00", "#5c2500", "#fb923c", "◎"),
    ("last-of-us",            "The Last of Us",         "#0a1a0a", "#1a3a1a", "#86efac", "◼"),
    ("the-sims",              "The Sims",               "#003300", "#006600", "#4ade80", "◧"),
    ("fallout-3",             "Fallout 3",              "#0a0a00", "#2a2a00", "#a3e635", "☢"),
    ("amnesia",               "Amnesia",                "#0a0a0a", "#1a0a1a", "#d8b4fe", "◎"),
    ("pokemon",               "Pokémon",                "#1a0000", "#8b0000", "#fbbf24", "★"),
    ("princess-peach",        "Princess Peach",         "#3a0a2a", "#b02060", "#f9a8d4", "♛"),
    ("knack",                 "Knack",                  "#1a0e05", "#4a2a10", "#f59e0b", "◉"),
    ("world-of-warcraft",     "World of Warcraft",      "#0a0a1a", "#1a0a2e", "#60a5fa", "⚔"),
    ("skyrim",                "Skyrim",                 "#0a0a1a", "#1a1a3a", "#93c5fd", "◆"),
    ("crash-bandicoot",       "Crash Bandicoot",        "#1a0a00", "#6e3a00", "#fb923c", "◉"),
    ("rocket-league",         "Rocket League",          "#0a0a1a", "#1a1a4a", "#38bdf8", "◎"),
    ("edith-finch",           "What Remains of Edith Finch", "#0e0a1a", "#1e1030", "#c084fc", "◧"),
    ("tetris",                "Tetris",                 "#0a0a1a", "#1a1a4a", "#60a5fa", "▣"),
]

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def lerp_color(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))

def make_gradient(w, h, c1, c2, angle_deg=135):
    img = Image.new("RGB", (w, h))
    pixels = img.load()
    rad = math.radians(angle_deg)
    dx, dy = math.cos(rad), math.sin(rad)
    for y in range(h):
        for x in range(w):
            t = (x * dx + y * dy) / (w * abs(dx) + h * abs(dy))
            t = max(0, min(1, t))
            pixels[x, y] = lerp_color(c1, c2, t)
    return img

def add_pixel_grid(img, accent_rgb, density=32):
    draw = ImageDraw.Draw(img, "RGBA")
    w, h = img.size
    # Draw subtle grid lines
    for x in range(0, w, density):
        draw.line([(x, 0), (x, h)], fill=(*accent_rgb, 18))
    for y in range(0, h, density):
        draw.line([(0, y), (w, y)], fill=(*accent_rgb, 18))
    return img

def add_scan_lines(img):
    draw = ImageDraw.Draw(img, "RGBA")
    w, h = img.size
    for y in range(0, h, 4):
        draw.line([(0, y), (w, y)], fill=(0, 0, 0, 30))
    return img

def add_noise_dots(img, accent_rgb, count=80, seed=42):
    random.seed(seed)
    draw = ImageDraw.Draw(img, "RGBA")
    w, h = img.size
    for _ in range(count):
        x = random.randint(0, w)
        y = random.randint(0, h)
        size = random.choice([1, 1, 1, 2, 3])
        alpha = random.randint(40, 120)
        draw.ellipse([x, y, x+size, y+size], fill=(*accent_rgb, alpha))
    return img

def add_corner_decoration(img, accent_rgb):
    draw = ImageDraw.Draw(img, "RGBA")
    w, h = img.size
    a = 120
    # Top-left bracket
    draw.line([(20, 20), (20, 60)], fill=(*accent_rgb, a), width=2)
    draw.line([(20, 20), (60, 20)], fill=(*accent_rgb, a), width=2)
    # Top-right bracket
    draw.line([(w-20, 20), (w-20, 60)], fill=(*accent_rgb, a), width=2)
    draw.line([(w-60, 20), (w-20, 20)], fill=(*accent_rgb, a), width=2)
    # Bottom-left bracket
    draw.line([(20, h-20), (20, h-60)], fill=(*accent_rgb, a), width=2)
    draw.line([(20, h-20), (60, h-20)], fill=(*accent_rgb, a), width=2)
    # Bottom-right bracket
    draw.line([(w-20, h-20), (w-20, h-60)], fill=(*accent_rgb, a), width=2)
    draw.line([(w-60, h-20), (w-20, h-20)], fill=(*accent_rgb, a), width=2)
    return img

def add_large_icon(img, icon, accent_rgb, font_path):
    draw = ImageDraw.Draw(img, "RGBA")
    w, h = img.size
    try:
        fnt = ImageFont.truetype(font_path, 200)
        bbox = draw.textbbox((0, 0), icon, font=fnt)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        x = (w - tw) // 2
        y = (h - th) // 2 - 40
        # Shadow
        draw.text((x+4, y+4), icon, font=fnt, fill=(0, 0, 0, 80))
        # Main icon
        draw.text((x, y), icon, font=fnt, fill=(*accent_rgb, 200))
    except Exception:
        pass
    return img

def add_title_bar(img, title, accent_rgb, font_path):
    draw = ImageDraw.Draw(img, "RGBA")
    w, h = img.size
    bar_h = 90
    # Dark bar at bottom
    draw.rectangle([(0, h - bar_h), (w, h)], fill=(0, 0, 0, 180))
    # Accent left stripe
    draw.rectangle([(0, h - bar_h), (5, h)], fill=(*accent_rgb, 255))
    # Title text
    try:
        fnt_big = ImageFont.truetype(font_path, 36)
        fnt_small = ImageFont.truetype(font_path, 14)
    except Exception:
        fnt_big = ImageFont.load_default()
        fnt_small = fnt_big
    # Game title
    draw.text((28, h - bar_h + 18), title, font=fnt_big, fill=(255, 255, 255, 240))
    # Tagline
    draw.text((28, h - bar_h + 60), "PIXELWEIRDO.COM", font=fnt_small, fill=(*accent_rgb, 180))
    return img

def add_pixel_blocks(img, accent_rgb, seed=0):
    """Add a few large decorative pixel blocks"""
    random.seed(seed + 99)
    draw = ImageDraw.Draw(img, "RGBA")
    w, h = img.size
    bs = 32  # block size
    positions = [
        (random.randint(1, 8) * bs, random.randint(1, 4) * bs),
        (w - random.randint(3, 10) * bs, random.randint(1, 4) * bs),
        (random.randint(1, 6) * bs, h - random.randint(3, 6) * bs),
    ]
    for px, py in positions:
        alpha = random.randint(25, 60)
        draw.rectangle([px, py, px+bs-2, py+bs-2], fill=(*accent_rgb, alpha))
    return img

def find_font():
    candidates = [
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    return None

def generate_image(slug, name, color1, color2, accent_hex, icon, font_path, idx):
    c1 = hex_to_rgb(color1)
    c2 = hex_to_rgb(color2)
    accent = hex_to_rgb(accent_hex)

    img = make_gradient(W, H, c1, c2, angle_deg=135)
    img = img.convert("RGBA")
    add_pixel_grid(img, accent)
    add_pixel_blocks(img, accent, seed=idx)
    add_noise_dots(img, accent, count=60, seed=idx)
    add_scan_lines(img)
    if font_path:
        add_large_icon(img, icon, accent, font_path)
    add_corner_decoration(img, accent)
    if font_path:
        add_title_bar(img, name, accent, font_path)

    out = img.convert("RGB")
    dest = os.path.join(OUTPUT_DIR, f"{slug}.jpg")
    out.save(dest, "JPEG", quality=90)
    size_kb = os.path.getsize(dest) // 1024
    return size_kb

def main():
    font_path = find_font()
    print(f"🎨 Generating images for {len(GAMES)} games...")
    print(f"   Font: {font_path or 'default (no TTF found)'}\n")

    for i, (slug, name, c1, c2, accent, icon, *_) in enumerate(GAMES):
        kb = generate_image(slug, name, c1, c2, accent, icon, font_path, i)
        print(f"  ✅ {slug}.jpg ({kb}KB)")

    print(f"\n✨ Done! {len(GAMES)} images saved to {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
