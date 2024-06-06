import React, { useState, forwardRef } from "react";
import { Star } from "lucide-react";
import { Label } from "../label";
import { Control, useController } from "react-hook-form";

interface StarRatingProps {
  label?: string;
  control?: Control<any, any>;
  name: string;
}

const StarRating = forwardRef<HTMLInputElement, StarRatingProps>(
  ({ label, control, name }, ref) => {
    const { field, fieldState } = useController({
      name,
      control,
      rules: { required: "You need to make a selection" }, // Set required error message
      defaultValue: 0,
    });

    const [hover, setHover] = useState(0);

    const handleStarClick = (ratingVal: number) => {
      field.onChange(ratingVal);
    };

    return (
      <>
        {label && <Label>{label}</Label>}
        <div className="flex">
          {[...Array(5)].map((_, index) => {
            const ratingVal = index + 1;
            return (
              <Label key={index} className="cursor-pointer">
                <input
                  ref={ref}
                  className="hidden"
                  type="radio"
                  name={name}
                  value={ratingVal}
                  checked={field.value === ratingVal}
                  onChange={() => handleStarClick(ratingVal)}
                />
                <Star
                  onMouseEnter={() => setHover(ratingVal)}
                  onMouseLeave={() => setHover(0)}
                  fill={
                    ratingVal <= (hover || field.value) ? "#ffc107" : "#e4e5e9"
                  }
                  className="transition-transform duration-300"
                />
              </Label>
            );
          })}
        </div>
        {fieldState.error && (
          <span className="text-red-500 text-sm">
            {"You need to choose a priority"}
          </span>
        )}
      </>
    );
  }
);

StarRating.displayName = "StarRating";

export default StarRating;
