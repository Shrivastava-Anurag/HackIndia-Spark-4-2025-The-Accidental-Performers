"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCheckDouble } from "react-icons/fa";
import { MdAnalytics, MdPeople } from "react-icons/md";
import { ImCross } from "react-icons/im";

function Sidebar() {
  return (
    <div className="flex flex-col items-center bg-vp h-full">
      <div className="w-full pl-6 py-4">
        <h1 className="text-3xl font-extrabold text-vs">PRAMANIK</h1>
      </div>
      <hr className="bg-neutral-400 w-full my-4" />

      <div className="flex flex-col gap-3 w-full mt-5 pr-5">
        {NavItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

function SidebarItem({ item }) {
  const pathname = usePathname(); // Get the current pathname
  const isActive = pathname === item.href; // Determine if the current link is active

  return (
    <Link href={item.href} className="w-full">
      <div
        className={`flex gap-2 items-center cursor-pointer p-3 rounded-r-md ${
          isActive ? "bg-blue-200 text-black" : "hover:bg-blue-100"
        }`}
      >
        <div className={`${isActive ? "text-black" : "text-gray-500"}`}>
          {React.cloneElement(item.icon, {
            fill: isActive ? "#1d4ed8" : "#73748A",
          })}
        </div>
        <p
          className={`font-semibold hover:underline ${
            isActive ? "text-blue-700 font-semibold" : "text-gray-500"
          }`}
        >
          {item.title}
        </p>
      </div>
    </Link>
  );
}

export default Sidebar;

const NavItems = [
  {
    title: "Overview",
    href: "/verifier",
    icon: <MdAnalytics className="h-6 w-6" />,
  },
  {
    title: "Records",
    href: "/verifier/leads",
    icon: <MdPeople className="h-6 w-6" />,
  },
  {
    title: "Approved Requests",
    href: "/verifier/approved",
    icon: <FaCheckDouble className="h-4 w-4" />,
  },
  {
    title: "Rejected Requests",
    href: "/verifier/rejected",
    icon: <ImCross className="h-4 w-4" />,
  },
  {
    title: "Setup Criteria",
    href: "/verifier/criteria-link",
    icon: <ImCross className="h-4 w-4" />,
  },
];
