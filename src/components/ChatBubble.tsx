import { Dropdown, DropdownItem, Clipboard } from "flowbite-react";
import Avatar from "./Avatar";

type ChatBubbleOptions = {
    message: Message;
    setOpenModal: (state: boolean) => void;
    reverse?: boolean;
};

export default function ChatBubble({
    reverse,
    message,
    setOpenModal,
}: ChatBubbleOptions) {
    const className = reverse
        ? "flex flex-row-reverse items-start gap-2.5"
        : "flex items-start gap-2.5";
    const date = new Date(message.date);

    return (
        <div id={message.id} className={className}>
            <Avatar src={message.user.urlImg} alt="User Photo" />
            <div className="flex items-start gap-2.5">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {message.user.name}
                            </span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                {date.toLocaleDateString()}
                            </span>
                        </div>
                        {message.content && (
                            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white break-words">
                                {message.content}
                            </p>
                        )}
                        {message.file && (
                            <div className="mt-2 flex items-start bg-gray-50 dark:bg-gray-600 rounded-xl p-2">
                                <div className="me-2">
                                    <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                                        <svg
                                            fill="none"
                                            aria-hidden="true"
                                            className="w-5 h-5 flex-shrink-0"
                                            viewBox="0 0 20 21"
                                        >
                                            <g clipPath="url(#clip0_3173_1381)">
                                                <path
                                                    fill="#E2E5E7"
                                                    d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"
                                                />
                                                <path
                                                    fill="#B0B7BD"
                                                    d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"
                                                />
                                                <path
                                                    fill="#CAD1D8"
                                                    d="M18.774 9.25l-3.75-3.75h3.75v3.75z"
                                                />
                                                <path
                                                    fill="#F15642"
                                                    d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z"
                                                />
                                                <path
                                                    fill="#fff"
                                                    d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z"
                                                />
                                                <path
                                                    fill="#CAD1D8"
                                                    d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_3173_1381">
                                                    <path
                                                        fill="#fff"
                                                        d="M0 0h20v20H0z"
                                                        transform="translate(0 .5)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        {message.file.originalName}
                                    </span>
                                    <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
                                        {loadFileSize(message.file.size)}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            className="self-center"
                                            width="3"
                                            height="4"
                                            viewBox="0 0 3 4"
                                            fill="none"
                                        >
                                            <circle
                                                cx="1.5"
                                                cy="2"
                                                r="1.5"
                                                fill="#6B7280"
                                            />
                                        </svg>
                                        PDF
                                    </span>
                                </div>
                                <div className="inline-flex self-center items-center">
                                    <button
                                        onClick={() => {
                                            if (message.file) {
                                                const anchor =
                                                    document.createElement("a");
                                                anchor.href = `http://localhost:3000/files/download/${message.file.id}`;
                                                anchor.download =
                                                    message.file.originalName;

                                                document.body.appendChild(
                                                    anchor
                                                );
                                                anchor.click();
                                                document.body.removeChild(
                                                    anchor
                                                );
                                            }
                                        }}
                                        className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
                                        type="button"
                                    >
                                        <svg
                                            className="w-4 h-4 text-gray-900 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                                            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Dropdown
                className="w-36"
                label="message"
                renderTrigger={() => (
                    <button
                        className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                        type="button"
                    >
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 4 15"
                        >
                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                    </button>
                )}
            >
                {message.content && (
                    <DropdownItem>
                        <span
                            onClick={() => {
                                const clipboard = document.getElementById(
                                    `clipboard-${message.id}`
                                );
                                if (clipboard) clipboard.click();
                            }}
                        >
                            Copy
                        </span>
                        <Clipboard
                            className="hidden"
                            id={`clipboard-${message.id}`}
                            valueToCopy={message.content}
                        />
                    </DropdownItem>
                )}
                {reverse && (
                    <DropdownItem onClick={() => setOpenModal(true)}>
                        Delete
                    </DropdownItem>
                )}
            </Dropdown>
        </div>
    );
}

function loadFileSize(size: number) {
    const kb = Math.round((size / 1024) * 100) / 100;
    if (kb < 1024) {
        return `${kb} KB`;
    }

    const mb = Math.round((kb / 1024) * 100) / 100;
    if (mb < 1024) {
        return `${mb} MB`;
    }

    const gb = Math.round((mb / 1024) * 100) / 100;
    if (gb < 1024) {
        return `${gb} GB`;
    }

    return `${size} Bytes`;
}
