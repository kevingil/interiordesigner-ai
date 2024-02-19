import hmac
import hashlib
import base64
import json
import hashlib
import base64
from datetime import datetime, timedelta
from typing import Optional
import json

SECRET_KEY = ""
ALGORITHM = "HS256"

def getSignature(base64Header,base64Payload,secret):
    # print

    block = base64Header.decode('utf-8') + "." + base64Payload.decode('utf-8')
    digest = hmac.new(bytes(secret,'utf-8'),block.encode('utf-8'), digestmod = hashlib.sha256).digest()
    # Digest sometimes returns non alphanumeric characters
    signature = base64.urlsafe_b64encode(digest)
    return signature.decode('utf-8')[: -1]

def encodeJWT(data,key,algorithm):
  payload = data
  # payload={
  # "sub": "1234567890",
  # "name": "John Doe",
  # "iat": 1516239022
  # }
  header = {
  "alg": algorithm,
  "typ": "JWT"
  }
  base64Header = base64.b64encode(json.dumps(header).encode("utf-8"))
  # Dumping header and payload dictionaries to string then encoding in bytes and then finally encoding in base64 bytes
  base64Payload = base64.b64encode(json.dumps(payload).encode("utf-8"))
  sig = getSignature(base64Header,base64Payload,key)
  encodedJWT = base64Header.decode("utf-8")+"."+base64Payload.decode("utf-8")+"."+sig
  return encodedJWT

def decodeJWT(access_token,key):
  header = access_token.split('.')[0]
  payload = access_token.split('.')[1]
  decodedPayload = base64.b64decode(payload)
  sig = getSignature(header.encode('utf-8'),payload.encode('utf-8'),key)
  res = {
    "payload":decodedPayload.decode('utf-8'),
    "verified":(sig==access_token.split('.')[2])
  }
  if(sig==access_token.split('.')[2]):
    return res
  else:
    return "Couldn't Verify Signature"


def verify_hash(password,savedSalt):
    # Salt is in utf-8 string I need to encode it in Base64 and then decode the Base64 to bytes
    savedSalt = savedSalt.encode('utf-8')
    savedSalt = base64.b64decode(savedSalt)
    key = hashlib.pbkdf2_hmac(
    'sha256', # The hash digest algorithm for HMAC
    password.encode('utf-8'), # Convert the password to bytes
    savedSalt, # Provide the salt
    100000 # It is recommended to use at least 100,000 iterations of SHA-256 
)   
    key = base64.b64encode(key)
    return key


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire.isoformat()})
    encoded_jwt = encodeJWT(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user_email(token):
    decoded = decodeJWT(token, SECRET_KEY)
    # email: str = payload["sub"]
    user_email = json.loads(decoded["payload"])["sub"]
    return user_email
    # if username is None:
    #     raise credentials_exception
    # token_data = TokenData(username=username)
    # except JWTError:
    #     raise credentials_exception
    # user = get_user(fake_users_db, username=token_data.username)
    # if user is None:
    #     raise credentials_exception
    # return user
