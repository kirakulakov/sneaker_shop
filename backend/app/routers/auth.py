
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from app.schemas.token import Token
from app.core.security import create_access_token
from app.core.config import settings
from app.schemas.user import User

router = APIRouter()

@router.post("/token", response_model=Token)
async def login_for_access_token(user: User):
    if not user.telegram_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Telegram ID",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.telegram_id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}