import os
from psycopg2._psycopg import connection
from psycopg2.pool import SimpleConnectionPool
from dotenv import load_dotenv

# si hay un archivo .env, cargar las variables de entorno
load_dotenv()

_pool = SimpleConnectionPool(
    1,
    10,
    os.getenv("DATABASE_URL"),
)

_driver: connection = None


def get_driver() -> connection:
    global _driver

    if _driver is None:
        _driver = _pool.getconn()
        _init_db(_driver)

    return _driver


def _init_db(driver: connection):
    try:
        with driver.cursor() as cursor:
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS counter (
                    id SERIAL PRIMARY KEY,
                    value INTEGER DEFAULT 0
                )
                """
            )
            cursor.execute(
                "INSERT INTO counter (value) VALUES (0) ON CONFLICT DO NOTHING"
            )
        driver.commit()

    except Exception as e:
        print(f"Error iniciando db: {e}")
        driver.rollback()
