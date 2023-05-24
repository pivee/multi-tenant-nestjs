# Database Sync (db-sync)

POC: This multi-tenant solution should be able to sync a local database with its cloud bidirectionally

## Specification

- Create Cloud Database configuration for new users automatically
- Authenticate incoming requests and pick the correct database connection
- Replicate changes between the Cloud DB and the Local DB bidirectionally

### Diagram

```mermaid
flowchart TB
  API((API))
  MetadataDb[(Metadata)]
  TenantA[[Tenant A]]
  TenantB[[Tenant B]]
  CloudDbA[(Cloud A)]
  CloudDbB[(Cloud B)]
  ClientA1[Client A1]
  ClientA2[Client A2]
  LocalDbA[(Local A)]
  ClientB1[Client B1]
  ClientB2[Client B2]
  LocalDbB[(Local B)]

  TenantA === ClientA1
  TenantA === ClientA2
  ClientA1 <--> LocalDbA
  ClientA2 <--> LocalDbA

  TenantB === ClientB1
  TenantB === ClientB2
  ClientB1 <--> LocalDbB
  ClientB2 <--> LocalDbB

  ClientA1 <-.on change.-> API
  ClientA2 <-.on change.-> API

  ClientB1 <-.on change.-> API
  ClientB2 <-.on change.-> API

  API <--> MetadataDb

  API <-.on request.-> CloudDbA
  API <-.on request.-> CloudDbB
```
