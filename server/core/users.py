import models.users as users
from database import execute_query
from auth.security import get_password_hash

async def get_user(db, user_id: int):
    # Your code to retrieve a user from the database
    pass

async def get_user_by_email(db, email: str):
    # Your code to retrieve a user by email from the database
    pass

async def get_users(db, skip: int = 0, limit: int = 100):
    # Your code to retrieve multiple users from the database
    pass


async def create_user(db, user: users.UserCreate):
    # Hash the password
    hashed_password = get_password_hash(user.password)
    # Construct the SQL query to insert the user into the database
    query = """
        INSERT INTO users (email, password, role)
        VALUES ($1, $2, $3)
        RETURNING id, email, role;
    """
    #Use db connect to exec the query
    result = await execute_query(query, user.email, hashed_password, "user")
    buff = result[0]

    new_user = users.User(id=buff['id'], email=buff['email'], role=buff['role'])

    return new_user

async def get_images(db, skip: int = 0, limit: int = 100):
    # Your code to retrieve items from the database
    pass

async def create_user_image(db, item: users.ImageCreate, user_id: int):
    # Your code to create an item for a user in the database
    pass
