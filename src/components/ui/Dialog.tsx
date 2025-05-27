import React, {
  forwardRef,
  ReactNode,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  title?: string;
  description?: string;
  isAlert?: boolean;
}

const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onClose,
      children,
      className,
      contentClassName,
      title,
      description,
      isAlert = false,
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setMounted(true);
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === "Escape" && open) {
          onClose();
        }
      },
      [open, onClose]
    );

    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [handleKeyDown]);

    if (!mounted) return null;

    return createPortal(
      open ? (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
            "backdrop-blur-sm",
            className
          )}
          ref={dialogRef}
          onClick={(e) => {
            if (dialogRef.current === e.target) {
              onClose();
            }
          }}
          aria-hidden={!open}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4 relative",
              contentClassName
            )}
            role={isAlert ? "alertdialog" : "dialog"}
            aria-modal="true"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
            {title && (
              <h2
                className={cn(
                  "text-2xl font-semibold",
                  isAlert
                    ? "flex items-center gap-2 text-red-500"
                    : "text-gray-800"
                )}
              >
                {isAlert && <AlertTriangle className="w-6 h-6" />}
                {title}
              </h2>
            )}
            {description && <p className="text-gray-600">{description}</p>}
            <div>{children}</div>
          </motion.div>
        </div>
      ) : null,
      document.body
    );
  }
);
Dialog.displayName = "Dialog";

export default Dialog;
