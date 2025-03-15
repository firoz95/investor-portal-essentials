
import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true, size = "md" }) => {
  const sizes = {
    sm: "h-10",  // Increased from h-8
    md: "h-12",  // Increased from h-10
    lg: "h-16",  // Increased from h-14
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative ${sizes[size]}`}>
        <img 
          src="/lovable-uploads/c2b4b1aa-a7d9-4ade-93a8-fda8b0af47cc.png" 
          alt="NAFA Private Equity"
          className={`h-full`}
        />
      </div>
      {showText && (
        <div className="ml-3 font-medium text-foreground">
          <span className="block text-sm sm:text-base">New Age Entrepreneurs Fund</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
