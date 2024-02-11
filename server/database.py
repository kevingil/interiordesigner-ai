import os
import asyncpg
import boto3
from asyncpg import Pool
from dotenv import load_dotenv
from datetime import datetime, timezone

DATABASE_URL = ""

async def create_pool():
    return await asyncpg.create_pool(DATABASE_URL)

async def execute_query(query, *args):
    async with Pool.acquire() as connection:
        return await connection.fetch(query, *args)

async def get_db():
    global pool
    if not pool:
        pool = await create_pool()
    return pool

async def test():
    
    # Connection string
    load_dotenv()
    dsn = os.getenv("NEONDB")

    try:
        # Establish a connection pool
        pool: Pool = await asyncpg.create_pool(dsn)

        # Acquire a connection from the pool
        async with pool.acquire() as conn:  
            # Example: Execute a query to get the first row from the Images table
            result = await conn.fetchrow("SELECT * FROM Images FETCH FIRST 1 ROW ONLY;")

            # Fetch the result (if any)
            if result:
                print("Ping test:")

    except Exception as e:
        print(f"Error connecting to the database: {e}")
        print(f"Connection string used: {dsn}")



