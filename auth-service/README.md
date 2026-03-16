# Auth Service

Serviço de autenticação e gerenciamento de usuários do projeto Toki Food Backend.

## 📋 Visão Geral

O **auth-service** é responsável por toda a camada de autenticação e gerenciamento de usuários da aplicação. Ele fornece endpoints para registro, login e gerenciamento de endereços dos usuários.

## 🚀 Tecnologias

- **Runtime:** Node.js com TypeScript
- **Framework:** Express.js 5.x
- **Banco de Dados:** MySQL (via Prisma ORM)
- **Cache:** Redis
- **Validação:** Zod
- **Autenticação:** JWT (JSON Web Token)
- **Documentação:** Swagger/OpenAPI

## 📁 Estrutura de Diretórios

```
auth-service/
├── prisma/
│   └── schema.prisma       # Schema do banco de dados
├── src/
│   ├── index.ts           # Configuração principal do Express
│   ├── server.ts          # Entry point do servidor
│   ├── controller/        # Controladores (lógica de requisição)
│   │   ├── auth/
│   │   │   ├── login.controller.ts
│   │   │   └── register.controller.ts
│   │   └── addressController/
│   ├── service/           # Regras de negócio
│   │   ├── auth/
│   │   │   ├── login.service.ts
│   │   │   └── register.service.ts
│   │   ├── address/
│   │   │   ├── addressAdd.service.ts
│   │   │   ├── addressGet.service.ts
│   │   │   └── deleteAddres.service.ts
│   │   └── teste/
│   ├── routes/            # Definição de rotas
│   │   ├── auth/auth.routes.ts
│   │   └── address/addres.routes.ts
│   ├── middleware/       # Middlewares
│   │   └── jwt/jsonwebtoken.midle.ts
│   ├── utils/            # Utilitários
│   │   ├── prismaClient.ts
│   │   ├── redis/redisClient.ts
│   │   └── validator/
│   │       ├── emailValidator/email.ts
│   │       └── addressValidator/addressAddVallidator.ts
│   └── docs/
│       └── swagger.ts
└── package.json
```

## 🗄️ Modelos do Banco de Dados

### User
```prisma
model User {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  password  String
  createdAt DateTime  @default(now())
  profile   Profile[]
  usercpf   UserCPF[]
  address   Address[]
  email_code Email_code[]
}
```

### Profile
```prisma
model Profile {
  id       Int       @id @default(autoincrement())
  photo    String?
  user_id  Int
  bio      String
  genero   Gender    @default(sem_preferencia)
  user     User      @relation(fields: [user_id], references: [id])
  createdAt DateTime @default(now())
}

enum Gender {
  sem_preferencia
  femenino
  masculino
}
```

### UserCPF
```prisma
model UserCPF {
  id         Int       @id @default(autoincrement())
  cpf        String
  data_nasci String
  user_id    Int
  user       User      @relation(fields: [user_id], references: [id])
  createdAt  DateTime  @default(now())
}
```

### Address
```prisma
model Address {
  id          Int       @id @default(autoincrement())
  cep         String
  rua         String
  numero      String?
  bairro      String
  cidade      String
  estado      String
  complemento String?
  latitude    Float
  longitude   Float
  user_id     Int
  user        User      @relation(fields: [user_id], references: [id])
  createdAt   DateTime  @default(now())
}
```

### Email_code
```prisma
model Email_code {
  id           Int            @id @default(autoincrement())
  verification Verification    @default(nao_verificado)
  user_id      Int
  code         String
  expiresAt    DateTime
  createdAt    DateTime       @default(now())
  user         User           @relation(fields: [user_id], references: [id])
}

enum Verification {
  verificado
  nao_verificado
}
```

## 🔐 Autenticação

### Login
- **Endpoint:** `POST /api/v1/auth/login`
- **Descrição:** Autentica o usuário e retorna um token JWT
- **Corpo da requisição:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Resposta de sucesso (200):**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Resposta de erro (401):**
  ```json
  {
    "message": "Email or password incorrect"
  }
  ```

### Registro
- **Endpoint:** `POST /api/v1/auth/register`
- **Descrição:** Cria uma nova conta de usuário
- **Corpo da requisição:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Resposta de sucesso (201):**
  ```json
  {
    "success": true,
    "message": "Account created successfully"
  }
  ```
- **Resposta de erro (400):**
  ```json
  {
    "success": false,
    "error": "Email already registered"
  }
  ```

## 🛡️ Middleware de Autenticação

O serviço inclui um middleware JWT para proteger rotas:

```typescript
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: "Token required" });
  }
  
  const [, token] = authHeader.split(" ");
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_CODE);
    req.user = { id: decoded.id };
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
```

**Utilização:** Adicione o middleware às rotas que precisam de autenticação.

## 📝 Validação

O serviço utiliza **Zod** para validação de dados de entrada:

```typescript
const registerSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});
```

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` com as seguintes variáveis:

```env
DATABASE_URL=mysql://user:password@localhost:3306/toki
JWT_CODE=your-secret-jwt-key
REDIS_URL=redis://localhost:6379
PORT=3001
```

## 🏃‍♂️ Como Executar

### Desenvolvimento
```bash
npm run dev
```

O servidor estará disponível em: `http://localhost:3001`

### Documentação Swagger
Acesse a documentação interativa em: `http://localhost:3001/docs`

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|------------|
| `npm run dev` | Inicia o servidor em modo de desenvolvimento com hot-reload |

## 📦 Dependências Principais

- **express** - Framework web
- **@prisma/client** - ORM para banco de dados
- **bcrypt** - Hashing de senhas
- **jsonwebtoken** - Geração e verificação de JWT
- **zod** - Validação de esquemas
- **swagger-ui-express** - Documentação API
- **ioredis** - Cliente Redis

## 📄 Licença

ISC
