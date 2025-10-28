import React from "react";
import Input, { InputProps } from "@/components/ui/input";

type IconInputProps = InputProps & {
  icon: React.ReactNode;
};

export function IconInput({ icon, className, ...props }: IconInputProps) {
  return (
    <div className="relative">
      <Input className={className} {...props} />
      {icon}
    </div>
  );
}
