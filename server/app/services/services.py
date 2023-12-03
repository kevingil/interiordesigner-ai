from fastapi import Request, Path, Query, APIRouter
from app.utils.prompt import generate_prompt
from app.utils.generate_image_test import generate_image_test
from app.utils.r2 import *
from app.utils.gallery import *
from app.utils.stability_text import *
import time

router = APIRouter()


@router.get("/ping")
async def return_home():
    return {'message': "Server Online"}

    
@router.get("/gallery_latest")
async def return_gallery_latest(request: Request):
    print(request)
    renders = get_latest_images(16)
    return renders
    
    
@router.post("/generate_test")
async def generate_test(request: Request):
    print(request)
    data = request
    
    if data is None:
        return {'error': 'No JSON data provided in the request'}, 400
    
    start_time = time.time()
    
    response  = generate_prompt(data)
    render_size = "1024x1024"
    render_test = generate_image_test(response['prompt'], response['num'], render_size)
    
    end_time = time.time()
    render_time = round((end_time - start_time), 2)
    
    #If images where generated
    if 'images' in render_test:
        response['images'] = render_test['images']
        uploaded_images = upload_images("interiordesigner/", response['images'])
        print(uploaded_images)
        update_gallery(render_time, "OpenAI", uploaded_images)
    else:
        print(render_test)
        
    print(response)
    return response


# /api/generate_render_test
@router.post("/stability_generate_test")
async def stability_generate_test(request: Request):
    data = request
    
    if data is None:
        return {'error': 'No JSON data provided in the request'}, 400
    
    start_time = time.time()
    # Image request
    imgreq  = generate_prompt(data)
    # Returns image bytes
    stability_renders = stability_text_to_image(imgreq['prompt'], imgreq['num'])
    end_time = time.time()
    render_time = round((end_time - start_time), 2)
    
    # Upload images where generated
    if (stability_renders):
        uploaded_images = upload_image_bytes("interiordesigner/", stability_renders)
        imgreq['images'] = uploaded_images
        update_gallery(render_time, "SBXL 1.0", uploaded_images)
    else:
        imgreq['error'] = 'Failed to generate'
    
    return imgreq
