from fastapi import APIRouter

router = APIRouter()

@router.get("/sneakers")
async def get_sneakers():
    return {"sneakers": ["Nike Air Max", "Adidas Yeezy", "Puma RS-X"]}