import PIL.Image
import base64
import io
from io import BytesIO

def get_blurhash(image_bin):
    with PIL.Image.open(BytesIO(image_bin)) as img:
        img_resized = img.resize((10, 10), PIL.Image.NEAREST)
        buffered = BytesIO()
        img_resized.save(buffered, format="JPEG", quality=10)  
        base64_string = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return base64_string

def get_blurhashes(image_bin):
    hashes = []
    for bytes in image_bin:
        hashes.append(get_blurhash(bytes))

    return hashes
