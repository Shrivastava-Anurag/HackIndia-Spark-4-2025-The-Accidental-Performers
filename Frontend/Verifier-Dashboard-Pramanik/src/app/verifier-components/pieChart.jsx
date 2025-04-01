"use client"
import React from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function PieChartAnalysis() {
  return (
    <div className='w-full h-96'>
        <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={140}
            fill="#8884d8"
            label
          >
              {
      data01.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colors[index]}/>
      ))
    }
    </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PieChartAnalysis

const colors = ['#7c3aed', '#f97316'];
const data01 = [
    { name: 'Group A', value: 400, color: '#82ca9d' },
    { name: 'Group B', value: 100, color: '#8884d8' }, 
  ];