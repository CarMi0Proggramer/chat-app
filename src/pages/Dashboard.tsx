import { useStore } from "@nanostores/react";
import { userDataStore } from "../stores/user";
import Sidebar from "../components/Sidebar";
import ContentWrapper from "../components/ContentWrapper";
import UserDropdown from "../components/UserDropdown";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const userData = useStore(userDataStore);
    const [messages, setMessages] = useState([] as Message[]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/messages/last", {
            credentials: "include",
        })
            .then((res) => {
                if (res.status == 403) navigate("/login");

                return res.json();
            })
            .then((data) => setMessages(data));
    }, [navigate]);

    return (
        <>
            <Sidebar messages={messages}></Sidebar>
            <ContentWrapper>
                <section className="p-3 border-b border-gray-200 dark:border-gray-800 flex justify-end items-center">
                    <UserDropdown name={userData.name} email={userData.email} />
                </section>
                <section className="flex-1 grid place-content-start md:place-content-center p-6">
                    <div className="flex justify-center">
                        <img
                            src="/logo.webp"
                            alt="Logo"
                            className="size-12 md:size-16 mb-3"
                        />
                    </div>
                    <h3 className="text-center text-3xl lg:text-4xl font-semibold mb-12 text-pretty dark:text-white">
                        Bienvenido al Chat para Programadores
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-3 h-full max-w-screen-md mx-auto">
                        <Card
                            title="Chat General"
                            body="Interactúa, conecta y diviértete conociendo personas de la comunidad."
                            href="/chatroom?roomName=general"
                            svg={
                                <svg
                                    className="size-5 fill-gray-800 dark:fill-gray-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 512"
                                >
                                    <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" />
                                </svg>
                            }
                        ></Card>
                        <Card
                            title="Biblioteca"
                            body="Canal para la publicación de libros, artículos o enlaces sobre programación."
                            svg={
                                <svg
                                    className="size-5 fill-gray-800 dark:fill-gray-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152l0 264-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427L0 224c0-17.7 14.3-32 32-32l30.3 0c63.6 0 125.6 19.6 177.7 56zm32 264l0-264c52.1-36.4 114.1-56 177.7-56l30.3 0c17.7 0 32 14.3 32 32l0 203c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z" />
                                </svg>
                            }
                            href="/chatroom?roomName=biblioteca"
                        ></Card>
                    </div>
                </section>
            </ContentWrapper>
        </>
    );
}
