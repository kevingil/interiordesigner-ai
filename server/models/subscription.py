from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from auth.database import Base

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    stripe_subscription_id = Column(String, unique=True, index=True)
    customer_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, index=True)
    
    customer = relationship("User", back_populates="subscriptions")
