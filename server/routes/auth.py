from typing import List
from fastapi import Depends, FastAPI, HTTPException,Request
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import crud, models, schemas,security
from database import SessionLocal, engine
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from auth import decodeJWT
import re

router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = 30


models.Base.metadata.create_all(bind=engine)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app = FastAPI()

app.include_router(router)

origins = "*"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    print(user.email)
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    db_user = crud.get_user_by_email(db, email=user.email)
    if (re.fullmatch(regex, user.email)==None):
        raise HTTPException(status_code=409, detail="Invalid Email Address")
    if db_user:
        raise HTTPException(status_code=409, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post("/users/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)


# @app.get("/items/", response_model=List[schemas.Item])
# def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     items = crud.get_items(db, skip=skip, limit=limit)
#     return items

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    # print(form_data.username)
    db_user = crud.get_user_by_email(db, email=form_data.username)
    if not (security.verify_hash(form_data.password,db_user.salt).decode('utf-8') == db_user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        # return {"message":"ERROR"}

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token}

@app.get("/user",response_model=schemas.User)
async def get_current_user(token: schemas.Token,db: Session = Depends(get_db)):    
    email=security.get_current_user_email(token.access_token)
    db_user = crud.get_user_by_email(db, email=email)
    
    return db_user

@app.get("/user/notes")
async def get_current_user(access_token: str,db: Session = Depends(get_db)):
    print(access_token)
    email=security.get_current_user_email(access_token)
    db_user = crud.get_user_by_email(db, email=email)
    return crud.get_user_notes(db,db_user)

@app.post("/user/notes")
async def post_user_items(request:Request,access_token:str,db: Session = Depends(get_db)):
    # print(request.json())
    json = await request.json()
    print(json)
    # access_token = json["token"]["access_token"]
    email=security.get_current_user_email(access_token)
    db_user = crud.get_user_by_email(db, email=email)
    note = json["note"]
    
    try:
        crud.create_user_note(db,note,db_user.id)
    except IntegrityError:
        db.rollback()
        crud.update_user_note(db,note,db_user.id)
    
    # email=security.get_current_user_email(access_token)
    # db_user = crud.get_user_by_email(db, email=email)
    return {"message":json}

@app.put("/user/notes")
async def update_user_note(request:Request,access_token:str,db: Session = Depends(get_db)):
    print(request.json())
    json = await request.json()
    print(json)
    # access_token = json["token"]["access_token"]
    email=security.get_current_user_email(access_token)
    db_user = crud.get_user_by_email(db, email=email)
    note = json["note"]
    crud.update_user_note(db,note,db_user.id)
    return {"message":json}

@app.delete("/user/notes")
async def post_user_items(request:Request,access_token:str,db: Session = Depends(get_db)):
    json = await request.json()
    # access_token = json["token"]["access_token"]
    email=security.get_current_user_email(access_token)
    db_user = crud.get_user_by_email(db, email=email)
    note = json["note"]
    print(note)
    crud.delete_user_note(db,note,db_user.id)
    # email=security.get_current_user_email(access_token)
    # db_user = crud.get_user_by_email(db, email=email)
    return {"message":json}
    
    # return test
# @app.post("/test")
# async def playground(request:Request):
#     json = await request.json()
#     print(json)
#     return {"message":json}

# # Replace with JWT Access token response
# @app.post("/login/", response_model=schemas.User)
# def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     db_user = security.get_user_by_email(db, email=user.email)
#     if (security.verify_hash(user.password,db_user.salt).decode('utf-8') == db_user.hashed_password):
#         return db_user
#     else:
#         raise HTTPException(status_code=400, detail="Invalid Login")

@app.post("/test")
async def playground(request:Request):
    print(request)
    json = await request.json()
    print(json)
    return {"message":json}
