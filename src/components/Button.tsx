import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "emphasis" | "danger" | "text";
type Size = "lg" | "sm";

const VARIANT_CLASSES: Record<Variant, Record<Size, string>> = {
  primary: {
    lg: "bg-accent-fill text-text-on-accent h-11 rounded-xl px-4 py-3 text-[13px]",
    sm: "bg-accent-fill text-text-on-accent rounded-full px-[14px] py-[6px] text-[12px]",
  },
  secondary: {
    lg: "border border-accent-fill text-accent-default h-11 rounded-xl px-4 py-3 text-[13px]",
    sm: "border border-accent-fill text-accent-default rounded-full px-[14px] py-[6px] text-[12px]",
  },
  emphasis: {
    lg: "bg-[#4a3484] text-text-on-accent font-medium shadow-[0px_4px_7px_rgba(74,52,132,0.38)] h-11 rounded-xl px-4 py-3 text-[13px]",
    sm: "bg-[#4a3484] text-text-on-accent font-medium shadow-[0px_4px_7px_rgba(74,52,132,0.38)] rounded-full px-[14px] py-[6px] text-[12px]",
  },
  danger: {
    lg: "bg-feedback-danger text-text-on-accent font-medium h-11 rounded-xl px-4 py-3 text-[13px]",
    sm: "bg-feedback-danger text-text-on-accent font-medium rounded-full px-[14px] py-[6px] text-[12px]",
  },
  text: {
    lg: "text-text-tertiary underline text-[12px] px-3 py-[13.5px]",
    sm: "text-text-tertiary underline text-[12px] px-3 py-[13.5px]",
  },
};

export default function Button({
  variant = "primary",
  size = "lg",
  icon,
  fullWidth = false,
  className = "",
  children,
  ...props
}: {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-1.5 whitespace-nowrap transition-opacity active:opacity-80 ${VARIANT_CLASSES[variant][size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
