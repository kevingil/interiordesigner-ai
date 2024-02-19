import bcrypt

def get_password_hash(password):
    salt = bcrypt.gensalt()
    hash_bytes = bcrypt.hashpw(password.encode('utf-8'), salt)
    hash_str = hash_bytes.decode('utf-8')
    return hash_str

def check_password_hash(password, hash):
    return bcrypt.checkpw(password.encode('utf-8'), hash)
