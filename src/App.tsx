import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Spinner } from "flowbite-react";

const Login = lazy(() => import("./pages/Login"));
const ChatRoom = lazy(() => import("./pages/ChatRoom"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
    const savedTheme = localStorage.getItem("color-theme");
    if (
        savedTheme == "dark" ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches &&
            !("color-theme" in localStorage))
    ) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
    }

    return (
        <>
            <BrowserRouter>
                <Suspense
                    fallback={
                        <div className="grid place-content-center h-full">
                            <Spinner color="purple" className="size-12" />
                        </div>
                    }
                >
                    <Routes>
                        <Route path="/" element={<Dashboard />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route path="/chatroom" element={<ChatRoom />}></Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
