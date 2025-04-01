"use client";

import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function PhoneVerification({ verified, setVerified, phoneNo }) {
  const [phoneNumber, setPhoneNumber] = useState(phoneNo);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(true);
  const [timer, setTimer] = useState(30);
  const [isResendAllowed, setIsResendAllowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Handle timer countdown
  useEffect(() => {
    if (otpSent && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsResendAllowed(true);
    }
    
  }, [otpSent, timer]);

  useEffect(() => {
    if ( phoneNumber) {
      
      sendOtp();  // Call sendOtp as soon as the page loads
    }
  }, [phoneNumber, otpSent]); 

  const sendOtp = async () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      setLoading(true);
      console.log("isg==ewiuasiwe")
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phoneNo }),
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
        console.log(data)
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
        router.push("/HomePage");
      } else {
        setLoading(false)
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
    <div className="flex flex-col items-center justify-center">
      <div
        className="w-full rounded-t-xl"
        style={{
          backgroundImage: "url('/images/bg-sidebar-mobile.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Phone Number Verification
        </h2>
        {/* OTP Input */}
        {otpSent && !verified && (
          <div>
            <h1 className="text-base font-medium text-gray-500 text-center w-full my-2">An OTP has been sent to your phone number</h1>
            <h2 className="text-lg font-medium text-gray-500 text-center w-full mb-4">{`**** **** ${String(phoneNumber).slice(-4)}`}</h2>
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
              {loading ? "Verifying..." : "Verify"}
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
