"use client"
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function  LineChartAnalysis() {
  return (
            <div className='w-full h-96 mt-10'>
    <ResponsiveContainer >
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} padding={{ left: 20, right: 20 }} tick={{ fill: '#bbbdc7', fontWeight: 600 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 15, fill: '#bbbdc7', fontWeight: 600 }}  />
          <Tooltip cursor={{ stroke: 'blue', strokeWidth: 1, width: 6,  }} />
          <Legend />
          <Line type="linear" dataKey="accepted" stroke="#22c55e" strokeWidth={3} activeDot={{ r: 4 }} dot={{ r: 3, fill: '#22c55e' }} />
          <Line type="linear" dataKey="rejected" stroke="#ef4444" strokeWidth={3} activeDot={{ r: 4 }} dot={{ r: 3, fill: '#ef4444' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartAnalysis



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
  