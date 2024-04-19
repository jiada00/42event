// import { ZhipuAI } from 'zhipuai-sdk-nodejs-v4';
// import dotenv from 'dotenv';

// // 配置dotenv
// dotenv.config();
// console.log(process.env.ZHIPUAI_API_KEY);
// const dialogue = async () => {
//     const ai = new ZhipuAI({
//         // 从环境变量中读取API Key
//         apiKey: process.env.ZHIPUAI_API_KEY
//     });
//     const data = await ai.createCompletions({
//         model: "glm-4",
//         messages: [
//             {"role": "user", "content": "你好"},
//             {"role": "assistant", "content": "我是人工智能助手"},
//             {"role": "user", "content": "你叫什么名字"},
//             {"role": "assistant", "content": "我叫chatGLM"},
//             {"role": "user", "content": "你都可以做些什么事"}
//         ],
//         stream: false, 
//     });

//     // 处理和打印data对象
//     if (data.choices && data.choices.length > 0) {
//         const firstChoice = data.choices[0].message.content;
//         console.log(JSON.stringify(firstChoice, null, 2));
//     } else {
//         console.log("No choices available.");
//     }
// }

// dialogue();

// 文件路径: pages/api/generate.js

import { ZhipuAI } from 'zhipuai-sdk-nodejs-v4';
import dotenv from 'dotenv';

// 配置dotenv
dotenv.config();

export default async function POST(req, res) {
    if (req.method === 'POST') {
        // 解析请求体中的JSON数据
        const { prompt, template } = req.body;

        // 初始化ZhipuAI客户端
        const ai = new ZhipuAI({
            apiKey: process.env.ZHIPUAI_API_KEY
        });
        try {
            // 调用大模型API
            const data = await ai.createCompletions({
                model: "glm-4",
                messages: [
                    {"role": "system", "content": `你是一个社群活动运营专家，请你根据我提供的活动信息，按照模板格式，生成对应的内容。文字内容的要求是不要使用markdown语法和表情符号。以下是不同模板的生成要求：
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
                    `},                    
                    {"role": "user", "content": `以下是活动信息${prompt},模板类型是${template}`},
                    // 根据需要添加更多的对话历史
                ],
                stream: false, 
            });

            // 检查API响应
            if (data.choices && data.choices.length > 0) {
                const firstChoice = data.choices[0].message.content;
                // 将API的响应结果返回给前端
                res.status(200).json({ output: firstChoice });
            } else {
                console.log("No choices available.");
                res.status(500).json({ error: "No choices available." });
            }
        } catch (error) {
            console.error("Error calling ZhipuAI:", error);
            res.status(500).json({ error: "Error processing your request." });
        }
    } else {
        // 如果不是POST请求，返回405 Method Not Allowed
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
