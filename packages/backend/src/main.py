import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import get_driver


# Lifespan para manejar eventos de inicio y cierre de la aplicación
def lifespan(_: FastAPI):
    print("Iniciando server...")
    yield
    print("Apagando server...")


# Crear la aplicación FastAPI
app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main_route():
    return {"message": "Hola mundo"}


@app.get("/counter")
async def counter_up():
    conn = get_driver()

    with conn.cursor() as cursor:
        cursor.execute("SELECT value FROM counter LIMIT 1")

        row = cursor.fetchone()

        if row is None:
            return {"error": "Counter no encontrado"}

        current_value = row[0]
        return {"counter": current_value}


@app.post("/counter-up")
async def counter_up():
    conn = get_driver()

    with conn.cursor() as cursor:
        cursor.execute("UPDATE counter SET value = value + 1 RETURNING value")

        row = cursor.fetchone()

        if row is None:
            return {"error": "Counter no encontrado"}

        current_value = row[0]
        return {"counter": current_value}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
