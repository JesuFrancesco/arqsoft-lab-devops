# Arquitectura de Software - Tema individual

Demo del tema DevOps

1. Frontend

```bash
npm i
npm run dev
```

2. Backend

```bash
poetry install
poetry run python main.py
```

3. DB

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```
