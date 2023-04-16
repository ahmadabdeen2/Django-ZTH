'use client';

import { useEffect } from "react";

import EmptyState from "@/app/components/EmptyState";
import Button from "./components/Button";
import { useRouter } from "next/navigation";

interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  const router = useRouter();

  return ( 
    <div className="flex flex-col max-w-[50vw] mx-auto">
    <EmptyState
      title="Uh Oh"
      subtitle="Something went wrong!"
    />
    <Button
        label="Go Back Home"
        onClick={() => router.push('/')}
        />
    </div>

   );
}
 
export default ErrorState;