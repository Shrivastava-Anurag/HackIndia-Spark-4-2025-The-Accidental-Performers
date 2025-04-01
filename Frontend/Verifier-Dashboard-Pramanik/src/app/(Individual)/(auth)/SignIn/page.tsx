"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import PhoneVerification from "./verify-otp";

const SigninPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [verified, setVerified] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // Validate inputs
  const validateForm = () => {
    const { email, password } = credentials;
    if (!email || !password) {
      toast({ title: "Error", description: "Email and Password are required!" });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({ title: "Error", description: "Invalid email address!" });
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("https://hello-5tgi.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        toast({ title: "Success", description: "Logged in successfully!" });
        const data = await response.json();
        setPhoneNo("+91"+data.result.phone_no);
        // router.push("/HomePage"); 
        setStep(2);
      } else {
        toast({ title: "Error", description: "Invalid credentials. Try again!" });
      }
    } catch (error) {
      toast({ title: "Error", description: "An unexpected error occurred!" });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="p-8 w-[500px] flex flex-col items-center justify-center border border-gray-300 rounded-md bg-white shadow-lg ">

      <Image src="/img/pramaniklogo3.png" alt="logo" width={300} height={300} className="mb-10" />
      {step === 1 && (
        <Card className="w-full max-w-md ">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-[#175e97]">
            SignIn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="user@example.com"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Your password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <Button type="submit" className="w-full bg-[#175e97] text-white hover:bg-[#175e97]/80" disabled={loading}>
                {loading ? "Authenticating..." : "Sign In"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      )
    }
      {step === 2 && (
        <PhoneVerification verified={verified} setVerified={setVerified} phoneNo={phoneNo} />
      )}
      </div>
    </div>
    
  );
};

export default SigninPage;
