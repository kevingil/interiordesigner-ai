from app import app
from db import neon_ping

if __name__ == "__main__":
    neon_ping()
    app.run(host='0.0.0.0', port=5000, debug=True)
