from fastapi import Request, APIRouter
from app.utils.prompt import generate_prompt
from app.utils.r2 import *
from app.utils.gallery import *
from app.utils.stability_text import *
from app.utils.blurhash64 import *
import time

router = APIRouter()


@router.get("/ping")
async def return_home():
    return {'message': "Server Online"}

    
@router.get("/gallery_latest")
async def return_gallery_latest(request: Request):
    print(request)
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
