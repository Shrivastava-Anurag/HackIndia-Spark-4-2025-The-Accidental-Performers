"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"; // Shadcn form components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneVerification from "./otp-form";
import DocumentAccessPortal from "./document-access-portal";
import { set } from "date-fns";
import { LoaderIcon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please provide a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  pubAddress: z.string().min(10, { message: "Not a Valid Public Address" }),
});

const MultiStepForm = () => {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [verified, setVerified] = useState(true );
  const [isUser, setIsUser] = useState(true);
  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");

  // Extract documents from URL
  const documents = JSON.parse(searchParams.get("documents") || "[]");
  console.log(documents)

  // Form for Step 1
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      pubAddress: "",
    },
  });

  const handleNextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 4));
  const handlePreviousStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const handleFileChange = (z, docName) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [docName]: e.target.files[0],
      }));
    }
    setPreview1(URL.createObjectURL(e.target.files[0]));
    setPreview2(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmitFiles = () => {
    console.log("Uploaded Files:", uploadedFiles);
    setTimeout(() => {
      handleNextStep();
    }, 3000);
  };

  const onSubmitPersonalInfo = (data) => {
    console.log("Personal Info Submitted:", data);

    setTimeout(() => {
      handleNextStep();
    }, 3000);
  };

  const handleSubmission = (selectedDocs) => {
    console.log('Documents selected for verification:', selectedDocs);
    alert('Access granted to the selected documents!');
  };

  return (
    <section className="w-full min-h-screen py-10 flex items-center justify-center bg-indigo-100">
      {
        verified && !isUser ? (
          <div className="flex flex-col md:flex-row h-[700px] w-[1300px] bg-white rounded-xl p-4">
          {/* Sidebar */}
          <div
            className="w-full md:w-1/4 bg-blue-500 text-white flex flex-col items-start py-8 px-10 rounded-xl"
            style={{
              backgroundImage: "url('/images/bg-sidebar-desktop.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1 className="font-extrabold text-white text-4xl mb-10">PRAMANIK</h1>
            <h2 className="text-xl font-extrabold uppercase tracking-wide mb-8">Step {step} of 3</h2>
            <ul className="space-y-6">
              {["Your Info", "Submit Docs", "Verification"].map((label, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-2 uppercase text-lg space-x-2 ${
                    step === index + 1 ? "font-bold" : "opacity-70 font-medium"
                  }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      step === index + 1 ? "bg-white text-blue-500" : "border-2 border-blue-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p>{label}</p>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Form Content */}
          <div className="w-full md:w-3/4 bg-white p-6 md:p-12 rounded-xl relative">
            {step === 1 && (
              <>
                <h1 className="text-4xl font-bold text-indigo-900 mb-4">Personal Info</h1>
                <p className="text-lg font-semibold text-gray-400 mb-6">
                  Please provide your name, email address, and phone number.
                </p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitPersonalInfo)} className="space-y-6">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-gray-600">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Stephen King" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-gray-600">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. stephenking@lorem.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Phone Field */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-gray-600">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. +1 234 567 890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Public Address Field */}
                    <FormField
                      control={form.control}
                      name="pubAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-gray-600">Public Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your public address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button type="submit">Next Step</Button>
                    </div>
                  </form>
                </Form>
              </>
            )}
  
  {step === 2 && (
  <>
    <h1 className="text-4xl font-bold text-indigo-900 mb-4">Upload Documents</h1>
    <p className="text-lg font-semibold text-gray-400 mb-6">
      Kindly upload the required documents to proceed.
    </p>
    <form className="space-y-4">
      {documents.map((doc) => (
        <div key={doc} className="space-y-2">
          <label htmlFor={doc} className="block text-sm font-medium text-gray-700">
            Upload {doc}
          </label>
          <div className="flex gap-4 items-center">
            <Input
              type="file"
              id={doc}
              name={doc}
              onChange={(e) => handleFileChange(e, doc)}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => handleUpload(doc)} // Call your upload function here
              variant="primary"
              className="bg-blue-600 text-white"
            >
              Upload
            </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-6">
        <Button variant="secondary" onClick={handlePreviousStep}>
          Previous Step
        </Button>
        <Button type="button" onClick={handleSubmitFiles}>
          Submit Documents
        </Button>
      </div>
    </form>
  </>
)}


{
  step === 3 && (
    <div className="flex items-center justify-center h-96 ">
      <h1 className="text-4xl font-bold text-indigo-900 my-auto">Successfully Submitted Documents</h1>
    </div>
  )
}

          </div>
        </div>
        ) : verified && isUser ? (
          <div className="flex items-center justify-center ">
          <DocumentAccessPortal documents={documents} onSubmit={handleSubmission} />
        </div>
        ) : (
          <div>
            <PhoneVerification verified={verified} setVerified={setVerified} setIsUser={setIsUser} />
          </div>
        )
      }
    </section>
  );
};

export default MultiStepForm;
