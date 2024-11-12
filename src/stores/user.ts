import { atom } from "nanostores";

export const userDataStore = atom({
    name: "",
    email: "",
    token: "",
});

fetch("http://localhost:3000/users/", { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
        userDataStore.set({
            name: data.name,
            email: data.email,
            token: data.token,
        });
    });
