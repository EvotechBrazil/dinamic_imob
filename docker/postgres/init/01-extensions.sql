-- ============================================================
-- Dinamic Imobiliária — Extensões PostgreSQL iniciais
-- Executado pelo entrypoint do postgres na primeira inicializacao
-- da database (NAO roda em restarts subsequentes).
-- ============================================================

-- pgvector: embeddings para RAG do agente IA (Sprint 3 Backend)
CREATE EXTENSION IF NOT EXISTS vector;

-- pg_trgm: busca fuzzy por similaridade (fallback / busca interna admin)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- unaccent: normaliza acentos para busca PT-BR
CREATE EXTENSION IF NOT EXISTS unaccent;

-- citext: text case-insensitive (uso em emails, slugs)
CREATE EXTENSION IF NOT EXISTS citext;

-- uuid-ossp: geracao de UUIDs (Prisma usa cuid2 mas mantem disponivel)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
