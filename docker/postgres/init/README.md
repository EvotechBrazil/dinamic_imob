# Postgres init scripts

Arquivos `.sql` aqui são executados em **ordem alfabética** pelo entrypoint do Postgres apenas na **primeira inicialização** da database (quando o volume está vazio).

Para forçar re-execução, apague o volume:

```bash
pnpm db:reset
```

## Arquivos

- `01-extensions.sql` — habilita pgvector, pg_trgm, unaccent, citext, uuid-ossp
