# dotlabs() services

## Requirements

- [Node.js v18](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Docker](https://docs.docker.com/get-docker/)

## Running the project

1. Clone the repository

```bash
git clone
```

2. Update the environment variables

```bash
cp .env.example .env

# then update the .env file
```

3. Install the dependencies

```bash
yarn install
```

4. Run the database

```bash
docker-compose up -d
```

5. Run the project

```bash
yarn start:dev
```
