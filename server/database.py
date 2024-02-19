import os
import asyncpg
from asyncpg import Pool
from dotenv import load_dotenv


pool = None  # Init pool


async def create_pool():
    global pool
    if not pool:
        load_dotenv()
        dsn = os.getenv("NEONDB")
        pool = await asyncpg.create_pool(dsn)
    return pool


async def get_db():
    return await create_pool()


async def execute_query(query, *args):
    pool = await create_pool()  
    async with pool.acquire() as connection:
        return await connection.fetch(query, *args)

async def test():
    pool = await create_pool()  
    try:
        async with pool.acquire() as conn:
            result = await conn.fetchrow("SELECT * FROM Images FETCH FIRST 1 ROW ONLY;")
            if result:
                print(f"DATABASE TEST PASS \n \n Object Sample: \n {result} \n")
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        print(f"Connection string used: {pool._dsn}")

