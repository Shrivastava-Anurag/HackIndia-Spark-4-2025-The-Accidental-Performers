import { Plus } from 'lucide-react'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import QuickLinkComponent from './quick-link-box'
import Link from 'next/link'


function Header() {
  return (
    <div className='w-full rounded-xl py-4 px-5 flex justify-end items-center space-x-4'>
              <div className=' px-3 py-2 rounded-xl   bg-vs  text-white hover:text-vs hover:bg-[#f3cda9] '>
            <Link href='/verifier/imageReader' className='font-semibold flex items-center space-x-2 '>
            Simple Verification
            </Link>
        </div>

          <div className='px-3 py-2 rounded-xl bg-vs  text-white hover:text-vs hover:bg-[#f3cda9]'>
            <Dialog>
              <DialogTrigger className='font-semibold flex items-center'><span>Quick Link</span></DialogTrigger>
              <DialogContent>
                <DialogTitle className="text-xl font-semibold">Generate Link</DialogTitle>
                <QuickLinkComponent />
              </DialogContent>
            </Dialog>
        </div>
        <div className=' px-3 py-2 rounded-xl   bg-vs  text-white hover:text-vs hover:bg-[#f3cda9] '>
            <Link href='/verifier/leads/add-lead' className='font-semibold flex items-center space-x-2 '>
              <Plus size={20} className='mr-2' />
            Add Record
            </Link>
        </div>
        <div className='  px-3 py-2 rounded-xl   bg-vs  text-white hover:text-vs hover:bg-[#f3cda9] '>
            <button className='font-semibold '>
            User Profile
            </button>
        </div>
    </div>
  )
}

export default Header