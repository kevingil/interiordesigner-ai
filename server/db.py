import os
import psycopg
import boto3
from psycopg import OperationalError
from dotenv import load_dotenv
from datetime import datetime, timezone

def neon_ping():
    load_dotenv('utils/.env')
    dbname = 'neondb' 
    user = 'kevingil'  # Replace with your PostgreSQL username
    password = '4dysoVRXk9Nq'  # Replace with your PostgreSQL password
    host = 'ep-twilight-glitter-09005170.us-west-2.aws.neon.tech'
    port = '5432'  # Default PostgreSQL port
    sslmode = 'require'

    # Construct the connection string
    conn_string = f"dbname={dbname} user={user} password={password} host={host} port={port} sslmode={sslmode}"

    try:
        # Establish a connection to the database
        with psycopg.connect(conn_string) as conn:
            with conn.cursor() as cursor:
                # Example: Execute a query to get the first row from the Images table
                cursor.execute("SELECT * FROM Images FETCH FIRST 1 ROW ONLY;")

                # Fetch the result (if any)
                result = cursor.fetchone()
                if result:
                    print("Ping test: \n")
                    print(result)
                else:
                    print("No rows found. Updating ALL from S3")
                    
                    """
                    # Add all images from S3 bucket to database if none exists
                    account_id = os.getenv("CLOUDFLARE_ACCOUNT_ID")
                    access_key_id = os.getenv("R2_ACCESS_KEY_ID")
                    secret_access_key = os.getenv("R2_SECRET_ACCESS_KEY")
                    bucket_name = 'cdn'

                    s3 = boto3.client(
                        service_name='s3',
                        endpoint_url=f'https://{account_id}.r2.cloudflarestorage.com',
                        aws_access_key_id=access_key_id,
                        aws_secret_access_key=secret_access_key,
                        region_name="auto",
                    )
                    
                    

                    # List all objects in the S3 bucket
                    response = s3.list_objects_v2(Bucket=bucket_name)

                    # Iterate through objects and insert relevant information into the database
                    for obj in response.get('Contents', []):
                        if obj['Key'].startswith('interiordesigner/'):
                            # Assuming 'Images' table has columns 'id', 'imageurl', 'timestamp', and 'upload'
                            object_key = obj['Key']
                            image_url = f"https://{bucket_name}.kevingil.com/{object_key}"

                            # Get the last modified date of the S3 object
                            last_modified = s3.head_object(Bucket=bucket_name, Key=obj['Key'])['LastModified']
                            # Make the comparison timestamp offset-aware
                            cutoff_time = datetime(2023, 11, 20, tzinfo=timezone.utc)
                            description = "N/A"
                            # Conditionally set the description based on the timestamp
                            if last_modified >= cutoff_time:
                                description = "SBXL 1.0"
                            else:
                                description = "OpenAI"

                            timestamp = last_modified.strftime('%Y-%m-%d %H:%M:%S')
                            upload = 'No'

                            # Example: Insert data into the 'Images' table
                            cursor.execute("INSERT INTO Images (description, imageurl, owner, rendertime, seed, timestamp, upload) VALUES (%s, %s, %s, %s, %s, %s, %s);",
                                        (description, image_url, 1, "N/A", 0, timestamp, upload))
                    """
                            

    except OperationalError as e:
        print(f"Error connecting to the database: {e}")
        print(f"Connection string used: {conn_string}")



