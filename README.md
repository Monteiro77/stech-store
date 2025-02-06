# Loja Digital

Este projeto é uma aplicação web para uma loja digital desenvolvida como parte de um teste técnico. A aplicação oferece funcionalidades básicas para visualização de produtos, gerenciamento de carrinho de compras e finalização de compra.

## Funcionalidades

- Listagem de produtos.
- Adição de produtos ao carrinho.
- Controle de quantidade de itens no carrinho.
- Remoção de produtos do carrinho.
- Cálculo do valor total da compra.
- Persistência do estado do carrinho com LocalStorage.
- Modo claro e escuro (Dark Mode).

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces.
- **Styled Components**: Estilização dinâmica dos componentes.
- **React Router**: Navegação entre páginas.
- **Toastify**: Notificações elegantes para ações do usuário.
- **Icons (react-icons)**: Ícones para controles visuais.

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado.
- Gerenciador de pacotes npm ou yarn.

### Passos

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repo.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd stech-store
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o projeto:
   ```bash
   npm start
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Estrutura de Pastas

```
src
├── components       # Componentes reutilizáveis
├── context           # Provedor de contexto para o modo dark
├── pages             # Páginas principais
├── assets            # Imagens e arquivos estáticos
├── App.js            # Componente raiz
└── index.js          # Ponto de entrada
```

## Melhorias Futuras

- Integração com backend para armazenamento de dados.
- Adicionar autenticação de usuários.
- Melhorias na responsividade.
- Testes automatizados.

---

Desenvolvido com 💙 para um teste técnico.

