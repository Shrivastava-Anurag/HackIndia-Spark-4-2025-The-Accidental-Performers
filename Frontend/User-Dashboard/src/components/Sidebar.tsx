"use-client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import { House, Activity, File, User, Settings } from "lucide-react";

function Sidebar() {
  return (
    <Command className="bg-secondary rounded-none">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <House className="mr-2 h-4 w-4" />
            <Link href="/HomePage">Home</Link>
          </CommandItem>
          <CommandItem>
            <File className="mr-2 h-4 w-4" />
            <Link href="/IssuesDoc">Issued Document</Link>
          </CommandItem>
          <CommandItem>
            <File className="mr-2 h-4 w-4" />
            <Link href="/RequestDoc">Request Document</Link>
          </CommandItem>
          <CommandItem>
            <Activity className="mr-2 h-4 w-4" />
            <Link href="/MyActivity">My Activity</Link>
          </CommandItem>
          <CommandItem>
            <Activity className="mr-2 h-4 w-4" />
            <Link href="/ActivityLog">Activity Log</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <Link href="/Profile">Profile</Link>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link href="/SettingsPage">Settings</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default Sidebar;
