
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <Navbar />
        <div className="flex">
          <div className="hidden md:block h-[100vh] w-[300px] px-1">
            <Sidebar />
          </div>
          <div className=" p-0 w-full md:max-w-full max-h-full">{children}</div>
        </div>
        <Toaster />
      </div>
  );
}
