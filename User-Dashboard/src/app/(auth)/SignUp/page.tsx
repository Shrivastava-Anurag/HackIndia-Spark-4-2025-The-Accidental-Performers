"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    public_add: "",
    phone_no: "",
    email: "",
    dob: "",
    // profileImage: null,
  });

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleImageChange = (e) => {
  //   setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  // };

  const validateForm = () => {
    const { name, password, phone_no, email, dob, public_add } = formData;

    if (!name || !password || !phone_no || !email || !dob || !public_add) {
      alert("Please fill in all required fields!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email address!");
      return false;
    }
    if (!/^\d{10}$/.test(phone_no)) {
      alert("Phone number must be 10 digits!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch(
        "https://backendpramanik.onrender.com/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_name: formData.name,
            email: formData.email,
            password: formData.password,
            phone_no: formData.phone_no,
            public_add: formData.public_add,
          }),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Signup successful!");
        setFormData({
          name: "",
          password: "",
          public_add: "",
          phone_no: "",
          email: "",
          dob: "",
          // profileImage: null,
        });
        router.push("/HomePage");
      } else {
        alert(result.message || "Signup failed!");
      }
    } catch (error) {
      alert("An unexpected error occurred!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#edf2fb] p-4">
      <Image src="/img/pramaniklogo3.png" alt="logo" width={300} height={300} />
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            SignUp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your Name"
                value={formData.name}
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="public_add">Public Address</Label>
              <Input
                id="public_add"
                name="public_add"
                placeholder="eg- jksfbks8q37&^dvho@#fbd"
                value={formData.public_add}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone_no">Phone Number *</Label>
              <Input
                type="text"
                id="phone_no"
                name="phone_no"
                placeholder="Enter your phone number"
                value={formData.phone_no}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            {/* Profile Image */}
            {/* <div>
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div> */}

            {/* Submit Button */}
            <div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Signup"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
