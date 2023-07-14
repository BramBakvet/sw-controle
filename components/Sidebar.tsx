"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { BsPeopleFill } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FiInfo } from "react-icons/fi"
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import Box from "./Box";


type Props = {
    children: React.ReactNode;
}

const Sidebar = ({children}: Props) => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: BsPeopleFill,
            label: 'Personeelbestand',
            acitve: true,
            href: '/personeel'
        },
        {
            icon: CiMail,
            label: 'Inbox',
            acitve: pathname === '/inbox',
            href: '/inbox'
        },
        {
            icon: FiInfo,
            label: 'About',
            acitve: pathname === '/about',
            href: '/about'
        },
    ], [pathname]);

  return (
    <div>
        <div className='hidden md:flex flex-row gap-2 bg-black h-full w-full p-2'>
            <Box className="w-1/5">
                <div className="flex flex-row gap-y-4 px-5 py-4">
                    <a href="/">
                        <Logo image="/images/site-logo.png" />
                    </a>
                </div>
            </Box>
            <Box className="w-4/5">
                <div className="flex flex-row gap-y-4 px-5 py-4 justify-center items-center h-full">
                    {routes.map((item) => (
                    <SidebarItem key={item.label} {...item} />
                    ))}
                </div>
            </Box>
        </div>
        <main className='h-full flex-1 overflow-y-auto py-2'>
            {children}
        </main>
    </div>
  )
};

export default Sidebar;