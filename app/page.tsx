'use client';

import AboutPage from '@/components/AboutPage';
import ChatPage from '@/components/ChatPage';
import { NavPage } from '@/components/NavPage';

const dashboard = () => {
    return <ChatPage />;
};

const profile = () => {
    return <AboutPage />;
};

export default function Chat() {
    return (
        <>
            <NavPage ChatApp={dashboard} Profile={profile} />
        </>
    );
}
