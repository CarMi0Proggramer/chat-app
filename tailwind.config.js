import * as Flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", Flowbite.content()],
    theme: {
        extend: {
            fontSize: {
                xs: "11px",
            },
        },
    },
    plugins: [Flowbite.plugin()],
};
