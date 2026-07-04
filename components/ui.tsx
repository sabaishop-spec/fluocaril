"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand text-navy hover:bg-[#70D65A]",
        outline: "border-2 border-slate-200 bg-white hover:bg-slate-50 text-navy",
        ghost: "hover:bg-slate-100 text-slate-600 hover:text-navy",
        link: "text-brand-dark underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
});
Button.displayName = "Button";

export const Accordion = ({ items }: { items: { title: string; content: React.ReactNode }[] }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  
  return (
    <div className="w-full space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-slate-300 transition-colors">
          <button
            className="w-full px-6 py-5 flex items-center justify-between font-semibold text-left text-navy font-serif text-lg"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            {item.title}
            <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", openIndex === idx && "rotate-180")} />
          </button>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 pb-5 text-slate-600 leading-relaxed"
              >
                {item.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
