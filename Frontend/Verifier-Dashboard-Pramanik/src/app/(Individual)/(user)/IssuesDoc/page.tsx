"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCopy, Download, LayoutGrid, LayoutList } from "lucide-react";
import Image from "next/image";

type Document = {
  _id: number;
  message: string;
  receiver: string;
  signature: string;
  cid: string;
  createdAt: string;
};

const IssuedDocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isGridView, setIsGridView] = useState(true); // State to toggle between grid and column views
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const receiver = "0x21fF6FcC89e8ed65318059527d390FaF6aC5830a"; // Example receiver address

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/user/getIssuedDocuments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ receiver }), // Sending receiver in the body
        });

        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }

        const data = await response.json();
        setDocuments(data); // Assuming documents are returned as an array
      } catch (err) {
        console.error('Error fetching documents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
    global.documents = documents;
  }, [receiver]);
  console.log(documents);

  const handleDownload = async (cid: string) => {
    if (!cid) {
      console.error("CID is missing");
      return;
    }
  
    try {
      // Make the API request to your backend
      const response = await fetch('http://localhost:5000/user/viewDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cid }),
      });
  console.log(response);
      // Check if the response is successful (status 200)
      if (response.status === 200) {
        const data = await response.json();
  
        // Get the URL from the response data
        const documentUrl = data;
  
        if (documentUrl) {
          // Open the document URL in a new tab
          window.open(documentUrl, "_blank");
        } else {
          console.error("No document URL found in the response");
        }
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        throw new Error('Failed to fetch document from API');
      }
    } catch (error) {
      // Log any errors that occur during the fetch process
      console.error('Error fetching data:', error);
    }
  };
  
  
  return (
    <div className="min-h-screen bg-[#edf2fb] p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Issued Documents</h1>
        <Button
          variant="outline"
          onClick={() => setIsGridView((prev) => !prev)}
          className="flex items-center space-x-2"
        >
          {isGridView ? <LayoutList size={22} /> : <LayoutGrid size={22} />}
        </Button>
      </div>

      {/* Loading & Error States */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}

      {/* Document List */}
      <div
        className={`${
          isGridView
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col items-center space-y-6"
        }`}
      >
        {documents.map((doc) =>
          isGridView ? (
            // Grid View Card
            <Card key={doc._id} className=" bg-gradient-to-b from-white to-amber-50 shadow-md w-full max-w-full md:max-w-lg">
              <CardContent className="p-4">
                {/* Document Image */}
                <div className="w-full flex flex-row justify-start items-center space-x-8">
                <Image
                  src={"/img/pramaniklogo1.png"}
                  alt={doc.message || 'Document Image'}
                  width={40}
                  height={40}
                  className=" col-span-1 h-20 w-20 object-cover mb-4 rounded-md"
                />
                <h2 className="text-xl font-bold text-gray-800 col-span-2">{doc.message || 'No Title'}</h2>
                </div>

                {/* Document Details */}
                <p className=" text-gray-600 truncate">Address: {`*****************************${doc.cid.slice(-10)}`}</p>
                <p className=" pt-2 text-gray-600">Created At: {new Date(doc.createdAt).toLocaleDateString()}</p>

                {/* Download Button */}
                <div className=" w-full pt-4 pb-4 flex justify-end">
                  <Button
                    className="bg-amber-600 text-white hover:bg-amber-500"
                    onClick={() => handleDownload(doc.cid)}
                  >
                    <Download className="mr-2" size={16} />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Column View Card
            <Card key={doc._id} className="bg-white shadow-lg w-full flex flex-col md:flex-row items-center p-6 space-y-4 md:space-y-0 md:space-x-6">
              <Image
                src={doc.image || '/placeholder.jpg'}
                alt={doc.message || 'Document Image'}
                width={180}
                height={180}
                className="w-40 h-40 object-cover rounded-lg"
              />
              <div className="flex flex-row items-center gap-20">
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold text-gray-800">{doc.message || 'No Title'}</h2>
                  <p className="text-base text-lg pt-2 text-blue-500 underline truncate">{doc.cid}</p>
                </div>
                <div className="flex flex-col items-center">
                  <h3>Address:</h3>
                  <p className="text-base text-lg pt-6 text-gray-600">{doc.cid}</p>
                </div>
                <div className="flex flex-col items-center">
                  <h3>Receiver:</h3>
                  <p className="text-base text-lg pt-2 text-gray-600">{doc.receiver}</p>
                </div>
                <div className="flex flex-col items-center">
                  <h3>Created At:</h3>
                  <p className="text-base text-lg pt-2 text-gray-600">{new Date(doc.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-4 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(doc.cid)}
                  >
                    <Download size={20} />
                  </Button>
                </div>
              </div>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default IssuedDocumentsPage;
