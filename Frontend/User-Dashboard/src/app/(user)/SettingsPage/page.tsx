"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    name: "", // Example default values
    password: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, phone, email } = formData;

    if (!name || !email || !phone) {
      alert("Please fill in all required fields!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email address!");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://sih-backend-9xx2.onrender.com/user/settings",
        {
          method: "PUT", // Use PUT for updating details
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password, // Include if changing password
            phone: formData.phone,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Details updated successfully!");
      } else {
        alert(result.message || "Update failed!");
      }
    } catch (error) {
      alert("An unexpected error occurred!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#edf2fb] p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Settings
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
                placeholder="Enter new Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">
                Password (Leave blank if not changing)
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter a new password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter your new phone number"
                value={formData.phone}
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
                placeholder="Enter your new email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
