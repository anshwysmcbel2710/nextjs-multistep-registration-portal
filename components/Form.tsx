// components/Form.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, ChevronRight, ChevronLeft, Check } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import PhoneInput from "@/components/PhoneInput";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ── Supabase lazy singleton ───────────────────────────────────────────
let _supabase: SupabaseClient | null = null;
function getSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _supabase;
}

// ── Types ─────────────────────────────────────────────────────────────
interface FormValues {
  university_name: string;
  city:            string;
  state:           string;
  country:         string;
  rep_name:        string;
  rep_designation: string;
  rep_email:       string;
  submitter_name?:    string;
  submitter_contact?: string;
  highlights?:        string;
  deposit_link?:      string;
  remarks?:           string;
  consent:         boolean;
}

// ── Constants ─────────────────────────────────────────────────────────
const LEVELS = ["Diploma", "Certificate", "Bachelors", "Masters"];
const EVENTS = ["Webinar", "Online Fair", "In-person Fair"];
const SLOTS  = [
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
];
const STEPS = [
  { id: 1, title: "University",  emoji: "🏛️" },
  { id: 2, title: "People",      emoji: "👤" },
  { id: 3, title: "Recruitment", emoji: "📊" },
  { id: 4, title: "Documents",   emoji: "📎" },
];

// ── Bezier easing tuple — typed explicitly so TypeScript narrows it
//    to [number, number, number, number] (BezierDefinition) instead of
//    the wider number[], which framer-motion v12 rejects. ──────────────
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── Animation variants ────────────────────────────────────────────────
const stepVariants = {
  enter:  (dir: number) => ({ x: dir > 0 ?  48 : -48, opacity: 0 }),
  center: {
    x: 0, opacity: 1,
    transition: { duration: 0.32, ease: EASE },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48, opacity: 0,
    transition: { duration: 0.22, ease: EASE },
  }),
};

// ── Inline field error ────────────────────────────────────────────────
function FieldError({ msg }: { msg: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-xs mt-1.5 flex items-center gap-1"
      style={{ color: "#ef4444" }}
    >
      ⚠ {msg}
    </motion.p>
  );
}

// ── Pill component (defined OUTSIDE Form to prevent re-creation on every render) ──
function Pill({
  label,
  active,
  onClick,
}: {
  label:   string;
  active:  boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseDown={e => e.preventDefault()}
      whileTap={{ scale: 0.97 }}
      className={`pill-btn ${active ? "pill-active" : ""}`}
    >
      <span className={`pill-check ${active ? "pill-check-active" : ""}`}>
        <AnimatePresence>
          {active && (
            <motion.span
              key="chk"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <Check size={11} strokeWidth={3} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="pill-text">{label}</span>
    </motion.button>
  );
}

// ── Typed helper aliases ──────────────────────────────────────────────
type FileSetter = React.Dispatch<React.SetStateAction<File | null>>;
type UrlSetter  = React.Dispatch<React.SetStateAction<string | null>>;

// ── processFile — properly typed, no more `any` ───────────────────────
function processFile(
  payload:  File | File[] | string | null,
  setFile:  FileSetter,
  setUrl:   UrlSetter,
) {
  if (!payload)                      { setFile(null); setUrl(null);  return; }
  if (typeof payload === "string")   { setUrl(payload); setFile(null); return; }
  if (Array.isArray(payload))        { setFile(payload[0] ?? null); setUrl(null); return; }
  setFile(payload); setUrl(null);
}

// ── Main export ───────────────────────────────────────────────────────
export default function Form() {
  const router              = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [step,    setStep]    = useState(1);
  const [dir,     setDir]     = useState(1);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  // ── File state ───────────────────────────────────────────────────────
  const [logoFile,       setLogoFile]       = useState<File | null>(null);
  const [headshotFile,   setHeadshotFile]   = useState<File | null>(null);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [extraDocsFiles, setExtraDocsFiles] = useState<File[]>([]);
  const [logoUrl,        setLogoUrl]        = useState<string | null>(null);
  const [headshotUrl,    setHeadshotUrl]    = useState<string | null>(null);
  const [attachmentUrl,  setAttachmentUrl]  = useState<string | null>(null);
  const [extraDocUrls,   setExtraDocUrls]   = useState<string[]>([]);

  // ── Custom-state fields ──────────────────────────────────────────────
  const [phoneNumber,    setPhoneNumber]    = useState("");
  const [levelsSelected, setLevelsSelected] = useState<string[]>([]);
  const [eventsSelected, setEventsSelected] = useState<string[]>([]);
  const [slotsSelected,  setSlotsSelected]  = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });

  // ── Watch summary fields in one call (more efficient) ────────────────
  const [watchUniversity, watchRepName, watchRepEmail] = watch([
    "university_name",
    "rep_name",
    "rep_email",
  ]);

  // ── Helpers ──────────────────────────────────────────────────────────
  function toggle(
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    val: string,
  ) {
    setter(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val],
    );
  }

  const onLogoSelect       = (p: File | File[] | string | null) =>
    processFile(p, setLogoFile,       setLogoUrl);
  const onHeadshotSelect   = (p: File | File[] | string | null) =>
    processFile(p, setHeadshotFile,   setHeadshotUrl);
  const onAttachmentSelect = (p: File | File[] | string | null) =>
    processFile(p, setAttachmentFile, setAttachmentUrl);

  function onExtraDocSelect(payload: File | File[] | string | null) {
    // null means the user clicked Remove inside FileUpload — ignore it
    // because extra-doc files accumulate in our own list.
    if (!payload) return;
    if (typeof payload === "string") {
      setExtraDocUrls(prev => [...prev, payload]);
      return;
    }
    if (Array.isArray(payload)) {
      setExtraDocsFiles(prev => [...prev, ...payload]);
      return;
    }
    setExtraDocsFiles(prev => [...prev, payload]);
  }

  // ── uploadFile — fixed: data can be null even when error is null ──────
  async function uploadFile(file: File | null, folder: string): Promise<string | null> {
    if (!file) return null;
    const supabase = getSupabase();
    const safe     = file.name.replace(/[^\w\-.]/g, "_");
    const path     = `${folder}/${Date.now()}-${safe}`;
    const bucket   = process.env.NEXT_PUBLIC_SUPABASE_BUCKET!;
    const base     = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const { data, error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) throw error;
    // data can still be null in Supabase's types even after error check —
    // guard explicitly so TypeScript (and runtime) stay safe.
    if (!data) throw new Error("Upload returned no data.");
    return `${base}/storage/v1/object/public/${bucket}/${data.path}`;
  }

  // ── Step navigation ──────────────────────────────────────────────────
  async function next() {
    setError(null);
    let valid = false;

    if (step === 1) {
      valid = await trigger(["university_name", "city", "state", "country"]);
    } else if (step === 2) {
      // Validate RHF fields
      valid = await trigger(["rep_name", "rep_designation", "rep_email"]);
      // Also validate phone (managed outside RHF)
      if (valid && !phoneNumber.trim()) {
        setError("Phone number is required.");
        return;
      }
    } else if (step === 3) {
      if (!levelsSelected.length) { setError("Please select at least one level."); return; }
      if (!eventsSelected.length) { setError("Please select at least one event."); return; }
      valid = true;
    } else {
      valid = true;
    }

    if (valid) { setDir(1); setStep(s => s + 1); }
  }

  function prev() { setError(null); setDir(-1); setStep(s => s - 1); }

  // ── Submit ───────────────────────────────────────────────────────────
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!levelsSelected.length) { setError("Please select at least one level."); return; }
    if (!eventsSelected.length) { setError("Please select at least one event."); return; }

    setLoading(true);
    setError(null);

    const sid    = crypto.randomUUID();
    const folder = `submissions/${sid}`;

    try {
      const supabase = getSupabase();

      const [logoPublic, headshotPublic, attachmentPublic] = await Promise.all([
        logoUrl       ? Promise.resolve(logoUrl)       : uploadFile(logoFile,       folder),
        headshotUrl   ? Promise.resolve(headshotUrl)   : uploadFile(headshotFile,   folder),
        attachmentUrl ? Promise.resolve(attachmentUrl) : uploadFile(attachmentFile, folder),
      ]);

      const extraPublics = [...extraDocUrls];
      for (const f of extraDocsFiles) {
        const url = await uploadFile(f, folder);
        if (url) extraPublics.push(url);
      }

      const payload = {
        university_name:              data.university_name,
        university_logo:              logoPublic,
        city:                         data.city,
        state:                        data.state,
        country:                      data.country,
        representative_name:          data.rep_name,
        representative_designation:   data.rep_designation,
        representative_email:         data.rep_email,
        representative_phone_number:  phoneNumber,
        representative_headshot_file: headshotPublic,
        submitter_name:               data.submitter_name ?? null,
        submitter_contact:            data.submitter_contact ?? null,
        levels_recruiting_for:        levelsSelected,
        multi_event_selection:        eventsSelected,
        preferred_time_slots:         slotsSelected,
        highlights_or_focus:          data.highlights ?? null,
        deposit_link:                 data.deposit_link ?? null,
        remarks:                      data.remarks ?? null,
        attachment_file:              attachmentPublic,
        additional_documents_list:    extraPublics.length ? extraPublics : null,
        contact_consent:              data.consent,
        client_metadata: {
          submitted_at: new Date().toISOString(),
          user_agent:   navigator?.userAgent ?? null,
          platform:     navigator?.platform  ?? null,
        },
        system_metadata: {
          form_version:  "v4-enhanced",
          submission_id: sid,
        },
      };

      const { error: dbErr } = await supabase
        .from("university_participation")
        .insert(payload);

      if (dbErr) throw dbErr;

      // Acknowledgment email — best effort, non-fatal
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail:            data.rep_email,
          universityName:     data.university_name,
          representativeName: data.rep_name,
        }),
      }).catch(e => console.warn("Email send failed (non-fatal):", e));

      router.push("/thank-you");
    } catch (err: unknown) {
      console.error("Submit error:", err);
      const msg = err instanceof Error ? err.message : null;
      setError(
        msg
          ? `Submission failed: ${msg}`
          : "Failed to submit. Please try again or contact the organiser.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Progress fraction ────────────────────────────────────────────────
  const progressFraction = (step - 1) / (STEPS.length - 1);

  // ── Render ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: "var(--bg-surface)" }}>

      {/* Theme toggle */}
      <div className="fixed top-5 right-5 z-50">
        <motion.button
          aria-label="Toggle dark / light mode"
          onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="theme-toggle"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mounted && theme === "dark" ? (
              <motion.span
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{ rotate:    90,  opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={17} />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ rotate:  90, opacity: 0 }}
                animate={{ rotate:   0, opacity: 1 }}
                exit={{ rotate:    -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={17} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">

        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-9"
        >
          <h1
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            University Participation Form
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Fill in your details below to confirm your participation.
          </p>
        </motion.div>

        {/* ── Step Progress ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative flex justify-between items-start">
            {/* Track background */}
            <div
              style={{
                position:   "absolute",
                top:        "19px",
                left:       "20px",
                right:      "20px",
                height:     "2px",
                background: "var(--border)",
              }}
            />
            {/* Animated progress fill */}
            <motion.div
              style={{
                position:        "absolute",
                top:             "19px",
                left:            "20px",
                right:           "20px",
                height:          "2px",
                background:      "var(--brand-primary)",
                transformOrigin: "left center",
              }}
              animate={{ scaleX: progressFraction }}
              initial={{ scaleX: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            {/* Step nodes */}
            {STEPS.map(s => {
              const done   = step > s.id;
              const active = step === s.id;
              return (
                <div
                  key={s.id}
                  style={{
                    display:        "flex",
                    flexDirection:  "column",
                    alignItems:     "center",
                    position:       "relative",
                    zIndex:         10,
                  }}
                >
                  <motion.div
                    animate={{
                      backgroundColor: done    ? "#22c55e"
                                      : active ? "#0f62fe"
                                      : "var(--bg-card)",
                      borderColor:     done    ? "#22c55e"
                                      : active ? "#0f62fe"
                                      : "var(--border)",
                      boxShadow:       done    ? "0 4px 12px rgba(34,197,94,0.25)"
                                      : active ? "0 4px 12px rgba(15,98,254,0.3)"
                                      : "none",
                    }}
                    transition={{ duration: 0.3 }}
                    className="step-node"
                  >
                    <AnimatePresence mode="wait">
                      {done ? (
                        <motion.span
                          key="done"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check size={15} strokeWidth={3} className="text-white" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key={`n${s.id}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            fontWeight: 700,
                            fontSize:   "0.875rem",
                            color:      active ? "white" : "var(--text-muted)",
                          }}
                        >
                          {s.id}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <span
                    className="mt-2 text-xs font-medium hidden sm:block"
                    style={{
                      color:      done ? "#22c55e" : active ? "#0f62fe" : "var(--text-muted)",
                      transition: "color 0.3s",
                    }}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Card ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="form-card"
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* Step content with slide transition */}
            <div style={{ minHeight: "420px" }}>
              <AnimatePresence custom={dir} mode="wait">

                {/* ── Step 1: University ─────────────────────────────── */}
                {step === 1 && (
                  <motion.div
                    key="s1"
                    custom={dir}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-5"
                  >
                    <div className="section-header">
                      <span className="section-icon">🏛️</span>
                      <h2 className="section-title">University Information</h2>
                    </div>

                    <div className="form-group">
                      <label className="field-label">
                        University Name <span className="required-star">*</span>
                      </label>
                      <input
                        {...register("university_name", { required: "University name is required" })}
                        placeholder="e.g. University of Melbourne"
                        className={`form-input ${errors.university_name ? "input-error" : ""}`}
                      />
                      {errors.university_name && (
                        <FieldError msg={errors.university_name.message!} />
                      )}
                    </div>

                    <FileUpload
                      label="University Logo (optional)"
                      accept="image/*"
                      onSelect={onLogoSelect}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="form-group">
                        <label className="field-label">
                          City <span className="required-star">*</span>
                        </label>
                        <input
                          {...register("city", { required: "City is required" })}
                          placeholder="City"
                          className={`form-input ${errors.city ? "input-error" : ""}`}
                        />
                        {errors.city && <FieldError msg={errors.city.message!} />}
                      </div>
                      <div className="form-group">
                        <label className="field-label">
                          State / Province <span className="required-star">*</span>
                        </label>
                        <input
                          {...register("state", { required: "State is required" })}
                          placeholder="State / Province"
                          className={`form-input ${errors.state ? "input-error" : ""}`}
                        />
                        {errors.state && <FieldError msg={errors.state.message!} />}
                      </div>
                      <div className="form-group">
                        <label className="field-label">
                          Country <span className="required-star">*</span>
                        </label>
                        <input
                          {...register("country", { required: "Country is required" })}
                          placeholder="Country"
                          className={`form-input ${errors.country ? "input-error" : ""}`}
                        />
                        {errors.country && <FieldError msg={errors.country.message!} />}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: People ─────────────────────────────────── */}
                {step === 2 && (
                  <motion.div
                    key="s2"
                    custom={dir}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-5"
                  >
                    <div className="section-header">
                      <span className="section-icon">👤</span>
                      <h2 className="section-title">Representative Details</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="field-label">
                          Full Name <span className="required-star">*</span>
                        </label>
                        <input
                          {...register("rep_name", { required: "Name is required" })}
                          placeholder="Representative Name"
                          className={`form-input ${errors.rep_name ? "input-error" : ""}`}
                        />
                        {errors.rep_name && <FieldError msg={errors.rep_name.message!} />}
                      </div>

                      <div className="form-group">
                        <label className="field-label">
                          Designation <span className="required-star">*</span>
                        </label>
                        <input
                          {...register("rep_designation", { required: "Designation is required" })}
                          placeholder="e.g. Admissions Director"
                          className={`form-input ${errors.rep_designation ? "input-error" : ""}`}
                        />
                        {errors.rep_designation && (
                          <FieldError msg={errors.rep_designation.message!} />
                        )}
                      </div>

                      <div className="form-group">
                        <label className="field-label">
                          Email Address <span className="required-star">*</span>
                        </label>
                        <input
                          {...register("rep_email", {
                            required: "Email is required",
                            validate: v =>
                              v.includes("@") || "Please enter a valid email address",
                          })}
                          type="text"
                          placeholder="name@university.edu"
                          className={`form-input ${errors.rep_email ? "input-error" : ""}`}
                        />
                        {errors.rep_email && <FieldError msg={errors.rep_email.message!} />}
                      </div>

                      <div className="form-group">
                        <label className="field-label">
                          Phone Number <span className="required-star">*</span>
                        </label>
                        <PhoneInput
                          value={phoneNumber}
                          onChange={setPhoneNumber}
                          required
                        />
                      </div>
                    </div>

                    <FileUpload
                      label="Representative Headshot (optional)"
                      accept="image/*"
                      onSelect={onHeadshotSelect}
                    />

                    <div className="divider" />

                    <div className="section-header">
                      <span className="section-icon">🧾</span>
                      <h2 className="section-title">
                        Submitter Details
                        <span className="optional-badge">Optional</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="field-label">Submitter Name</label>
                        <input
                          {...register("submitter_name")}
                          placeholder="Submitter Name"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="field-label">Submitter Contact</label>
                        <input
                          {...register("submitter_contact")}
                          placeholder="Email or Phone"
                          className="form-input"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 3: Recruitment ────────────────────────────── */}
                {step === 3 && (
                  <motion.div
                    key="s3"
                    custom={dir}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="section-header">
                      <span className="section-icon">📊</span>
                      <h2 className="section-title">Recruitment Information</h2>
                    </div>

                    <div className="form-group">
                      <label className="field-label">
                        Levels Recruiting For <span className="required-star">*</span>
                      </label>
                      <div className="pill-grid pill-grid-4">
                        {LEVELS.map(l => (
                          <Pill
                            key={l}
                            label={l}
                            active={levelsSelected.includes(l)}
                            onClick={() => toggle(setLevelsSelected, l)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="field-label">
                        Events You Will Attend <span className="required-star">*</span>
                      </label>
                      <div className="pill-grid pill-grid-3">
                        {EVENTS.map(e => (
                          <Pill
                            key={e}
                            label={e}
                            active={eventsSelected.includes(e)}
                            onClick={() => toggle(setEventsSelected, e)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="field-label">
                        Preferred Time Slots{" "}
                        <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.8rem" }}>
                          (optional)
                        </span>
                      </label>
                      <div className="pill-grid pill-grid-4">
                        {SLOTS.map(s => (
                          <Pill
                            key={s}
                            label={s}
                            active={slotsSelected.includes(s)}
                            onClick={() => toggle(setSlotsSelected, s)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="field-label">Programme Highlights</label>
                      <textarea
                        {...register("highlights")}
                        placeholder="Paste your focus areas or programme highlights"
                        rows={4}
                        className="form-textarea"
                      />
                    </div>

                    <div className="form-group">
                      <label className="field-label">Deposit / Application Link</label>
                      <input
                        {...register("deposit_link")}
                        type="url"
                        placeholder="https://apply.university.edu"
                        className="form-input"
                      />
                    </div>
                  </motion.div>
                )}

                {/* ── Step 4: Documents ──────────────────────────────── */}
                {step === 4 && (
                  <motion.div
                    key="s4"
                    custom={dir}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-5"
                  >
                    <div className="section-header">
                      <span className="section-icon">📎</span>
                      <h2 className="section-title">Documents & Submission</h2>
                    </div>

                    <FileUpload
                      label="Upload Brochure / Guidelines"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                      onSelect={onAttachmentSelect}
                    />

                    <FileUpload
                      label="Upload Additional Documents (add multiple one-by-one)"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,image/*"
                      multiple
                      onSelect={onExtraDocSelect}
                    />

                    <AnimatePresence>
                      {extraDocsFiles.length > 0 && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1,  y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-sm"
                          style={{ color: "var(--text-muted)" }}
                        >
                          ✓ {extraDocsFiles.length} additional file(s) selected
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <div className="form-group">
                      <label className="field-label">Remarks</label>
                      <textarea
                        {...register("remarks")}
                        placeholder="Any additional remarks or notes"
                        rows={4}
                        className="form-textarea"
                      />
                    </div>

                    {/* Summary */}
                    <div className="summary-card">
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Review before submitting
                      </p>
                      <div className="space-y-2">
                        {(
                          [
                            ["University",     watchUniversity],
                            ["Representative", watchRepName],
                            ["Email",          watchRepEmail],
                            ["Levels",         levelsSelected.join(", ")],
                            ["Events",         eventsSelected.join(", ")],
                          ] as [string, string][]
                        ).map(([label, val]) => (
                          <div
                            key={label}
                            className="flex justify-between items-baseline gap-3 text-xs"
                          >
                            <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>
                              {label}
                            </span>
                            <span
                              className="font-medium truncate text-right"
                              style={{ color: "var(--text-secondary)", maxWidth: "62%" }}
                            >
                              {val || "—"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <label className="consent-label">
                      <input
                        {...register("consent", { required: "You must consent to proceed" })}
                        type="checkbox"
                        className="consent-checkbox"
                      />
                      <span>I consent to communication related to this event.</span>
                    </label>
                    {errors.consent && <FieldError msg={errors.consent.message!} />}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Error banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: "1.25rem" }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="error-banner"
                >
                  ⚠️ {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3 mt-7">
              <AnimatePresence>
                {step > 1 && (
                  <motion.button
                    key="back"
                    type="button"
                    onClick={prev}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1,  x: 0 }}
                    exit={{ opacity: 0,     x: -10 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary"
                    style={{ minWidth: "110px" }}
                  >
                    <ChevronLeft size={17} />
                    Back
                  </motion.button>
                )}
              </AnimatePresence>

              {step < STEPS.length ? (
                <motion.button
                  type="button"
                  onClick={next}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                  style={{ flex: 1 }}
                >
                  Continue
                  <ChevronRight size={17} />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.01 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className="btn-primary"
                  style={{ flex: 1 }}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Check size={17} />
                      Submit Confirmation
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Step counter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs mt-4"
          style={{ color: "var(--text-muted)" }}
        >
          Step {step} of {STEPS.length}
        </motion.p>
      </div>
    </div>
  );
}