# Interior Designer - AI
>Create interior design renders with the Stable Diffusion API

[InteriorDesigner-AI.com](https://interiordesigner-ai.com/)


![IDAI.png](https://s6.imgcdn.dev/fC8Py.png)





## Develop

This project uses Stable Diffusion to generate renders and Cloudflare R2 storage. The project makes use of cython dependencies that are not compatible with Python 3.12+ for now.


Setup API Keys

```sh
#Setup .env in server/app/routes/
STABILITYAI_API_KEY=your_key
CLOUDFLARE_R2_TOKEN=your_token
R2_ACCESS_KEY_ID=your_id
R2_SECRET_ACCESS_KEY=your_key
CLOUDFLARE_ACCOUNT_ID=your_id
```


Run

```sh
#from client/
npm install
npm run dev

#from server/ 
pip install -r requirements.txt
python server.py
```


## Build with Docker
```sh
docker compose build
docker compose up -d
```
