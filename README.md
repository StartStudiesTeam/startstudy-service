# StartStudy - Service

## Instalação do Software

### Requisitos

Antes de iniciar, certifique-se de que os seguintes requisitos estão atendidos:

- **PostgreSQL**: Sistema de Gerenciamento de Banco de Dados Relacional.
- **Node.js 20** ou superior: Para executar o backend.
- Um **gerenciador de pacotes** como `npm` (instalado automaticamente com o Node.js).

### Passos para Instalação

#### 1. Clonando o Repositório

Clone o repositório em sua máquina local:

```bash
git clone https://github.com/seu-usuario/startstudy-service.git
cd startstudy-service
```

#### 2. Instalando as Dependências

No diretório raiz do projeto, execute o comando abaixo para instalar todas as dependências necessárias:

```bash
npm install
```

#### 3. Configurando o Banco de Dados

Certifique-se de que o PostgreSQL está instalado e configurado corretamente em sua máquina. Crie um banco de dados no PostgreSQL que será utilizado pelo projeto.

#### 4. Configurando as Variáveis de Ambiente

Crie um arquivo `.env` no diretório raiz do projeto e adicione as seguintes configurações, substituindo pelos valores corretos de acordo com seu ambiente:

```env
# Configurações do Servidor
PORT=3000

# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco

# Configurações de E-mail
EMAIL_PASS=sua_senha_de_email
EMAIL_NAME=nome_de_exibição
EMAIL_FROM=seu_email
EMAIL_SUBJECT_START=Assunto_inicial_dos_emails

# Configurações de Autenticação JWT
JWT_SECRET=sua_chave_secreta_jwt
JWT_EXPIRES_IN=tempo_de_expiracao_em_segundos

# URL do Banco de Dados (caso utilize uma URL única)
DATABASE_URL=sua_url_de_conexao_completa

# API Key (caso haja integração com APIs externas)
API_KEY=sua_chave_de_api
```

#### 5. Rodando as Migrações do Banco de Dados

Se o projeto inclui migrations para configurar o banco de dados, execute o comando abaixo para aplicar as migrações:

```bash
npm run migrate
```

#### 6. Iniciando o Projeto

Agora, você pode iniciar o servidor de desenvolvimento executando:

```bash
npm run dev
```

O projeto será iniciado e acessível no endereço: [http://localhost:3000](http://localhost:3000).

### Solução de Problemas

- **Erro de Conexão ao Banco de Dados**: Verifique se as variáveis de ambiente relacionadas ao banco de dados (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`) estão configuradas corretamente no arquivo `.env`.
- **Erro ao Iniciar o Projeto**: Caso o projeto não inicie corretamente, verifique se todas as dependências foram instaladas sem erros com o comando `npm install`. Em caso de problemas persistentes, consulte os logs de erro para mais informações.

---

### Exemplo Completo de Arquivo `.env`

Aqui está um exemplo completo das variáveis de ambiente que você deve configurar:

```env
# Configuração da Porta do Servidor
PORT=3000

# Variáveis de Ambiente do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=minha_senha
DB_DATABASE=startstudy_db

# Configurações de E-mail para Envios Automáticos
EMAIL_PASS=sua_senha_de_email
EMAIL_NAME=StartStudy
EMAIL_FROM=noreply@startstudy.com
EMAIL_SUBJECT_START=Bem-vindo à StartStudy!

# Configuração de Segurança JWT (JSON Web Token)
JWT_SECRET=supersecreta123
JWT_EXPIRES_IN=86400

# URL Completa de Conexão ao Banco de Dados (opcional)
DATABASE_URL=postgres://usuario:senha@localhost:5432/startstudy_db

# Chave de API (caso haja)
API_KEY=sua_chave_de_api
```

---

Feito com ❤️ pela equipe **StartStudy**.

---
