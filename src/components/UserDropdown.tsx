import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownHeader,
    DropdownDivider,
    ToggleSwitch,
} from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socketManager } from "../managers/socket";

type UserDropdownOptions = {
    name?: string;
    email?: string;
    urlImg?: string;
};

export default function UserDropdown({
    name,
    email,
    urlImg,
}: UserDropdownOptions) {
    const navigate = useNavigate();
    const [colorTheme, setColorTheme] = useState(
        localStorage.getItem("color-theme")
    );

    function logOut() {
        socketManager.disconnect(email as string);

        fetch("http://localhost:3000/auth/logout", {
            credentials: "include",
            method: "POST",
        }).then(() => navigate("/login"));
    }

    return (
        <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User Settings" img={urlImg} rounded />}
        >
            <DropdownHeader>
                <span className="block text-sm">{name || "Unnamed"}</span>
                <span className="block truncate text-sm font-medium">
                    {email || "example@gmail.com"}
                </span>
            </DropdownHeader>
            <DropdownItem href="/">Dashboard</DropdownItem>
            <DropdownItem
                onClick={() => {
                    const currentTheme = localStorage.getItem("color-theme");

                    if (currentTheme == "dark") {
                        setColorTheme("light");
                        localStorage.setItem("color-theme", "light");
                        document.documentElement.classList.remove("dark");
                    } else {
                        setColorTheme("dark");
                        localStorage.setItem("color-theme", "dark");
                        document.documentElement.classList.add("dark");
                    }
                }}
            >
                DarkMode
                <ToggleSwitch
                    className="ms-auto"
                    color="purple"
                    checked={colorTheme == "dark"}
                    onChange={() => {}}
                />
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={logOut}>Sign out</DropdownItem>
        </Dropdown>
    );
}
