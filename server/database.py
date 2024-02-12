import os
import asyncpg
from asyncpg import Pool
from dotenv import load_dotenv


async def create_pool():
    load_dotenv()
    dsn = os.getenv("NEONDB")
    new_pool = await asyncpg.create_pool(dsn)
    return new_pool

async def get_db():
    global pool
    if not pool:
        pool = await create_pool()
    return pool

async def execute_query(query, *args):
    async with Pool.acquire() as connection:
        return await connection.fetch(query, *args)

# Test database connection and return sample image from public gallery
async def test():
    load_dotenv()
    dsn = os.getenv("NEONDB")
    try:
        pool: Pool = await asyncpg.create_pool(dsn)
        async with pool.acquire() as conn:  
            result = await conn.fetchrow("SELECT * FROM Images FETCH FIRST 1 ROW ONLY;")
            if result:
                print(f"DATABASE TEST PASS \n \n Object Sample: \n {result} \n")

    except Exception as e:
        print(f"Error connecting to the database: {e}")
        print(f"Connection string used: {dsn}")



