import Directory from "@/components/Directory";
import fs from "node:fs";
import path from "node:path";

export default async function Home() {
  const pdfDirectory = path.join(process.cwd(), "public", "PDFs");
  const fileNames = await fs.promises.readdir(pdfDirectory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          PDFs
        </h1>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <Directory fileNames={fileNames} />
        </div>
      </div>
    </div>
  );
}
