from typing import List, Optional
from pydantic import BaseModel

class ImageBase(BaseModel):
    title: str
    url: str
class ImageCreate(ImageBase):
    pass

class Image(ImageBase):
    id: int
    owner_id: int
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    role: str
    images: List[Image] = []
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
