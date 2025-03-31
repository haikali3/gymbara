import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
