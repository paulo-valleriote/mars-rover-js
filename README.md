# Teste técnico para Infratoken

O usuário deve ser capaz de interagir com a interface da aplicação para definir o tamanho do sitio de pouso e a movimentação do Rover

Feito utilizando NextJS | TypeScript | PrismaORM | TailwindCSS

Iniciar o projeto:

- Instale as dependências com
  - "npm install" ou "npm i"

- Crie um arquivo .env com as seguintes variaveis
  - POSTGRES_URL=postgresql://postgres:admin@localhost:5432/db

- Execute o Docker com "docker compose up"

- Execute os comandos do prisma
  - "npx prisma db push"
  - "npx prisma generate"

- Execute o projeto com
  - "npm run dev"
