# whisper-server

## DB

### User

- username: string
- email: string
- password: string
- avatar: string
- description: string
- issues: Issue[]
- comments: Comment[]
- replies: Reply[]

### Issue

- content: string
- author: User
- comments: Comment[]
- likers: User[]
- dislikers: User[]
- collectors: User[]
- sharers: User[]
- tags: string

### Comment

- content: string
- author: User
- issue: Issue
- replies: Reply[]
- likers: User[]
- dislikers: User[]

### Reply

- content: string
- author: User
- comment: Comment
- reply: Reply
- likers: User[]
- dislikers: User[]

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
