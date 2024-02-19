from typing import List
from fastapi import Depends, HTTPException, Request, APIRouter
from datetime import timedelta
from database import get_db
import re
from core.users import (
    create_user,
    get_user_by_email,
    get_users,
    get_user,
    create_user_image,
)
from models.users import UserCreate, User, ImageCreate, Token, Image

import auth.security as security
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


router = APIRouter(
    prefix="/user",
    tags=["Users"],
    responses={404: {"description": "Not found"}},
)

ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

origins = "*"


@router.post("/", response_model=User)
async def create_user(user: UserCreate, db = Depends(get_db)):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    db_user = get_user_by_email(db, email=user.email)
    if (re.fullmatch(regex, user.email) == None):
        raise HTTPException(status_code=409, detail="Invalid Email Address")
    if db_user:
        raise HTTPException(status_code=409, detail="Email already registered")
    return create_user(db=db, user=user)


@router.get("/{user_id}", response_model=User)
async def read_user(user_id: int, db = Depends(get_db)):
    db_user = get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/{user_id}/images/", response_model=Image)
async def create_item_for_user(
    user_id: int, item: ImageCreate, db = Depends(get_db)
):
    return create_user_image(db=db, item=item, user_id=user_id)


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db = Depends(get_db)
):
    db_user = get_user_by_email(db, email=form_data.username)
    if not (security.verify_hash(form_data.password, db_user.salt).decode('utf-8') == db_user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token}

