# Desafio de Back-End - Quero Educação 🚀

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **npm** (vem com Node.js) ou **yarn**

### 🔍 Verificar instalações:
```bash
node --version    # Deve mostrar v18.x.x ou superior
npm --version     # Deve mostrar 8.x.x ou superior
```

## Instalação e Execução

### 1. 📥 Clone o repositório
```bash
git clone <url-do-repositorio>
cd quero-challenge-solution
```

### 2. 📦 Instale as dependências
```bash
npm install
```

### 3. ▶️ Execute o projeto
```bash
npm run dev
```

## Endpoints Disponpíveis

### Base URL
```
http://localhost:3000
```

### Principais Endpoints

| Metodo | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/offers` | Lista todas ofertas (com filtros) |
| `GET` | `/api/offers/filter-options` | Opções de filtros disponíveis |

### 1. Listar todas as ofertas
```bash
curl http://localhost:3000/api/offers
```

### 2. Filtrar por nível de graduação
```bash
# Bacharelado
curl "http://localhost:3000/api/offers?level=bacharelado"

# Multiplos níveis
curl "http://localhost:3000/api/offers?level=bacharelado&level=tecnologo"
```

### 3. Filtrar por tipo de curso
```bash
# Presencial
curl "http://localhost:3000/api/offers?kind=presencial"

# EaD
curl "http://localhost:3000/api/offers?kind=ead"
```

### 4. Filtrar por faixa de preço
```bash
# Preço mínimo
curl "http://localhost:3000/api/offers?minPrice=300"

# Preço máximo
curl "http://localhost:3000/api/offers?maxPrice=500"

# Faixa de preço
curl "http://localhost:3000/api/offers?minPrice=200&maxPrice=400"
```

### 5. Buscar por nome do curso
```bash
# Busca case-insensitive
curl "http://localhost:3000/api/offers?search=engenharia"
curl "http://localhost:3000/api/offers?search=medicina"
curl "http://localhost:3000/api/offers?search=administracao"
```

### 6. Ordenar resultados
```bash
# Por nome (A-Z)
curl "http://localhost:3000/api/offers?sortBy=courseName&sortOrder=asc"

# Por preço (menor primeiro)
curl "http://localhost:3000/api/offers?sortBy=offeredPrice&sortOrder=asc"

# Por avaliação (maior primeiro)
curl "http://localhost:3000/api/offers?sortBy=rating&sortOrder=desc"
```

### 7. Paginação
```bash
# Página 2
curl "http://localhost:3000/api/offers?page=2"

# 5 itens por página
curl "http://localhost:3000/api/offers?limit=5"

# Página 2 com 5 itens
curl "http://localhost:3000/api/offers?page=2&limit=5"
```

### 8. Selecionar campos específicos
```bash
# Apenas nome e preço
curl "http://localhost:3000/api/offers?fields=courseName,offeredPrice"

# Nome, avaliação e instituição
curl "http://localhost:3000/api/offers?fields=courseName,rating,iesName"
```