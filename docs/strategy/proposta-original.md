# Proposta de modernização do site Dinamic Imóveis com IA e webchat reativo

Data da análise: 21/05/2026  
Site analisado: https://www.dinamicimobiliaria.com.br

## 1. Objetivo do documento

Este documento consolida uma análise inicial ampliada do site atual da Dinamic Imóveis e organiza uma proposta de inovação para implantação de um novo modelo digital com agente de atendimento, busca inteligente de imóveis, webchat reativo, automações de captação e acompanhamento de oportunidades.

A intenção não é apenas "colocar um chatbot no site". A oportunidade real é transformar o site em uma central ativa de atendimento e conversão, capaz de:

- atender clientes 24/7;
- entender buscas em linguagem natural;
- qualificar compradores, locatários e proprietários;
- sugerir imóveis compatíveis;
- salvar buscas sem resultado;
- avisar o cliente quando surgir uma oportunidade;
- encaminhar leads prontos para vendas ou locação;
- reduzir trabalho operacional repetitivo da equipe;
- gerar dados de demanda para decisões comerciais.

## 2. Resumo executivo

O site atual da Dinamic Imóveis possui um ativo importante: um catálogo grande e público de imóveis, com páginas individuais, filtros por critérios relevantes, WhatsApp para vendas e locação, formulários de contato, área do cliente, favoritos, cadastro de imóvel, encomenda de imóvel, proposta e agendamento de visita.

Ao mesmo tempo, a experiência ainda depende muito de navegação manual e de contato direto pelo WhatsApp. O usuário precisa saber filtrar, comparar e decidir quase sozinho. A imobiliária recebe contatos, mas perde oportunidades de qualificar intenção, registrar demandas não atendidas e automatizar retornos quando surgem imóveis compatíveis.

A proposta é implantar uma camada de inteligência sobre o site atual ou construir um novo site já orientado por IA. O caminho mais recomendado é iniciar com um MVP integrado ao site atual para validar ganhos de atendimento e conversão, e evoluir para um novo site com IA nativa, busca conversacional, radar de oportunidades e gestão estruturada de leads.

## 3. Fontes e páginas analisadas

Páginas e recursos públicos analisados:

- Home: https://www.dinamicimobiliaria.com.br/
- Listagem completa de imóveis: https://www.dinamicimobiliaria.com.br/imobiliaria/imoveis
- Sitemap: https://www.dinamicimobiliaria.com.br/sitemap.xml
- Robots: https://www.dinamicimobiliaria.com.br/robots.txt
- Contato: https://www.dinamicimobiliaria.com.br/contato.php
- Quem somos: https://www.dinamicimobiliaria.com.br/quem-somos.php
- Serviços: https://www.dinamicimobiliaria.com.br/servicos.php
- Equipe: https://www.dinamicimobiliaria.com.br/equipe.php
- Trabalhe conosco: https://www.dinamicimobiliaria.com.br/trabalhe.php
- Parceiros: https://www.dinamicimobiliaria.com.br/parceiros.php
- Dicionário imobiliário: https://www.dinamicimobiliaria.com.br/dicionario.php
- Links úteis: https://www.dinamicimobiliaria.com.br/links-uteis.php
- Notícias: https://www.dinamicimobiliaria.com.br/noticia.php
- Financiamento: https://www.dinamicimobiliaria.com.br/financiamento.php
- Política de privacidade: https://www.dinamicimobiliaria.com.br/privacy.php
- Exemplos de páginas de imóveis:
  - https://www.dinamicimobiliaria.com.br/737/imoveis/venda-casa-3-quartos-condominio-gran-residence-arapongas-pr
  - https://www.dinamicimobiliaria.com.br/736/imoveis/venda-locacao-apartamento-2-quartos-centro-arapongas-pr
  - https://www.dinamicimobiliaria.com.br/733/imoveis/locacao-sobrado-3-quartos-jardim-alto-da-boa-vista-arapongas-pr
  - https://www.dinamicimobiliaria.com.br/724/imoveis/venda-terreno-residencial-tozzi-arapongas-pr
  - https://www.dinamicimobiliaria.com.br/726/imoveis/locacao-sala-vila-sampaio-arapongas-pr

Observação: a análise foi feita sobre conteúdo público. Não foram enviados formulários reais para evitar geração de contatos falsos.

## 4. Diagnóstico do site atual

### 4.1 Estrutura geral

O site parece ser baseado em uma solução imobiliária pronta, vinculada a Code49/Flex49, com páginas PHP, Bootstrap, jQuery e módulos próprios de busca, cliente, cadastro e WhatsApp.

Principais seções identificadas:

- Home com imóveis em destaque;
- Listagem completa de imóveis;
- Páginas individuais de imóveis;
- Contato;
- Quem somos;
- Serviços;
- Equipe;
- Trabalhe conosco;
- Parceiros;
- Dicionário imobiliário;
- Links úteis;
- Notícias;
- Financiamento;
- Área do cliente;
- Favoritos;
- Cadastro de imóvel;
- Encomenda de imóvel;
- Proposta;
- Horário pretendido de visita;
- WhatsApp para vendas e locação.

### 4.2 Inventário de imóveis

O sitemap público lista 618 URLs, sendo:

| Item | Quantidade aproximada |
| --- | ---: |
| URLs totais no sitemap | 618 |
| URLs de imóveis | 616 |
| URLs não relacionadas a imóveis | 2 |
| Imóveis visíveis na página de listagem | 573 |

Distribuição por transação no sitemap:

| Transação | Quantidade aproximada |
| --- | ---: |
| Venda | 401 |
| Locação | 215 |

Distribuição por tipo identificada nas URLs:

| Tipo | Quantidade aproximada |
| --- | ---: |
| Casa | 282 |
| Sala | 84 |
| Apartamento | 54 |
| Terreno | 52 |
| Sobrado | 38 |
| Barracão | 35 |
| Área | 33 |
| Chácara | 23 |
| Área de lazer | 12 |
| Salão comercial | 8 |
| Kitnet | 5 |
| Conjunto comercial | 4 |
| Terreno em condomínio | 3 |

Distribuição geográfica aproximada nas URLs:

| Cidade | Presença aproximada |
| --- | ---: |
| Arapongas | 597 |
| Sabáudia | 11 |
| Astorga | 2 |
| Londrina | 2 |
| Paraná | 2 |
| Apucarana | 1 |
| Rolândia | 1 |

Temas recorrentes nas URLs e descrições:

| Critério | Ocorrências aproximadas |
| --- | ---: |
| 3 quartos | 215 |
| 2 quartos | 109 |
| 4 quartos | 25 |
| Centro | 103 |
| Jardim | 322 |
| Residencial | 30 |
| Condomínio | 7 |

Leitura comercial: a base tem forte vocação local em Arapongas, com volume relevante de casas, locações residenciais, salas comerciais, terrenos e imóveis de médio/alto padrão. Isso favorece uma IA especializada em atendimento local e busca consultiva.

### 4.3 Busca atual

A listagem de imóveis já oferece filtros importantes:

- transação: venda e locação;
- tipo de imóvel;
- cidade;
- região;
- bairro;
- condomínio/empreendimento;
- finalidade;
- valor de venda;
- valor de locação;
- área útil;
- área do terreno;
- quartos;
- suítes;
- banheiros;
- garagem;
- aceita financiamento;
- estuda permuta;
- imóvel com foto;
- em condomínio;
- características, como área de serviço;
- ordenação por maior valor, menor valor e relevância.

Ponto positivo: o conjunto de filtros é rico.  
Ponto fraco: o cliente precisa operar tudo manualmente. A busca não conversa, não interpreta frases, não explica ausência de resultado e não transforma uma busca sem resultado em oportunidade futura.

### 4.4 Atendimento atual

Foram identificados contatos diretos por WhatsApp:

- Vendas: (43) 98847-8713
- Locação: (43) 98847-8670

Também existem chamadas para:

- Fale conosco;
- Atendimento online;
- Ligamos para você;
- Simule seu financiamento;
- Área do cliente;
- Imóveis favoritos;
- Cadastrar imóvel;
- Encomendar imóvel.

Há referência a atendimento online antigo, aparentemente por janela/pop-up, mas o comportamento principal atual é WhatsApp.

Leitura comercial: o WhatsApp já é o canal central. A IA deve respeitar isso e funcionar como pré-atendimento e qualificação, não como substituta cega do corretor.

### 4.5 Páginas de imóvel

As páginas individuais têm:

- título do imóvel;
- código/referência;
- preço de venda e/ou locação;
- localização/bairro;
- fotos;
- características;
- descrição livre;
- CTA para contato;
- WhatsApp;
- proposta;
- horário pretendido de visita;
- favoritos/área do cliente.

Exemplos observados:

- Imóvel 737: casa à venda no Condomínio Gran Residence por R$ 1.550.000,00;
- Imóvel 736: apartamento para locação e venda no Edifício Paris, com aluguel, condomínio e valor de venda;
- Imóvel 733: sobrado para locação no Jardim Alto da Boa Vista;
- Imóvel 724: terreno à venda no Residencial Tozzi;
- Imóvel 726: sala comercial para locação na Vila Sampaio.

Pontos de melhoria:

- descrições com erros de digitação e padronização;
- variação de formato para preço, área, condomínio e características;
- algumas informações misturam texto comercial, detalhes técnicos e aviso legal;
- oportunidade de gerar resumo curto, pontos fortes, perguntas frequentes e dados estruturados para SEO.

### 4.6 Formulários e fluxos existentes

Formulários/fluxos identificados:

- contato;
- login;
- registro;
- recuperação de senha;
- cadastro de imóvel por tipo;
- encomenda de imóvel;
- proposta;
- horário pretendido de visita;
- trabalhe conosco;
- ligamos para você;
- financiamento.

Campos recorrentes:

- nome;
- telefone;
- e-mail;
- senha;
- mensagem;
- cidade;
- dados pessoais e profissionais em Trabalhe Conosco;
- id do imóvel em fluxos de proposta/visita.

Leitura técnica: já existem pontos naturais para captura de dados. A IA pode preencher ou pré-preencher esses fluxos, mas a integração final depende do acesso ao CRM/site atual.

### 4.7 SEO e performance

Pontos observados:

- o sitemap público está muito focado em imóveis, mas não inclui diversas páginas institucionais;
- há canonical e meta description;
- não foi identificado JSON-LD/Schema estruturado para imóveis;
- listagem completa gera página pesada, com muitos imóveis e imagens;
- páginas usam muitos scripts e CSS;
- respostas têm cache restritivo, como no-cache/no-store;
- várias descrições de imóveis poderiam ser reescritas para clareza, SEO e conversão.

Oportunidades:

- Schema.org para RealEstateListing/Residence/Offer, dentro do que for tecnicamente adequado;
- sitemap completo para páginas institucionais, bairros, categorias e imóveis;
- landing pages por bairro e tipo;
- otimização de imagens;
- cache control mais eficiente;
- melhoria de Core Web Vitals;
- conteúdo local orientado a busca: "casas à venda em Arapongas", "salas comerciais para locação no Centro", "terrenos no Residencial Tozzi", etc.

## 5. Dores e oportunidades identificadas

### 5.1 Dores do cliente final

O usuário que entra no site pode ter dificuldades como:

- não saber exatamente qual filtro usar;
- buscar imóvel por intenção, não por campos técnicos;
- não entender diferença entre valor de aluguel, condomínio e venda;
- querer comparar imóveis sem abrir muitas abas;
- ter dúvidas sobre documentação;
- querer visita rápida, mas não saber horário disponível;
- procurar um imóvel que ainda não existe no catálogo;
- desistir se não encontra resultado na primeira busca;
- preferir perguntar no WhatsApp, mas demorar a receber triagem fora do horário comercial.

### 5.2 Dores da imobiliária

Do lado operacional, a imobiliária provavelmente enfrenta:

- WhatsApp com mensagens repetitivas;
- leads sem orçamento definido;
- pessoas perguntando por imóveis já indisponíveis;
- baixa rastreabilidade de buscas sem resultado;
- dificuldade de saber demanda reprimida por bairro, valor e tipo;
- trabalho manual para responder detalhes que já estão no anúncio;
- perda de leads fora do horário comercial;
- baixo aproveitamento de dados de navegação;
- textos de imóveis pouco padronizados;
- dificuldade de nutrir clientes que "ainda estão olhando".

### 5.3 Oportunidade central

Transformar o site de vitrine passiva em um consultor ativo:

- entende intenção;
- recomenda imóveis;
- coleta dados;
- salva demanda;
- chama corretor quando faz sentido;
- acompanha oportunidades;
- aprende quais imóveis e bairros têm maior procura.

## 6. Visão de solução

A solução proposta é uma plataforma de atendimento e busca com IA, acoplada ao site atual ou incorporada a um novo site.

Componentes principais:

1. Webchat reativo no site;
2. Agente IA de atendimento imobiliário;
3. Busca conversacional de imóveis;
4. Radar de oportunidades;
5. Qualificação e distribuição de leads;
6. Integração com WhatsApp;
7. Painel de gestão de leads e demandas;
8. Base de conhecimento da imobiliária;
9. Otimização de conteúdo e SEO;
10. Automação de follow-up.

## 7. Módulos de inovação que podemos oferecer

### 7.1 Agente IA de atendimento 24/7

Um assistente treinado para responder dúvidas sobre:

- compra;
- venda;
- locação;
- documentação;
- financiamento;
- visitas;
- proposta;
- cadastro de imóvel;
- bairros atendidos;
- horários;
- canais corretos de atendimento;
- detalhes dos imóveis disponíveis.

Capacidades:

- identifica se o cliente quer comprar, alugar, vender ou anunciar;
- coleta nome, telefone, e-mail e preferência de contato;
- entende orçamento e urgência;
- responde com base no catálogo e na base de conhecimento;
- evita inventar informações;
- transfere para humano quando necessário;
- registra resumo da conversa para o corretor.

### 7.2 Busca conversacional de imóveis

O cliente pode escrever como falaria com um corretor:

- "Quero uma casa até 350 mil com 3 quartos em Arapongas";
- "Tem apartamento para alugar no Centro com garagem?";
- "Procuro sala comercial pequena até 1.500 reais";
- "Quero terreno em condomínio que aceite financiamento";
- "Preciso de casa com suíte e área gourmet";
- "Tenho 250 mil e quero financiar uma casa, o que tem?"

A IA interpreta a frase, converte em filtros estruturados e retorna imóveis compatíveis.

Critérios que a IA pode extrair:

- transação: venda, locação ou ambos;
- tipo: casa, apartamento, sala, terreno, sobrado, barracão, chácara, área de lazer;
- cidade;
- bairro;
- faixa de preço;
- quartos;
- suítes;
- garagem;
- condomínio;
- aceita financiamento;
- aceita permuta;
- características desejadas;
- urgência;
- perfil: moradia, investimento, comércio, lazer.

### 7.3 Ranking inteligente de imóveis

Além de filtrar, a IA pode ranquear os imóveis por aderência ao pedido.

Exemplo:

Pedido: "casa em Arapongas até 400 mil, 3 quartos, aceita financiamento, região tranquila".

Resposta ideal:

1. Imóvel mais aderente, explicando por que combina;
2. Imóvel quase aderente, indicando o que falta ou passa do orçamento;
3. Alternativas por bairro ou faixa de preço;
4. Sugestão de salvar busca se não houver resultado perfeito.

Isso melhora conversão porque o cliente entende as opções, em vez de receber apenas uma lista seca.

### 7.4 Radar de oportunidades

Funcionalidade-chave para o diferencial comercial.

Quando não há imóvel compatível, a IA oferece:

"Não encontrei exatamente esse perfil agora. Posso salvar essa busca e te avisar quando aparecer uma oportunidade?"

Dados salvos:

- nome;
- telefone/WhatsApp;
- e-mail opcional;
- tipo de imóvel;
- compra ou locação;
- cidade;
- bairros desejados;
- faixa de preço;
- quartos/suítes;
- garagem;
- financiamento/permuta;
- características obrigatórias;
- características desejáveis;
- prazo de compra/locação;
- consentimento para contato.

Quando um novo imóvel entra no catálogo ou um imóvel muda preço/disponibilidade, o sistema compara com buscas salvas e dispara:

- WhatsApp;
- e-mail;
- notificação interna para corretor;
- tarefa de follow-up.

Essa função transforma busca sem resultado em lista de demanda ativa.

### 7.5 Webchat reativo por comportamento

O webchat não deve ficar parado esperando o usuário perguntar. Ele pode reagir ao contexto.

Gatilhos sugeridos:

| Situação | Mensagem sugerida |
| --- | --- |
| Usuário fica 30-45s em página de imóvel | "Quer que eu verifique se esse imóvel combina com o que você procura?" |
| Usuário visita 3 imóveis parecidos | "Posso comparar essas opções para você." |
| Usuário usa filtros e não encontra resultado | "Quer salvar essa busca e receber aviso quando surgir algo parecido?" |
| Usuário vê imóvel de locação | "Quer saber documentos necessários ou agendar visita?" |
| Usuário vê imóvel de venda | "Quer simular financiamento ou falar com vendas?" |
| Usuário volta várias vezes ao mesmo imóvel | "Esse imóvel chamou sua atenção? Posso te ajudar com visita ou proposta." |
| Usuário está na página de financiamento | "Posso estimar uma faixa de parcela e separar imóveis compatíveis." |
| Usuário está em contato | "Me diga o que precisa e eu direciono para a equipe certa." |

Cuidados:

- não ser invasivo;
- limitar frequência de mensagens;
- respeitar horário e privacidade;
- permitir fechar facilmente;
- não bloquear navegação.

### 7.6 Agendamento de visitas

Fluxo inteligente:

1. Cliente escolhe imóvel ou descreve interesse;
2. IA confirma nome e telefone;
3. IA pergunta melhor data/horário;
4. IA pergunta se a visita é para compra ou locação;
5. IA coleta observações;
6. Sistema envia para equipe ou agenda diretamente se houver calendário integrado.

Níveis de implantação:

- básico: gera lead com horário pretendido;
- intermediário: envia para WhatsApp/e-mail interno;
- avançado: integra Google Calendar/Outlook e bloqueia horários;
- completo: confirma visita automaticamente com corretor e cliente.

### 7.7 Pré-proposta assistida

Para imóveis de venda ou locação, a IA pode orientar a criação de uma pré-proposta.

Exemplos:

- "Qual valor você pretende oferecer?";
- "Vai financiar?";
- "Tem imóvel ou veículo em permuta?";
- "Para locação, qual data pretende entrar?";
- "Você já tem documentação separada?"

Resultado:

- lead mais qualificado;
- corretor recebe proposta contextualizada;
- redução de idas e vindas no WhatsApp.

### 7.8 Consultor de financiamento

Um módulo educativo, não bancário, para:

- explicar documentação comum;
- simular de forma aproximada;
- orientar entrada, prazo e renda necessária;
- sugerir imóveis dentro de uma faixa provável;
- direcionar para parceiro ou correspondente.

Importante: deixar claro que é uma simulação inicial e que taxas, aprovação e condições dependem da instituição financeira.

### 7.9 Comparador de imóveis

O cliente seleciona 2 a 4 imóveis e a IA compara:

- preço;
- bairro;
- metragem;
- quartos;
- garagem;
- condomínio;
- pontos fortes;
- pontos de atenção;
- melhor opção para família;
- melhor opção para investimento;
- melhor opção para comércio;
- melhor custo-benefício.

Esse recurso ajuda clientes indecisos e aumenta tempo qualificado no site.

### 7.10 Explicador de imóvel

Em cada página, a IA pode responder perguntas específicas:

- "Esse imóvel aceita financiamento?";
- "Tem suíte?";
- "Qual o bairro?";
- "Tem garagem?";
- "Qual o valor total com condomínio?";
- "É bom para família?";
- "Tem área gourmet?";
- "Qual o resumo desse imóvel?"

Quando a informação não estiver disponível, a IA responde com transparência:

"Essa informação não aparece no anúncio. Posso encaminhar sua dúvida para a equipe confirmar."

### 7.11 Enriquecimento automático de anúncios

Usando IA internamente, a imobiliária pode melhorar descrições:

- correção ortográfica;
- padronização de título;
- resumo curto;
- lista de características;
- texto comercial mais claro;
- versão para Instagram;
- versão para WhatsApp;
- meta description;
- tags e palavras-chave;
- identificação de inconsistências.

Exemplo de transformação:

Entrada: texto bruto do corretor.  
Saída:

- título comercial;
- resumo em 3 linhas;
- características em bullets;
- descrição completa;
- CTA;
- aviso legal padronizado.

### 7.12 Geração de conteúdo para redes sociais

A partir de um imóvel, a IA gera:

- legenda para Instagram;
- texto para WhatsApp;
- roteiro de vídeo curto;
- carrossel;
- chamada para stories;
- lista de hashtags locais;
- variações por perfil: família, investidor, comércio.

### 7.13 Páginas inteligentes por bairro e intenção

Criar páginas automáticas ou semiautomáticas como:

- Casas à venda em Arapongas;
- Apartamentos para alugar no Centro;
- Terrenos em Arapongas;
- Salas comerciais para locação em Arapongas;
- Imóveis que aceitam financiamento;
- Casas com 3 quartos em Arapongas;
- Imóveis em condomínio.

Essas páginas combinam SEO com busca prática e podem ter assistente contextual:

"Estou vendo que você procura casas no Jardim Paraná. Quer receber avisos de novas oportunidades nesse bairro?"

### 7.14 Captação de imóveis para proprietários

Fluxo para quem quer vender ou alugar:

- tipo de imóvel;
- endereço/bairro;
- metragem;
- quartos;
- estado de conservação;
- fotos;
- valor pretendido;
- urgência;
- matrícula/documentação;
- contato do proprietário.

O agente pode qualificar e enviar para avaliação da equipe.

### 7.15 Atendimento para locatários

Módulo específico para locação:

- documentos necessários;
- renda mínima aproximada;
- seguro fiança/fiador/caução, conforme política da imobiliária;
- regras de visita;
- disponibilidade;
- etapa de proposta;
- dúvidas frequentes sobre contrato.

### 7.16 Atendimento para compradores

Módulo específico para venda:

- entender se o cliente vai pagar à vista ou financiar;
- faixa de entrada;
- bairros desejados;
- perfil familiar;
- urgência;
- imóveis favoritos;
- simulação inicial;
- agendamento com corretor.

### 7.17 Atendimento comercial para imóveis comerciais

Como há volume relevante de salas, barracões e áreas, o site pode ter um fluxo especializado:

- tipo de negócio;
- metragem desejada;
- necessidade de vitrine/rua;
- estacionamento;
- carga/descarga;
- localização;
- orçamento;
- prazo de mudança;
- documentação PJ.

### 7.18 Painel de leads e demanda reprimida

Dashboard interno para visualizar:

- leads por canal;
- leads por compra/locação;
- imóveis mais perguntados;
- bairros mais buscados;
- faixas de preço mais desejadas;
- buscas sem resultado;
- tempo médio até atendimento humano;
- taxa de agendamento;
- taxa de conversão por corretor;
- oportunidades enviadas pelo radar;
- imóveis com alta demanda e baixa oferta.

Esse painel é estratégico porque mostra o que o mercado está pedindo, não apenas o que está anunciado.

### 7.19 Handoff inteligente para humano

A IA deve saber quando parar e chamar a equipe.

Casos para transferir:

- cliente pronto para visita;
- cliente quer fazer proposta;
- dúvida sobre documentação não cadastrada;
- negociação de preço;
- cliente irritado;
- solicitação sensível;
- informação que depende de confirmação;
- lead com alto potencial financeiro.

O corretor recebe:

- nome;
- telefone;
- intenção;
- imóveis vistos;
- resumo da conversa;
- perguntas pendentes;
- urgência;
- sugestão de abordagem.

### 7.20 Integração com WhatsApp

Opções:

1. Link inteligente para WhatsApp com mensagem pré-preenchida;
2. WhatsApp Business API com envio ativo mediante consentimento;
3. Integração com plataforma intermediária de atendimento;
4. Fila por setor: vendas, locação, captação, financeiro/documentação;
5. Resumo automático antes da transferência para humano.

No MVP, pode começar com link inteligente. Para radar automático e conversas persistentes, o ideal é WhatsApp Business API ou ferramenta homologada.

## 8. Arquiteturas possíveis

### 8.1 Caminho A - Camada de IA sobre o site atual

Mais rápido e menos invasivo.

Como funciona:

- instalar widget de webchat no site atual;
- indexar imóveis pelo sitemap e páginas públicas;
- atualizar índice em rotina diária ou horária;
- usar IA para responder e buscar;
- enviar leads para WhatsApp/e-mail/planilha/CRM;
- manter site atual como vitrine principal.

Vantagens:

- menor prazo;
- menor custo inicial;
- validação rápida;
- não depende de reconstruir tudo;
- reduz risco comercial.

Limitações:

- depende da qualidade do HTML público;
- disponibilidade pode não ser 100% em tempo real;
- integração profunda com proposta, visita e CRM depende de acesso técnico;
- personalização visual limitada pelo site atual.

Indicado para:

- MVP;
- prova de valor;
- primeira fase comercial.

### 8.2 Caminho B - Integração com feed/API do CRM imobiliário

Melhor do que raspar páginas públicas.

Como funciona:

- obter exportação ou API da Code49/Flex49 ou sistema utilizado;
- sincronizar imóveis em base estruturada;
- indexar dados normalizados;
- IA consulta dados confiáveis;
- leads retornam para CRM ou canal definido.

Vantagens:

- dados mais limpos;
- atualização mais confiável;
- melhor controle de disponibilidade;
- permite radar automático mais preciso.

Dependências:

- acesso a API/feed/exportação;
- autorização da empresa fornecedora;
- definição de campos e frequência de atualização.

Indicado para:

- fase 2 do projeto;
- radar de oportunidades;
- novo site com catálogo confiável.

### 8.3 Caminho C - Novo site com IA nativa

Construção de uma nova experiência.

Como funciona:

- novo front-end rápido e responsivo;
- busca tradicional e conversacional;
- páginas de imóvel otimizadas;
- chat contextual;
- área de favoritos/buscas salvas;
- SEO técnico;
- painel de leads;
- integração com CRM ou banco próprio.

Vantagens:

- controle total da experiência;
- melhor performance;
- SEO moderno;
- IA integrada de verdade;
- melhor conversão;
- base para evoluções futuras.

Limitações:

- prazo maior;
- depende de migração/sincronização;
- exige escopo e governança.

Indicado para:

- projeto principal após MVP;
- reposicionamento digital;
- crescimento de conversão e marca.

### 8.4 Caminho D - Plataforma completa de atendimento e inteligência comercial

Visão mais robusta.

Inclui:

- novo site;
- agente IA omnichannel;
- WhatsApp Business API;
- CRM de leads;
- dashboard de demanda;
- radar automático;
- automação de conteúdo;
- painel para corretores;
- relatórios gerenciais.

Indicado para:

- imobiliária que quer transformar o digital em operação comercial ativa.

## 9. Proposta de implantação por fases

### Fase 0 - Descoberta e alinhamento

Objetivo: definir o que será implantado primeiro e quais integrações são viáveis.

Atividades:

- reunião com equipe de vendas e locação;
- levantamento de dúvidas frequentes;
- levantamento dos fluxos atuais de atendimento;
- validação do CRM/site atual;
- checagem de possibilidade de API/exportação;
- definição de tom de voz do agente;
- definição dos setores e regras de transferência.

Entregáveis:

- mapa de fluxos;
- backlog priorizado;
- matriz de integrações;
- roteiro do MVP;
- critérios de sucesso.

### Fase 1 - MVP de agente IA no site atual

Objetivo: validar atendimento e busca conversacional sem reconstruir o site inteiro.

Funcionalidades:

- webchat no site;
- base de conhecimento inicial;
- indexação do catálogo público;
- busca conversacional;
- respostas sobre imóveis;
- captação de lead;
- encaminhamento para WhatsApp de vendas ou locação;
- resumo da conversa;
- registro de buscas sem resultado.

Entregáveis:

- widget instalado;
- agente configurado;
- painel simples de leads;
- logs de conversas;
- relatório inicial de uso.

Prazo estimado: 2 a 4 semanas, dependendo do acesso ao site e da plataforma escolhida.

### Fase 2 - Radar de oportunidades e automações

Objetivo: transformar buscas sem resultado em relacionamento ativo.

Funcionalidades:

- salvar busca do cliente;
- consentimento de contato;
- matching com novos imóveis;
- alerta por WhatsApp/e-mail;
- notificação interna para corretor;
- histórico de oportunidades enviadas;
- regras de frequência para não incomodar o cliente.

Entregáveis:

- motor de matching;
- base de buscas salvas;
- templates de mensagens;
- painel de demandas;
- relatórios por bairro, valor e tipo.

Prazo estimado: 3 a 6 semanas após MVP.

### Fase 3 - Novo site inteligente

Objetivo: substituir ou complementar o site atual por uma experiência moderna.

Funcionalidades:

- home focada em busca e atendimento;
- listagem otimizada;
- páginas de imóvel com IA contextual;
- favoritos;
- buscas salvas;
- comparador;
- SEO técnico;
- páginas por bairro/tipo;
- formulários inteligentes;
- integrações com CRM e WhatsApp.

Entregáveis:

- novo layout;
- novo front-end;
- integração com catálogo;
- webchat nativo;
- estrutura SEO;
- analytics de conversão.

Prazo estimado: 6 a 10 semanas, dependendo do escopo visual e das integrações.

### Fase 4 - Operação IA avançada

Objetivo: escalar a inteligência comercial.

Funcionalidades:

- dashboard gerencial;
- atendimento omnichannel;
- análise de conversas;
- sugestões automáticas para corretores;
- geração de textos de imóveis;
- campanhas de reativação;
- relatórios de demanda reprimida;
- pontuação de leads.

Entregáveis:

- painel avançado;
- automações internas;
- rotinas de melhoria;
- playbooks de atendimento.

## 10. Opções comerciais de pacote

### Pacote 1 - MVP Atendimento Inteligente

Escopo:

- webchat no site atual;
- agente IA treinado com perguntas frequentes;
- leitura do catálogo público;
- busca conversacional inicial;
- captura de leads;
- direcionamento para WhatsApp;
- relatório mensal básico.

Ideal para:

- validar rapidamente;
- mostrar inovação ao cliente final;
- reduzir perguntas repetitivas.

### Pacote 2 - IA Comercial + Radar

Escopo:

- tudo do Pacote 1;
- buscas salvas;
- radar de oportunidades;
- matching automático;
- alertas por WhatsApp/e-mail;
- painel de demanda reprimida;
- qualificação avançada.

Ideal para:

- aumentar conversão;
- aproveitar clientes sem imóvel compatível;
- gerar inteligência comercial.

### Pacote 3 - Novo Site com IA Nativa

Escopo:

- novo site;
- busca tradicional e conversacional;
- páginas de imóvel otimizadas;
- IA contextual;
- favoritos e buscas salvas;
- SEO técnico;
- integração com CRM/feed;
- painel de leads.

Ideal para:

- reposicionamento digital;
- experiência premium;
- performance e SEO.

### Pacote 4 - Plataforma Completa

Escopo:

- tudo do Pacote 3;
- WhatsApp Business API;
- atendimento omnichannel;
- painel de corretores;
- automação de conteúdo;
- relatórios gerenciais;
- scoring de leads;
- reativação de base.

Ideal para:

- operação digital madura;
- alto volume de atendimento;
- gestão por dados.

## 11. Experiência proposta para o usuário

### 11.1 Home

O primeiro contato deve priorizar ação:

- campo de busca natural: "Descreva o imóvel que procura";
- botões rápidos: Comprar, Alugar, Comercial, Terrenos, Financiamento;
- imóveis em destaque com CTA claro;
- chat contextual já preparado para perguntar o objetivo.

### 11.2 Listagem

Melhorias:

- filtros tradicionais preservados;
- busca por frase;
- chips de critérios interpretados pela IA;
- ordenação por aderência;
- mensagem inteligente quando houver poucos resultados;
- sugestão de ampliar bairro, preço ou tipo;
- botão "salvar busca".

### 11.3 Página de imóvel

Melhorias:

- resumo inteligente do imóvel;
- pontos fortes;
- ficha técnica organizada;
- CTA fixo para visita;
- perguntas rápidas;
- financiamento;
- comparação;
- imóveis similares;
- chat já sabendo qual imóvel está sendo visto.

### 11.4 Contato

Melhorias:

- triagem por objetivo;
- encaminhamento correto para vendas, locação, captação ou financeiro;
- captura estruturada;
- menos formulário genérico.

### 11.5 Área do cliente

Possível evolução:

- imóveis favoritos;
- buscas salvas;
- alertas ativos;
- histórico de atendimentos;
- visitas solicitadas;
- propostas enviadas.

## 12. Base de conhecimento da IA

Conteúdos que devem alimentar o agente:

- catálogo de imóveis;
- perguntas frequentes;
- dados de contato;
- horários de atendimento;
- regras de visita;
- documentação para locação;
- documentação para compra;
- documentação para financiamento;
- processo de proposta;
- processo para anunciar imóvel;
- política de privacidade;
- tom de voz da Dinamic;
- critérios de transferência para humano.

Exemplos de perguntas que a IA deve responder:

- "Quais documentos preciso para alugar?";
- "Vocês têm casa até 300 mil?";
- "Tem imóvel que aceita financiamento?";
- "Como agendo visita?";
- "Esse imóvel ainda está disponível?";
- "Posso fazer proposta?";
- "Quero anunciar minha casa, como faço?";
- "Qual WhatsApp para locação?";
- "Tem sala comercial no Centro?";

## 13. Regras de segurança e qualidade da IA

A IA deve seguir regras claras:

- não inventar disponibilidade;
- não garantir aprovação de financiamento;
- não prometer desconto;
- não confirmar visita sem agenda válida;
- não compartilhar dados de outros clientes;
- não dar aconselhamento jurídico definitivo;
- não substituir análise documental;
- sempre encaminhar para humano em negociação;
- registrar consentimento antes de enviar alertas futuros;
- informar quando uma resposta depende de confirmação.

Resposta segura para informação ausente:

"Essa informação não aparece no anúncio. Posso enviar sua dúvida para a equipe confirmar com segurança."

## 14. LGPD e privacidade

Como haverá coleta de dados pessoais, a implantação deve prever:

- consentimento claro para contato;
- consentimento separado para receber alertas de oportunidades;
- opção de descadastro;
- finalidade do uso dos dados;
- retenção definida;
- logs de atendimento;
- controle de acesso interno;
- política de privacidade atualizada;
- tratamento adequado de dados sensíveis;
- minimização de dados: coletar apenas o necessário.

Campos sensíveis que exigem cuidado:

- renda;
- documentos;
- estado civil;
- endereço;
- dados profissionais;
- dados de financiamento.

Recomendação: no MVP, evitar coleta de documentos dentro do chat. Coletar apenas dados de contato e intenção, deixando documentos para etapa formal.

## 15. Métricas de sucesso

Métricas recomendadas:

| Métrica | Por que importa |
| --- | --- |
| Conversas iniciadas | Mede adoção do webchat |
| Leads capturados | Mede geração comercial |
| Leads qualificados | Mede qualidade, não só volume |
| Agendamentos solicitados | Mede intenção alta |
| Buscas sem resultado salvas | Mede demanda reprimida |
| Alertas enviados | Mede funcionamento do radar |
| Respostas transferidas para humano | Mede handoff |
| Tempo médio até atendimento humano | Mede eficiência |
| Imóveis mais perguntados | Ajuda priorização comercial |
| Bairros mais buscados | Ajuda captação |
| Faixas de preço mais buscadas | Ajuda estratégia de estoque |
| Taxa de conversão por canal | Mede ROI |

## 16. Backlog de funcionalidades

### Essenciais para MVP

- Webchat no site;
- Agente com perguntas frequentes;
- Leitura do catálogo;
- Busca por linguagem natural;
- Captura de lead;
- Encaminhamento para WhatsApp;
- Registro de conversas;
- Mensagem de fallback segura;
- Painel simples para consulta de leads.

### Importantes para segunda etapa

- Busca salva;
- Radar de oportunidades;
- Matching automático;
- Alertas por WhatsApp/e-mail;
- Comparador de imóveis;
- Resumo inteligente por imóvel;
- Dashboard de demanda;
- Integração com CRM/feed.

### Avançadas

- WhatsApp Business API;
- Agenda integrada;
- Scoring de leads;
- Geração automática de anúncios;
- SEO programático;
- Área do cliente modernizada;
- Automação de campanhas;
- Painel de corretores;
- Atendimento omnichannel.

## 17. Integrações necessárias

### Integrações mínimas

- Site atual para inserir script do webchat;
- Catálogo público via sitemap/páginas;
- WhatsApp por link com mensagem pré-preenchida;
- E-mail ou planilha para registro de leads.

### Integrações recomendadas

- Feed/API do CRM imobiliário;
- Banco de dados estruturado de imóveis;
- WhatsApp Business API;
- CRM de leads;
- Google Analytics/Tag Manager;
- Google Search Console;
- Calendário de visitas;
- Serviço de e-mail transacional.

### Pontos a confirmar com o fornecedor atual

- Existe API de imóveis?
- Existe exportação XML/JSON/CSV?
- É possível receber webhook quando um imóvel novo entra?
- É possível gravar lead direto no CRM?
- É possível atualizar disponibilidade?
- É possível customizar páginas/templates?
- É possível inserir scripts globais no site?
- Existe ambiente de homologação?

## 18. Riscos e mitigação

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Não haver API do CRM atual | Limita integração em tempo real | Começar com indexação pública e evoluir para feed |
| Dados dos imóveis inconsistentes | IA pode responder com baixa precisão | Normalização, validação e resposta segura |
| WhatsApp sem API oficial | Limita automação ativa | Começar com link inteligente e migrar para API |
| Excesso de mensagens reativas | Pode incomodar usuários | Frequência controlada e opção de fechar |
| IA inventar informação | Risco comercial | Guardrails, RAG e fallback para humano |
| Coleta indevida de dados | Risco LGPD | Consentimento, minimização e política atualizada |
| Catálogo muda com frequência | Desatualização | Sincronização periódica ou feed |
| Equipe não usar painel | Baixo ROI | Processo simples e handoff por WhatsApp/e-mail |

## 19. Recomendação estratégica

Recomendação em 3 movimentos:

### Movimento 1 - Validar valor rapidamente

Implantar o MVP no site atual:

- webchat;
- atendimento IA;
- busca conversacional;
- captação de lead;
- direcionamento para WhatsApp;
- registro de buscas sem resultado.

Objetivo: provar que a IA aumenta atendimento qualificado e reduz perda de leads.

### Movimento 2 - Criar o radar de oportunidades

Depois do MVP, ativar buscas salvas e matching:

- cliente procura;
- site não encontra;
- IA salva interesse;
- sistema monitora novos imóveis;
- cliente recebe aviso;
- corretor recebe lead quente.

Objetivo: transformar ausência de estoque em relacionamento ativo.

### Movimento 3 - Modernizar o site

Com dados reais de uso, construir novo site:

- mais rápido;
- mais bonito;
- mais orientado a conversão;
- SEO melhor;
- IA nativa;
- dashboard;
- integrações reais.

Objetivo: sair de uma vitrine tradicional para uma operação digital inteligente.

## 20. Escopo sugerido para a primeira entrega

Primeira entrega recomendada:

1. Widget de webchat no site atual;
2. Agente IA com identidade Dinamic;
3. Base de FAQ inicial;
4. Indexação dos imóveis públicos;
5. Busca conversacional;
6. Resposta contextual em páginas de imóvel;
7. Captura de nome, telefone, interesse e orçamento;
8. Encaminhamento para WhatsApp de vendas ou locação;
9. Registro de buscas sem resultado;
10. Relatório semanal de leads e demandas.

Critério de sucesso:

- o cliente consegue perguntar por imóvel em linguagem natural;
- a IA sugere opções reais;
- a IA salva demanda quando não há opção;
- a equipe recebe lead com contexto;
- as conversas ficam rastreáveis.

## 21. Exemplos de jornadas

### Jornada 1 - Cliente comprador

Cliente: "Procuro casa até 400 mil em Arapongas com 3 quartos."

IA:

- identifica compra;
- filtra casas em Arapongas;
- considera orçamento;
- prioriza imóveis com 3 quartos;
- mostra 3 opções;
- pergunta se aceita ampliar bairro ou valor;
- oferece visita ou WhatsApp com vendas.

### Jornada 2 - Cliente locatário

Cliente: "Tem apartamento no Centro até 2.500?"

IA:

- identifica locação;
- busca apartamentos no Centro;
- mostra valor de aluguel e condomínio quando disponível;
- pergunta se precisa garagem;
- oferece agendar visita;
- direciona para WhatsApp de locação.

### Jornada 3 - Busca sem resultado

Cliente: "Quero terreno em condomínio até 250 mil."

IA:

- busca imóveis compatíveis;
- se não encontrar, explica;
- sugere alternativas próximas;
- oferece salvar busca;
- coleta consentimento;
- ativa radar.

### Jornada 4 - Proprietário

Cliente: "Quero vender minha casa."

IA:

- coleta tipo, bairro, metragem, quartos, valor pretendido;
- pergunta se possui fotos;
- coleta contato;
- envia para equipe de captação;
- agenda retorno.

### Jornada 5 - Imóvel comercial

Cliente: "Preciso de barracão para oficina."

IA:

- identifica uso comercial;
- pergunta metragem, localização, necessidade de pátio e orçamento;
- busca barracões/áreas;
- apresenta opções;
- transfere para atendimento especializado.

## 22. Melhorias específicas no site atual

### Conversão

- CTA mais claro em cada imóvel;
- botão fixo de "Agendar visita";
- botão "Tenho interesse";
- botão "Salvar busca";
- WhatsApp com mensagem contextual;
- destaque para "vendas" e "locação" conforme tipo do imóvel;
- formulários menores e orientados por etapas.

### Conteúdo

- padronizar títulos;
- corrigir descrições;
- separar ficha técnica de texto comercial;
- destacar diferenciais;
- criar resumo curto;
- criar FAQ por imóvel.

### SEO

- adicionar Schema/JSON-LD;
- melhorar sitemap;
- criar páginas por bairro/tipo;
- revisar meta descriptions;
- otimizar imagens;
- melhorar headings;
- criar conteúdo local.

### Performance

- reduzir peso da listagem;
- lazy load efetivo;
- otimizar imagens;
- revisar cache;
- reduzir CSS/JS não utilizado;
- paginação ou carregamento progressivo.

### Experiência mobile

- busca mais simples;
- botões de contato fixos;
- chat com abertura discreta;
- cards mais escaneáveis;
- filtros em modo drawer;
- CTA de WhatsApp com contexto.

## 23. Possível stack técnica

### Para MVP sobre site atual

- Widget webchat customizado ou plataforma de chat;
- Backend Node.js/NestJS ou equivalente;
- Banco PostgreSQL;
- Vetor/embeddings para busca semântica;
- Indexador de sitemap;
- Integração WhatsApp por link inicialmente;
- Painel simples em Next.js ou ferramenta interna;
- Logs e analytics.

### Para novo site

- Front-end Next.js;
- API backend;
- PostgreSQL;
- Redis para filas/cache;
- Worker de sincronização de imóveis;
- Busca híbrida: filtros estruturados + busca semântica;
- Integração com CRM/feed;
- WhatsApp Business API;
- Painel administrativo;
- Observabilidade e auditoria.

## 24. Perguntas para fechar escopo

Perguntas para a Dinamic/fornecedor:

1. Qual sistema/CRM alimenta o site hoje?
2. Existe API, XML, JSON ou CSV dos imóveis?
3. Com que frequência entram novos imóveis?
4. Quem atualiza disponibilidade e preços?
5. Como os leads são tratados hoje?
6. Existe equipe separada para venda e locação?
7. Quais horários de atendimento?
8. Quais dúvidas mais chegam no WhatsApp?
9. Quais documentos são exigidos para locação?
10. Quais parceiros de financiamento são usados?
11. A imobiliária quer WhatsApp automático ou apenas pré-atendimento?
12. Quem receberá alertas de leads?
13. O site atual permite inserir scripts globais?
14. Há interesse em novo site ou primeiro MVP?
15. Quais indicadores definem sucesso nos primeiros 60 dias?

## 25. Proposta de próximos passos

Próximo passo recomendado:

1. Validar com a Dinamic a visão de MVP;
2. Confirmar acesso técnico ao site atual;
3. Confirmar se há API/feed do catálogo;
4. Definir tom de voz e regras do agente;
5. Montar FAQ inicial;
6. Criar protótipo do webchat;
7. Indexar imóveis públicos;
8. Testar busca conversacional;
9. Ativar captação de leads;
10. Medir por 30 dias.

Depois dos primeiros 30 dias:

- revisar conversas;
- identificar dúvidas recorrentes;
- medir leads qualificados;
- ajustar prompts e fluxos;
- decidir implantação do radar;
- planejar novo site com base em dados reais.

## 26. Mensagem comercial sugerida

Proposta em linguagem comercial:

"A Dinamic Imóveis já possui um catálogo forte e canais ativos de atendimento. Nossa proposta é modernizar essa experiência com um agente inteligente integrado ao site e ao WhatsApp, capaz de atender clientes 24 horas, entender buscas em linguagem natural, sugerir imóveis, qualificar leads, agendar visitas e salvar buscas sem resultado para avisar o cliente quando surgir uma oportunidade compatível. Em vez de o site funcionar apenas como vitrine, ele passa a atuar como consultor digital e motor de conversão."

## 27. Conclusão

O site atual tem base suficiente para uma implantação inicial de IA sem reconstrução imediata. Porém, o maior ganho virá quando a Dinamic combinar três frentes:

- atendimento inteligente;
- busca e radar de oportunidades;
- modernização da experiência do site.

A melhor estratégia é começar pequeno, medir rápido e evoluir com dados. O MVP deve provar valor no atendimento e na captura de leads. O radar transforma buscas perdidas em oportunidades futuras. O novo site consolida tudo em uma experiência mais moderna, rápida e orientada a conversão.

