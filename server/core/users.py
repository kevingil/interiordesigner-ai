import models.users as users
from database import execute_query
from auth.security import get_password_hash

async def get_user_by_email(db, email: str):
    query = """
        SELECT id, email, role FROM users
        WHERE email = $1;
    """
    result = await execute_query(db, query, email)
    if result:
        user_data = result[0]
        user = users.User(id=user_data['id'], email=user_data['email'], role=user_data['role'])
        return user
    return None

async def create_user(connection, user: users.UserCreate):
    hashed_password = get_password_hash(user.password)

    query = """
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role;
    """

    result = await execute_query(connection, query, user.name, user.email, hashed_password, "user")
    if result:
        user_data = result[0]
        new_user = users.User(id=user_data['id'], name=user_data['name'], email=user_data['email'], role=user_data['role'])
        return new_user
    return None

async def get_images(db, skip: int = 0, limit: int = 100):
    query = """
        SELECT id, title, url, owner_id FROM images
        ORDER BY id OFFSET $1 LIMIT $2;
    """
    result = await execute_query(query, skip, limit)
    images = []
    for row in result:
        image = users.Image(id=row['id'], title=row['title'], url=row['url'], owner_id=row['owner_id'])
        images.append(image)
    return images

async def create_user_image(db, item: users.ImageCreate, user_id: int):
    query = """
        INSERT INTO images (title, url, owner_id)
        VALUES ($1, $2, $3)
        RETURNING id, title, url, owner_id;
    """
    result = await execute_query(query, item.title, item.url, user_id)
    if result:
        image_data = result[0]
        image = users.Image(id=image_data['id'], title=image_data['title'], url=image_data['url'], owner_id=image_data['owner_id'])
        return image
    return None

async def get_users(db, skip: int = 0, limit: int = 100):
    query = """
        SELECT id, email, role FROM users
        ORDER BY id OFFSET $1 LIMIT $2;
    """
    result = await execute_query(query, skip, limit)
    users_list = []
    for row in result:
        user = users.User(id=row['id'], email=row['email'], role=row['role'])
        users_list.append(user)
    return users_list

async def get_user(db, user_id: int):
    query = """
        SELECT id, email, role FROM users
        WHERE id = $1;
    """
    result = await execute_query(query, user_id)
    if result:
        user_data = result[0]
        user = users.User(id=user_data['id'], email=user_data['email'], role=user_data['role'])
        return user
    return None
