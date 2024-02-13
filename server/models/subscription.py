from pydantic import BaseModel
from typing import List, Optional, Dict

class SubscriptionItem(BaseModel):
    id: str
    plan: str
    quantity: int
    metadata: Optional[Dict]

class Subscription(BaseModel):
    id: str
    customer: str
    items: List[SubscriptionItem]
    status: str
    current_period_start: int
    current_period_end: int
    canceled_at: Optional[int]
    metadata: Optional[Dict]


class SubscriptionCreate(BaseModel):
    price_id: str

class SubscriptionUpdate(BaseModel):
    subscription_id: str
    subscription_item_id: str
    price_id: str

class SubscriptionCancel(BaseModel):
    subscription_id: str
