# Backend for Ticket Flow Application

### Stack of technologies:

- Express.js for server
- PostgreSQL for database (hosted on Vercel)

### Environment Variables:

- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NO_SSL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`
- `PORT`

### Run Application:

- `npm i`
- `npm start`

### Available Routes

`const eventBody = {title, description, category, images}`

|     Route     |  Method  |    Body     |
| :-----------: | :------: | :---------: |
|   `/events`   |  `GET`   |     `/`     |
| `/events/:id` |  `GET`   |     `/`     |
|   `/events`   |  `POST`  | `eventBody` |
| `/events/:id` | `PATCH`  | `eventBody` |
| `/events/:id` | `DELETE` |     `/`     |