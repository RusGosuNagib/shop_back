
## Description



## Installation

```bash
$ npm install
```
create src/mikro-orm.config.ts file

```
import { defineConfig } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';

export default defineConfig({
host: 'host-your-pqsl',
port: 5432,
user: 'your-db-name',
password: 'your-password',
dbName: 'dbname',
entities: ['dist/**/*.entity.js'],
entitiesTs: ['src/**/*.entity.ts'],
debug: true,
highlighter: new SqlHighlighter(),
metadataProvider: TsMorphMetadataProvider,
// @ts-expect-error nestjs adapter option
registerRequestContext: false,
extensions: [Migrator, EntityGenerator, SeedManager],
});

```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

