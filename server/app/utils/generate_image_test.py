import openai
from flask import jsonify
#from PIL import Image
import os
#from io import BytesIO  
from dotenv import load_dotenv

def generate_image_test(prompt, qty, size):
    load_dotenv()
    openai.api_key = os.getenv("OPENAI_API_KEY")
    
    #Just in case because credits are expensive
    if (qty > 4):
        qty = 1

    try:
        responses = []
        
        #image_filename = f'{room_name}.png'
        #mask_filename = f'{room_name}-mask.png'
        #image_directory = os.path.join(os.getcwd(), "app", "images", image_filename)
        #mask_directory = os.path.join(os.getcwd(), "app", "images", mask_filename)
        #print(image_directory)
        #print(mask_directory)

        for _ in range(qty):

            response = openai.Image.create(
                prompt=prompt,
                #image=open(image_directory, "rb"),
                #mask=open(mask_directory, "rb"),
                n=qty,
                size=size
            )
            image_url = response['data'][0]['url']
            responses.append(image_url)

        return {'images': responses} 
    except Exception as e:
        return {'error': f'Failed to generate images: {str(e)}'}  
