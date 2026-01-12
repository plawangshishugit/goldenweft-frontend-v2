import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

type OrderEmailPayload = {
  customerName: string;
  sareeName: string;
  orderId: string;
};

export async function sendOrderConfirmationEmail(
  payload: OrderEmailPayload
) {
  await transporter.sendMail({
    from: `"GoldenWeft" <${process.env.BUSINESS_EMAIL}>`,
    to: process.env.BUSINESS_EMAIL, 
    // TEMP: send to yourself
    // later replace with customer email
    subject: "Your GoldenWeft saree is confirmed",
    html: `
      <div style="font-family: serif; line-height: 1.6">
        <p>Dear ${payload.customerName},</p>

        <p>
          Your order for <strong>${payload.sareeName}</strong> has been confirmed.
        </p>

        <p>
          Each saree is prepared with care and dispatched within
          <strong>5–7 working days</strong>.
        </p>

        <p>
          Warm regards,<br/>
          <strong>GoldenWeft</strong>
        </p>
      </div>
    `,
  });
}
