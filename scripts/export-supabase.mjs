/**
 * Export unique : récupère toutes les données Supabase et les fichiers du Storage
 * (photo, CV, images de projets, icônes, logos...) pour les stocker dans le repo.
 *
 * Usage (à la racine du projet, avec ton .env.local qui contient encore les clés) :
 *   node scripts/export-supabase.mjs
 *
 * Résultat :
 *   - src/data/*.json        -> les tables
 *   - public/media/...       -> les fichiers du Storage
 *   - les URLs Supabase dans les JSON sont remplacées par /media/...
 *
 * Après ça, tu peux supprimer ce script et les variables SUPABASE de .env.local / Netlify.
 */
import fs from "node:fs";
import path from "node:path";

// --- Lecture de .env.local / .env (sans dépendance) ---
for (const file of [".env.local", ".env"]) {
  if (!fs.existsSync(file)) continue;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!URL || !KEY) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY introuvables (.env.local)");
  process.exit(1);
}

const TABLES = ["profile", "projects", "skills", "education", "certificates", "experiences", "comments"];
const DATA_DIR = "src/data";
const MEDIA_DIR = "public/media";
const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` };

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(MEDIA_DIR, { recursive: true });

const downloaded = new Map(); // url d'origine -> chemin local

// Ex : https://xxx.supabase.co/storage/v1/object/sign/bucket/dossier/photo.jpg?token=...
//  -> /media/bucket/dossier/photo.jpg
async function localize(url) {
  if (downloaded.has(url)) return downloaded.get(url);
  const u = new globalThis.URL(url);
  const m = u.pathname.match(/\/storage\/v1\/object\/(?:public|sign|authenticated)\/(.+)$/);
  const rel = decodeURIComponent(m ? m[1] : u.pathname.replace(/^\/+/, ""));
  const dest = path.join(MEDIA_DIR, rel);

  // On retire le ?download=... éventuel mais on garde le token pour les URLs signées
  u.searchParams.delete("download");
  const res = await fetch(u, { headers: m && !u.searchParams.has("token") ? headers : {} });
  if (!res.ok) {
    console.warn(`⚠️  Échec téléchargement (${res.status}) : ${url}`);
    downloaded.set(url, url);
    return url;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  const local = "/" + path.relative("public", dest).split(path.sep).join("/");
  console.log(`   📥 ${local}`);
  downloaded.set(url, local);
  return local;
}

// Parcourt récursivement un objet et remplace toutes les URLs Supabase
async function walk(value) {
  if (typeof value === "string") {
    return value.includes(".supabase.co") && /^https?:\/\//.test(value) ? localize(value) : value;
  }
  if (Array.isArray(value)) return Promise.all(value.map(walk));
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = await walk(v);
    return out;
  }
  return value;
}

for (const table of TABLES) {
  const res = await fetch(`${URL}/rest/v1/${table}?select=*`, { headers });
  if (!res.ok) {
    console.warn(`⚠️  Table "${table}" ignorée (${res.status}) : ${await res.text()}`);
    continue;
  }
  let rows = await res.json();
  console.log(`✅ ${table} : ${rows.length} ligne(s)`);
  rows = await walk(rows);
  const data = table === "profile" ? rows[0] ?? {} : rows;
  fs.writeFileSync(path.join(DATA_DIR, `${table}.json`), JSON.stringify(data, null, 2) + "\n");
}

console.log("\n🎉 Export terminé. Vérifie src/data/ et public/media/, puis commit.");
