import bcrypt

def get_password_hash(password):
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hash

def check_password_hash(password, hash):
    return bcrypt.checkpw(password.encode('utf-8'), hash)
