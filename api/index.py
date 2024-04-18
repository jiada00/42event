import os, uvicorn
from zhipuai import ZhipuAI
from dotenv import load_dotenv
from typing import Union
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

origins = [
    # "http://localhost:3000",
    # "http://localhost:8080",
    # 'http://0.0.0.0:8000',
    # 'http://localhost:8000'
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    prompt: str
    template: str

def zhipu_model(prompt: str, template: str):
    key_value = os.environ.get('api_key')
    client = ZhipuAI(api_key=key_value)
    #print(item.prompt)
    response = client.chat.completions.create(
        model="glm-4",  
        messages=[
            {"role": "system", "content": """你是一个社群活动运营专家，请你根据我提供的活动信息，按照模板格式，生成对应的内容。文字内容的要求是不要使用markdown语法和表情符号。以下是不同模板的生成要求：
                                            {活动简介}
                                            简洁明了：简介应简洁明了地介绍活动的主题、目的、时间、地点和重要亮点。
                                            引人入胜：应引起读者兴趣，概括性地描述活动的特色和意义。
                                            重点突出：突出活动的独特之处，突显吸引人的亮点。
                                            {活动公告}
                                            清晰明了：公告应清晰地传达活动的时间、地点、主题和重要信息。
                                            目标明确：明确公告的目的，如招募志愿者、征集参与者等。
                                            鼓励参与：鼓励读者积极参与，并提供相关联系方式或报名途径。
                                            {活动邀请函}
                                            礼貌规范：以礼貌的语言邀请受邀者参加活动，提供活动的时间、地点和内容。
                                            个性化：根据受邀者的身份和关系，进行个性化的邀请。
                                            回复要求：提供回复方式，便于组织者统筹安排。
                                            {活动须知}
                                            明确规定：明确活动的参与规定、注意事项和安全须知。
                                            细致周到：包括参与者需要了解的各种细节，如签到流程、服装要求、紧急联系方式等。
                                            鼓励互动：鼓励参与者积极互动，提供互动方式和建议。
                                            {活动日程}
                                            详细完整：提供活动的详细日程安排，包括主题、时间、地点和主持人等信息。
                                            时间合理：安排合理的时间分配，确保各项内容充分展示和参与。
                                            留有余地：适当留有调整余地，以应对可能的变化和延误。
                                            {活动新闻稿}
                                            新闻价值：突出活动的新闻价值，包括活动的意义、影响和特色。
                                            客观真实：客观、真实地报道活动信息，避免夸大或虚假宣传。
                                            吸引眼球：采用吸引人的标题和内容，引起媒体和公众的关注。
            """},
            {"role": "user", "content": f"以下是活动信息：{prompt}，模板类型是{template}"},
        ],
        stream=True,
    )
    return response

# def openai_model(prompt: str):
#     client = OpenAI()
#     response = client.chat.completions.create(
#     model="gpt-3.5-turbo",
#     messages=[
#         {"role": "system", "content":"""你是一个社群活动运营专家，请你根据我提供的活动信息，编辑一段活动宣传公告。要求如下：
#                                                 1、公告需要包括活动主题、活动时间、活动参与方式等主要信息。
#                                                 2、语言准确，有吸引力。"""},
#         {"role": "user", "content":f"以下是活动信息：{prompt}"}
#     ],
#     stream=True,
#     )
#     return response

@app.post("/api/generate")
async def generate(item: Item):
    async def stream():
        response = zhipu_model(item.prompt, item.template)
        #response = openai_model(item.prompt)
        for chunk in response:
            content = chunk.choices[0].delta.content
            if content is not None:
                yield content.encode("utf-8")
    return StreamingResponse(stream(),media_type="text/plain")

if __name__ == "__main__":
    uvicorn.run("api.index:app", port=8000, log_level="info")
