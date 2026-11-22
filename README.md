# harvey-nav

> Personal developer launchpad &amp; AI verification hub for **Harvey | Tech Builder** ([@lxy71 on X](https://x.com/lxy71)).

Clean, zero-build static start page designed for fast VPS deployment (Nginx / Caddy / Cloudflare Pages) with light &amp; dark theme support, `!bang` multi-engine search, live weather, and direct links to open-source work ([`ai-verify-guards`](https://github.com/haiwei971-ui/ai-verify-guards)).

---

## Highlights

- **Builder Identity &amp; Open-Source Showcase**: Unified branding with `@lxy71` (*"Trust the shell, not the summary."*), direct links to X &amp; GitHub, plus a one-click copy `git clone` card for `ai-verify-guards`.
- **Keyboard-First `!bang` Search**: Press `/` or `⌘K` to jump straight to Google, GitHub (`!gh`), X live search (`!x`), live Claude Code discussions (`!cc`), ChatGPT (`!gpt`), Claude (`!claude`), Gemini (`!gemini`), Perplexity (`!pplx`), or Grok (`!grok`).
- **Zero-Dependency Static Architecture**: Single self-contained `index.html` + local `icons/` SVGs — no bundler, no framework, instant load.
- **SEO &amp; Social Cards**: Clean OpenGraph and Twitter Card meta tags so sharing your personal domain on X renders cleanly.

---

## Quick VPS Update

On your VPS inside the `harvey-nav` web root:

```bash
git pull origin main
```

No build step or server restart required (if behind Cloudflare / Nginx cache, purge cache or hard-refresh).
