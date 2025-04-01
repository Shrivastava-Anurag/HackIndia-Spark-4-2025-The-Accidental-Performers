"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
  const [language, setLanguage] = useState("English");

  // Handle language change
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // Additional logic for localization can go here, e.g., updating context or cookies
    console.log(`Language changed to: ${lang}`);
  };

  return (
    <div className="bg-blue-300 dark:bg-slate-900 text-white py-2 px-5 flex justify-between items-center">
      {/* Logo */}
      <Link href="/">
        <Image src="/img/pramaniklogo3.png" alt="logo" width={200} height={200} />
      </Link>

      {/* Language and Profile Dropdowns */}
      <div className="flex items-center space-x-4">
        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none text-cyan-800 font-bold font-medium">
            {language}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleLanguageChange("English")}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("Hindi")}>
              हिंदी
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/Profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/logout">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Navbar;
