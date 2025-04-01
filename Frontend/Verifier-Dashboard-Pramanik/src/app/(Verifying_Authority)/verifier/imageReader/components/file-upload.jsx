"use client";

export default function FileUpload({ onImageUpload, onTextUpload }) {
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "image") onImageUpload(file);
    if (type === "text") onTextUpload(file);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-lg mb-4">
      <div className="mb-4">
        <label htmlFor="image-upload" className="block text-lg font-semibold mb-2">
          Upload Document (Image)
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "image")}
        />
      </div>

      <div>
        <label htmlFor="text-upload" className="block text-lg font-semibold mb-2">
          Upload Reference Document (Text)
        </label>
        <input
          id="text-upload"
          type="file"
          accept=".txt"
          onChange={(e) => handleFileChange(e, "text")}
        />
      </div>
    </div>
  );
}
