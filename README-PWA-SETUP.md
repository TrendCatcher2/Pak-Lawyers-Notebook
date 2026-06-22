# Make Pak Lawyer's Notebook a Play-Store-ready PWA

## What's in this folder
- `manifest.json` — app identity (name, icons, colors)
- `service-worker.js` — minimal offline cache so the app qualifies as a PWA
- `HEAD-SNIPPET.html` — the exact lines to paste into your index.html
- `icons/` — ready icons: 192, 512, 512-maskable, 180 (Apple), 32 (favicon)
- `.well-known/assetlinks.json` — domain-verification template for the TWA

## Step 0 — wire it up (5 minutes)
1. Copy `manifest.json`, `service-worker.js`, and the `icons/` folder into the SAME folder as your `index.html` (repo root).
2. Open `index.html` and paste the two blocks from `HEAD-SNIPPET.html`:
   - the `<head>` block inside `<head>`
   - the `<script>` block just before `</body>`
3. Commit & push, then open your live HTTPS site and hard-refresh.

## Step 1 — confirm it's a valid PWA
- In Chrome on the live site: F12 → **Application** tab → **Manifest** (should show name + icons) and **Service workers** (should show "activated").
- Or run **Lighthouse** (F12 → Lighthouse → Analyze). You need the PWA checks passing / score ≥ 80.

## Step 2 — package on PWABuilder
1. Go to **pwabuilder.com**, paste your HTTPS URL, **Start**.
2. Fix anything it flags, then **Package For Stores → Android → Generate**.
3. Set **Package ID**: `com.trendcatcher.paklawyersnotebook` (must stay the same forever).
4. Download the zip → it has `.aab` (upload to Play), `.apk` (test), `signing.keystore` + `signing-key-info.txt` (KEEP SAFE — needed for every future update), and an `assetlinks.json`.

## Step 3 — Google Play Console
1. Create a Play **Developer account** (one-time $25).
2. **Create app** → fill details → **Internal testing** → upload the `.aab` → install via the tester link to verify.

## Step 4 — verify the domain (removes the browser bar)
1. The folder `.well-known/assetlinks.json` here is a TEMPLATE.
2. In Play Console → **Setup → App integrity → App signing**, copy the **SHA-256 certificate fingerprint**.
3. Paste it into `assetlinks.json` (replace REPLACE_WITH_SHA256...), keep the package_id as-is.
4. Deploy the `.well-known/assetlinks.json` to your site so it loads at:
   `https://YOURDOMAIN/.well-known/assetlinks.json`
   (On GitHub Pages, just keep the `.well-known` folder in your repo root.)

## Step 5 — finish listing & submit
Add icon/screenshots/feature graphic, short + full description, **privacy policy URL** (host your in-app Policies page text and link it), complete **content rating** and **data safety**, set **Target audience** (not children), then promote to Production.

## Notes for your app
- Data lives in the device (local storage) — persists in the TWA. Use **Download backup**/Cloud sync to move between devices.
- AI, news/live and OCR need internet; everything else works offline (the service worker caches the shell).
- iOS/App Store needs a different native approach — this covers Android only.
