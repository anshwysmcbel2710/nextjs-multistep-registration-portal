# University Participation Form — v3 (Open Form)

A Next.js form that lets **anyone** fill in and submit university participation
details — no invite token required. Works like a Google Form.

Submissions are inserted **directly into Supabase**. After submission the user
is redirected to a Thank-You page and an acknowledgment email is sent via Resend.

---

## How it works

```
User opens /  →  fills the form  →  submits
                                        │
                              ┌─────────▼─────────┐
                              │  Supabase INSERT   │
                              │  university_parti… │
                              └─────────┬─────────┘
                                        │
                              ┌─────────▼─────────┐
                              │  Resend email sent │
                              │  to rep's address  │
                              └─────────┬─────────┘
                                        │
                              redirect → /thank-you
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `NEXT_PUBLIC_SUPABASE_BUCKET` | Storage bucket name |
| `RESEND_API_KEY` | Resend API key for emails |
| `FROM_EMAIL` | Verified sender address in Resend |

> ⚠️ No `SUPABASE_SERVICE_ROLE_KEY` is needed — the form uses the anon key with
> RLS policies to control access.

---

## Supabase Setup

### 1. Database table

Make sure your `university_participation` table has (at minimum) these columns:

| Column | Type |
|---|---|
| `id` | `uuid` default `gen_random_uuid()` primary key |
| `university_name` | `text` |
| `university_logo` | `text` |
| `city` | `text` |
| `state` | `text` |
| `country` | `text` |
| `representative_name` | `text` |
| `representative_designation` | `text` |
| `representative_email` | `text` |
| `representative_phone_number` | `text` |
| `representative_headshot_file` | `text` |
| `submitter_name` | `text` |
| `submitter_contact` | `text` |
| `levels_recruiting_for` | `text[]` |
| `multi_event_selection` | `text[]` |
| `preferred_time_slots` | `text[]` |
| `highlights_or_focus` | `text` |
| `deposit_link` | `text` |
| `remarks` | `text` |
| `attachment_file` | `text` |
| `additional_documents_list` | `text[]` |
| `contact_consent` | `boolean` |
| `client_metadata` | `jsonb` |
| `system_metadata` | `jsonb` |

### 2. RLS policy — allow anonymous inserts

Enable Row Level Security on the table, then add this policy:

```sql
-- Allow anyone to insert a new participation row
CREATE POLICY "Allow public insert"
ON university_participation
FOR INSERT
WITH CHECK (true);
```

> Tighten this policy as needed (e.g. require `representative_email IS NOT NULL`).

### 3. Storage — allow anonymous uploads

```sql
CREATE POLICY "Allow anon uploads to submissions folder"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'your-bucket-name'
  AND name LIKE 'submissions/%'
);
```

---

## Email Setup (Resend)

1. Sign up at https://resend.com (free tier: 100 emails/day)
2. Add and verify your sending domain
3. Create an API key
4. Set `RESEND_API_KEY` and `FROM_EMAIL` in your environment variables

> Email sending is **best-effort** — if it fails, the form submission still
> succeeds and the user is redirected to the thank-you page.

---

## Local Development

```bash
npm install
cp .env.example .env.local
# fill in .env.local with your Supabase + Resend credentials
npm run dev
```

Open http://localhost:3000 — the form renders immediately, no token required.

---

## Deploy to Vercel

1. Push the project to GitHub
2. Import the repo in Vercel
3. Add all environment variables in Vercel → Project → Settings → Environment Variables
4. Redeploy — done ✅

The public URL is your form link. Share it with anyone.
