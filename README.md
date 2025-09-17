# 🏛️ PEC da Bandidagem - Análise Interativa

[![Deployment Status](https://img.shields.io/badge/deployment-ready-brightgreen)](https://github.com)
[![Data Validated](https://img.shields.io/badge/data-validated-blue)](docs/VALIDATION_REPORT.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Visualizações interativas dos padrões de votação da **PEC da Bandidagem** na Câmara dos Deputados brasileira.

## 🚀 Visualizar Online

**[👉 Acesse as visualizações interativas](https://pec-bandidagem.vercel.app/)**

## 📊 Visão Geral

Esta análise apresenta padrões de votação de **488 deputados** no 1º turno e **477 deputados** no 2º turno, com:

- **20 partidos políticos** analisados
- **27 estados** + Distrito Federal
- **72.3%** de aprovação no 1º turno
- **72.1%** de aprovação no 2º turno
- Apenas **3 deputados** (0.6%) mudaram de voto entre turnos

## 🎯 Navegação

| Página | Descrição | Características |
|--------|-----------|----------------|
| **[🏠 Início](index.html)** | Visão geral e navegação | Estatísticas principais e acesso rápido |
| **[🎯 Partidos](partidos.html)** | Análise partidária | Coesão, dissidências, correlações |
| **[🗺️ Estados](estados.html)** | Análise regional | Padrões geográficos, ranking por estado |
| **[🔄 Fluxo](fluxo.html)** | Mudanças entre turnos | Estabilidade, deputados que mudaram |

## 🛠️ Executar Localmente

### Opção 1: Abertura Direta
```bash
# Simplesmente abra qualquer arquivo HTML no navegador
open index.html
```

### Opção 2: Servidor Local
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pec-bandidagem.git
cd pec-bandidagem

# Inicie o servidor
npm start
# ou
./build.sh serve

# Acesse http://localhost:8080
```

## 📁 Estrutura do Projeto

```
/
├── index.html          # Página principal
├── partidos.html       # Análise partidária
├── estados.html        # Análise regional
├── fluxo.html         # Fluxo de votos
├── data.js            # Dados processados
├── package.json       # Configuração do projeto
├── build.sh          # Script de build/deploy
├── docs/             # Documentação
│   ├── RELATORIO_PEC_BANDIDAGEM.md
│   ├── VALIDATION_REPORT.md
│   └── DEVELOPMENT.md
├── raw-data/         # Dados originais
└── dist/            # Versão para deploy
```

## 📈 Principais Descobertas

### 🎯 Polarização Partidária
- **PL, Republicanos, PP**: >93% aprovação
- **PT, PSOL, PCdoB**: >80% rejeição
- **PSDB, PV**: Completamente divididos (50/50)

### 🗺️ Padrões Regionais
- **Tocantins e Piauí**: 100% aprovação
- **Norte/Nordeste**: Tendência de maior apoio
- **Sul/Sudeste**: Maior divisão e resistência

### 🔄 Estabilidade Extrema
- **99.4%** dos deputados mantiveram posição
- Todas as **3 mudanças** foram de SIM → NÃO
- **83%** correlação entre voto SIM e defesa do voto secreto

## 🔬 Metodologia

- **Fonte**: Registros oficiais da Câmara dos Deputados
- **Validação**: Verificação independente com 95%+ precisão
- **Tecnologia**: D3.js, HTML5, JavaScript ES6+
- **Acessibilidade**: Responsivo, funciona offline

## 📊 Fontes de Dados

Os dados utilizados nesta análise foram extraídos das seguintes fontes oficiais:

- **[📝 Post Original no Reddit](https://www.reddit.com/r/brasil/comments/1niy6g4/c%C3%A2mara_aprova_pec_da_blindagem_em_1%C2%BA_turno/)** - Discussão sobre aprovação da PEC
- **[📊 Planilha 1º Turno](https://docs.google.com/spreadsheets/d/1VjHyNtAJwXLbAx4HtXjESTcwah63JfEmFcfAnDXrGPE/edit?gid=1276687350#gid=1276687350&fvid=656345091)** - Dados originais do primeiro turno
- **[📊 Planilha 2º Turno](https://docs.google.com/spreadsheets/d/1VjHyNtAJwXLbAx4HtXjESTcwah63JfEmFcfAnDXrGPE/edit?gid=1276687350#gid=1276687350&fvid=1058390158)** - Dados originais do segundo turno

## 📚 Documentação

- **[📄 Relatório Completo](docs/RELATORIO_PEC_BANDIDAGEM.md)** - Análise detalhada em português
- **[✅ Relatório de Validação](docs/VALIDATION_REPORT.md)** - Verificação de dados
- **[🛠️ Documentação Técnica](docs/DEVELOPMENT.md)** - Guia para desenvolvedores

## 👨‍💻 Autor

**[fcavalcantirj](https://github.com/fcavalcantirj)**

Criado para facilitar a visualização e compreensão dos padrões de votação da PEC da Bandidagem, tornando os dados acessíveis através de visualizações interativas e análises estatísticas.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-analise`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova análise'`)
4. Push para a branch (`git push origin feature/nova-analise`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙋‍♂️ Suporte

- **Issues**: [GitHub Issues](https://github.com/fcavalcantirj/pec-bandidagem/issues)
- **Documentação**: Pasta [docs/](docs/)
- **Dados**: Verificados e validados para precisão

---

<p align="center">
  <strong>Análise desenvolvida com foco em transparência e precisão dos dados</strong><br>
  <sub>Todos os números foram verificados independentemente</sub>
</p>