# Handoff — Migración Mister Mortgage USA a IONOS

> Documento de continuidad para retomar el trabajo en otra sesión de Claude Code.
> Última actualización: 2026-05-29.

---

## 🎯 Objetivo

Entregar el sitio del cliente **Mister Mortgage USA** (`mistermortgageusa.com`) en su
**hosting de IONOS**, reemplazando el sitio viejo que está en producción, y manteniendo
**GitHub como fuente oficial** para futuras actualizaciones.

---

## 📦 El proyecto

- **Repo GitHub:** `irisdigitllab/mister-mortgage-usa`
- **Ruta local:** `C:\Robert\mister-mortgage-usa`
- **Stack:** Astro v5 estático (`output: 'static'`) → genera HTML/CSS/JS puro en `dist/`.
- **Características:** bilingüe (en/es), `trailingSlash: 'never'`, 35 páginas
  (20 EN + 15 ES), varias landings SEO de tipos de préstamo.
- **Estaba configurado para Netlify** (`netlify.toml` con redirects 301, headers de
  seguridad y caché). El objetivo es replicar eso en Apache/IONOS vía `.htaccess`.

### Entorno local (ya configurado)
- **Node.js 24.16.0** instalado vía `winget install OpenJS.NodeJS.LTS` en
  `C:\Program Files\nodejs`.
- ⚠️ **El PATH no siempre tiene Node en sesiones nuevas de PowerShell.** Anteponerlo en
  cada comando:
  ```powershell
  $env:PATH = "C:\Program Files\nodejs;" + $env:PATH
  ```
- Comandos: `npm install`, `npm run build` (genera `dist/`), `npm run dev` (localhost:4321).
- Git: identidad configurada localmente en el repo
  (`user.email = rmaceiras97@gmail.com`, `user.name = irisdigitllab`).
- `gh` CLI autenticado como cuenta GitHub **irisdigitllab**.

---

## ✅ FASE 1 — COMPLETADA (cambios en el código, ya en GitHub)

Todo esto está en el **PR #2**, rama `chore/ionos-apache-prep`:
👉 https://github.com/irisdigitllab/mister-mortgage-usa/pull/2
**(Pendiente de mergear a `master`.)**

1. **`astro.config.mjs`** — añadido `build: { format: 'file' }`. Ahora las páginas se
   generan como archivos planos (`loan-options.html`, `es.html`) en vez de
   `carpeta/index.html`. Esto simplifica las URLs limpias en Apache y respeta
   `trailingSlash: 'never'`.

2. **`public/.htaccess`** — el repo YA traía un `.htaccess` bien hecho (headers de
   seguridad, redirects 301 legacy `.html`→limpia, caché, gzip, bloqueo de URLs de
   WordPress viejo, oculta `X-Powered-By`/`Server`). **Le faltaba la pieza crítica**: la
   regla que sirve la URL limpia desde su `.html`. Se añadió:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME}\.html -f
     RewriteRule ^(.+?)/?$ /$1.html [L]
   </IfModule>
   ```
   `MultiViews` está desactivado (`Options -Indexes -MultiViews`), así que sin esta regla
   las URLs limpias darían 404. El check de archivo va ANTES que el de directorio, por eso
   `/es` sirve `es.html` aunque también exista la carpeta `es/`.

3. **`sitemap.xml`** (en la raíz **y** en `public/` — el que se publica es el de
   `public/`) — se pasó de URLs `.html` a URLs limpias y se añadieron las **15 páginas en
   español** que faltaban. Total: **35 URLs**, 0 con `.html`.
   - ⚠️ Las páginas legales en español de `altLangPath` (`/es/politica-de-privacidad`,
     `/es/politica-de-cookies`) **NO existen** en el build, por eso NO se incluyeron.

**Verificado localmente:** `npm run build` OK, 35 páginas, `dist/.htaccess` con la regla
correcta, `dist/sitemap.xml` sin `.html`.
**NO verificado aún:** la lógica de rewrites del `.htaccess` (eso solo se prueba en Apache
real → en el staging de IONOS; `astro preview` NO aplica `.htaccess`).

---

## ⛔ BLOQUEO ACTUAL (Fase 0 — IONOS)

Al entrar al panel de IONOS con los accesos disponibles:
- Cuenta logueada: **Hislay Conesa**, email `hislay@gmail.com`, **ID de cliente 27064042**.
- En **"Sitios web & tiendas"** → dice **"No se han encontrado sitios web"** (no hay Web
  Hosting ni constructor activo).
- **No aparece "Deploy Now"** como producto.
- El cliente dice que **el sitio actual SÍ está en IONOS**, por lo que **esta cuenta no es
  la correcta** — el dominio y el hosting deben estar bajo **otra cuenta de IONOS**.

### 👉 Próximo paso inmediato
Conseguir los accesos de la **cuenta IONOS correcta** (la que tenga el dominio
`mistermortgageusa.com` + el Web Hosting con el sitio actual). Para confirmar que una
cuenta es la correcta:
- En **"Dominios & SSL"** debe aparecer `mistermortgageusa.com`.
- En **"Sitios web & tiendas"** debe listarse un **Web Hosting** activo (no el mensaje
  vacío), y ahí están los datos de **SFTP/SSH** para subir el sitio.

---

## 🚧 FASES PENDIENTES (cuando haya acceso a la cuenta correcta)

### Fase 0 — Descubrimiento y respaldo
1. Identificar el plan: ¿**Web Hosting** clásico (FTP/SFTP/SSH + `.htaccess`) o **Deploy
   Now** (Git→build automático)? → No hay Deploy Now visible, así que probablemente
   **Web Hosting clásico** → camino SFTP.
2. Confirmar DNS de `mistermortgageusa.com` y a qué apunta el sitio viejo.
3. **Respaldar el sitio viejo** por SFTP a
   `C:\Robert\backups\mistermortgageusa-OLD-2026-05-29\` antes de reemplazarlo.

### Fase 2 — Despliegue
- **Camino recomendado (Web Hosting / SFTP):**
  1. `npm run build` → genera `dist/` (incluye `.htaccess`).
  2. Subir el **CONTENIDO de `dist/`** (no la carpeta) a la raíz web del cliente por SFTP.
  3. Verificar que `.htaccess` quede con permisos **644**.
  4. Si el plan permite, probar primero en una **subcarpeta/URL de staging**.
- **Alternativa (Deploy Now):** si en la cuenta correcta sí existe Deploy Now, conectarlo
  a `irisdigitllab/mister-mortgage-usa`, rama productiva `master`, build `npm run build`,
  salida `dist/`. Da SSL automático y staging.

### Fase 3 — Cutover del dominio (downtime mínimo)
1. Validar el sitio nuevo en staging ANTES de apuntar el dominio.
2. Apuntar `mistermortgageusa.com` al sitio nuevo.
3. Confirmar **SSL activo**.
4. Mantener el backup del sitio viejo hasta confirmar estabilidad.

---

## ✔️ Verificación end-to-end (hacer en staging de IONOS)

- [ ] Cada **URL limpia** carga: `/loan-options`, `/about-us`, `/our-team`, `/contact-us`,
      `/es`, `/es/sobre-nosotros`, etc.
- [ ] Cada **URL legacy `.html`** redirige 301 a la limpia (`curl -I`).
- [ ] Headers de seguridad presentes (`curl -I` → `Content-Security-Policy`,
      `Strict-Transport-Security`, `X-Frame-Options`).
- [ ] GSAP, calculadora, carrusel, modal de pre-cualificación y botón de WhatsApp
      funcionan sin errores 404 en consola.
- [ ] `sitemap.xml` lista URLs limpias y todas resuelven 200.
- [ ] Cambio de idioma EN/ES funciona.
- [ ] Tras cutover: dominio sirve el sitio nuevo por **HTTPS** con SSL válido.

---

## ❓ Decisiones pendientes de confirmar con el usuario

1. **Cuenta IONOS correcta** — conseguir el login que tenga el dominio + hosting.
2. **¿`www` o sin `www`?** — el `.htaccess` actual fuerza **sin www**
   (`mistermortgageusa.com`), igual que el sitemap. Si el cliente prefiere `www`, ajustar
   la regla de canonicalización en `public/.htaccess` (líneas del bloque "Force non-www").
3. **¿Mergear el PR #2 a `master`?** — el plan deja `master` como rama productiva; el PR
   está listo para mergear cuando se valide.

---

## 📁 Archivos clave del proyecto

- `astro.config.mjs` — config Astro (output static, format file, i18n en/es).
- `public/.htaccess` — config Apache/IONOS (URLs limpias, redirects, headers, caché).
- `public/sitemap.xml` — sitemap que se publica (el de la raíz es copia).
- `netlify.toml` — **referencia** de redirects/headers/caché (fuente de verdad portada al
  `.htaccess`). Se puede eliminar tras confirmar que IONOS funciona.
- `src/data/nav.ts` y `src/data/loans.ts` — definen todas las rutas EN/ES y los slugs.
- `src/pages/` — páginas Astro (incluye `[slug].astro` y `es/[slug].astro` para landings).

## 🧠 Plan completo guardado en
`C:\Users\padom\.claude\plans\cosmic-booping-moon.md`
