"use client";

import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useToast } from "@/hooks/use-toast";

function PhoneVerification({ verified, setVerified, setIsUser }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isResendAllowed, setIsResendAllowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Handle timer countdown
  useEffect(() => {
    if (otpSent && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsResendAllowed(true);
    }
  }, [otpSent, timer]);

  const sendOtp = async () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setTimer(30);
        setIsResendAllowed(false);
        toast({
          description: "OTP sent successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    if (otp.includes("")) {
      alert("Please enter the complete OTP.");
      return;
    }

    const enteredOtp = otp.join("");

    try {
      setLoading(true);
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp: enteredOtp }),
      });
      const data = await response.json();
      if (response.ok) {
        setVerified(true);
        toast({
          description: "OTP verified successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      } else {
        alert(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Error verifying OTP. Please try again.");
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Allow only one character per input
    setOtp(newOtp);

    // Move to the next input if a value is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && otp[index] === "") {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="w-full h-32 rounded-t-xl"
        style={{
          backgroundImage: "url('/images/bg-sidebar-mobile.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Phone Number Verification
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Please provide your phone number to receive a One Time Password (OTP)
          for verification.
        </p>

        {/* Phone Number Input */}
        {!otpSent && (
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter your phone number
            </label>
            <PhoneInput
              id="phone"
              defaultCountry="IN" // Default country code (IN for India)
              international
              value={phoneNumber}
              onChange={setPhoneNumber}
              className="border rounded-md h-full w-full mb-4 p-2"
              placeholder="Enter phone number"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
              onClick={sendOtp}
            >
              Send OTP
            </button>
          </div>
        )}
        {/* OTP Input */}
        {otpSent && !verified && (
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-4 text-center"
            >
              Enter the OTP sent to your phone
            </label>
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((value, index) => (
                <div key={index} className="relative">
                  <input
                    id={`otp-input-${index}`}
                    type="text"
                    value={value}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) =>
                      e.key === "Backspace" && handleBackspace(index)
                    }
                    className="w-12 h-12 text-center border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={1}
                  />
                </div>
              ))}
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>

            {/* Timer and Resend Option */}
            <div className="mt-4 text-center">
              {isResendAllowed ? (
                <button
                  className="text-blue-500 hover:underline"
                  onClick={sendOtp}
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-gray-500">
                  Resend OTP in <span className="font-bold">{timer}</span>{" "}
                  seconds
                </p>
              )}
            </div>
          </div>
        )}

        {/* Verified Message */}
        {verified && (
          <div className="text-center mt-4">
            <h3 className="text-green-500 text-xl font-bold mb-2">
              Phone Verified Successfully!
            </h3>
            <p className="text-gray-600">
              Thank you for verifying your phone number. You may now proceed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhoneVerification;
