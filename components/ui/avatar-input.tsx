"use client";
import { useRef, useState, forwardRef } from "react";
import { cn } from "@/lib/utils";

type AvatarInputProps = {
  onChange: (file: File | null) => void;
  size?: number;
  className?: string;
};

const AvatarInput = forwardRef<HTMLInputElement, AvatarInputProps>(
  ({ onChange, size = 100, className }, ref) => {
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      if (file) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }
      onChange(file);
    };

    return (
      <div className={cn("flex flex-col items-center", className)}>
        <div
          className="relative cursor-pointer overflow-hidden rounded-full border-2 border-muted hover:border-primary"
          style={{ width: size, height: size }}
          onClick={handleClick}
        >
          {preview ? (
            <img
              src={preview}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <span className="text-xl font-bold">+</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 hidden"
            onChange={handleFileChange}
            ref={(el) => {
              inputRef.current = el;
              if (typeof ref === "function") ref(el!);
              else if (ref) ref.current = el;
            }}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Selecciona tu foto</p>
      </div>
    );
  },
);

AvatarInput.displayName = "AvatarInput";

export default AvatarInput;
