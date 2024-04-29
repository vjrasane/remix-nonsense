import React, { FunctionComponent, PropsWithChildren } from "react";

export const Dialog: FunctionComponent<
  PropsWithChildren<{
    isOpen: boolean;
    footer: React.ReactNode;
  }>
> = ({ isOpen, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block bg-white rounded rounded-t-lg text-left overflow-hidden shadow-xl transform transition-all align-middle max-w-lg w-full">
          <div className="px-4 pt-5 pb-4">{children}</div>
          <div className="bg-gray-50 px-4 py-3  flex justify-end">{footer}</div>
        </div>
      </div>
    </div>
  );
};
