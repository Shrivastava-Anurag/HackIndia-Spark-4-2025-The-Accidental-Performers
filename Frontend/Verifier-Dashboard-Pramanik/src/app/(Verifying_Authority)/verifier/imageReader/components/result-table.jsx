export default function ResultTable({ comparisonResults }) {
    return (
      <div className="mt-6 bg-white shadow-md rounded-md p-4 w-full max-w-2xl">
        <h2 className="text-lg font-bold mb-4">Comparison Results</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Field</th>
              <th className="border px-4 py-2">Extracted</th>
              <th className="border px-4 py-2">Reference</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(comparisonResults).map(([key, value], index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{key}</td>
                <td className="border px-4 py-2">{value.extracted}</td>
                <td className="border px-4 py-2">{value.reference}</td>
                <td
                  className={`border px-4 py-2 font-bold ${
                    value.status === "Verified"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {value.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  