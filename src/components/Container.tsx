import React from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: IProps) => {
  return (
    <div className={`w-11/12 mx-auto py-5 md:w-[700px] h-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
