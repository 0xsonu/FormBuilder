import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col  w-full mx-auto flex-grow">{children}</div>
  );
}
