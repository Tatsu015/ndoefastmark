import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://127.0.0.1:5000",
    "http://127.0.0.1:3000",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    # Access-Control-Allow-Origin
    return {"message": "hello world!"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)