# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository analyzes voting data from the Brazilian Congress regarding "PEC da Bandidagem" (Constitutional Amendment Proposal), tracking how federal deputies voted in two rounds of voting.

## Data Structure

The main data source is `raw-data/PEC da Bandidagem.xlsx` containing two sheets:

### Sheet 1: "1 Turno" (First Round)
- **Columns**: Deputado (Deputy), Partido (Party), Estado (State), Votou (Vote)
- **488 voting records** from federal deputies
- **Vote distribution**: 353 Sim (Yes), 134 Não (No), 1 Abstenção (Abstention)

### Sheet 2: "2 Turno" (Second Round)
- **Columns**: Deputado, Partido, Estado, Votou, Defendeu Voto Secreto (Defended Secret Vote)
- **477 voting records**
- **Vote distribution**: 344 Sim, 133 Não
- **Secret vote defense**: 295 defended Sim, 166 defended Não

## Key Statistics

- **20 political parties** represented
- **27 states** represented
- **Top parties by representation**: PL (83), PT (63), União (57), PP (49), Republican (43), PSD (43)

## Voting Patterns

### Strong "Sim" voting parties (>90% approval):
- PL: 100% Sim in both rounds
- Republican: 97.7% (1st) / 100% (2nd)
- PP: 93.9% (1st) / 93.8% (2nd)
- União: 93.0% (1st) / 91.2% (2nd)

### Strong "Não" voting parties (>80% rejection):
- PSOL: 100% Não in both rounds
- PCdoB: 100% Não in both rounds
- Novo: 100% Não in both rounds
- PT: 81.0% Não (1st) / 83.3% Não (2nd)

### Secret Vote Defense Correlation
- Deputies who voted "Sim": 291 defended secret vote, 46 opposed
- Deputies who voted "Não": Only 4 defended secret vote, 120 opposed

## Development Commands

### Data Analysis with Python
```bash
# Install required libraries
pip install pandas openpyxl xlrd

# Run analysis scripts
python3 analyze_voting.py
```

### Working with Excel data
Use `openpyxl` for reading the Excel file as it handles the .xlsx format properly:
```python
import openpyxl
wb = openpyxl.load_workbook('raw-data/PEC da Bandidagem.xlsx')
```

## Project Structure

```
pec-bandidagem/
├── raw-data/
│   └── PEC da Bandidagem.xlsx   # Source voting data
├── CLAUDE.md                     # This file
└── [analysis scripts to be created]
```

## Common Tasks

### Analyzing voting patterns by party
Focus on aggregating votes by party affiliation and calculating percentages to identify party-line voting patterns.

### Cross-referencing voting rounds
Compare how individual deputies or parties changed their votes between the first and second rounds.

### State-level analysis
Group voting data by state to identify regional patterns in support or opposition.

### Secret vote correlation
Analyze the relationship between how deputies voted and whether they defended secret voting in the second round.