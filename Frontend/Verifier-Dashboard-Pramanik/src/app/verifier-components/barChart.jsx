"use client"
import React, { useState } from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


function BarChartAnalysis() {
  return (
    <div>
      <Tabs defaultValue="accepted"  >
      <TabsList>
        <TabsTrigger value="accepted">Accepted</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
      </TabsList>
      <TabsContent value="accepted"  className='w-full h-80 mt-10'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barGap={10}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="name"   tick={{ fill: '#000000', fontWeight: 600 , fontSize: 15, angle: -15,  }}  />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="accepted" fill="#4338ca" activeBar={<Rectangle fill="#8b5cf6" stroke="#c4b5fd" />} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="rejected"  className='w-full h-96 mt-10'>
      <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barGap={10}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
        <XAxis dataKey="name"   tick={{ fill: '#000000', fontWeight: 600 , fontSize: 15, angle: -15,  }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rejected" fill="#7f1d1d" activeBar={<Rectangle fill="#b91c1c" stroke="#7f1d1d" />} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default BarChartAnalysis



const data = [
    {
      name: 'August',
      accepted: 200, // Documents accepted
      rejected: 100, // Documents rejected
      amt: 0,
    },
    {
      name: 'September',
      accepted: 600,
      rejected: 300,
      amt: 0,
    },
    {
      name: 'October',
      accepted: 900,
      rejected: 300,
      amt: 0,
    },
    {
      name: 'November',
      accepted: 400,
      rejected: 200,
      amt: 0,
    },
    {
      name: 'December',
      accepted: 200,
      rejected: 100,
      amt: 0,
    },
    {
      name: 'January',
      accepted: 400,
      rejected: 200,
      amt: 0,
    },
    {
      name: 'February',
      accepted: 600,
      rejected: 300,
      amt: 0,
    },
    {
      name: 'March',
      accepted: 900,
      rejected: 300,
      amt: 0,
    },
    {
      name: 'April',
      accepted: 800,
      rejected: 400,
      amt: 0,
    },
    {
      name: 'May',
      accepted: 1000,
      rejected: 500,
      amt: 0,
    },
  ];
  