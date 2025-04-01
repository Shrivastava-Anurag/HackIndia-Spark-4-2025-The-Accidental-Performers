"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PersonalInfo from "./personal-info";
import DocumentUpload from "./upload-document";
import TextractForm from "../../imageReader/page";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please provide a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  pubAddress: z.string().min(10, { message: "Not a Valid Public Address" }),
});

function Page() {
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState(null); 


  return (
    <div className="bg-white rounded-xl p-4 h-[100%]">
      <h1 className="text-2xl font-bold text-vs">Add New Record</h1>
      <div className="mt-20">
        {step === 1 && (
          <PersonalInfo setLeadId={setLeadId} leadId={leadId} step={step} setStep={setStep}  />
        )}

        {step === 2  && (
          <TextractForm />
        )}
      </div>
    </div>
  );
}

export default Page;
