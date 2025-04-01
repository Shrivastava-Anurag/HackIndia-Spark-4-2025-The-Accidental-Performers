"use client";

import { useState, useEffect } from "react";
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

const MyActivity = ({ receiver }) => {
  const [activityData, setActivityData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://backendpramanik.onrender.com/user/getRequest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ receiver:"0x906eCc2FC146E73484a91c1A9fD67f1c290FB71e" }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setActivityData(data);
        setFilteredData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [receiver]);

  // Filter handler
  const handleFilter = (type, status) => {
    const filtered = activityData.filter(
      (item) =>
        (type === "all" || item.type === type) &&
        (status === "all" || item.status === status)
    );
    setFilteredData(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
              {activityData.filter((a) => a.status === "Complete").length}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Requested Documents</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl text-center">
              {activityData.length}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Pending Documents</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl text-center">
              {activityData.filter((a) => a.status === "Pending").length}
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
          <TabsList className="gap-2">
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
      <TableHead>Issuing Auth</TableHead>
      <TableHead>Type</TableHead>
      <TableHead
        // style={{
        //   color:
        //     filteredData.some((activity) => activity.status === "Pending")
        //       ? "orange"
        //       : filteredData.some((activity) => activity.status === "Approved")
        //       ? "green"
        //       : filteredData.some((activity) => activity.status === "Rejected")
        //       ? "red"
        //       : "black",
        // }}
      >
        Status
      </TableHead>
      <TableHead>Requested On</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filteredData.map((activity) => (
      <TableRow key={activity.id}>
        <TableCell>{activity.issuingAuthority}</TableCell>
        <TableCell>{activity.doctype}</TableCell>
        <TableCell>
          {activity.status === "Pending" ? (
            <span style={{ color: "orange" }}>Pending</span>
          ) : activity.status === "Complete" ? (
            <span style={{ color: "green" }}>Approved</span>
          ) : (
            <span style={{ color: "red" }}>Rejected</span>
          )}
        </TableCell>
        <TableCell>
          {new Date(activity.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell>
          <Button variant="outline" size="sm">
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
