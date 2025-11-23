import { AlertCircle, AlertTriangle, Info, Lightbulb } from "lucide-react";
import { type ReactNode } from "react";

import { cn } from "@/src/shared/lib/utils";

type CalloutType = "info" | "warning" | "tip" | "danger";

type CalloutProps = {
  type?: CalloutType;
  children: ReactNode;
  title?: string;
};

const calloutConfig = {
  info: {
    icon: Info,
    className:
      "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    iconClassName: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "border-yellow-500/40 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
    iconClassName: "text-yellow-500",
  },
  tip: {
    icon: Lightbulb,
    className:
      "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-300",
    iconClassName: "text-green-500",
  },
  danger: {
    icon: AlertCircle,
    className: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300",
    iconClassName: "text-red-500",
  },
};

export function CalloutBlock({ type = "info", children, title }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "mb-4 rounded-xl border-l-4 p-4 backdrop-blur",
        config.className
      )}
    >
      <div className="flex gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.iconClassName)} />
        <div className="flex-1 space-y-2">
          {title && <div className="font-semibold">{title}</div>}
          <div className="text-sm leading-relaxed [&>p]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
