import Avatar from "./Avatar";

type SidebarItemOptions = {
    savedChat: SavedChat;
};

export default function SidebarItem({ savedChat }: SidebarItemOptions) {
    const { roomName, lastMessage, lastMessageTime } = savedChat;

    return (
        <a
            href={`/chatroom?roomName=${roomName}`}
            className="flex gap-2 items-center pb-2 border-b border-gray-200 dark:border-gray-700"
        >
            <Avatar src={""} alt="Chat Room Logo" />
            <div className="flex justify-between flex-1 gap-1">
                <div className="flex flex-col w-3/4 sm:w-4/6 md:w-3/4">
                    <h4 className="text-md dark:text-white font-semibold">
                        {roomName.replace(/\w/, roomName[0].toUpperCase())}
                    </h4>
                    <p className="text-sm truncate text-ellipsis text-gray-500">
                        {lastMessage ? lastMessage : "Archivo adjunto"}
                    </p>
                </div>
                <div className="flex-1 flex justify-end sm:justify-start md:justify-end items-center">
                    <p className="text-sm text-gray-500 text-end me-0.5 dark:text-gray-400">
                        {lastMessageTime.toLocaleDateString()}
                    </p>
                </div>
            </div>
        </a>
    );
}
