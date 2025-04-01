"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import {
  GitPullRequest,
  Upload,
  Eye,
  ChartNoAxesCombined,
  Share2,
} from "lucide-react";

export default function HomePage() {
  const [certificates, setCertificates] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [certificateType, setCertificateType] = useState("");

  const handleRequestCertificate = async () => {
    if (!certificateType.trim()) {
      alert("Please enter the type of certificate you want.");
      return;
    }

    const newCertificate = {
      id: certificates.length + 1,
      name: certificateType,
      status: "Pending",
    };

    try {
      // Send to the backend
      const response = await fetch("/api/request-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCertificate),
      });

      if (response.ok) {
        setCertificates([...certificates, newCertificate]);
        setCertificateType(""); // Clear the input
        alert("Certificate request sent successfully!");
      } else {
        alert("Failed to request the certificate. Please try again.");
      }
    } catch (error) {
      console.error("Error requesting certificate:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadDocument = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("document", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        setSelectedFile(null); // Clear the selected file
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#edf2fb] p-6">
      {/* Header Section */}
      <section className="text-center my-8">
        <h1 className="text-5xl font-bold text-black-600">
          Welcome, Individual User!
        </h1>
        <p className="text-2xl pt-4 text-gray-700 mt-2">
          Request certificates, upload documents, and manage your profile with
          ease.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {/* Request Certificate */}
        <Card className="shadow-lg p-4 bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-blue-500">
          <CardHeader className="px-0">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Request Certificate
              </h2>
              <GitPullRequest
                size={24}
                strokeWidth={1.5}
                className="text-blue-500"
              />
            </div>
          </CardHeader>
          <CardDescription className="pt-2">
            <p className="text-gray-600 text-lg">
              Need a new certificate? Submit your request easily.
            </p>
            {/* <Input
              type="text"
              placeholder="Enter certificate type"
              value={certificateType}
              onChange={(e) => setCertificateType(e.target.value)}
              className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            /> */}
            <div className="text-right pt-7">
              <Button
                className="mt-20 bg-blue-500 text-white hover:bg-blue-600 text-md "
                // onClick={handleRequestCertificate}
              >
                <Link href="/RequestDoc">Request Now</Link>
              </Button>
            </div>
          </CardDescription>
        </Card>

        {/* Upload Document */}
        <Card className="shadow-lg p-4 bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-blue-500">
          <CardHeader className="px-0">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                Upload Document
              </h2>
              <Upload size={24} strokeWidth={1.5} className="text-blue-500" />
            </div>
          </CardHeader>
          <CardDescription className="pt-2">
            <p className="text-gray-600 text-lg">
              Submit your documents for verification by the authority.
            </p>
            <Input
              type="file"
              className="mt-4"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.png,.jpg"
            />
            <div className="text-right pt-7">
            <Button
              className="mt-20 pl-7 pr-7 bg-blue-500 text-white hover:bg-blue-600 text-md "
            >
              <Link href="/Uploadfile">Upload</Link>
            </Button>
            </div>
          </CardDescription>
        </Card>

        {/* View Certificates */}
        <Card className="shadow-lg p-4 bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-blue-500">
          <CardHeader className="px-0">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                View Certificates
              </h2>
              <Eye size={24} strokeWidth={1.5} className="text-blue-500" />
            </div>
          </CardHeader>
          <CardDescription className="pt-2">
            <p className="text-gray-600 text-lg">
              Check the status of your requested certificates.
            </p>
          </CardDescription>
          <div className="text-right pt-7">
            <Button
              className="mt-20 pl-7 pr-7 bg-blue-500 text-white hover:bg-blue-600 text-md "
              // onClick={handleUploadDocument}
            >
              <Link href="/IssuesDoc">View</Link>
            </Button>
          </div>
        </Card>
      </section>

      {/* Dynamic Certificates List */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {/* Requested Certificates Card */}
        <Card className="shadow-lg p-4 bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-blue-500 max-h-[400px] overflow-y-auto">
          <CardHeader className="px-0">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                Requested Certificates
              </h2>
              <ChartNoAxesCombined
                size={24}
                strokeWidth={1.5}
                className="text-blue-500"
              />
            </div>
          </CardHeader>
          <CardDescription className="pt-2">
            <p className="text-gray-600 text-lg">
              Check the status of your requested certificates.
            </p>
          </CardDescription>
          {certificates.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {certificates.map((cert) => (
                <li
                  key={cert.id}
                  className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center"
                >
                  <span className="text-gray-800 font-medium">{cert.name}</span>
                  <span
                    className={`text-sm font-bold ${
                      cert.status === "Pending"
                        ? "text-orange-500"
                        : "text-green-500"
                    }`}
                  >
                    {cert.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-xl text-gray-600">
              You haven't requested any certificates yet.
            </p>
          )}
        </Card>

        {/* Share Certificate Card */}
        <Card className="shadow-lg p-4 bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-blue-500 max-h-[400px]">
          <CardHeader className="px-0">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                Share Certificate
              </h2>
              <Share2 size={24} strokeWidth={1.5} className="text-blue-500" />
            </div>
          </CardHeader>
          <CardDescription className="pt-2">
            <p className="text-gray-600 text-lg">
              In this section you can share your participation, apreciation
              certificates.
            </p>
          </CardDescription>
          <div className="text-right pt-7">
            <Button className="mt-2 pl-7 pr-7 bg-blue-500 text-white hover:bg-blue-600 text-md">
              <Link href="/ShareCertificate">Share</Link>
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}
