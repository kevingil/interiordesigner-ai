import os
from datetime import datetime
from psycopg import connect, sql

def get_latest_images(n):
    # Connect to PostgreSQL database
    dbname = 'neondb' 
    user = 'kevingil'  # Replace with your PostgreSQL username
    password = '4dysoVRXk9Nq'  # Replace with your PostgreSQL password
    host = 'ep-twilight-glitter-09005170.us-west-2.aws.neon.tech'
    port = '5432'  # Default PostgreSQL port
    sslmode = 'require'

    # Construct the connection string
    conn_string = f"dbname={dbname} user={user} password={password} host={host} port={port} sslmode={sslmode}"
    with connect(conn_string) as conn:
        with conn.cursor() as cursor:
            # Use SQL parameters to avoid SQL injection
            cursor.execute(sql.SQL('''
                SELECT * FROM images
                ORDER BY timestamp DESC
                LIMIT %s
            '''), (n,))

            latest_images = cursor.fetchall()

    return latest_images


def update_gallery(render_time, image_urls):
    # Connect to PostgreSQL database
    conn_string = f"dbname={os.getenv('PG_DBNAME')} user={os.getenv('PG_USERNAME')} password={os.getenv('PG_PASSWORD')} host={os.getenv('PG_HOST')} port={os.getenv('PG_PORT')}"
    with connect(conn_string) as conn:
        with conn.cursor() as cursor:
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            for image_url in image_urls:
                # Use SQL parameters to avoid SQL injection
                cursor.execute(sql.SQL('''
                    INSERT INTO images (rendertime, timestamp, owner, description, imageurl)
                    VALUES (%s, %s, %s, %s, %s)
                '''), (render_time, timestamp, 1, 'SBXL 1.0', image_url))

            conn.commit()
            
# Old scripts pulling from SQLite database

"""
def get_latest_renders_old(n):
    conn = sqlite3.connect('gallery.db')
    cursor = conn.cursor()

    cursor.execute('''
        SELECT * FROM renders
        ORDER BY timestamp DESC
        LIMIT ?
    ''', (n,))

    latest_images = cursor.fetchall()

    conn.close()
    return latest_images


def update_gallery_old(render_time, engine, image_urls):
    conn = sqlite3.connect('gallery.db')
    cursor = conn.cursor()

    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    for image_url in image_urls:
        cursor.execute('''
            INSERT INTO renders (render_time, timestamp, engine, image_url)
            VALUES (?, ?, ?, ?)
        ''', (render_time, timestamp, engine, image_url))

    conn.commit()
    conn.close()

"""
