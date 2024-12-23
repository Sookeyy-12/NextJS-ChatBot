'use client';

import AboutPage from '@/components/AboutPage';
import ChatPage from '@/components/ChatPage';
import { NavPage } from '@/components/NavPage';

const dashboard = () => {
    return (
        <div className="flex flex-1">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                <ChatPage />
            </div>
        </div>
    );
};

const profile = () => {
    return (
        <div className="flex flex-1">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                <AboutPage />
            </div>
        </div>
    );
};

export default function Chat() {
    return (
        <>
            <NavPage ChatApp={dashboard} Profile={profile} />
        </>
    );
}
