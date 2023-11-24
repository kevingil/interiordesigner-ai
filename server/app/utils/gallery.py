import sqlite3
from datetime import datetime

def get_latest_renders(n):
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


def update_gallery(render_time, engine, image_urls):
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

