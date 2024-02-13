from typing import List, Optional
from pydantic import BaseModel

class ImageBase(BaseModel):
    title: str
    description: Optional[str] = None
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
    is_active: bool
    images: List[Image] = []

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str

class Note(BaseModel):
    id: str
    title:str
    description:str

class NoteRequest(BaseModel):
    title:str
    description:str
