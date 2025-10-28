import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

const ProfileDropdown = ({ setToken, setMobileOpen }: { setToken: (token: string | null) => void, setMobileOpen: (open: boolean) => void }) => {
    const handleLogout = () => {
        localStorage.removeItem("auth_token_x");
        setToken(null);
        setMobileOpen(false);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer w-9 h-9 border border-border">
                    <AvatarImage src="/avatar.jpg" alt="User avatar" />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileDropdown