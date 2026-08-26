# Handoff — Incidente de Email / DNS (mistermortgageusa.com)

> Documento de continuidad. Resuelto el 2026-06-01.
> Relacionado: [`HANDOFF-IONOS.md`](./HANDOFF-IONOS.md) (migración que originó el problema).

---

## 🔴 Síntoma reportado

El cliente **no recibía ningún correo** enviado a `contact@mistermortgageusa.com`.
Cualquier email que le mandaban (incluido el del formulario de la web) nunca llegaba.

## 🔍 Causa raíz

Durante la migración a IONOS/Apache del **2026-05-29**, al dominio se le aplicó la
plantilla DNS de **"Webhosting"** en el panel de IONOS. Esa acción **borró todos los
registros MX** de la zona (confirmado por WHOIS: `Updated On 2026-05-29`).

Sin registros MX, ningún servidor sabía dónde entregar el correo del dominio → todo el
correo entrante fallaba.

**Dónde vive realmente el correo:** Google Workspace (NO IONOS).
- Verificado: `contact@mistermortgageusa.com` es una cuenta válida de Google.
- El dominio hermano `mistermortgage.org` (misma cuenta) usa los mismos MX de Google.
- El buzón "Mail Basic" de IONOS para este dominio existe pero está **vacío / sin uso**
  (es un artefacto; NO es donde el cliente lee su correo).

## ✅ Solución aplicada (panel DNS de IONOS)

Zona DNS final de `mistermortgageusa.com`:

| Tipo       | Host     | Valor                                   | Pri |
|------------|----------|-----------------------------------------|-----|
| MX         | @        | aspmx.l.google.com                      | 1   |
| MX         | @        | alt1.aspmx.l.google.com                 | 5   |
| MX         | @        | alt2.aspmx.l.google.com                 | 5   |
| MX         | @        | aspmx2.googlemail.com                   | 10  |
| MX         | @        | aspmx3.googlemail.com                   | 10  |
| TXT (SPF)  | @        | `v=spf1 include:_spf.google.com ~all`   | —   |
| TXT        | `_dmarc` | `v=DMARC1; p=none; rua=mailto:postmaster@mistermortgageusa.com` | — |

Notas:
- Los registros **A/AAAA** del sitio web (IONOS, `74.208.236.140`) quedaron **intactos**.
- Al crear el primer MX, IONOS auto-añadió sus propios MX (`mx00/mx01.ionos.com`) y un
  SPF de IONOS porque detectó el buzón Mail Basic. **Esos se eliminaron** y el SPF se
  corrigió a Google (el de IONOS rompía el correo saliente desde Gmail).
- Confirmado funcionando: el cliente ya recibe correo.

## ⚠️ Para evitar que vuelva a pasar

- **NO aplicar la plantilla "Webhosting" completa** al dominio en IONOS sin preservar
  antes los MX/TXT de correo. Sólo tocar registros A/AAAA si hay que mover el hosting.
- El correo de este cliente es **Google Workspace**. Cualquier cambio de DNS debe
  mantener los 5 MX de Google y el SPF `include:_spf.google.com`.

## 📌 Pendiente (no relacionado con el email)

La sesión de migración del 29-may desplegó la web en el webspace de IONOS pero
**no se commitearon todos los cambios a GitHub**. Revisar el estado del webspace
(SFTP/SSH) vs. el repo cuando se retome.
