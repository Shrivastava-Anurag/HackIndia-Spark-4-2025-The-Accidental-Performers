import BarChartAnalysis from '@/app/verifier-components/barChart'
import LineChartAnalysis from '@/app/verifier-components/lineChart'
import PieChartAnalysis from '@/app/verifier-components/pieChart'
import { SiThefinals } from "react-icons/si";
import { HiMiniDocumentCheck } from "react-icons/hi2";
import { HiDocumentText } from "react-icons/hi2";
import { BsPeopleFill } from "react-icons/bs";
import React from 'react'

function Page() {
  return (
    <div className='space-y-4'>
      <section className='grid grid-cols-5 gap-4'>
      <div className=' grid grid-cols-2 gap-4 p-0  col-span-2'>
          <div className='p-4 bg-teal-100 rounded-xl shadow-md flex flex-col items-center justify-center space-y-4 aspect-square'>
            <div className='flex items-center justify-center h-16 w-16 rounded-full p-2 bg-gradient-to-r from-teal-200 to-teal-400 shadow-md rotate-[40deg]'>
          <SiThefinals className='h-8 w-8 text-teal-800  rotate-[-40deg]' />
            </div>
          <div className='flex flex-col justify-center items-center space-y-1'>
           <span className='text-3xl text-teal-800 font-bold'>546</span>
           <span className='font-semibold text-teal-600'>Documents Submitted</span>
          </div>
          </div>

          <div className='p-4 bg-blue-100 rounded-xl shadow-md flex flex-col items-center justify-center space-y-4 aspect-square'>
            <div className='flex items-center justify-center h-16 w-16 rounded-full p-2 bg-gradient-to-r from-blue-200 to-blue-400 shadow-md rotate-[40deg]'>
          <BsPeopleFill className='h-8 w-8 text-blue-800  rotate-[-40deg]' />
            </div>
          <div className='flex flex-col justify-center items-center space-y-1'>
           <span className='text-3xl text-blue-800 font-bold'>280</span>
           <span className='font-semibold text-blue-600'>Leads Added</span>
          </div>
          </div>

          <div className='p-4 bg-yellow-100 rounded-xl shadow-md flex flex-col items-center justify-center space-y-4 aspect-square'>
            <div className='flex items-center justify-center h-16 w-16 rounded-full p-2 bg-gradient-to-r from-yellow-200 to-yellow-400 shadow-md rotate-[40deg]'>
          <HiMiniDocumentCheck className='h-8 w-8 text-yellow-800  rotate-[-40deg]' />
            </div>
          <div className='flex flex-col justify-center items-center space-y-1'>
           <span className='text-3xl text-yellow-800 font-bold'>409</span>
           <span className='font-semibold text-yellow-600'>Documents Accepted</span>
          </div>
          </div>

          <div className='p-4 bg-red-100 rounded-xl shadow-md flex flex-col items-center justify-center space-y-4 aspect-square'>
            <div className='flex items-center justify-center h-16 w-16 rounded-full p-2 bg-gradient-to-r from-red-200 to-red-400 shadow-md rotate-[40deg]'>
          <HiDocumentText className='h-8 w-8 text-red-800  rotate-[-40deg]' />
            </div>
          <div className='flex flex-col justify-center items-center space-y-1'>
           <span className='text-3xl text-red-800 font-bold'>139</span>
           <span className='font-semibold text-red-600'>Documents Rejected</span>
          </div>
          </div>
        </div>
        <div className='p-4 bg-gradient-to-r from-gray-100 to-indigo-100 rounded-xl col-span-3 shadow-md '>
          <BarChartAnalysis />
        </div>
      
      <div className='bg-gradient-to-r from-green-100 to-white p-4 col-span-5 rounded-xl shadow-md '>
        <LineChartAnalysis />
      </div>
      </section>
      
    </div>
  )
}

export default Page