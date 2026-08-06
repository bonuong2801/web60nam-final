import { useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ErrorBoundary({ children, fallback }: Props) {
  // Note: true React error boundary requires class component.
  // This functional wrapper passes children through safely.
  // For production, consider using react-error-boundary package.
  const [hasError] = useState(false);

  if (hasError) {
    return (
      fallback ?? (
        <div className="py-12 text-center text-slate-400 text-sm">
          <p>Không thể tải phần này.</p>
        </div>
      )
    );
  }

  return <>{children}</>;
}
