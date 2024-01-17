# Mongoose Relay Paginate NestJS Example

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Started with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
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


## License

The example code in this repo is provided under the [Unlicense](LICENSE) license.


## Steps to recreate in your repo


### Setup plugin globally

Make sure you connect the relayPaginatePlugin globally with connection.plugin. Example:

### **app.module.ts**
```ts
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest', {
      connectionFactory: (connection) => {
        connection.plugin(
          relayPaginatePlugin({
            maxLimit: 100,
          }),
        );
        return connection;
      },
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Using the plugin in your services:

Use the mongoose-relay-paginate plugin and types in your Services `(paginateOptions: PagingInfo<Cat>): Promise<RelayResult<Cat[]>>` and `Model<Cat, RelayPaginateQueryHelper> &
      RelayPaginateStatics`. Example:

### **cats.service.ts**
```ts
@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name)
    private catModel: Model<Cat, RelayPaginateQueryHelper> &
      RelayPaginateStatics,
  ) {}

  // ... elided for brevity ...

  async findAll(paginateOptions: PagingInfo<Cat>): Promise<RelayResult<Cat[]>> {
    return this.catModel.find().relayPaginate(paginateOptions).exec();
  }
}
```

### Using your new service from your controller 

Make sure to use the same or similar types of the `PagingInfo<Cat>` and `RelayResult<Cat[]>` in your controller that uses your service. Example: 

### **cats.controller**

```ts
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  // ... elided for brevity ...

  @Get()
  async findAll(
    @Body() body: { paging: PagingInfo<Cat> },
  ): Promise<RelayResult<Cat[]>> {
    return this.catsService.findAll(body.paging);
  }
}
```