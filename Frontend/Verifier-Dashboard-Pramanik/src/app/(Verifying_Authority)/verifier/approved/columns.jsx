"use client"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
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
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "lead",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Lead
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("lead")}</div>,
    },
    {
      accessorKey: "issued_by",
      header: "Issued By",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("issued_by")}</div>
      ),
    },
    {
      accessorKey: "submitted_on",
      header: "Submitted On",
      cell: ({ row }) => <div className="lowercase">{row.getValue("submitted_on")}</div>,
    },
    {
      accessorKey: "issued_on",
      header: "Issued On",
      cell: ({ row }) => <div className="lowercase">{row.getValue("issued_on")}</div>,
    },
    {
      accessorKey: "docAddress",
      header: "Document Address",
      cell: ({ row }) => {
        const handleCopy = () => {
          const fullAddress = row.getValue("docAddress");
          navigator.clipboard.writeText(fullAddress);
          alert("Address copied to clipboard!"); // Optional feedback
        };
    
        return (
          <div 
            className="lowercase cursor-pointer text-indigo-700 hover:underline" 
            onClick={handleCopy}
            title="Click to copy"
          >
            {truncateAddress(row.getValue("docAddress"))}
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
  ]


  const truncateAddress = (address) => {
    if (address.length <= 10) return address; // No need to truncate if length is small
    return `${address.slice(0, 10)}......${address.slice(-8)}`;
  };