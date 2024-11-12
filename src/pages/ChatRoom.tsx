import { useNavigate, useSearchParams } from "react-router-dom";
import { type FormEvent, type ChangeEvent, useEffect, useState } from "react";
import { socketManager } from "../managers/socket";
import { useStore } from "@nanostores/react";
import { userDataStore } from "../stores/user";
import UserDropdown from "../components/UserDropdown";
import ContentWrapper from "../components/ContentWrapper";
import Sidebar from "../components/Sidebar";
import ChatBubble from "../components/ChatBubble";
import DeleteMessageModal from "../components/DeleteMessageModal";
import { Toast, ToastToggle } from "flowbite-react";

export default function ChatRoom() {
    const [messages, setMessages] = useState([] as Message[]);
    const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const roomName = useSearchParams()[0].get("roomName") as string;
    const userData = useStore(userDataStore);
    const navigate = useNavigate();

    function sendMessage(formEvent: FormEvent) {
        formEvent.preventDefault();

        const input = document.getElementById("message") as HTMLInputElement;
        const msg = input.value;

        input.value = "";

        if (msg) {
            socketManager.sendMessage({
                roomName,
                msg,
                userToken: userData.token,
            });
        }
    }

    function sendFile(changeEvent: ChangeEvent) {
        const target = changeEvent.target as HTMLInputElement;
        const files = target.files as FileList;
        const file = files[0];

        if (file.type != "application/pdf") {
            setShowToast(true);
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("roomName", roomName);
        formData.append("userEmail", userData.email);

        fetch("https://programmers-chat-backend.onrender.com/files/", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((res) => res.json())
            .then((message) => setMessages([...messages, message]));
    }

    socketManager.onMessage((message) => setMessages([...messages, message]));

    useEffect(() => {
        fetch(
            `https://programmers-chat-backend.onrender.com/messages?roomName=${roomName}`,
            {
                credentials: "include",
            }
        )
            .then((res) => {
                if (res.status == 403) navigate("/login");

                return res.json();
            })
            .then((data) => setMessages(data));
    }, [roomName, navigate]);

    return (
        <>
            <Sidebar messages={messages}></Sidebar>
            <ContentWrapper>
                <section className="p-3 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="font-semibold dark:text-white">
                        {roomName.replace(
                            /\w/,
                            roomName.charAt(0).toUpperCase()
                        )}
                    </h2>
                    <UserDropdown name={userData.name} email={userData.email} />
                </section>
                <section className="relative flex-1 flex flex-col justify-between overflow-hidden">
                    <div
                        id="messages-container"
                        className="flex flex-col gap-6 p-6 mb-14 overflow-y-auto"
                    >
                        {messages
                            .sort(
                                (a, b) =>
                                    new Date(a.date).valueOf() -
                                    new Date(b.date).valueOf()
                            )
                            .map((message: Message) => {
                                const itShouldBeReverse =
                                    message.user.email == userData.email;

                                return (
                                    <div key={crypto.randomUUID()}>
                                        <ChatBubble
                                            setOpenModal={
                                                setShowDeleteMessageModal
                                            }
                                            message={message}
                                            reverse={itShouldBeReverse}
                                        />
                                        {itShouldBeReverse && (
                                            <DeleteMessageModal
                                                openModal={
                                                    showDeleteMessageModal
                                                }
                                                setOpenModal={
                                                    setShowDeleteMessageModal
                                                }
                                                onClick={() => {
                                                    fetch(
                                                        `https://programmers-chat-backend.onrender.com/messages/${message.id}`,
                                                        {
                                                            credentials:
                                                                "include",
                                                            method: "DELETE",
                                                        }
                                                    ).then(() => {
                                                        setShowDeleteMessageModal(
                                                            false
                                                        );
                                                        setMessages(
                                                            messages.filter(
                                                                (oldMessage) =>
                                                                    oldMessage.id !==
                                                                    message.id
                                                            )
                                                        );
                                                    });
                                                }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                    <form
                        onSubmit={sendMessage}
                        id="send-message"
                        className="h-10 absolute bottom-4 px-4 w-full"
                    >
                        <div className="bg-gray-200 shadow dark:bg-gray-800 flex justify-between rounded">
                            <label className="hover:bg-gray-500/20 p-2">
                                <svg
                                    className="size-6 fill-gray-800 dark:fill-gray-400"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
                                </svg>
                                <input
                                    type="file"
                                    onChange={sendFile}
                                    className="hidden"
                                />
                            </label>
                            <input
                                id="message"
                                type="text"
                                className="bg-transparent w-full border-none outline-none dark:text-gray-300"
                                placeholder="Escribe algo..."
                                autoComplete="off"
                                required
                            />
                            <button className="text-gray-800 hover:bg-gray-500/20 dark:text-gray-400 px-4 py-2 font-semibold">
                                Send
                            </button>
                        </div>
                        {showToast && (
                            <Toast className="absolute z-10 bottom-12 right-4">
                                <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                                    <svg
                                        className="size-4 fill-red-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                    </svg>
                                </div>
                                <div className="ml-3 text-sm font-normal">
                                    Only PDF files are supported.
                                </div>
                                <ToastToggle />
                            </Toast>
                        )}
                    </form>
                </section>
            </ContentWrapper>
        </>
    );
}
