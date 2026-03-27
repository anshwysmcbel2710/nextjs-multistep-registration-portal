// app/api/send-email/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { toEmail } = await req.json();

    if (!toEmail) {
      return NextResponse.json({ error: "Missing toEmail" }, { status: 400 });
    }

    // ✅ Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS");
      return NextResponse.json(
        { error: "Email configuration missing" },
        { status: 500 }
      );
    }

    // ✅ More reliable Gmail SMTP config
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email content
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; line-height: 1.6;">
        <p>Dear Sir/Ma'am,</p>

        <p>
          Thank you for taking the time to complete and submit the form. 
          We confirm that your submission has been successfully received and is currently under review.
        </p>

        <p>
          Our team will carefully evaluate the information provided and, if necessary, will reach out to you for any additional details or clarification. 
          Should your submission require further action or follow-up, you will be contacted using the information you have provided.
        </p>

        <p>
          We appreciate your interest and engagement. Your response is important to us, and we are committed to ensuring a timely and efficient review process.
        </p>

        <p>
          If you have any immediate questions or need to provide additional information, please feel free to reply directly to this email.
        </p>

        <p>
          Thank you once again for your submission.
        </p>

        <p>
          Sincerely,<br/>
          <strong>Ansh Srivastava</strong>
        </p>
      </div>
    `;

    // ✅ Send email
    const info = await transporter.sendMail({
      from: `"Ansh Srivastava" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Acknowledgment of Your Submission",
      html: htmlBody,
    });

    console.log("Email sent:", info.messageId);

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Email error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to send email" },
      { status: 500 }
    );
  }
}