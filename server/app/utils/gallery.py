import os
import asyncpg
from asyncpg import connect, Pool
from datetime import datetime
from dotenv import load_dotenv

async def get_latest_images(n):
    # Construct the connection string
    load_dotenv()
    dsn = os.getenv('NEONDB')
    try:
        pool: Pool = await asyncpg.create_pool(dsn)
        async with pool.acquire() as conn:
            latest_images = await conn.fetch("SELECT * FROM images ORDER BY timestamp DESC LIMIT $1", n)
            return latest_images
    except Exception as e:
        print(e)
        return e
        
    
async def update_gallery(render_time, model, image_urls, blurhashes):
    # Connect to PostgreSQL database using a pool
    dsn = os.getenv('NEONDB')
    
    try:
        async with asyncpg.create_pool(dsn) as pool:
            async with pool.acquire() as conn:
                async with conn.transaction():
                    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                    for image_url in image_urls:
                        blurhash64 = blurhashes[image_urls.index(image_url)]
                        # Use SQL parameters to avoid SQL injection
                        await conn.execute('''
                            INSERT INTO images (rendertime, timestamp, owner, description, imageurl, blurhash64)
                            VALUES ($1, $2, $3, $4, $5, $6)
                        ''', str(render_time), datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S'), 1, model, image_url, blurhash64)
    except Exception as e:
        print(f"Error updating gallery: {e}")
          