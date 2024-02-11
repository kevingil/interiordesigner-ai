import os
import hashlib
import base64
from datetime import datetime, timedelta
from typing import Optional, OrderedDict
import auth.jwt 
import json
import models.auth as auth


def get_user(db: Session, user_id: int):
    return db.query(auth.User).filter(auth.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(auth.User).filter(auth.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(auth.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: auth.UserCreate):
    salt = os.urandom(32)
    key = hashlib.pbkdf2_hmac(
        'sha256', # The hash digest algorithm for HMAC
        user.password.encode('utf-8'), # Convert the password to bytes
        salt, # Provide the salt
        100000 # It is recommended to use at least 100,000 iterations of SHA-256 
    )   
        #Bytes encoded to Base64 but still in byte format
    encodedSalt = base64.b64encode(salt)
    encodedKey = base64.b64encode(key)
    # fake_hashed_password = user.password + "notreallyhashed"
     
    db_user = auth.User(email=user.email, hashed_password=encodedKey.decode('utf-8'),salt=encodedSalt.decode('utf-8'))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user



def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(auth.Item).offset(skip).limit(limit).all()



def create_user_item(db: Session, item: auth.ItemCreate, user_id: int):
    db_item = auth.Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
def create_user_note(db:Session, note:str,user_id:int):
    print(note)
    # note = json.loads(note)
    db_item = auth.Note(**note, owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return note
def update_user_note(db:Session, note:str,user_id:int):
    # print(note)
    # note = json.loads(note)
    db_item = auth.Note(**note, owner_id=user_id)
    updateObject = db.query(auth.Note).filter_by(owner_id=user_id,id=note["id"]).first()
    updateObject.description = db_item.description
    updateObject.title = db_item.title
    db.commit()
    db.refresh(updateObject)
    return note

def get_user_notes(db: Session, user: auth.User,skip: int = 0, limit: int = 100):
    items = db.query(auth.Note).filter_by(owner_id=user.id).offset(skip).limit(limit).all()
    notes = []
    for item in items:
        note = OrderedDict()
        note["id"]=item.id
        note["title"] =  item.title
        note["description"] = item.description
        notes.append(note)
    return notes

def delete_user_note(db: Session, note:str,user_id: int):
    # note = json.loads(note)
    item = db.query(auth.Note).filter_by(owner_id=user_id,id=note["id"]).first()
    # db.add(db_item)
    db.delete(item)
    db.commit()
    return item
