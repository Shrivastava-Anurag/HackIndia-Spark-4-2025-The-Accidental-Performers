"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ClipboardIcon } from "lucide-react";
import Link from "next/link";

export default function Profile() {
  const user = {
    avatar: "https://github.com/shadcn.png",
    name: "John Doe",
    dob: "1990-01-01",
    contact: "+1 234 567 890",
    address: "1234 Elm Street, Springfield, USA",
    publicAddress: "jvfsnwr%%()@5kmdvk!!@f",
    gender: "Male",
    email: "john.doe@example.com",
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="bg-[#edf2fb] h-full container mx-auto mt-0 px-0">
      <h1 className="text-[#1f2937] text-4xl font-bold text-center mb-8 pt-6">
        My Profile
      </h1>

      <Card className="max-w-4xl mb-6 mx-auto shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatar} alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <CardTitle className="text-4xl mt-4">{user.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col">
            <span className="font-semibold text-2xl">Date of Birth:</span>
            <span className="text-xl pt-1">{user.dob}</span>
          </div>
          <div className="flex flex-col ">
            <span className="font-semibold text-2xl">Contact Number:</span>
            <span className="text-xl pt-1">{user.contact}</span>
          </div>
          <div className="flex flex-col ">
            <span className="font-semibold text-2xl">Email:</span>
            <div className="flex items-center gap-2">
              <span className="text-xl pt-1">{user.email}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(user.email)}
              >
                <ClipboardIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col ">
            <span className="font-semibold text-2xl">Gender:</span>
            <span className="text-xl pt-1">{user.gender}</span>
          </div>
          <div className="flex flex-col   ">
            <span className="font-semibold text-2xl">Address:</span>
            <div className="flex items-center gap-2">
              <span className="text-xl pt-1">{user.address}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(user.address)}
              >
                <ClipboardIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col   ">
            <span className="font-semibold text-2xl">Public Address:</span>
            <div className="flex items-center gap-2">
              <span className="text-xl pt-1">{user.publicAddress}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(user.publicAddress)}
              >
                <ClipboardIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button variant="default">
            <Link href="/SettingsPage">Edit Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
