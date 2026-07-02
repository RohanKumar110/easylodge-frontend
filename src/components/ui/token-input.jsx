import React, { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import Icon from "./icon";

function Token({ value = "", onRemove }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.width = `${Math.min(
      inputRef.current.scrollWidth,
      300
    )}px`;
  }, []);

  return (
    <div className="flex items-center gap-0.5 border rounded-md bg-secondary overflow-hidden">
      <Input
        readOnly
        type="text"
        size="1"
        value={value}
        ref={inputRef}
        className="p-2 border-0 rounded-none focus-visible:ring-transparent "
      />
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={onRemove}
        className={"cursor-pointer"}>
        <Icon icon={"close"} size={16} />
      </Button>
    </div>
  );
}

function TokenInput({ value = [], onChange, placeholder, ...props }) {
  const [error, setError] = useState("");

  return (
    <div>
      <div className="flex flex-wrap gap-2 p-2 border rounded-md [&:has(input:focus)]:border-ring [&:has(input:focus)]:ring-3 [&:has(input:focus)]:ring-ring/60">
        {value.map((item, index) => (
          <Token
            value={item}
            key={item.id ?? item}
            onRemove={() => onChange(value.filter((_, idx) => idx !== index))}
          />
        ))}
        <Input
          className="flex-1 p-2 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent min-w-32"
          placeholder={placeholder}
          onChange={() => error && setError("")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              const newValue = e.target.value.trim();
              if (!newValue) return;
              if (value.includes(newValue)) {
                setError(`"${newValue}" is already added`);
                return;
              }
              onChange([...value, newValue]);
              setError("");
              e.target.value = "";
            }
          }}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

export default TokenInput;
