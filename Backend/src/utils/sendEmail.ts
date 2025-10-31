import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendVerificationEmail = async (
  to: string,
  code: string,
  name: string
) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          padding: 40px;
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin-bottom: 20px;
        }
        .message {
          font-size: 14px;
          color: #333333;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .code-box {
          background-color: #f0f4ff;
          padding: 30px;
          text-align: center;
          margin: 30px 0;
        }
        .code {
          font-size: 32px;
          font-weight: 700;
          color: #5b5fef;
          letter-spacing: 8px;
          font-family: monospace;
        }
        .expiry {
          font-size: 13px;
          color: #666666;
          margin-top: 15px;
        }
        .note {
          font-size: 13px;
          color: #666666;
          margin-top: 30px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e5e5;
          text-align: center;
        }
        .footer-text {
          font-size: 12px;
          color: #999999;
          margin: 5px 0;
        }
        .link {
          color: #5b5fef;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="greeting">Hello ${name},</div>
        
        <div class="message">
          Thank you for signing up with ClippyGen! Please verify your email address using the code below:
        </div>
        
        <div class="code-box">
          <div class="code">${code}</div>
        </div>
        
        <div class="expiry">This code will expire in <strong>15 minutes</strong>.</div>
        
        <div class="note">
          If you didn't request this code, please ignore this email.
        </div>
        
        <div class="footer">
          <div class="footer-text">&copy; 2025 ClippyGen. All rights reserved.</div>
          <div class="footer-text">
            Need help? Contact us at <a href="mailto:support@clippygen.com" class="link">support@clippygen.com</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    console.log(`📧 Sending verification email to: ${to}`);
    const info = await transporter.sendMail({
      from: `"ClippyGen" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Verify Your Email Address - ClippyGen",
      html,
    });
    console.log(`✅ Email sent successfully: ${info.messageId}`);
  } catch (error: any) {
    console.error('❌ Email sending failed:', error.message);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (
  to: string,
  code: string,
  name: string
) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          padding: 40px;
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin-bottom: 20px;
        }
        .message {
          font-size: 14px;
          color: #333333;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .code-box {
          background-color: #e3f2fd;
          border-left: 4px solid #2196F3;
          padding: 20px;
          margin: 30px 0;
          text-align: center;
        }
        .code {
          font-size: 32px;
          font-weight: bold;
          color: #2196F3;
          letter-spacing: 8px;
        }
        .expiry {
          font-size: 13px;
          color: #666666;
          margin-top: 20px;
        }
        .note {
          font-size: 12px;
          color: #999999;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eeeeee;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #eeeeee;
          text-align: center;
        }
        .footer-text {
          font-size: 12px;
          color: #999999;
          margin: 5px 0;
        }
        .link {
          color: #2196F3;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="greeting">Hi ${name},</div>
        
        <div class="message">
          We received a request to reset your password for your ClippyGen account. Use the code below to reset your password:
        </div>
        
        <div class="code-box">
          <div class="code">${code}</div>
        </div>
        
        <div class="expiry">This code will expire in <strong>15 minutes</strong>.</div>
        
        <div class="note">
          If you didn't request this password reset, please ignore this email or contact support if you have concerns.
        </div>
        
        <div class="footer">
          <div class="footer-text">&copy; 2025 ClippyGen. All rights reserved.</div>
          <div class="footer-text">
            Need help? Contact us at <a href="mailto:support@clippygen.com" class="link">support@clippygen.com</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    console.log(`📧 Sending password reset email to: ${to}`);
    const info = await transporter.sendMail({
      from: `"ClippyGen" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Reset Your Password - ClippyGen",
      html,
    });
    console.log(`✅ Password reset email sent successfully: ${info.messageId}`);
  } catch (error: any) {
    console.error('❌ Email sending failed:', error.message);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
};
