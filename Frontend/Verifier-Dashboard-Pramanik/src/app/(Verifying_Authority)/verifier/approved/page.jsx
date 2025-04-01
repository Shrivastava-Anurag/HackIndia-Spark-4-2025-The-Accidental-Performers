import React from 'react'
import { Payment, columns } from "./columns"
import { DataTable } from '@/components/ui/data-table'

function Page() {
  return (
    <div>
        <h1 className='text-2xl font-bold text-violet-900 mb-10 '>Here is a list of all the leads in your organization</h1>
        <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Page

const data = [
  {
    type: "Pan Card",
    lead: "John Doe",
    status: "Accepted",
    docAddress: "jbdhgijazweoisijdbslagiygedjxksiugysbzanigeddknzjnx",
    submitted_on: "2023-03-01",
    issued_by: "Ministry of Paisa",
    issued_on: "2023-03-01",
  },
  {
    type: "Pan Card",
    lead: "John Doe",
    status: "Accepted",
    docAddress: "jbdhgijazweoisijdbslagiygedjxksiugysbzanigeddknzjnx",
    submitted_on: "2023-03-01",
    issued_by: "Ministry of Paisa",
    issued_on: "2023-03-01",
  },
  {
    type: "Pan Card",
    lead: "John Doe",
    status: "Accepted",
    docAddress: "jbdhgijazweoisijdbslagiygedjxksiugysbzanigeddknzjnx",
    submitted_on: "2023-03-01",
    issued_by: "Ministry of Paisa",
    issued_on: "2023-03-01",
  },
  {
    type: "Pan Card",
    lead: "John Doe",
    status: "Accepted",
    docAddress: "jbdhgijazweoisijdbslagiygedjxksiugysbzanigeddknzjnx",
    submitted_on: "2023-03-01",
    issued_by: "Ministry of Paisa",
    issued_on: "2023-03-01",
  },
  {
    type: "Pan Card",
    lead: "John Doe",
    status: "Accepted",
    docAddress: "jbdhgijazweoisijdbslagiygedjxksiugysbzanigeddknzjnx",
    submitted_on: "2023-03-01",
    issued_by: "Ministry of Paisa",
    issued_on: "2023-03-01",
  },
]
