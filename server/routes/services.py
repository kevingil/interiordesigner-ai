from fastapi import Request, APIRouter
from core.prompt import generate_prompt
from core.database import *
from core.gallery import *
from core.stability_text import *
from core.blurhash64 import *
import time

router = APIRouter(
    tags=["Services"],
    responses={404: {"description": "Not found"}},
)


@router.get("/ping")
async def ping():
    return {'message': "Server Online"}

    
@router.get("/gallery_latest")
async def public_gallery_latest(request: Request):
    renders = await get_latest_images(20)
    return renders
    
# /generate_render
@router.post("/generate_render")
async def generate_render(request: Request):
    data = await request.json()
    description = "SDXL 1.0"
    
    if data is None:
        return {'error': 'No JSON data provided in the request'}, 400
    
    start_time = time.time()
    # Image request
    imgreq  = generate_prompt(data)
    # Returns image bytes
    stability_renders = stability_text_to_image(imgreq['prompt'], imgreq['num'])
    end_time = time.time()
    seconds = round((end_time - start_time), 2)
    render_time = f"{seconds}s"
    
    # Upload images where generated
    if (stability_renders):
        blurhashes = get_blurhashes(stability_renders)
        uploaded_images = upload_image_bytes("interiordesigner/", stability_renders)
        
        imgreq['images'] = uploaded_images
        imgreq['blurhash64'] = blurhashes
        
        await update_gallery(render_time, description, uploaded_images, blurhashes)
    else:
        imgreq['error'] = 'Failed to generate'
    
    return imgreq
