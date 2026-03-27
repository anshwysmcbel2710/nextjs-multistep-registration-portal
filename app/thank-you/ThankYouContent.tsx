"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Mail, ArrowLeft, Sparkles } from "lucide-react";

export default function ThankYouContent() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Ambient background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position:    "absolute",
            top:         "-10rem",
            right:       "-10rem",
            width:       "28rem",
            height:      "28rem",
            borderRadius: "50%",
            background:   "rgba(15, 98, 254, 0.12)",
            filter:       "blur(80px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          style={{
            position:    "absolute",
            bottom:      "-10rem",
            left:        "-8rem",
            width:       "24rem",
            height:      "24rem",
            borderRadius: "50%",
            background:   "rgba(34, 197, 94, 0.10)",
            filter:       "blur(80px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{
            position:    "absolute",
            top:         "40%",
            left:        "60%",
            width:       "16rem",
            height:      "16rem",
            borderRadius: "50%",
            background:   "rgba(251, 191, 36, 0.08)",
            filter:       "blur(60px)",
          }}
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0,  scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="form-card relative z-10 w-full max-w-md text-center"
        style={{ padding: "3rem 2.25rem" }}
      >
        {/* Success icon with ripple */}
        <div className="relative mx-auto mb-7" style={{ width: "80px", height: "80px" }}>
          {/* Ripple rings */}
          {[0, 1].map(i => (
            <motion.div
              key={i}
              initial={{ scale: 0.85, opacity: 0.5 }}
              animate={{ scale: 1.6,  opacity: 0 }}
              transition={{
                duration: 1.8,
                delay:    0.3 + i * 0.4,
                repeat:   Infinity,
                ease:     "easeOut",
              }}
              style={{
                position:    "absolute",
                inset:       0,
                borderRadius: "50%",
                border:      "2px solid rgba(34, 197, 94, 0.5)",
              }}
            />
          ))}

          {/* Icon circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 16 }}
            style={{
              position:    "relative",
              width:       "100%",
              height:      "100%",
              borderRadius: "50%",
              background:   "linear-gradient(135deg, #22c55e, #16a34a)",
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              boxShadow:    "0 8px 24px rgba(34, 197, 94, 0.35)",
            }}
          >
            <CheckCircle2 size={38} className="text-white" strokeWidth={2} />
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1,  y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          {/* Badge */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={16} style={{ color: "#f59e0b" }} />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#f59e0b" }}
            >
              Confirmed!
            </span>
            <Sparkles size={16} style={{ color: "#f59e0b" }} />
          </div>

          <h1
            className="text-3xl font-extrabold tracking-tight mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Submission Received
          </h1>

          <p
            className="text-sm mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Thank you for confirming your participation. Your details have been
            successfully recorded.
          </p>
          <p
            className="text-xs mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            An acknowledgment email has been sent to your registered address.
            Please also check your spam folder if you don't see it.
          </p>

          {/* Info pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1,  y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-start gap-3 text-left rounded-xl p-4 mb-8"
            style={{
              background:   "rgba(15, 98, 254, 0.05)",
              border:       "1px solid rgba(15, 98, 254, 0.15)",
            }}
          >
            <Mail
              size={18}
              style={{ color: "#0f62fe", flexShrink: 0, marginTop: "2px" }}
            />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              If you have any questions or need to make changes, please reach
              out to the event organiser directly.
            </p>
          </motion.div>

          {/* Back button */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-secondary inline-flex items-center gap-2 mx-auto"
            >
              <ArrowLeft size={16} />
              Back to Form
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}