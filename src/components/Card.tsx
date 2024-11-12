import type { ReactNode } from "react";

type CardOptions = {
    href: string;
    title: string;
    body: string;
    svg: ReactNode;
};

export default function Card({ title, body, href, svg }: CardOptions) {
    return (
        <a
            href={href}
            className="p-8 dark:bg-gray-800 shadow rounded-md w-full bg-gradient-to-tr from-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-transform hover:scale-95"
        >
            <div className="flex gap-3 items-center">
                <h3 className="text-lg lg:text-xl font-semibold dark:text-gray-300">
                    {title}
                </h3>
                {svg}
            </div>
            <p className="text-pretty mt-2 text-gray-800 dark:text-gray-400">
                {body}
            </p>
        </a>
    );
}
