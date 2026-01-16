import nodemailer from "nodemailer";

export async function sendOrderConfirmationEmail({
  to,
  orderId,
  sareeName,
  amount,
}: {
  to: string;
  orderId: string;
  sareeName: string;
  amount: number;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"GoldenWeft" <${process.env.BUSINESS_EMAIL}>`,
    to,
    subject: "Your GoldenWeft Saree Order is Confirmed ✨",
    html: `
      <h2>Order Confirmed</h2>
      <p>Your saree <strong>${sareeName}</strong> has been successfully ordered.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Amount:</strong> ₹${amount}</p>
      <p>We will contact you shortly for delivery updates.</p>
      <br/>
      <p>— GoldenWeft</p>
    `,
  });
}
