import { useState, type SyntheticEvent, type CSSProperties } from "react";

interface SafeImageProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  decoding?: "async" | "auto" | "sync";
  placeholderLabel?: string;
  onError?: (e: SyntheticEvent<HTMLImageElement>) => void;
  onClick?: () => void;
  role?: string;
  "aria-label"?: string;
}

/**
 * Component ảnh an toàn: hiển thị placeholder đẹp khi ảnh chưa có,
 * không làm vỡ layout hay crash app.
 */
export function SafeImage({
  src,
  alt,
  className,
  style,
  loading,
  decoding,
  placeholderLabel,
  onError: externalOnError,
  onClick,
  ...rest
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    externalOnError?.(e);
  };

  if (hasError || !src) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          overflow: "hidden",
          position: "relative",
        }}
        aria-label={alt}
        role="img"
        onClick={onClick}
      >
        {/* Subtle amber glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            padding: "1rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Image icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d97706"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.5 }}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          {(placeholderLabel || alt) && (
            <span
              style={{
                fontSize: "10px",
                color: "#475569",
                textAlign: "center",
                lineHeight: 1.4,
                maxWidth: "120px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {placeholderLabel || alt}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      onClick={onClick}
      {...rest}
    />
  );
}
