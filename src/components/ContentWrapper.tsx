import type { ReactNode } from "react";

export default function ContentWrapper({ children }: { children?: ReactNode }) {
    return (
        <main className="h-full dark:bg-gray-900 flex flex-col sm:ml-64 md:ml-72 lg:ml-96 xl:ml-[428px]">
            {children}
        </main>
    );
}
