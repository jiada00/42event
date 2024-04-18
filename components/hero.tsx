// import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function Hero(){

    const [activityInfo, setActivityInfo] = useState('');
    
    const handleGenerateClick = () => {
        localStorage.setItem('activityInfo', activityInfo);
    };
    return(
        <section className="bg-white w-full mx-auto flex flex-col justify-center">
            <div className="mx-auto max-w-screen-xl px-4 py-12 lg:flex">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl text-red-700">
                        活水活动
                    </h1>
                    <p className="mt-4 sm:text-xl/relaxed text-black">
                        一键生成活动信息，举办活动，快人一步
                    </p>
                </div>
            </div>
            <div className="px-4 lg:px-0">
                <textarea
                            id="OrderNotes"
                            className="mt-1 w-full rounded-lg border-2 border-gray-200 align-top shadow-sm sm:text-sm text-black p-3 focus:border-gray-500 focus:outline-none focus:ring-0"
                            rows={9}
                            placeholder="请输入活动相关信息，如活动时间、地点、背景、主题等"
                            value={activityInfo}
                            onChange={(e) => setActivityInfo(e.target.value)}
                        ></textarea>
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <a
                        className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                        href="/createEvent"
                        onClick={handleGenerateClick}
                        >
                        一键生成
                        </a>
                </div>
            </div>
        </section>        
    )
}