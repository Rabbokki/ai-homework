from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 설정 (React 등 프론트와 연동 위해)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 실제 배포 시에는 특정 도메인으로 제한하세요
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB 연결
client = MongoClient("mongodb://db:27017")  # 도커 컴포즈 기준 호스트명은 'db'
db = client["counterdb"]
counter_col = db["counter"]

# Pydantic 모델
class CountRequest(BaseModel):
    delta: int

@app.on_event("startup")
def startup_event():
    # 처음 실행 시 카운터가 없으면 생성
    if counter_col.count_documents({}) == 0:
        counter_col.insert_one({"count": 0})

@app.get("/count")
def get_count():
    counter = counter_col.find_one()
    return {"count": counter["count"]}

@app.post("/count")
def update_count(req: CountRequest):
    counter = counter_col.find_one()
    new_count = counter["count"] + req.delta
    counter_col.update_one({}, {"$set": {"count": new_count}})
    return {"count": new_count}
