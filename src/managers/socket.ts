import { io, type Socket } from "socket.io-client";

interface SendOptions {
    roomName: string;
    userToken: string;
}

interface SendMessageOptions extends SendOptions {
    msg: string;
}

const socket = io("https://programmers-chat-backend.onrender.com");
export const socketManager = SocketManager(socket);

function SocketManager(socket: Socket) {
    socket.on("connection", (msg) => console.log(msg));

    return {
        sendMessage: (options: SendMessageOptions) => {
            socket.emit("msg", options);
        },
        onMessage: (callBack: (data: Message) => void) => {
            socket.on("msg", (data) => callBack(data));
        },
        disconnect: (userEmail: string) => {
            socket.emit("disconnection", userEmail);
        },
    };
}
