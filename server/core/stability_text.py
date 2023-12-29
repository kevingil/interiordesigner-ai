import os
import io
import warnings
import random
from PIL import Image
from stability_sdk import client
from dotenv import load_dotenv
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation

# Constant
os.environ['STABILITY_HOST'] = 'grpc.stability.ai:443'

# Load API Key
load_dotenv()
os.environ['STABILITY_KEY'] = os.getenv("STABILITYAI_API_KEY")

#r_seed = random.randint(10**8, 10**9 - 1)


def stability_text_to_image(prompt, num):
    # Setup connection
    stability_api = client.StabilityInference(
        key=os.environ['STABILITY_KEY'],
        verbose=True, # Debug logs
        engine="stable-diffusion-xl-1024-v1-0",
        # List of available engines: https://platform.stability.ai/docs/features/api-parameters#engine
    )

    req_prompt = prompt
    req_num = num
    res_image_bytes = []

    # Set up our initial generation parameters.
    answers = stability_api.generate(
        prompt=req_prompt,
       # seed=, # If a seed is provided, the resulting generated image will be deterministic.
                        # What this means is that as long as all generation parameters remain the same, you can always recall the same image simply by generating it again.
                        # Note: This isn't quite the case for Clip Guided generations, which we'll tackle in a future example notebook
                        # Default 4253978046
        steps=50, # Default is 30. 
        cfg_scale=8.0, # Influences how strongly your generation is guided to match your prompt.
                    # Setting this value higher increases the strength in which it tries to match your prompt.
                    # Defaults to 7.0 if not specified.
        width=1024, # 100x100 Setup for test. 1024x768 Setup for 4:3 aspect ratio.
        height=768, # Generation width x height, defaults to 512 if not included.
        samples=req_num, # Number of images to generate, defaults to 1 if not included.
        sampler=generation.SAMPLER_K_DPMPP_2M # Choose which sampler we want to denoise our generation with.
                                            # Defaults to k_dpmpp_2m if not specified. Clip Guidance only supports ancestral samplers.
                                            # (Available Samplers: ddim, plms, k_euler, k_euler_ancestral, k_heun, k_dpm_2, k_dpm_2_ancestral, k_dpmpp_2s_ancestral, k_lms, k_dpmpp_2m, k_dpmpp_sde)
    )

    # Set up our warning to print to the console if the adult content classifier is tripped.
    # If adult content classifier is not tripped, save generated images.
    for resp in answers:
        for artifact in resp.artifacts:
            if artifact.finish_reason == generation.FILTER:
                warnings.warn(
                    "Your request activated the API's safety filters and could not be processed."
                    "Please modify the prompt and try again.")
            if artifact.type == generation.ARTIFACT_IMAGE:
                res_image_bytes.append(artifact.binary)
    
    
    return res_image_bytes
