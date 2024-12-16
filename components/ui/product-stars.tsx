import { Star } from "lucide-react";
import React from "react";

interface StarsProps {
  filled: number;
  total?: number;
}

const Stars: React.FC<StarsProps> = ({ filled, total = 5 }) => {
  return (
    <div className="flex items-center text-sm text-gray-500 gap-0.5">
      {Array.from({ length: total }, (_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < filled ? "text-orange-400" : "text-gray-300"}`}
          fill={i < filled ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};

export default Stars;
