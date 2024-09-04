# Muti-tenant NestJS

This is a starter kit for creating multi-tenant NestJS APIs using Prisma and PostgreSQL.

## How to run locally

### 1. Create `./.env` file

```txt
PUBLIC_DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=tenant"
```

Update the database URLs as required. If the database instances do not contain the right schema, you can create that using `prisma db push` once the dependencies are ready.

### 2. Install dependencies

```bash
pnpm install
```

Once the installation completes, `postinstall` should generate the PrismaClients.

### 3. Run `dev` or `start`

```bash
pnpm dev
```

```bash
pnpm start
```

## How to update database schema

There are two `.prisma` files inside `./prisma/`.

- `public-schema.prisma` for the Public Database
- `schema.prisma` for the Tenant Database

Do the necessary changes in the appropriate file and run the correct script.

### Schema changes on the Public Database

```bash
pnpm prisma:push:public
```

### Schema changes on the Tenant Database

```bash
pnpm prisma:push:tenant
```

## How to use the PrismaClient inside NestJS Application

### PublicPrismaService

```ts
import { PublicPrismaService } from "@/modules/prisma/public-prisma.service";

export class NestJSComponent {
  constructor(
    private readonly prisma: PublicPrismaService,
  ) {}
}
```

```ts
> Example:

@Get('/tenants')
async getTenants() {
  const tenants = await this.prisma.tenant.findMany();

  return { tenants };
}
```

### TenantPrismaService

```ts
import { TENANT_PRISMA_SERVICE, TenantPrismaService } from '@/modules/prisma/tenant-prisma.service';

export class NestJSComponent {
  constructor(
    @Inject(TENANT_PRISMA_SERVICE) private readonly prisma: TenantPrismaService
  ) {}
}
```

```ts
> Example:

@Get('/users')
async getUsers() {
  /**
   * Since we're using query extensions with the Prisma client,
   * this query should return only the users with the column
   * "tenantId" matching that in the request "x-tenant-code".
   */
  const users = await this.prisma.user.findMany();

  return { users };
}
```

## Diagrams

### Request-Response Life Cycle

```mermaid
flowchart TB
  Client((Client))
  API((API))
  PublicDB[(PublicDB)]
  Guards[[AuthGuard<br>UserGuard<br>RolesGuard]]

  Client --Request--> API --> RequestLoggerMiddleware --> TenantDatasourceMiddleware --> Guards --> Controller --> API --Response--> Client
  TenantDatasourceMiddleware---PublicDB
```

### Entity Relationship

```mermaid
erDiagram
    Public--Tenant {
        int id PK
        string code
        string name
        string website
        json metadata
        int datasourceId FK
    }
    Public--Datasource {
        int id PK
        string name
        string url
        json metadata
    }
    TenantDBX--Entity {
        int id PK
        any key
        int tenantId FK
    }
    Public--Tenant ||--o| Public--Datasource : has
    Public--Tenant ||--o{ TenantDBX--Entity : has
```

### Data

#### Datasources

| Datasource    | Public DB  | Tenant DB 1 | Tenant DB 2 | Tenant DB 3 |
| ------------- | -------- | ----------- | ----------- | ----------- |
| **Tenant(s)** | Metadata | A<br>B<br>C | D<br>E<br>F | G<br>H<br>I |

#### Data flow

```mermaid
flowchart LR
  API((API Public))
  APITSM[[TenantDatasourceMiddleware]]
  APIController[[Controller]]
  PublicDb[(Public DB)]
  TenantDb1[(Tenant DB 1)]
  TenantDb2[(Tenant DB 2)]
  TenantDb3[(Tenant DB 3)]
  ClientA[Client A]
  ClientB[Client B]
  ClientC[Client C]
  ClientD[Client D]
  ClientE[Client E]
  ClientF[Client F]
  ClientG[Client G]
  ClientH[Client I]

  API <--(1)--> APITSM <--Get datasourceUrl--> PublicDb
  API --(2)--> APIController
  ClientA --Data A--> API
  ClientB --Data B--> API
  ClientC --Data C--> API
  ClientD --Data D--> API
  ClientE --Data E--> API
  ClientF --Data F--> API
  ClientG --Data G--> API
  ClientH --Data H--> API
  ClientI --Data I--> API
  APIController -.Data A.->TenantDb1
  APIController -.Data B.->TenantDb1
  APIController -.Data C.->TenantDb1
  APIController -.Data D.->TenantDb2
  APIController -.Data E.->TenantDb2
  APIController -.Data F.->TenantDb2
  APIController -.Data G.->TenantDb3
  APIController -.Data H.->TenantDb3
  APIController -.Data I.->TenantDb3
```
