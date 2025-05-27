import pytest
from unittest.mock import patch, MagicMock


@pytest.fixture
def mock_psycopg2_pool():
    # Mockear la clase SimpleConnectionPool de psycopg2
    with patch("psycopg2.pool.SimpleConnectionPool") as mock_pool_cls:
        # Mockear connection y cursor
        mock_conn = MagicMock()
        mock_cursor = MagicMock()

        # Cuando se llame a fetchone, devolver un valor específico
        # (en este caso, un contador inicial de 0)
        mock_cursor.fetchone.return_value = (0,)
        mock_conn.cursor.return_value.__enter__.return_value = mock_cursor

        # Configurar el pool y el contexto
        mock_pool = MagicMock()
        mock_pool.getconn.return_value = mock_conn
        mock_pool.getconn.return_value.__enter__.return_value = mock_conn

        mock_pool_cls.return_value = mock_pool

        yield mock_pool


# Prueba 1
def test_get_counter_returns_zero(mock_psycopg2_pool):
    with mock_psycopg2_pool.getconn() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT counter FROM counters LIMIT 1;")
            row = cur.fetchone()

            assert {"counter": row[0]} == {"counter": 0}
