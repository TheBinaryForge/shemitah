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
_headers              Cabeçalhos de segurança e cache (Cloudflare Pages)
_redirects            Redireciona www -> apex (Cloudflare Pages)
```

## Rodar localmente

Não precisa de Node. Qualquer servidor estático serve:

```bash
python -m http.server 8080
```

Depois abra <http://localhost:8080>.

## Antes de publicar — trocar os placeholders

1. **WhatsApp** — procure por `5543999999999` em `index.html` e troque pelo
   número real (formato `55` + DDD + número, só dígitos).
2. **Dados de negócio** — no fim do `index.html`, bloco
   `application/ld+json`: telefone, e-mail, endereço e horário reais.
   Isso alimenta o cartão do Google (Google Business).
3. **`sitemap.xml`** — atualize `<lastmod>` a cada publicação relevante.

> Domínio (`https://shemitah.com.br`) já está cravado em `index.html`,
> `sitemap.xml` e `robots.txt`. Nada a trocar.

## Deploy — Cloudflare Pages

Repo pode ser **privado**. Sem build. Caminhos relativos.
`_headers` e `_redirects` são lidos nativamente pelo Cloudflare Pages.

### 1. Ligar o domínio ao Cloudflare (nameservers)

1. Conta grátis em <https://dash.cloudflare.com> → **Add a site** → `shemitah.com.br`
   → plano **Free**.
2. O Cloudflare mostra **2 nameservers** (ex.: `xxx.ns.cloudflare.com`).
3. No **Registro.br** (Painel → `shemitah.com.br` → *Alterar servidores DNS*):
   troque os servidores DNS pelos 2 do Cloudflare → salvar.
   Propagação: minutos a ~24h. O Cloudflare avisa por e-mail quando ativar.

### 2. Criar o projeto Pages

1. Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**.
2. Autorizar o app do Cloudflare no GitHub (pode liberar só `TheBinaryForge/shemitah`).
3. Selecionar o repo. Configuração de build:
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** *(vazio)*
   - **Build output directory:** `/`
4. **Save and Deploy** → sai no ar em `shemitah-xxxx.pages.dev`.
   Cada `git push` na `main` republica sozinho.

### 3. Domínio customizado

No projeto Pages → **Custom domains → Set up a domain** → adicionar
`shemitah.com.br` e `www.shemitah.com.br`. Como o DNS já está no Cloudflare,
os registros são criados automaticamente. SSL sai em poucos minutos.
O redirect `www → shemitah.com.br` já está no arquivo `_redirects`.

### 4. Desligar o GitHub Pages

Repo → **Settings → Pages → Source → None** (para não haver dois sites
disputando o mesmo domínio). Depois, se quiser: **Settings → General →
Change visibility → Make private**.

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
