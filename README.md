# Shemitah · Projeto e Execução — site institucional

Landing page estática (HTML + CSS + JS puro, sem framework e sem build).
Feita para carregar rápido, funcionar em qualquer hospedagem e ser indexada
pelo Google.

## Estrutura

```
index.html            Página única (todo o conteúdo + SEO + JSON-LD)
404.html              Página de erro
css/styles.css        Estilos
js/main.js            Menu mobile, reveal ao rolar, header sticky, nav ativa
assets/img/*          Imagens (Unsplash, baixadas localmente)
assets/favicon.svg    Ícone
robots.txt            Libera indexação + aponta o sitemap
sitemap.xml           Mapa do site
site.webmanifest      PWA / ícone em dispositivos
_headers              Cabeçalhos de segurança e cache (Netlify/Cloudflare Pages)
netlify.toml          Config de deploy da Netlify (sem build)
```

## Rodar localmente

Não precisa de Node. Qualquer servidor estático serve:

```bash
python -m http.server 8080
```

Depois abra <http://localhost:8080>.

## Antes de publicar — trocar os placeholders

1. **Domínio** — hoje está `https://shemitah.com.br`. Faça um find/replace
   global em `index.html`, `sitemap.xml`, `robots.txt` e `site.webmanifest`.
2. **WhatsApp** — procure por `5543999999999` em `index.html` e troque pelo
   número real (formato `55` + DDD + número, só dígitos).
3. **Dados de negócio** — no fim do `index.html`, bloco
   `application/ld+json`: telefone, e-mail, endereço e horário reais.
   Isso alimenta o cartão do Google (Google Business).
4. **`sitemap.xml`** — atualize `<lastmod>` na data da publicação.

## Deploy

### Netlify / Cloudflare Pages (recomendado)
Arraste a pasta ou conecte o repositório. Sem comando de build,
diretório de publicação = raiz (`.`). O `_headers` e o `netlify.toml`
já vão junto.

### GitHub Pages

O site já está pronto para o Pages: caminhos relativos (funciona em
`usuario.github.io/repo/`), `.nojekyll` incluído (serve os arquivos como estão).

1. Criar o repositório no GitHub (pode ser privado).
2. Na pasta do projeto:

   ```bash
   git init
   git add .
   git commit -m "Site institucional Shemitah"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/shemitah.git
   git push -u origin main
   ```

3. No GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch → Branch: `main` / `/ (root)` → Save**.
4. Em ~1 min o site sai no ar (primeiro em `SEU_USUARIO.github.io/shemitah/`,
   depois no domínio próprio abaixo).

### Domínio próprio — `shemitah.com.br` (já registrado)

O arquivo **`CNAME`** (raiz, conteúdo `shemitah.com.br`) já está no projeto.
Falta só o DNS + ligar no GitHub.

**1. DNS no Registro.br** (Painel → domínio → *Editar Zona / DNS*):

| Tipo  | Nome / Host | Valor |
|-------|-------------|-------|
| A     | `@`         | `185.199.108.153` |
| A     | `@`         | `185.199.109.153` |
| A     | `@`         | `185.199.110.153` |
| A     | `@`         | `185.199.111.153` |
| CNAME | `www`       | `SEU_USUARIO.github.io.` |

(Opcional, IPv6 — 4 registros `AAAA` no `@`:
`2606:50c0:8000::153`, `...8001::153`, `...8002::153`, `...8003::153`.)

**2. No GitHub:** Settings → Pages → *Custom domain* → `shemitah.com.br` → Save.
Aguardar o check de DNS ficar verde (pode levar de minutos a algumas horas) e
então marcar **Enforce HTTPS**.

**3. Conferir:** `https://shemitah.com.br` abre o site e `www` redireciona pra ele.
`canonical`, `og:url`, `sitemap.xml` e `robots.txt` já apontam pra esse domínio —
nada mais a trocar.

> `_headers` e `netlify.toml` são ignorados pelo GitHub Pages (cache/segurança
> extra só valem em Netlify/Cloudflare). Não atrapalham — pode deixar.

## Depois de publicar (SEO)

- Cadastrar o site no [Google Search Console](https://search.google.com/search-console)
  e enviar o `sitemap.xml`.
- Criar/!vincular o perfil no Google Business (Perfil da Empresa) para
  aparecer no mapa de Londrina.
- Conferir o preview de compartilhamento no
  [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/).

## Notas

- As imagens são fotos do Unsplash (uso livre). Substitua por fotos reais das
  obras assim que possível — melhora conversão e SEO.
- Sem conexão com banco. Os CTAs levam para WhatsApp e Instagram.
