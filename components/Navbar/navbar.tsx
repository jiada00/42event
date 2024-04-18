

import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
    return(
        <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <Image src="/logo.svg" alt="logo" width={40} height={40} priority/>

            <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                <li>
                    <Link className="text-black transition hover:text-gray-500/75" href="/"> 首页 </Link>
                </li>

                <li>
                    <Link className="text-black transition hover:text-gray-500/75" href="/discover"> 探索 </Link>
                </li>

                <li>
                    <Link className="text-black transition hover:text-gray-500/75" href="/myevent"> 我的 </Link>
                </li>

                </ul>
            </nav>

            <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                <Link
                    className="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-500"
                    href="#"
                >
                    登录
                </Link>

                <Link
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-red-700 transition hover:text-red-600/75 sm:block"
                    href="#"
                >
                    注册
                </Link>
                </div>

                <button
                className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                >
                <span className="sr-only">Toggle menu</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                </button>
            </div>
            </div>
        </div>
        </header>        
    )
}

