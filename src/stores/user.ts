import { atom } from "nanostores";

export const userDataStore = atom({
    name: "",
    email: "",
    token: "",
});

fetch("https://programmers-chat-backend.onrender.com/users/", {
    credentials: "include",
})
    .then((res) => res.json())
    .then((data) => {
        userDataStore.set({
            name: data.name,
            email: data.email,
            token: data.token,
        });
    });
