// components/FileUpload.tsx

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, CheckCircle2, FileText } from "lucide-react";

interface FileUploadProps {
  label:      string;
  accept?:    string;
  // Payload is typed to match exactly what Form.tsx expects — no `any`.
  onSelect:   (payload: File | File[] | string | null) => void;
  multiple?:  boolean;
  maxSizeMB?: number;
}

export default function FileUpload({
  label,
  accept     = "",
  onSelect,
  multiple   = false,
  maxSizeMB  = 20,
}: FileUploadProps) {
  const inputRef                    = useRef<HTMLInputElement | null>(null);
  const [file,       setFile]       = useState<File | null>(null);
  const [files,      setFiles]      = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setDragging]   = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  /* Preview URL — create and revoke properly */
  useEffect(() => {
    if (file?.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [file]);

  /* Single-file validation */
  function validateSingle(f: File | null) {
    setError(null);
    if (!f) {
      setFile(null);
      onSelect(null);
      return;
    }
    if (f.size / 1024 / 1024 > maxSizeMB) {
      setError(`File too large — max ${maxSizeMB} MB.`);
      setFile(null);
      onSelect(null);
      return;
    }
    setFile(f);
    onSelect(f);
  }

  /* Multi-file validation */
  function validateMultiple(list: FileList | null) {
    setError(null);
    if (!list || !list.length) {
      setFiles([]);
      onSelect(null);
      return;
    }
    const arr = Array.from(list);
    if (arr.some(f => f.size / 1024 / 1024 > maxSizeMB)) {
      setError(`One or more files exceed ${maxSizeMB} MB.`);
      setFiles([]);
      onSelect(null);
      return;
    }
    setFiles(arr);
    onSelect(arr);
  }

  /* Remove / reset */
  function remove() {
    setFile(null);
    setFiles([]);
    setPreviewUrl(null);
    setError(null);
    onSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const hasFile     = !!file || files.length > 0;
  const displayName =
    files.length > 1
      ? `${files.length} files selected`
      : (file?.name ?? files[0]?.name ?? "");
  const displaySize = ((file?.size ?? files[0]?.size ?? 0) / 1024 / 1024).toFixed(2);
  const displayType = (
    (file?.type ?? files[0]?.type ?? "").split("/")[1] ?? "file"
  ).toUpperCase();

  return (
    <div className="space-y-1.5">
      <label className="field-label">{label}</label>

      {/* Hidden native input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={e =>
          multiple
            ? validateMultiple(e.target.files)
            : validateSingle(e.target.files?.[0] ?? null)
        }
        className="hidden"
      />

      {/* Drop zone */}
      <motion.div
        animate={isDragging ? { scale: 1.01 } : { scale: 1 }}
        onClick={() => !hasFile && inputRef.current?.click()}
        onDragOver={e  => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => {
          e.preventDefault();
          setDragging(false);
          multiple
            ? validateMultiple(e.dataTransfer.files)
            : validateSingle(e.dataTransfer.files[0] ?? null);
        }}
        onKeyDown={e =>
          (e.key === "Enter" || e.key === " ") && inputRef.current?.click()
        }
        role="button"
        tabIndex={0}
        aria-label={label}
        className={`upload-card ${isDragging ? "drag-over" : ""}`}
      >
        <div className="flex items-center gap-3">
          {/* Status icon */}
          <div className={`upload-icon-wrap ${hasFile ? "success" : ""}`}>
            <AnimatePresence mode="wait">
              {hasFile ? (
                <motion.span
                  key="ok"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <CheckCircle2 size={20} className="text-green-500" />
                </motion.span>
              ) : (
                <motion.span
                  key="up"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Upload size={20} style={{ color: "var(--text-muted)" }} />
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Info area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {!hasFile ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {accept ? `Accepted: ${accept}` : "Any file type"} · Max {maxSizeMB} MB
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="filled"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={displayName}
                      className="flex-shrink-0 object-cover rounded-lg"
                      style={{
                        width:  "48px",
                        height: "48px",
                        border: "1px solid var(--border)",
                      }}
                    />
                  ) : (
                    <div
                      className="flex-shrink-0 rounded-lg flex items-center justify-center"
                      style={{
                        width:      "48px",
                        height:     "48px",
                        background: "var(--bg-muted)",
                        border:     "1px solid var(--border)",
                      }}
                    >
                      <FileText size={18} style={{ color: "var(--text-muted)" }} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p
                      className="text-sm font-medium truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {displayName}
                    </p>
                    {/* Only show size/type when exactly one file is shown */}
                    {files.length <= 1 && (
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {displaySize} MB · {displayType}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action button */}
          {hasFile ? (
            <motion.button
              type="button"
              onClick={e => { e.stopPropagation(); remove(); }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Remove file"
              className="remove-btn"
            >
              <X size={15} />
            </motion.button>
          ) : (
            <button
              type="button"
              onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
              className="browse-btn"
            >
              Browse
            </button>
          )}
        </div>
      </motion.div>

      {/* Validation error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1,  y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs"
            style={{ color: "#ef4444" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}