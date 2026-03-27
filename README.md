# 🏷️ Project Title

<p><strong>Next.js Fullstack Supabase Multi-Step Form Automation System</strong></p>

---

<h1>🧾 Executive Summary</h1>
<div class="card">
<ul>
<li>Enterprise-grade full-stack animated multi-step form automation system built with Next.js 16, TypeScript, and Framer Motion v12.</li>
<li>Handles structured multi-stage data collection, real-time field validation via React Hook Form, secure multi-file uploads to Supabase Storage, and automated email acknowledgments.</li>
<li>Features a fully animated 4-step wizard UI with directional slide transitions, bezier easing, animated progress indicators, pill-based multi-select components, dark/light theming, and a pre-submission review panel.</li>
<li>Designed for scalability, automation, and production deployment using Vercel.</li>
</ul>

<table>
<tr><th>Layer</th><th>Technology</th><th>Purpose</th></tr>
<tr><td>Frontend</td><td>Next.js 16 + TypeScript</td><td>UI rendering, routing & type safety</td></tr>
<tr><td>Animation</td><td>Framer Motion v12</td><td>Step transitions, presence animations & easing</td></tr>
<tr><td>Forms</td><td>React Hook Form</td><td>Validation, field registration & submission</td></tr>
<tr><td>Theming</td><td>next-themes + Tailwind CSS</td><td>Dark/light mode with CSS variable tokens</td></tr>
<tr><td>Backend</td><td>Next.js API Routes</td><td>Processing & email logic</td></tr>
<tr><td>Database</td><td>Supabase PostgreSQL</td><td>Structured data storage</td></tr>
<tr><td>Storage</td><td>Supabase Storage</td><td>Multi-file upload & retrieval</td></tr>
<tr><td>Email</td><td>Nodemailer + Gmail SMTP</td><td>Automated acknowledgment delivery</td></tr>
<tr><td>Icons</td><td>lucide-react</td><td>UI iconography (Sun, Moon, Check, Chevrons)</td></tr>
</table>
</div>

---

# 📑 Table of Contents

1. 🧩 Project Overview
2. 🎯 Objectives & Goals
3. ✅ Acceptance Criteria
4. 💻 Prerequisites
5. ⚙️ Installation & Setup
6. 🔗 API Documentation
7. 🖥️ UI / Frontend
8. 🔢 Status Codes
9. 🚀 Features
10. 🧱 Tech Stack & Architecture
11. 🛠️ Workflow & Implementation
12. 🧪 Testing & Validation
13. 🔍 Validation Summary
14. 🧰 Verification Testing Tools
15. 🧯 Troubleshooting & Debugging
16. 🔒 Security & Secrets
17. ☁️ Deployment and DevOps
18. ⚡ Quick-Start Cheat Sheet
19. 🧾 Usage Notes
20. 🧠 Performance & Optimization
21. 🌟 Enhancements & Features
22. 🧩 Maintenance & Future Work
23. 🏆 Project Milestones
24. 🧮 High-Level Architecture
25. 🗂️ Project Structure
26. 🧭 How to Demonstrate Live
27. 💡 Summary, Closure & Compliance

---

<h2>🧩 Project Overview</h2>
<div class="card">
<ul>
<li>Animated multi-step public form-based intake system</li>
<li>Captures structured university participation data across 4 sequential steps</li>
<li>Validates all inputs in real time using React Hook Form with field-level error display</li>
<li>Uploads logos, headshots, brochures, and additional documents securely to Supabase Storage</li>
<li>Sends automated acknowledgment emails via Nodemailer SMTP</li>
<li>Supports dark and light mode with animated theme toggling</li>
</ul>

<pre>
User → Animated 4-Step Form UI → React Hook Form Validation → API Route → Supabase DB + Storage → Email Service
</pre>
</div>

---

<h2>🎯 Objectives & Goals</h2>
<div class="card">
<ul>
<li>Enable seamless, guided multi-step form submissions with animated step transitions</li>
<li>Enforce real-time field validation and structured error feedback at each step</li>
<li>Automate backend workflows from submission to database insertion to email dispatch</li>
<li>Ensure secure, UUID-namespaced multi-file upload handling</li>
<li>Deliver a polished, accessible UI with dark/light theming and motion-enhanced interactions</li>
<li>Design scalable, maintainable architecture suitable for enterprise deployment</li>
</ul>

<table>
<tr><th>Goal</th><th>Outcome</th></tr>
<tr><td>Automation</td><td>Reduce manual intervention across all data capture workflows</td></tr>
<tr><td>Scalability</td><td>Handle large volumes of submissions with UUID-isolated storage paths</td></tr>
<tr><td>Security</td><td>Protected storage, RLS-enforced database, and environment-secured secrets</td></tr>
<tr><td>UX Quality</td><td>Animated, accessible multi-step interface with real-time feedback</td></tr>
</table>
</div>

---

<h2>✅ Acceptance Criteria</h2>
<div class="card">
<table>
<tr><th>ID</th><th>Feature</th><th>Validation</th></tr>
<tr><td>AC1</td><td>Multi-Step Form Navigation</td><td>Each step validates before advancing; back navigation preserves state</td></tr>
<tr><td>AC2</td><td>React Hook Form Validation</td><td>Required fields block progression; inline errors appear on invalid input</td></tr>
<tr><td>AC3</td><td>Framer Motion Transitions</td><td>Directional slide animations play correctly on step advance and back</td></tr>
<tr><td>AC4</td><td>Dark / Light Theme Toggle</td><td>Theme persists across page loads; animated icon swap renders correctly</td></tr>
<tr><td>AC5</td><td>File Upload</td><td>Logo, headshot, brochure, and multiple additional files appear in Supabase Storage</td></tr>
<tr><td>AC6</td><td>Database Insertion</td><td>Full payload including metadata, levels, events, and file URLs stored correctly</td></tr>
<tr><td>AC7</td><td>Email Acknowledgment</td><td>Confirmation email received at representative's address after submission</td></tr>
<tr><td>AC8</td><td>Responsive UI</td><td>Form renders correctly across mobile, tablet, and desktop viewports</td></tr>
<tr><td>AC9</td><td>Pre-Submission Review</td><td>Summary card on Step 4 displays live-watched field values before submit</td></tr>
</table>
</div>

---

<h2>💻 Prerequisites</h2>
<div class="card">
<ul>
<li>Node.js (v18+)</li>
<li>npm or yarn package manager</li>
<li>Supabase project with a configured PostgreSQL database and Storage bucket</li>
<li>Gmail account with an App Password configured for SMTP</li>
<li>Vercel account for production deployment</li>
</ul>
</div>

---

<h2>⚙️ Installation & Setup</h2>
<div class="card">
<ol>
<li>Clone the repository</li>
<li>Install all dependencies (includes Framer Motion, React Hook Form, next-themes, lucide-react)</li>
<li>Configure all environment variables in <code>.env.local</code></li>
<li>Run the development server</li>
</ol>

<table>
<tr><th>Step</th><th>Command / Action</th><th>Description</th></tr>
<tr><td>1</td><td><code>git clone &lt;repo-url&gt;</code></td><td>Clone repository locally</td></tr>
<tr><td>2</td><td><code>npm install</code></td><td>Install all dependencies including animation and form libraries</td></tr>
<tr><td>3</td><td>Edit <code>.env.local</code></td><td>Set Supabase URL, Anon Key, Storage Bucket, and Gmail SMTP credentials</td></tr>
<tr><td>4</td><td><code>npm run dev</code></td><td>Start Next.js development server at localhost:3000</td></tr>
</table>

<h3>Required Environment Variables</h3>
<pre>
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_BUCKET=your_storage_bucket_name
SMTP_USER=your_gmail_address
SMTP_PASS=your_gmail_app_password
</pre>
</div>

---

<h2>🔗 API Documentation</h2>
<div class="card">
<table>
<tr><th>Endpoint</th><th>Method</th><th>Input</th><th>Output</th></tr>
<tr><td>/api/send-email</td><td>POST</td><td>toEmail, universityName, representativeName</td><td>200 Success / 400 Bad Request / 500 SMTP Failure</td></tr>
</table>

<h3>Request Payload</h3>
<pre>
{
  "toEmail": "rep@university.edu",
  "universityName": "University of Melbourne",
  "representativeName": "Jane Smith"
}
</pre>

<h3>Processing Flow</h3>
<pre>
1. Receive POST request at /api/send-email
2. Validate presence of required fields
3. Initialize Nodemailer transporter with Gmail SMTP credentials
4. Compose acknowledgment email with university and representative details
5. Dispatch email via SMTP
6. Return 200 on success or appropriate error code on failure
</pre>

<h3>Non-Fatal Invocation</h3>
<pre>
The email API is called as a best-effort, non-fatal side effect after successful
database insertion. A failure in email dispatch does not roll back or block the
form submission — the user is redirected to /thank-you regardless.
</pre>
</div>

---

<h2>🖥️ UI / Frontend</h2>
<div class="card">
<h3>Pages</h3>
<ul>
<li>/page.tsx → Entry point, renders the main Form component</li>
<li>/thank-you → Post-submission confirmation page with ThankYouContent component</li>
<li>/confirm/[token] → Token-based confirmation route</li>
</ul>

<h3>Components</h3>
<table>
<tr><th>Component</th><th>Responsibility</th><th>Key Features</th></tr>
<tr><td>Form.tsx</td><td>Main wizard logic, state, and submission</td><td>4-step flow, Framer Motion transitions, React Hook Form, Supabase integration, dark/light toggle</td></tr>
<tr><td>FileUpload.tsx</td><td>File selection and preview</td><td>Single and multi-file support, accept filtering, remove capability</td></tr>
<tr><td>PhoneInput.tsx</td><td>International phone number capture</td><td>Formatted phone input with required validation</td></tr>
<tr><td>ThemeProvider.tsx</td><td>Dark/light mode context wrapper</td><td>next-themes integration with SSR hydration guard</td></tr>
<tr><td>ThankYouContent.tsx</td><td>Post-submission confirmation UI</td><td>Confirmation message and next-steps display</td></tr>
</table>

<h3>Multi-Step Form Structure</h3>
<table>
<tr><th>Step</th><th>Title</th><th>Fields</th><th>Validation</th></tr>
<tr><td>1</td><td>🏛️ University</td><td>University name, logo upload, city, state, country</td><td>All fields required; logo optional</td></tr>
<tr><td>2</td><td>👤 People</td><td>Rep name, designation, email, phone, headshot; submitter name and contact</td><td>Rep fields required; phone validated outside RHF; submitter optional</td></tr>
<tr><td>3</td><td>📊 Recruitment</td><td>Levels (pill multi-select), events (pill multi-select), time slots (pill optional), highlights, deposit link</td><td>At least one level and one event required</td></tr>
<tr><td>4</td><td>📎 Documents</td><td>Brochure upload, additional documents (multi), remarks, summary review card, consent checkbox</td><td>Consent required; summary displays live-watched values</td></tr>
</table>

<h3>Animated Step Progress Indicator</h3>
<pre>
- Track background rendered as absolute-positioned div
- Animated fill uses Framer Motion scaleX driven by (step - 1) / (totalSteps - 1)
- Each step node animates backgroundColor, borderColor, and boxShadow between states:
    Active   → blue  (#0f62fe) with blue glow shadow
    Complete → green (#22c55e) with green glow shadow
    Inactive → CSS variable (--bg-card) / (--border)
- Completed nodes render animated Check icon via AnimatePresence
</pre>

<h3>Directional Slide Transition System</h3>
<pre>
- Direction state (dir) tracks +1 (forward) or -1 (backward)
- stepVariants object defines enter, center, and exit states
- Bezier easing typed as [number, number, number, number] tuple for framer-motion v12 compatibility
- AnimatePresence with mode="wait" ensures clean enter/exit sequencing
- Each step motion.div receives custom={dir} to pick directional offset
</pre>

<h3>Dark / Light Theme Architecture</h3>
<pre>
- ThemeProvider wraps the application via next-themes
- CSS custom properties (--bg-surface, --text-primary, --brand-primary, etc.) toggle per theme
- Theme toggle button uses AnimatePresence mode="wait" to swap Sun / Moon icons
- Mounted state guard prevents SSR hydration mismatch
</pre>

<h3>State Flow</h3>
<pre>
User Input → React Hook Form State + Custom State (phone, pills, files)
    → Per-Step trigger() Validation
    → Step Advance / Error Display
    → Final handleSubmit → Supabase Upload + DB Insert → Email API → Router Push
</pre>

<h3>Where to Change Styles</h3>
<ul>
<li>globals.css → CSS variable tokens, dark/light theme overrides, global component classes</li>
<li>Form.tsx → Inline style props for motion-dependent values</li>
<li>tailwind.config.js → Tailwind theme extensions and breakpoints</li>
</ul>
</div>

---

<h2>🔢 Status Codes</h2>
<div class="card">
<table>
<tr><th>Code</th><th>Description</th><th>Scenario</th></tr>
<tr><td>200</td><td>OK</td><td>Email dispatched successfully via SMTP</td></tr>
<tr><td>400</td><td>Bad Request</td><td>Missing or invalid input fields in API request</td></tr>
<tr><td>500</td><td>Server Error</td><td>SMTP transport failure or Supabase insert error</td></tr>
</table>
</div>

---

<h2>🚀 Features</h2>
<div class="card">
<ul>
<li>Animated 4-step multi-step form wizard with directional slide transitions powered by Framer Motion v12</li>
<li>Real-time per-step field validation using React Hook Form with inline animated error messages</li>
<li>Animated step progress indicator with active, complete, and inactive node states</li>
<li>Pill-based animated multi-select UI for levels, events, and time slot selection</li>
<li>International phone number capture with custom PhoneInput component</li>
<li>Multi-file upload system supporting logo, headshot, brochure, and additional documents</li>
<li>UUID-namespaced Supabase Storage paths for collision-free file isolation per submission</li>
<li>Supabase lazy singleton pattern for optimized client initialization</li>
<li>Pre-submission live-watched summary review card on final step</li>
<li>Animated error banner system with height-animated entrance and exit</li>
<li>Dark/light mode theming via next-themes with animated Sun/Moon icon swap</li>
<li>Automated acknowledgment email dispatch via Nodemailer SMTP (best-effort, non-fatal)</li>
<li>Submission payload enriched with client_metadata (timestamp, user agent, platform) and system_metadata (form version, submission UUID)</li>
<li>Consent gate checkbox with validation before final submission</li>
<li>Loading state with spinner and disabled button during async submission</li>
<li>Full TypeScript coverage with strict tuple typing, typed helpers, and no implicit any</li>
</ul>

<table>
<tr><th>Category</th><th>Feature</th><th>Technical Implementation</th></tr>
<tr><td>Animation</td><td>Step Transitions</td><td>Framer Motion stepVariants with custom direction, bezier tuple EASE, AnimatePresence mode="wait"</td></tr>
<tr><td>Animation</td><td>Progress Bar</td><td>motion.div scaleX animated to (step-1)/(total-1) fraction with easeInOut</td></tr>
<tr><td>Animation</td><td>Theme Toggle</td><td>AnimatePresence mode="wait" with rotating Sun/Moon icon swap</td></tr>
<tr><td>Animation</td><td>Pill Selection</td><td>AnimatePresence on Check icon inside each pill; whileTap scale feedback</td></tr>
<tr><td>Forms</td><td>Validation</td><td>useForm with mode="onChange"; per-step trigger(); custom phone and pill validation</td></tr>
<tr><td>Forms</td><td>Summary</td><td>watch() on university_name, rep_name, rep_email for live review display</td></tr>
<tr><td>Storage</td><td>File Uploads</td><td>UUID-based folder paths; parallel Promise.all for primary files; sequential loop for extras</td></tr>
<tr><td>Backend</td><td>API Automation</td><td>Next.js API Route with Nodemailer; non-fatal fire-and-forget pattern</td></tr>
<tr><td>Database</td><td>Data Insertion</td><td>Supabase insert with full payload including arrays, URLs, metadata objects</td></tr>
<tr><td>TypeScript</td><td>Type Safety</td><td>FormValues interface; FileSetter/UrlSetter aliases; EASE tuple; typed processFile helper</td></tr>
</table>
</div>

---

<h2>🧱 Tech Stack & Architecture</h2>
<div class="card">
<table>
<tr><th>Layer</th><th>Technology</th><th>Version</th><th>Responsibility</th></tr>
<tr><td>Framework</td><td>Next.js</td><td>^16.0.8</td><td>SSR, routing, API routes, build optimization</td></tr>
<tr><td>Language</td><td>TypeScript</td><td>5.2.2</td><td>Static typing, interface definitions, tuple enforcement</td></tr>
<tr><td>UI Rendering</td><td>React</td><td>18.2.0</td><td>Component model, hooks, state management</td></tr>
<tr><td>Animation</td><td>Framer Motion</td><td>^12.38.0</td><td>Step transitions, presence animations, progress bar, icon swaps</td></tr>
<tr><td>Forms</td><td>React Hook Form</td><td>latest</td><td>Registration, validation, trigger, watch, submission handling</td></tr>
<tr><td>Theming</td><td>next-themes</td><td>^0.4.6</td><td>Dark/light mode persistence and SSR-safe hydration</td></tr>
<tr><td>Styling</td><td>Tailwind CSS</td><td>^3.3.6</td><td>Utility-first styling, responsive grid, spacing</td></tr>
<tr><td>Icons</td><td>lucide-react</td><td>^0.560.0</td><td>Sun, Moon, Check, ChevronLeft, ChevronRight icons</td></tr>
<tr><td>Database</td><td>Supabase PostgreSQL</td><td>^2.87.1</td><td>Structured submission data storage with RLS</td></tr>
<tr><td>Storage</td><td>Supabase Storage</td><td>^2.87.1</td><td>UUID-namespaced file upload and public URL generation</td></tr>
<tr><td>Email</td><td>Nodemailer</td><td>^8.0.4</td><td>SMTP-based acknowledgment email delivery</td></tr>
</table>

<pre>
[Client Browser]
      ↓
[Next.js UI Layer — 4-Step Animated Form Wizard]
      ↓ (React Hook Form validation per step)
[Framer Motion AnimatePresence — Directional Slide Transitions]
      ↓
[Next.js API Routes Layer — /api/send-email]
      ↓
[Supabase PostgreSQL DB] ←→ [Supabase Storage — UUID-namespaced folders]
      ↓
[Nodemailer SMTP Email Service — Gmail]
      ↓
[Vercel Production Deployment]
</pre>
</div>

---

<h2>🛠️ Workflow & Implementation</h2>
<div class="card">
<ol>
<li>User accesses form via frontend route; ThemeProvider initializes dark/light mode</li>
<li>Step 1 renders with Framer Motion enter animation; user fills university details</li>
<li>React Hook Form trigger() validates Step 1 fields before advancing to Step 2</li>
<li>Step 2 captures representative details including phone (custom state) and optional headshot upload</li>
<li>Step 3 uses animated Pill components for multi-select of levels, events, and time slots</li>
<li>Step 4 renders file upload fields, a live-watched summary review card, and consent checkbox</li>
<li>On submit, crypto.randomUUID() generates a unique submission ID and folder namespace</li>
<li>Primary files (logo, headshot, brochure) are uploaded in parallel via Promise.all</li>
<li>Additional documents are uploaded sequentially; all public URLs are collected</li>
<li>Full structured payload (including arrays, file URLs, and metadata objects) is inserted into Supabase PostgreSQL</li>
<li>Acknowledgment email is dispatched via /api/send-email as a best-effort, non-fatal side effect</li>
<li>User is redirected to /thank-you confirmation page via Next.js router</li>
</ol>
</div>

---

<h2>🧪 Testing & Validation</h2>
<div class="card">
<table>
<tr><th>ID</th><th>Area</th><th>Method</th><th>Expected Output</th><th>Explanation</th></tr>
<tr><td>TC01</td><td>Step Navigation</td><td>Attempt advance with empty required fields</td><td>Inline errors appear; step does not advance</td><td>Validates React Hook Form per-step trigger() enforcement</td></tr>
<tr><td>TC02</td><td>Phone Validation</td><td>Attempt Step 2 advance with empty phone</td><td>Error banner: "Phone number is required."</td><td>Validates custom phone state guard outside RHF</td></tr>
<tr><td>TC03</td><td>Pill Validation</td><td>Attempt Step 3 advance without selecting levels or events</td><td>Error banner displayed; step blocked</td><td>Validates pill selection minimum requirement</td></tr>
<tr><td>TC04</td><td>Theme Toggle</td><td>Click Sun/Moon button</td><td>Theme switches; icon animates; preference persists on reload</td><td>Validates next-themes integration and AnimatePresence icon swap</td></tr>
<tr><td>TC05</td><td>File Upload</td><td>Upload logo, headshot, brochure, and extra documents</td><td>Files appear in Supabase Storage under UUID-namespaced folder</td><td>Validates upload pipeline and public URL generation</td></tr>
<tr><td>TC06</td><td>Database</td><td>Complete full form submission</td><td>Row inserted with all fields, arrays, URLs, and metadata</td><td>Validates full payload structure and Supabase insert</td></tr>
<tr><td>TC07</td><td>Email</td><td>Submit form with valid representative email</td><td>Acknowledgment email received at rep address</td><td>Validates Nodemailer SMTP dispatch</td></tr>
<tr><td>TC08</td><td>Summary Card</td><td>Fill Steps 1–3 then view Step 4</td><td>Summary card displays university, rep name, email, levels, events</td><td>Validates React Hook Form watch() live data binding</td></tr>
<tr><td>TC09</td><td>Consent Gate</td><td>Attempt submit without checking consent</td><td>Inline error: "You must consent to proceed"</td><td>Validates RHF required checkbox enforcement</td></tr>
<tr><td>TC10</td><td>Framer Motion</td><td>Navigate forward and backward through all steps</td><td>Correct directional slide transitions play on each navigation</td><td>Validates stepVariants custom direction and AnimatePresence exit/enter</td></tr>
</table>
</div>

---

<h2>🔍 Validation Summary</h2>
<div class="card">
<ul>
<li>All four form steps validated independently before progression is permitted</li>
<li>React Hook Form trigger() enforces field-level rules; custom guards enforce pill and phone state</li>
<li>File upload pipeline validated for single files, multi-file accumulation, and URL passthrough</li>
<li>Database payload validated for correct field mapping including array fields and nested metadata</li>
<li>Email dispatch validated as non-blocking; failures logged as warnings without interrupting submission</li>
<li>TypeScript compilation validated with no type errors after EASE tuple fix</li>
<li>System validated for production readiness on Vercel</li>
</ul>
</div>

---

<h2>🧰 Verification Testing Tools & Command Examples</h2>
<div class="card">
<table>
<tr><th>Tool</th><th>Usage</th></tr>
<tr><td>Browser DevTools (Network tab)</td><td>Inspect Supabase API calls, file upload requests, and /api/send-email POST</td></tr>
<tr><td>Browser DevTools (Console)</td><td>Monitor non-fatal email warning logs and submission error messages</td></tr>
<tr><td>Supabase Dashboard (Table Editor)</td><td>Verify inserted row structure, array fields, metadata objects, and file URL columns</td></tr>
<tr><td>Supabase Dashboard (Storage)</td><td>Confirm UUID-namespaced folder creation and uploaded file presence</td></tr>
<tr><td>Postman</td><td>Direct POST to /api/send-email with JSON body to test SMTP independently</td></tr>
<tr><td>TypeScript Compiler (tsc --noEmit)</td><td>Validate zero type errors across all components including tuple-typed EASE constant</td></tr>
</table>
</div>

---

<h2>🧯 Troubleshooting & Debugging</h2>
<div class="card">
<ul>
<li>Verify all five required environment variables are present in .env.local and Vercel dashboard</li>
<li>If SMTP fails, confirm Gmail App Password is active and 2FA is enabled on the Google account</li>
<li>If Supabase upload returns "Upload returned no data", check bucket name in NEXT_PUBLIC_SUPABASE_BUCKET and bucket public access policy</li>
<li>If TypeScript reports ease-related type errors, ensure EASE is declared as <code>const EASE: [number, number, number, number]</code> — not inferred as number[]</li>
<li>If theme toggle causes hydration mismatch, confirm mounted state guard wraps all theme-dependent renders</li>
<li>If Framer Motion AnimatePresence does not animate on step change, confirm each step motion.div has a unique key prop (s1, s2, s3, s4)</li>
<li>Inspect Supabase Row Level Security policies if inserts are silently rejected</li>
<li>Use tsc --noEmit to surface TypeScript errors before deployment</li>
</ul>
</div>

---

<h2>🔒 Security & Secrets</h2>
<div class="card">
<ul>
<li>All secrets stored in .env.local and injected via Vercel environment variable configuration — never committed to source control</li>
<li>.gitignore explicitly excludes .env.local and .env files</li>
<li>Supabase Row Level Security (RLS) enforced on the university_participation table</li>
<li>Supabase Storage bucket policies restrict unauthorized read/write access</li>
<li>Supabase client initialized as a lazy singleton — anon key is public-safe by design; no service role key exposed to the frontend</li>
<li>File upload paths are UUID-namespaced (crypto.randomUUID()) preventing path enumeration or collision</li>
<li>SMTP credentials secured via server-side API route — never exposed to the client bundle</li>
<li>No sensitive data serialized into client-side state or localStorage</li>
</ul>
</div>

---

<h2>☁️ Deployment</h2>
<div class="card">
<ol>
<li>Push code to GitHub repository (nextjs-multistep-registration-portal)</li>
<li>Import project into Vercel and connect to the GitHub repository</li>
<li>Configure all five environment variables in Vercel project settings</li>
<li>Trigger production deployment via Vercel dashboard or git push to main</li>
<li>Validate live application: complete a full form submission and verify database, storage, and email</li>
</ol>

<table>
<tr><th>Stage</th><th>Action</th><th>Detail</th></tr>
<tr><td>Build</td><td>Compile Next.js project</td><td>next build — TypeScript checked, pages and API routes compiled</td></tr>
<tr><td>Configure</td><td>Set environment variables</td><td>Supabase URL, Anon Key, Bucket, SMTP user and password in Vercel dashboard</td></tr>
<tr><td>Deploy</td><td>Host on Vercel</td><td>Automatic deployment on push to main branch</td></tr>
<tr><td>Validate</td><td>Test live system end-to-end</td><td>Submit form → check Supabase DB, Storage, and email inbox</td></tr>
</table>
</div>

---

<h2>⚡ Quick-Start Cheat Sheet</h2>
<div class="card">
<table>
<tr><th>Step</th><th>Action</th><th>Command / Location</th><th>Outcome</th></tr>
<tr><td>1</td><td>Clone repository</td><td><code>git clone &lt;repo-url&gt;</code></td><td>Local project directory ready</td></tr>
<tr><td>2</td><td>Install dependencies</td><td><code>npm install</code></td><td>All packages installed including Framer Motion, RHF, next-themes</td></tr>
<tr><td>3</td><td>Configure environment</td><td><code>.env.local</code></td><td>Supabase and SMTP credentials secured</td></tr>
<tr><td>4</td><td>Run development server</td><td><code>npm run dev</code></td><td>App accessible at localhost:3000</td></tr>
<tr><td>5</td><td>Verify TypeScript</td><td><code>npx tsc --noEmit</code></td><td>Zero type errors confirmed</td></tr>
<tr><td>6</td><td>Deploy to Vercel</td><td>Push to main / Vercel dashboard</td><td>Live production application</td></tr>
</table>
</div>

---

<h2>🧾 Usage Notes</h2>
<div class="card">
<ul>
<li>All required fields on each step must be completed before the Continue button will advance the form</li>
<li>At least one Level and one Event must be selected on Step 3 via the pill selectors</li>
<li>Phone number must be entered on Step 2; it is managed outside React Hook Form and validated separately</li>
<li>File uploads accept the formats specified per field; additional documents can be added one-by-one and accumulate in state</li>
<li>The summary review card on Step 4 displays live values — verify university name, representative, email, levels, and events before submitting</li>
<li>Consent checkbox is required and must be checked before the Submit Confirmation button becomes functional</li>
<li>Theme preference (dark/light) is persisted across sessions via next-themes local storage mechanism</li>
<li>Email acknowledgment is best-effort; if SMTP is misconfigured the submission still completes successfully</li>
</ul>
</div>

---

<h2>🧠 Performance & Optimization</h2>
<div class="card">
<ul>
<li>Supabase client initialized as a lazy singleton — client is created once and reused, avoiding redundant instantiation on every function call</li>
<li>Primary file uploads (logo, headshot, brochure) run in parallel using Promise.all, minimizing total upload time</li>
<li>React Hook Form watch() scoped to only three fields (university_name, rep_name, rep_email) to minimize re-renders on the summary card</li>
<li>Pill component defined outside the Form function to prevent re-creation on every parent render cycle</li>
<li>AnimatePresence mode="wait" ensures only one step is mounted at a time, keeping the DOM minimal during transitions</li>
<li>Framer Motion EASE constant declared once as a typed tuple — evaluated at module load, not on each render</li>
<li>useEffect-gated mounted flag prevents unnecessary theme reads during SSR, eliminating hydration flicker</li>
<li>Tailwind CSS purged in production build — only used utility classes are included in the final CSS bundle</li>
</ul>

<table>
<tr><th>Area</th><th>Optimization</th><th>Benefit</th></tr>
<tr><td>Supabase Client</td><td>Lazy singleton pattern</td><td>Single instantiation, reduced overhead</td></tr>
<tr><td>File Uploads</td><td>Promise.all parallelization</td><td>Faster multi-file upload completion</td></tr>
<tr><td>Form State</td><td>Scoped watch() on 3 fields</td><td>Reduced unnecessary re-renders</td></tr>
<tr><td>Animation</td><td>AnimatePresence mode="wait"</td><td>Single mounted step, minimal DOM footprint</td></tr>
<tr><td>Components</td><td>Pill defined outside Form</td><td>Stable reference, no re-creation on parent render</td></tr>
<tr><td>CSS</td><td>Tailwind production purge</td><td>Minimal CSS bundle size</td></tr>
</table>
</div>

---

<h2>🌟 Enhancements & Features</h2>
<div class="card">
<ul>
<li>✅ Animated 4-step wizard with directional Framer Motion transitions (implemented)</li>
<li>✅ React Hook Form per-step validation with inline animated error messages (implemented)</li>
<li>✅ Animated step progress indicator with active/complete/inactive node states (implemented)</li>
<li>✅ Pill-based animated multi-select for levels, events, and time slots (implemented)</li>
<li>✅ Dark/light mode theming with animated Sun/Moon icon swap via next-themes (implemented)</li>
<li>✅ UUID-namespaced Supabase Storage with parallel and sequential upload strategies (implemented)</li>
<li>✅ Pre-submission live-watched summary review card (implemented)</li>
<li>⬜ Admin panel for viewing, filtering, and exporting form submissions</li>
<li>⬜ Real-time analytics dashboard for submission volume and event popularity</li>
<li>⬜ AI-assisted field suggestions and programme highlight generation</li>
<li>⬜ Email template upgrade with HTML formatting and branding</li>
<li>⬜ Webhook integration for CRM or Slack notification on new submission</li>
</ul>
</div>

---

<h2>🧩 Maintenance & Future Work</h2>
<div class="card">
<ul>
<li>Keep framer-motion, react-hook-form, next-themes, and lucide-react dependencies up to date — review changelogs for breaking animation API changes between major versions</li>
<li>Monitor Supabase Storage bucket usage and implement lifecycle policies for old submission files</li>
<li>Upgrade Nodemailer SMTP configuration to a transactional email provider (SendGrid, Resend, or AWS SES) for production-scale email delivery</li>
<li>Add unit tests for validation logic and integration tests for the Supabase insert pipeline</li>
<li>Implement structured logging and error monitoring (Sentry or Axiom) for production observability</li>
<li>Extend the submission payload schema to support additional recruitment data fields as requirements evolve</li>
</ul>
</div>

---

<h2>🏆 Project Milestones</h2>
<div class="card">
<ul>
<li>✅ Initial project setup with Next.js, TypeScript, and Tailwind CSS</li>
<li>✅ Supabase PostgreSQL and Storage integration with RLS-enforced security</li>
<li>✅ React Hook Form integration with per-step field validation and inline errors</li>
<li>✅ Framer Motion v12 animated 4-step wizard with directional slide transitions</li>
<li>✅ Animated step progress indicator with bezier-eased fill bar and node state transitions</li>
<li>✅ Pill-based multi-select components with AnimatePresence Check icon animations</li>
<li>✅ Dark/light mode theming with next-themes and animated icon swap</li>
<li>✅ UUID-namespaced multi-file upload pipeline with parallel and sequential strategies</li>
<li>✅ Pre-submission live-watched summary review card</li>
<li>✅ Nodemailer SMTP email automation with best-effort non-fatal dispatch</li>
<li>✅ Full TypeScript coverage with EASE tuple fix resolving all ts(2322) errors</li>
<li>✅ Production deployment via Vercel validated end-to-end</li>
</ul>
</div>

---

<h2>🧮 High-Level Architecture</h2>
<div class="card">

<h3>🔹 System Overview</h3>
<ul>
<li>Client-side UI built with Next.js renders an animated 4-step multi-step wizard powered by Framer Motion v12</li>
<li>React Hook Form manages field registration, per-step validation triggering, and final submission handling</li>
<li>Custom state manages phone number, pill multi-selections, and file accumulation outside RHF scope</li>
<li>next-themes provides SSR-safe dark/light mode switching with CSS variable token architecture</li>
<li>API Routes layer processes email dispatch via Nodemailer SMTP as a non-fatal side effect</li>
<li>Supabase handles structured PostgreSQL storage and UUID-namespaced file storage with public URL generation</li>
</ul>

<h3>🔹 Architecture Flow Diagram</h3>
<pre>
[User Browser]
      ↓
[Next.js Frontend — Animated 4-Step Form Wizard]
      ↓ Framer Motion AnimatePresence (directional slide transitions)
[React Hook Form — Per-Step trigger() Validation]
      ↓
[Next.js API Routes — /api/send-email]
      ↓                              ↓
[Supabase PostgreSQL DB]    [Supabase Storage — UUID folders]
      ↓
[Nodemailer SMTP — Gmail]
      ↓
[User Redirected to /thank-you]
</pre>

<h3>🔹 Component Responsibilities</h3>
<table>
<tr><th>Component</th><th>Role</th><th>Responsibility</th></tr>
<tr><td>Form.tsx</td><td>Wizard Orchestrator</td><td>Step state, direction, validation, upload, insert, and routing</td></tr>
<tr><td>FileUpload.tsx</td><td>File Layer</td><td>File selection, preview, removal, and onSelect callback dispatch</td></tr>
<tr><td>PhoneInput.tsx</td><td>Input Component</td><td>Formatted phone capture with required validation support</td></tr>
<tr><td>ThemeProvider.tsx</td><td>Theme Layer</td><td>next-themes context wrapper with SSR hydration guard</td></tr>
<tr><td>API Route</td><td>Logic Layer</td><td>SMTP email composition and dispatch via Nodemailer</td></tr>
<tr><td>Supabase DB</td><td>Data Layer</td><td>Structured submission storage with array and metadata fields</td></tr>
<tr><td>Supabase Storage</td><td>File Layer</td><td>UUID-namespaced upload and public URL generation</td></tr>
<tr><td>Email Service</td><td>Notification Layer</td><td>Automated acknowledgment delivery to representative email</td></tr>
</table>

<h3>🔹 Data Flow (Step-by-Step)</h3>
<ol>
<li>User completes each step; React Hook Form trigger() validates required fields before advance</li>
<li>Custom state tracks phone, pill selections, and accumulated file objects independently</li>
<li>On final submit, crypto.randomUUID() generates a unique submission ID and storage folder path</li>
<li>Primary files uploaded in parallel (Promise.all); additional documents uploaded sequentially</li>
<li>Full payload assembled — including arrays, file URLs, client_metadata, and system_metadata</li>
<li>Payload inserted into Supabase PostgreSQL via supabase.from().insert()</li>
<li>Email dispatch triggered as best-effort POST to /api/send-email (non-fatal on failure)</li>
<li>User redirected to /thank-you via Next.js router.push()</li>
</ol>

</div>

---

<h2>🗂️ Project Structure (Tree)</h2>
<div class="card">

<h3>🔹 Project Directory Structure</h3>
<pre>
root/
├── app/
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts          ← Nodemailer SMTP API route
│   ├── confirm/
│   │   └── [token]/
│   │       └── page.tsx          ← Token-based confirmation route
│   ├── thank-you/
│   │   ├── page.tsx              ← Post-submission confirmation page
│   │   └── ThankYouContent.tsx   ← Confirmation UI component
│   ├── layout.tsx                ← Root layout with ThemeProvider
│   └── page.tsx                  ← Entry point rendering Form component
├── components/
│   ├── Form.tsx                  ← 4-step animated wizard (main component)
│   ├── FileUpload.tsx            ← Single and multi-file upload component
│   ├── PhoneInput.tsx            ← International phone input component
│   └── ThemeProvider.tsx         ← next-themes SSR-safe context wrapper
├── lib/
│   └── supabaseClient.ts         ← Supabase client (if used outside Form)
├── public/                       ← Static assets
├── globals.css                   ← CSS variable tokens, dark/light overrides
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
</pre>

<h3>🔹 Folder Responsibilities</h3>
<table>
<tr><th>Folder / File</th><th>Purpose</th></tr>
<tr><td>app/</td><td>Next.js App Router pages, layouts, and API routes</td></tr>
<tr><td>components/</td><td>Reusable UI components including animated wizard, file upload, and phone input</td></tr>
<tr><td>lib/</td><td>Shared utility and service integrations</td></tr>
<tr><td>public/</td><td>Static assets served at root URL</td></tr>
<tr><td>globals.css</td><td>CSS custom property tokens for dark/light theming and global component classes</td></tr>
</table>

<h3>🔹 Execution Flow Mapping</h3>
<pre>
User Action → app/page.tsx → components/Form.tsx (4-step wizard)
    → React Hook Form validation
    → Framer Motion AnimatePresence transitions
    → Supabase Storage upload (UUID-namespaced)
    → Supabase DB insert (full structured payload)
    → app/api/send-email/route.ts (Nodemailer SMTP)
    → app/thank-you/page.tsx
</pre>

</div>

---

<h2>🧭 How to Demonstrate Live</h2>
<div class="card">
<ol>
<li>Open the deployed Vercel URL in a browser</li>
<li>Toggle between dark and light mode using the theme button — observe the animated Sun/Moon icon swap</li>
<li>Complete Step 1: enter university name, upload a logo, and fill city/state/country</li>
<li>Complete Step 2: fill representative name, designation, email, phone, and optionally upload a headshot</li>
<li>Complete Step 3: select levels and events using the animated pill buttons; optionally select time slots</li>
<li>Observe the animated progress indicator advancing and completing nodes as you move through steps</li>
<li>On Step 4: upload a brochure, add remarks, and verify the live summary review card reflects your Step 1–3 entries</li>
<li>Check the consent checkbox and click Submit Confirmation — observe the loading spinner</li>
<li>Verify the inserted row in the Supabase Table Editor including arrays, file URLs, and metadata</li>
<li>Verify uploaded files appear in the Supabase Storage bucket under the UUID-namespaced folder</li>
<li>Confirm the acknowledgment email was received at the representative email address</li>
</ol>
</div>

---

<h2>💡 Summary, Closure & Compliance</h2>
<div class="card">
<ul>
<li>System delivers a production-grade animated multi-step form automation pipeline from UI through database and email</li>
<li>All advanced UI interactions — step transitions, progress animation, pill selection, theme toggle, error banners — are powered by Framer Motion v12 with correct TypeScript tuple typing</li>
<li>React Hook Form provides robust per-step validation with inline error feedback; custom state guards cover phone and pill inputs outside RHF scope</li>
<li>Supabase integration covers both structured PostgreSQL storage and UUID-namespaced file storage with parallel upload optimization</li>
<li>Email automation is implemented as a best-effort, non-fatal side effect — submission integrity is never dependent on SMTP availability</li>
<li>Full TypeScript coverage enforced with zero type errors; EASE tuple pattern resolves framer-motion v12 BezierDefinition compatibility</li>
<li>Secure by design: RLS-enforced database, environment-secured secrets, UUID-isolated storage paths, and no server-side credentials exposed to the client</li>
<li>Compliant with modern Next.js App Router architecture, React 18 patterns, and Vercel deployment standards</li>
<li>Ready for enterprise-level enhancements including admin dashboard, AI-assisted validation, and transactional email provider upgrade</li>
</ul>
</div>
