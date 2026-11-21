import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-blood-600 to-blood-700 text-white shadow-sm shadow-blood-700/20 hover:from-blood-500 hover:to-blood-700",
  secondary:
    "bg-white text-blood-700 border border-blood-200 shadow-xs hover:bg-blood-50 hover:border-blood-300",
  ghost: "bg-transparent text-stone-700 hover:bg-blood-50 hover:text-blood-700",
};

const SIZES: Record<Size, string> = {
  md: "min-h-12 rounded-2xl px-6 text-sm sm:text-base",
  sm: "min-h-11 rounded-xl px-4 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type LinkButtonProps = CommonProps & {
  href: string;
};

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    type = "button",
    ...rest
  } = props;
  void _v;
  void _s;
  void _c;
  void _ch;

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
