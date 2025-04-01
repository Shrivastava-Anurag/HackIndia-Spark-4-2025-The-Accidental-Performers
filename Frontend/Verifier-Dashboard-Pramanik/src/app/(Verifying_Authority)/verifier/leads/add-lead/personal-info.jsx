"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Shadcn form components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please provide a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  pubAddress: z.string().min(10, { message: "Not a Valid Public Address" }),
});


function PersonalInfo({step, setStep, leadId, setLeadId}) {
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        pubAddress: "",
      },
    });
  
    const handleNextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
    const handlePreviousStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));
  
    // Function to submit the form and create a new lead
    const onSubmitPersonalInfo = async (data) => {
      setLoading(true);
      setError(null);
  
      const payload = {
        name: data.name,
        email: data.email,
        phone_no: data.phone,
        public_add: data.pubAddress,
        verifier_id: "675067ee4621696b50ecb19e", 
      };
  
      try {
        // const response = await fetch("https://sih-backend-9xx2.onrender.com/verifier/addLead", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(payload),
        // });
  
        // if (!response.ok) {
        //   throw new Error("Failed to create lead. Please try again.");
        // }
  
        // const result = await response.json();
        // setLeadId(result.leadId); // Save the lead ID
        // console.log("Lead Created Successfully:", result);

          // Add a 3-second delay and then setStep to 2
          setTimeout(() => {
            setStep(2);
          }, 3000);
  
        // handleNextStep(); // Proceed to the next step
      } catch (err) {
        console.error("Error creating lead:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
  

  return (
    <div>
        <h1 className='text-black font-semibold text-lg'>Personal Information</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitPersonalInfo)} className="space-y-5">
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
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end pt-8">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Next Step"}
          </Button>
        </div>
      </form>
    </Form>
  </div>
  )
}

export default PersonalInfo