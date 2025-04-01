import { NextResponse } from 'next/server';

export async function POST(req) {
  const { phoneNumber, otp } = await req.json();

  if (!phoneNumber || !otp) {
    return NextResponse.json({ message: 'Phone number and OTP are required' }, { status: 400 });
  }

  // Verify OTP
  if (global.otpData && global.otpData.phoneNumber === phoneNumber && global.otpData.otp === otp) {
    return NextResponse.json({ message: 'OTP verified successfully!' });
  } else {
    return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
  }
}
