"use client"

// import { set } from 'date-fns';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';

interface SectionProps {
    inputValue: string; 
    onInputChange: (newValue: string) => void; 
    onButtonClick: () => void; 
    outputValue: string; 
    placeholder: string; 
  }
  

const Section = ({ inputValue, onInputChange, onButtonClick, outputValue, placeholder}: SectionProps) => {
  return (
    <div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8 mt-5">
        <div className="h-32 rounded-lg white col-span-1 flex items-center">
                <input
                    id="eventtype"
                    placeholder={placeholder}
                ></input>
            </div>            
            <div className="h-32 rounded-lg bg-white col-span-4">
                <textarea
                            id="eventinfo"
                            className="mt-1 w-full rounded-lg border-2 border-gray-100 align-top shadow-sm sm:text-sm text-black p-3 focus:border-gray-500 focus:outline-none focus:ring-0"
                            rows={5}
                            value={inputValue}
                            onChange={(e) => onInputChange(e.target.value)}
                            placeholder={placeholder}
                        ></textarea>
            </div>
            <div className="h-32 rounded-lg bg-white col-span-5">
                <textarea
                            id="eventinfo-ai"
                            className="mt-1 w-full rounded-lg border-2 border-gray-100 align-top shadow-sm sm:text-sm text-black p-3 focus:border-gray-500 focus:outline-none focus:ring-0"
                            rows={5}
                            placeholder={placeholder}
                            value={outputValue}
                            readOnly
                        ></textarea>
            </div>
            <div className="h-32 rounded-lg bg-white col-span-2 flex items-center">
                <button
                    className="text-center block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-500"
                    onClick={onButtonClick}
                >
                    重新生成
                </button>
            </div>

        </div>
    </div>

  );
};


const Home = () => {
    const placeholders = [
        "活动简介",
        "活动公告",
        "活动邀请函",
        "活动须知",
        "活动日程",
        "活动新闻稿"
    ];
    const [sections, setSections] = useState(Array(6).fill(null).map((_, index) => ({ inputValue: '', outputValue: '', placeholder: placeholders[index] })));
    const [triggerApiCall, setTriggerApiCall] = useState(false);

    const handleInputChange = (index: number, value: string) => {
        const newSections = sections.map((section, idx) =>
            idx === index ? { ...section, inputValue: value } : section
        );
        setSections(newSections);
    };

    // const handleButtonClick = async (index: number) => {
    //     const prompt = sections[index].inputValue;
    //     const template = sections[index].placeholder;
    //     if(prompt.trim().length === 0) {
    //         alert('提示词不能为空！')
    //         return
    //        }
    //     // 显示初始加载文本
    //     setSections(prevSections => prevSections.map((section, idx) =>
    //         idx === index ? { ...section, outputValue: '正在生成...' } : section
    //     ));
    
    //     try {
    //         const URL = process.env.NEXT_PUBLIC_VERCEL_URL
    //         ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
    //         : "http://localhost:3000/api";
    //         console.log(URL)
    //         const response = await fetch(`${URL}/generate`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ prompt, template }),
    //         });
            
    //         if (response.body){
    //             const reader = response.body.getReader();
    //             const decoder = new TextDecoder();

    //             let outputValue = ''; // 用于累积接收到的所有数据块
    
    //             // 定义一个递归函数来处理流
    //             const processStream = async () => {
    //                 const { value, done } = await reader.read();
    //                 if (done) {
    //                     // 数据流结束，更新UI以展示最终输出内容
    //                     setSections(prevSections => prevSections.map((section, idx) =>
    //                         idx === index ? { ...section, outputValue } : section
    //                     ));
    //                     console.log("data streaming is over.");
    //                     return; // 数据流结束
    //                 }
    //                 const decodedValue = decoder.decode(value, { stream: true });
    //                 outputValue += decodedValue; // 累积接收到的数据
    //                 setSections(prevSections => prevSections.map((section, idx) =>
    //                 idx === index ? { ...section, outputValue: section.outputValue + decodedValue } : section
    //             ));                        
    //                 // 递归处理下一块数据
    //                 await processStream();
    //             };
    //             // 开始处理数据流
    //             await processStream();                
    //         } else{

    //         }

    //     } catch (error) {
    //         console.error('Error processing stream:', error);
    //         // 处理错误，例如，通过在UI中设置错误消息
    //         setSections(prevSections => prevSections.map((section, idx) =>
    //             idx === index ? { ...section, outputValue: '生成失败，请重试' } : section
    //         ));
    //     }
    // };
    
    const handleButtonClick = async (index: number) => {
        const prompt = sections[index].inputValue;
        const template = sections[index].placeholder;
        if (prompt.trim().length === 0) {
            alert('提示词不能为空！');
            return;
        }
        // 显示初始加载文本
        setSections(prevSections => prevSections.map((section, idx) =>
            idx === index ? { ...section, outputValue: '正在生成...' } : section
        ));
    
        try {
            const URL = process.env.NEXT_PUBLIC_VERCEL_URL
                ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/generate`
                : "http://localhost:3000/api/generate";
            // console.log(URL);
            const response = await fetch("/api/generate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt, template }),
            });
    
            if (response.ok) {
                const data = await response.json(); // 假设后端返回的是JSON格式的数据
                // 假设后端返回的数据中有一个字段是output，包含了生成的文本
                const outputValue = data.output || '生成失败，请重试';
    
                // 更新UI以展示最终输出内容
                setSections(prevSections => prevSections.map((section, idx) =>
                    idx === index ? { ...section, outputValue } : section
                ));
            } else {
                // 处理HTTP错误状态
                console.error('HTTP error:', response.status);
                setSections(prevSections => prevSections.map((section, idx) =>
                    idx === index ? { ...section, outputValue: '生成失败，请重试' } : section
                ));
            }
        } catch (error) {
            console.error('Error processing request:', error);
            // 处理请求发送过程中的错误
            setSections(prevSections => prevSections.map((section, idx) =>
                idx === index ? { ...section, outputValue: '生成失败，请重试' } : section
            ));
        }
    };
    
    const triggerAllRequestsSequentially = async () => {
        for (let index = 0; index < sections.length; index++) {
            // 检查输入是否为空，如果为空则跳过
            if (sections[index].inputValue.trim().length === 0) {
                console.log(`Skipping section ${index} due to empty input.`);
                continue;
            }
            await handleButtonClick(index);
        }
    };    
           
    useEffect(() => {
        const activityInfo = localStorage.getItem('activityInfo');
        if (activityInfo) {
            // 首先更新 sections 来填充输入框
            const updatedSections = sections.map(section => ({
                ...section,
                inputValue: activityInfo
            }));
            setSections(updatedSections);
    
            // 使用额外的状态来触发 API 调用
            setTriggerApiCall(true);
        }
    }, []);
    
    // 使用 useEffect 来监听 triggerApiCall 的变化
    useEffect(() => {
        if (triggerApiCall) {
            const triggerAllRequestsSequentially = async () => {
                for (let index = 0; index < sections.length; index++) {
                    // 使用 setTimeout 来延迟请求
                    await new Promise((resolve) => {
                        setTimeout(async () => {
                            try {
                                await handleButtonClick(index);
                            } catch (error) {
                                console.error(`请求 ${index} 失败:`, error);
                                // 可以在这里决定是否要中断后续请求
                                // 如果你决定中断，可以使用 reject() 而不是 resolve()
                            }
                            resolve(); // 确保即使请求失败也继续执行后续请求
                        }, 5000); // 延迟时间，这里设置为 1000 毫秒（1秒）
                    });
                }
                setTriggerApiCall(false);
            };
    
            triggerAllRequestsSequentially();
        }
    }, [triggerApiCall]);
    
    
    return (
        <div className="w-3/4 mt-5 text-black">
            {sections.map((section, index) => (
                <Section
                    key={index}
                    inputValue={section.inputValue}
                    onInputChange={(value) => handleInputChange(index, value)}
                    onButtonClick={() => handleButtonClick(index)}
                    outputValue={section.outputValue}
                    placeholder={section.placeholder}
                />
            ))}
        </div>
    );
};

export default Home;
