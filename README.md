# Correios CEP API

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## TL;DR

### Development

```
npm install
npx vercel dev
```

### Usage

```http
GET https://api.correios.magnobiet.com/?cep=90441970
```

#### Response

```json
{
  "cep": "90441970",
  "state": {
    "id": 43,
    "name": "Rio Grande do Sul",
    "acronym": "RS"
  },
  "city": {
    "id": 4314902,
    "name": "Porto Alegre"
  },
  "neighborhood": "Auxiliadora",
  "address": "Rua Coronel Bordini, 555",
  "complement": "",
}
```
