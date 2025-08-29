import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // smtp.gmail.com
  port: Number(process.env.SMTP_PORT), // 465
  secure: true, // true for port 465
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
})


export const resetPasswordTemplate = (name: string, resetLink: string, expireMinutes: number) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Password Reset Request</h2>
      <p>Hello ${name || "User"},</p>
      <p>You requested to reset your password. Click the button below to proceed:</p>
      <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>This link will expire in <strong>${expireMinutes}</strong> minutes.</p>
    </div>
  `;
};


// src/utils/email-template.js

export const userCreatedByAdminTemplate = (name: string, email: string, password: string, role: string) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Welcome to White Petal LMS</h2>
      <p>Hello ${name},</p>
      <p>Your account has been created by the admin. Here are your login credentials:</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p><strong>Role:</strong> ${role}</p>
      <br/>
      <p>You can now login to the platform.</p>
    </div>
  `;
};

