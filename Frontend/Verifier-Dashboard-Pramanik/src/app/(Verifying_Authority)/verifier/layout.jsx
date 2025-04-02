import Header from "@/app/verifier-components/header";
import Sidebar from "@/app/verifier-components/sidebar";
import { Toaster } from "@/components/ui/toaster"



export default async function VerifierLayout({children}) {
    return (
        <div className="flex bg-vp min-h-screen w-full">
            {/* Sidebar */}
            <div className="py-5 h-full w-[18%] fixed top-0 left-0 overflow-y-auto scrollbar-hidden bg-vp border-r-2 border-slate-200">
            <Sidebar />
            </div>
            {/* Main Content */}
            <div className="ml-[18%] w-[82%] flex flex-col px-4">
            <Header />
            <Toaster />
            <main className="flex-grow my-6">{children}</main>
            </div>
        </div>

    );
}

