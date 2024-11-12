/// <reference types="vite/client" />

type Message = {
    id: string;
    content: string;
    date: string;
    user: MessageUser;
    chatRoom: MessageChatRoom;
    file?: MessageFile;
};

type MessageUser = {
    name: string;
    email: string;
    urlImg: string;
};

type MessageChatRoom = {
    name: string;
};

type MessageFile = {
    id: string;
    originalName: string;
    size: number;
    path: string;
};

type SavedChat = {
    roomName: string;
    lastMessage: string;
    lastMessageTime: Date;
};
