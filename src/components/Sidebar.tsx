import { Button, Sidebar, SidebarLogo, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";

function showSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.classList.add("translate-x-0");
    }
}

function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.classList.remove("translate-x-0");
    }
}

function NoSavedChats() {
    return (
        <div className="mt-2 text-gray-500 flex flex-col items-center w-full gap-1">
            <svg
                className="size-8 fill-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path d="M121 32C91.6 32 66 52 58.9 80.5L1.9 308.4C.6 313.5 0 318.7 0 323.9L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-92.1c0-5.2-.6-10.4-1.9-15.5l-57-227.9C446 52 420.4 32 391 32L121 32zm0 64l270 0 48 192-51.2 0c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7l-120.4 0c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7L73 288 121 96z" />
            </svg>
            <span className="text-center text-pretty">
                No hay chats recientes
            </span>
        </div>
    );
}

function SavedChats({ messages }: { messages: Message[] }) {
    const savedChats: SavedChat[] = [];

    messages.forEach((message) => {
        const roomName = message.chatRoom.name;
        const matched = savedChats.find(
            (savedChat) => savedChat.roomName == roomName
        );

        if (matched) {
            matched.lastMessage = message.content;
            matched.lastMessageTime = new Date(message.date);
        } else {
            savedChats.push({
                lastMessage: message.content,
                lastMessageTime: new Date(message.date),
                roomName,
            });
        }
    });

    return savedChats.map((savedChat) => (
        <SidebarItem key={crypto.randomUUID()} savedChat={savedChat} />
    ));
}

export default function MySidebar({ messages }: { messages: Message[] }) {
    const [content, setContent] = useState(
        <div className="flex justify-center mt-2">
            <Spinner size="lg" color="purple" />
        </div>
    );

    useEffect(() => {
        fetch("https://programmers-chat-backend.onrender.com/users/lastConnectionTime", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                const lastConnectionTime = new Date(data.lastConnectionTime);

                const filteredMessages = messages.filter(
                    (message) =>
                        new Date(message.date).valueOf() >=
                        lastConnectionTime.valueOf()
                );
                filteredMessages.sort(
                    (a, b) =>
                        new Date(a.date).valueOf() - new Date(b.date).valueOf()
                );

                if (filteredMessages.length == 0) {
                    setContent(<NoSavedChats />);
                } else {
                    setContent(<SavedChats messages={filteredMessages} />);
                }
            });
    }, [messages]);

    return (
        <>
            <div className="flex justify-between items-center p-3 sm:hidden dark:bg-gray-800">
                <a
                    href="/"
                    className="ms-2 inline-flex items-center gap-1 font-semibold whitespace-nowrap text-xl dark:text-white"
                >
                    <img
                        src="/logo.webp"
                        className="flex items-center m-0 p-0 ps-1 size-7 mr-1"
                    />
                    Chat App
                </a>
                <Button
                    onClick={showSidebar}
                    color="transparent"
                    className="inline-flex items-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        ></path>
                    </svg>
                </Button>
            </div>
            <Sidebar
                id="sidebar"
                className="fixed top-0 left-0 z-40 w-72 sm:w-64 md:w-72 lg:w-96 xl:w-[428px] h-screen transition-transform -translate-x-full sm:translate-x-0 [&>div]:flex [&>div]:flex-col"
            >
                <div className="flex justify-between items-center">
                    <SidebarLogo
                        href="/"
                        img="/logo.webp"
                        className="flex items-center m-0 p-0 ps-1"
                        imgAlt="Logo"
                    >
                        Chat App
                    </SidebarLogo>
                    <Button
                        onClick={closeSidebar}
                        color="transparent"
                        className="inline-flex items-center mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    >
                        <svg
                            className="size-6"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 6L18 18M18 6L6 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Button>
                </div>
                <div
                    className="flex flex-col gap-2 mt-4 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
                    title="Chats"
                >
                    {content}
                </div>
                <div className="flex items-end justify-center flex-1 justify-self-end text-sm text-gray-500 text-center pt-4">
                    <div className="flex gap-1 items-center justify-center">
                        <a
                            href="https://github.com/CarMi0Proggramer"
                            target="_blank"
                            className="rounded-full dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500/20 p-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 496 512"
                                className="size-5"
                            >
                                <path
                                    fill="currentColor"
                                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/carlos-miguel-dev"
                            target="_blank"
                            className="rounded-full dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500/20 p-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="size-5"
                            >
                                <path
                                    fill="currentColor"
                                    d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://www.youtube.com/@cm_dev06"
                            target="_blank"
                            className="rounded-full dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500/20 p-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                className="size-5"
                            >
                                <path
                                    fill="currentColor"
                                    d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </Sidebar>
        </>
    );
}
