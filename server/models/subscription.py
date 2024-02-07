from pydantic import BaseModel
from typing import List, Optional

class SubscriptionCreate(BaseModel):
    price_id: str

class SubscriptionUpdate(BaseModel):
    subscription_id: str
    subscription_item_id: str
    price_id: str

class SubscriptionCancel(BaseModel):
    subscription_id: str
