# START CAR MULTIMARCAS — Prévia do site

## Como abrir
Abra `index.html` no navegador. Não precisa de servidor.
Para publicar, suba a pasta inteira em qualquer hospedagem estática
(Hostinger, Vercel, Netlify, cPanel, etc.).

## Estrutura
```
index.html            Home (scroll misto: 1 vertical → 2 horizontais → resto vertical)
estoque.html          LP de Estoque com filtros
financiamento.html    LP de Financiamento (recebe ?veiculo=ID)
consignacao.html      LP de Consignação (nova)
assets/css/style.css  Identidade visual: preto · cromo · dourado
assets/js/data.js     >>> BASE DO ESTOQUE — trocar pela API do AutoCerto <<<
assets/js/app.js      Cards, carrossel, ficha, cookies, formulários
assets/img/           Logo (versão em fundo preto e versão transparente)
```

## Integração com o AutoCerto
Todo o estoque vive em `assets/js/data.js`, no array `STOCK`.
Cada item usa estes campos:

| campo | tipo | observação |
|---|---|---|
| id | string | código do veículo no AutoCerto |
| marca, modelo, versao | string | |
| ano, anoFab | número | |
| km | número ou null | null = "Consulte" |
| cor, combustivel, cambio | string | |
| portas | número | |
| preco | número ou null | null = "Sob consulta" |
| destaque | booleano | aparece na home |
| selo | string ou null | etiqueta no card (ex.: SUV, GNV) |
| opcionais | array de strings | |
| fotos | array de URLs | primeira = capa |

Basta a API devolver esse mesmo formato que nada mais precisa mudar.

## Formulários
Financiamento e consignação montam a mensagem com todos os dados
preenchidos (incluindo o veículo escolhido) e abrem o WhatsApp
**(21) 99131-4232**. Para trocar o número, edite `LOJA.whatsapp`
em `assets/js/data.js`.

## Fotos dos veículos
As fotos apontam para o CDN do AutoCerto (`autocerto.com/fotos/1865/...`),
que é a mesma origem que a integração vai usar. Se algum veículo sair
do estoque, o card exibe um placeholder no lugar da foto.

## Cookies e privacidade
O banner aparece em todas as páginas e o modal com a política completa
(incluindo LGPD) abre em qualquer link "Política de Privacidade".
