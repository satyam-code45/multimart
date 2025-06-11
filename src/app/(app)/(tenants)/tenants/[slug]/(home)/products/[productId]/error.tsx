"use client";

import { TriangleAlert } from "lucide-react";


const ErrorPage = () => {
  return (
    <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg mt-20">
      <TriangleAlert />
      <p className="text-base font-medium">Something Went Worng!</p>
    </div>
  );
};

export default ErrorPage;
