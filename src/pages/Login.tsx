import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
        formEvent.preventDefault();

        const emailInput = document.getElementById("email") as HTMLInputElement;
        const passwordInput = document.getElementById(
            "password"
        ) as HTMLInputElement;

        const email = emailInput.value;
        const password = passwordInput.value;

        fetch("https://programmers-chat-backend.onrender.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
            }),
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.name && data.email) {
                    sessionStorage.setItem("access_token", data.access_token);
                    navigate("/");
                } else {
                    navigate("/register");
                }
            });
    }

    return (
        <>
            <main className="w-full h-screen flex flex-col items-center justify-center px-4">
                <section className="max-w-sm w-full text-gray-600 space-y-5">
                    <div className="text-center pb-8">
                        <img src="/logo.webp" width={84} className="mx-auto" />
                        <div className="mt-5">
                            <h3 className="text-gray-800 dark:text-white text-2xl font-bold sm:text-3xl">
                                Log in to your account
                            </h3>
                        </div>
                    </div>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="font-medium dark:text-gray-300">
                                {" "}
                                Email{" "}
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium dark:text-gray-300">
                                {" "}
                                Password{" "}
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-x-3">
                                <input
                                    type="checkbox"
                                    id="remember-me-checkbox"
                                    className="checkbox-item peer hidden"
                                />
                                <label
                                    htmlFor="remember-me-checkbox"
                                    className="relative flex w-5 h-5 bg-white dark:bg-gray-900 peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                                ></label>
                                <span className="dark:text-gray-500">
                                    Remember me
                                </span>
                            </div>
                        </div>
                        <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                            Sign in
                        </button>
                    </form>
                    <p className="text-center dark:text-gray-500">
                        Don't have an account?{" "}
                        <a
                            href="/register"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Sign up
                        </a>
                    </p>
                </section>
            </main>
        </>
    );
}
