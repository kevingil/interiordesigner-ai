import boto3
import requests
import io
import botocore
import uuid  
import os
from dotenv import load_dotenv

def upload_images(prefix, images):
    
    load_dotenv()
    account_id = os.getenv("CLOUDFLARE_ACCOUNT_ID")
    access_key_id = os.getenv("R2_ACCESS_KEY_ID")
    secret_access_key = os.getenv("R2_SECRET_ACCESS_KEY")
    bucket_name = 'cdn'
    
    
    try:
        s3 = boto3.client(
            service_name='s3',
            endpoint_url=f'https://{account_id}.r2.cloudflarestorage.com',
            aws_access_key_id=access_key_id,
            aws_secret_access_key=secret_access_key,
            region_name="auto",
        )
        
        uploaded_image_urls = []

        for image_url in images:

            key = f"{prefix}{str(uuid.uuid4())}"
            
            try:
                response = requests.get(image_url)
                
                if response.status_code == 200:
                    image_data = io.BytesIO(response.content)
                    
                    # TODO - compress file before upload, from PIL import Image ?
                    
                    s3.upload_fileobj(image_data, bucket_name, key)
                    image_url = f"https://{bucket_name}.kevingil.com/{key}"
                    uploaded_image_urls.append(image_url)
                else:
                    print(f"Failed to download image from URL: {image_url}")
            except requests.exceptions.RequestException as e:
                print(f"Failed to fetch image from URL: {image_url}. Error: {e}")
        
        return uploaded_image_urls

    except botocore.exceptions.ClientError as e:
        print(f"Error uploading to R2: {str(e)}")
        return f"Error uploading to R2: {str(e)}"

# Returns URL of uploaded images
def upload_image_bytes(prefix, image_bytes):
    
    load_dotenv()
    account_id = os.getenv("CLOUDFLARE_ACCOUNT_ID")
    access_key_id = os.getenv("R2_ACCESS_KEY_ID")
    secret_access_key = os.getenv("R2_SECRET_ACCESS_KEY")
    bucket_name = 'cdn'
    
    try:
        s3 = boto3.client(
            service_name='s3',
            endpoint_url=f'https://{account_id}.r2.cloudflarestorage.com',
            aws_access_key_id=access_key_id,
            aws_secret_access_key=secret_access_key,
            region_name="auto",
        )
        
        uploaded_image_urls = []

        for bytes in image_bytes:

            key = f"{prefix}{str(uuid.uuid4())}"
            
            try:
                image_data = io.BytesIO(bytes)
                
                # TODO - compress file before upload, from PIL import Image ?
                
                s3.upload_fileobj(image_data, bucket_name, key)
                image_url = f"https://{bucket_name}.kevingil.com/{key}"
                uploaded_image_urls.append(image_url)
            except requests.exceptions.RequestException as e:
                print(f"Failed to fetch image from URL: {image_url}. Error: {e}")
        
        response = uploaded_image_urls
        return response

    except botocore.exceptions.ClientError as e:
        print(f"Error uploading to R2: {str(e)}")
        return f"Error uploading to R2: {str(e)}"
