import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "flowbite-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [errors, setErrors] = useState(<div>No errors ocurred</div>);

    function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
        formEvent.preventDefault();

        const nameInput = document.getElementById("name") as HTMLInputElement;
        const emailInput = document.getElementById("email") as HTMLInputElement;
        const passwordInput = document.getElementById(
            "password"
        ) as HTMLInputElement;

        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
            credentials: "include",
        }).then(async (res) => {
            if (res.ok) {
                navigate("/");
            } else if (res.status == 400) {
                const data = await res.json();
                displayErrors(data);
            }
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function displayErrors(errors: any) {
        const err = errors.message;

        setErrors(<div className="dark:text-gray-400">{err}</div>);
        setOpenModal(true);
    }

    return (
        <>
            <main className="w-full h-screen flex flex-col items-center justify-center px-4">
                <section className="max-w-sm w-full text-gray-600 space-y-5">
                    <div className="text-center">
                        <img src="/logo.webp" width={84} className="mx-auto" />
                        <div className="mt-2 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl dark:text-white">
                                Create an account
                            </h3>
                            <p className="dark:text-gray-500">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Log in
                                </a>
                            </p>
                        </div>
                    </div>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="font-medium dark:text-gray-300">
                                {" "}
                                Name{" "}
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
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
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        >
                            Create account
                        </button>
                    </form>
                </section>
            </main>
            <Modal
                show={openModal}
                onClose={() => setOpenModal(false)}
                size="md"
            >
                <ModalHeader>Some errors ocurred</ModalHeader>
                <ModalBody>{errors}</ModalBody>
                <ModalFooter className="justify-end">
                    <Button
                        onClick={() => setOpenModal(false)}
                        color="gray"
                        className="w-24"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
