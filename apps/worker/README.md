# @dinamic/worker

Workers BullMQ para jobs assíncronos:

- `image-process` — Sharp resize variants (WebP/AVIF) após upload no R2
- `radar-match` — cron diário 6h, cruza `LeadProfile.ativo=true` × novos imóveis 24h
- `dunning` — D+1, D+5, D+15 escalonado para boletos vencidos
- `seo-page-generator` — gera páginas SEO por bairro+intenção
- `scrape-flex49` — migração inicial dos 628 imóveis (pós-demo)

**Status:** placeholder. Implementação na **task #11** do backlog.

Ver detalhes em `docs/squads/02-backend.md`.
