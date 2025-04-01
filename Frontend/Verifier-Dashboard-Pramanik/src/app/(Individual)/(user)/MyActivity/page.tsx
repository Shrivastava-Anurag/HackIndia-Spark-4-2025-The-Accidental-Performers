"use client";

import { useState, createContext, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToastProvider, useToast } from "@/components/ui/toast";

const MyActivity = () => {
  // const { toast } = useToast();

  const activityData = [
    {
      id: "DOC001",
      type: "issued",
      status: "approved",
      createdAt: "2024-12-01",
    },
    {
      id: "DOC002",
      type: "requested",
      status: "pending",
      createdAt: "2024-12-02",
    },
    {
      id: "DOC003",
      type: "issued",
      status: "approved",
      createdAt: "2024-12-03",
    },
    {
      id: "DOC004",
      type: "requested",
      status: "pending",
      createdAt: "2024-12-04",
    },
  ];

  const [filteredData, setFilteredData] = useState(activityData);
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter handler
  const handleFilter = (type, status) => {
    const filtered = activityData.filter(
      (item) =>
        (type === "all" || item.type === type) &&
        (status === "all" || item.status === status)
    );
    setFilteredData(filtered);
  };

  // Trigger toast
  const triggerToast = () => {
    toast({
      title: "Action performed",
      description: "Details viewed successfully!",
    });
  };

  return (
    <ToastProvider>
      <div className="space-y-6 p-4">
        <h1 className="text-4xl font-bold">My Activity</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Issued Documents</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl text-center">
              {activityData.filter((a) => a.type === "issued").length}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Requested Documents</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl text-center">
              {activityData.filter((a) => a.type === "requested").length}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Pending Documents</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl text-center">
              {activityData.filter((a) => a.status === "pending").length}
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Type */}
        <Tabs
          onValueChange={(value) => {
            setFilter(value);
            handleFilter(value, statusFilter);
          }}
        >
          <TabsList className="gap-2l">
            <TabsTrigger
              value="all"
              className="px-6 py-3 text-lg font-semibold"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="issued"
              className="px-6 py-3 text-lg font-semibold"
            >
              Issued
            </TabsTrigger>
            <TabsTrigger
              value="requested"
              className="px-6 py-3 text-lg font-semibold"
            >
              Requested
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Dropdown for Status */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Filter by Status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setStatusFilter("all");
                handleFilter(filter, "all");
              }}
            >
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setStatusFilter("pending");
                handleFilter(filter, "pending");
              }}
            >
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setStatusFilter("approved");
                handleFilter(filter, "approved");
              }}
            >
              Approved
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Activity Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested On</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.id}</TableCell>
                <TableCell>{activity.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      activity.status === "pending" ? "warning" : "success"
                    }
                  >
                    {activity.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(activity.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={triggerToast}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ToastProvider>
  );
};

export default MyActivity;
