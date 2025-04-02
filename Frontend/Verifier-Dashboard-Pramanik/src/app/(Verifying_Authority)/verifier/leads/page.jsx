"use client";

import React, { useState, useEffect } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

function Page() {
  // const [data, setData] = useState([]); // State to store API data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTg2Mzk1NzQ2NjE5YjlmODhkMTNiYyIsImlhdCI6MTczMzg0NTkyOX0.42ZW-_Uty4zgRCykfQFM6jF8lsFlUAuxmr6fOvT0r3M";

  // Fetch data from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //               const response = await fetch("https://backendpramanik.onrender.com/verifier/getAllLead", {
  //         method: "GET",
  //         headers: {
  //           Authorization: token,
  //           "Content-Type": "application/json",
  //         },
  //       });
        
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }

  //       const result = await response.json();
  //       setData(result.result); // Assuming the data is in `result.data`
  //       console.log(result.result)
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-violet-900 mb-10">
        Here is a list of all the verification records in your organization
      </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}

export default Page;  

const data = [
  {
    lead_name: "Anurag",
    email: "anurag@gmail.com",
    phone_no: "6260278503",
    public_add: "jbdhgijazweoisijdbslagiygedjxksiugysbzanigeddknzjnx",
    status: "verified",
    documents: [
      { doc_name: "XII Marksheet" },
    ],
  },
  {
    lead_name: "Asif",
    email: "asif@gmail.com",
    phone_no: "9876543210",
    public_add: "jbdhgijazweoisijdbslagiygedjxksiugysbzanigeddknzjnx",
    status: "not-verified",
    documents: [
      { doc_name: "Birth Certificate" },
      { doc_name: "MSME Certificate" },
    ],
  },
];
