from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from stripe.api_resources import Subscription
from stripe.error import StripeError
from core.users import get_user
from models.auth import User
from models.subscription import SubscriptionCreate, SubscriptionUpdate, SubscriptionCancel

router = APIRouter(
    prefix="/billing",
    tags=["Billing"],
    responses={404: {"description": "Not found"}},
)

@router.post("/subscribe", response_model=Subscription)
async def subscribe(subscription_data: SubscriptionCreate, current_user: User = Depends(get_user)):
    try:
        # TODO: integrate with Stripe to create a subscription
        # Example:
        # stripe.Subscription.create(
        #     customer=current_user.stripe_customer_id,
        #     items=[
        #         {"price": subscription_data.price_id},
        #     ],
        # )
        
        # Test returns a dummy Subscription object
        return Subscription(id="sub_123", customer=current_user.stripe_customer_id)
    except StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/subscription/update", response_model=Subscription)
async def update_subscription(subscription_data: SubscriptionUpdate, current_user: User = Depends(get_user)):
    try:
        # TODO: integrate with Stripe to update a subscription
        # Example:
        # stripe.Subscription.modify(
        #     subscription_data.subscription_id,
        #     items=[
        #         {"id": subscription_data.subscription_item_id, "price": subscription_data.price_id},
        #     ],
        # )
        
        # Test returns a dummy Subscription object
        return Subscription(id=subscription_data.subscription_id, customer=current_user.stripe_customer_id)
    except StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/subscription/cancel", response_model=Subscription)
async def cancel_subscription(subscription_data: SubscriptionCancel, current_user: User = Depends(get_user)):
    try:
        # TODO: integrate with Stripe to cancel a subscription
        # Example:
        # stripe.Subscription.delete(subscription_data.subscription_id)
        
        # Test returns a dummy Subscription object
        return Subscription(id=subscription_data.subscription_id, customer=current_user.stripe_customer_id)
    except StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/subscription/details", response_model=Subscription)
async def get_subscription_details(subscription_id: str, current_user: User = Depends(get_user)):
    try:
        # TODO: integrate with Stripe to retrieve subscription details
        # Example:
        # subscription = stripe.Subscription.retrieve(subscription_id)
        
        # Test returns a dummy Subscription object
        return Subscription(id=subscription_id, customer=current_user.stripe_customer_id)
    except StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))
