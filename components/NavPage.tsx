"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
    IconBrandTabler,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export function NavPage({ ChatApp , Profile }: { ChatApp: React.FC, Profile: React.FC }) {
    const [open, setOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState(<ChatApp />);
    const links = [
        {
            label: "Chat",
            href: "#",
            onClick: () => {
                setActiveComponent(<ChatApp />);
                setOpen(false); // Close sidebar on mobile
            },
            icon: (
                <IconBrandTabler className="text-[#6b7280] h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "About the Developer",
            href: "#",
            onClick: () => {
                setActiveComponent(<Profile />);
                setOpen(false); // Close sidebar on mobile
            },
            icon: (
                <IconUserBolt className="text-[#6b7280] h-5 w-5 flex-shrink-0" />
            ),
        },
    ];

    return (
        <div
            className="flex flex-col md:flex-row bg-[#0f1117] w-full flex-1 overflow-hidden h-screen"
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "GitHub",
                                href: "https://github.com/Sookeyy-12/NextJS-ChatBot",
                                icon: (
                                    <Image
                                        src="/github-mark-white.png"
                                        className="h-5 w-5 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="GitHub"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            {activeComponent}
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-lg flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold text-[#e5e7eb] whitespace-pre"
            >
                Gemini Chat
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-lg flex-shrink-0" />
        </Link>
    );
};
