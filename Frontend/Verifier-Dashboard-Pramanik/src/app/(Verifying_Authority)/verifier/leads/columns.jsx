"use client"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useState } from "react";
export const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "lead_name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("lead_name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phone_no",
      header: "Phone",
      cell: ({ row }) => <div className="lowercase">{row.getValue("phone_no")}</div>,
    },
    {
      accessorKey: "public_add",
      header: "Public Address",
      cell: ({ row }) => {
        const handleCopy = () => {
          const fullAddress = row.getValue("public_add");
          navigator.clipboard.writeText(fullAddress);
          alert("Address copied to clipboard!"); // Optional feedback
        };
    
        return (
          <div 
            className="lowercase cursor-pointer text-indigo-700 hover:underline" 
            onClick={handleCopy}
            title="Click to copy"
          >
            {truncateAddress(row.getValue("public_add"))}
          </div>
        );
      },
    },    
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <div className="capitalize">{row.getValue("status")}</div>
      },
    },
    {
      accessorKey: "documents",
      header: "Documents",
      cell: ({ row }) => {
        const [isDialogOpen, setIsDialogOpen] = useState(false);
        const [currentDoc, setCurrentDoc] = useState(null);
    
        const documents = row.getValue("documents"); // Array of documents
    
        const handlePreview = (doc) => {
          setCurrentDoc(doc);
          setIsDialogOpen(true);
        };
    
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="text-sm font-medium bg-[#BCCCDC]" variant="outline">
                  View Docs
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {documents.map((doc, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="capitalize cursor-pointer"
                    onClick={() => handlePreview(doc)}
                  >
                    {doc.doc_name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
    
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{currentDoc?.doc_name || "Document Preview"}</DialogTitle>
                  <DialogClose />
                </DialogHeader>
                <div className="flex justify-center items-center">
                  {currentDoc?.doc_url ? (
                    <img src="https://res.cloudinary.com/dknpv0f7v/image/upload/v1733763314/xgt7k6i2wkssadquohue.svg"></img>
                  ) : (
                    <p>No preview available</p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </>
        );
      },
    }
  ]


  const truncateAddress = (address) => {
    if (address.length <= 10) return address; // No need to truncate if length is small
    return `${address.slice(0, 10)}......${address.slice(-8)}`;
  };