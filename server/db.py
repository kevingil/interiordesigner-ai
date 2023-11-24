import sqlite3

def init_db():
    conn = sqlite3.connect('gallery.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS renders (
            id INTEGER PRIMARY KEY,
            render_time INTEGER,
            timestamp DATETIME,
            engine TEXT,
            image_url TEXT
        )
    ''')

    conn.commit()
    conn.close()



