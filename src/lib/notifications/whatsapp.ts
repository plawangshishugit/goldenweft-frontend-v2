export async function sendWhatsAppConfirmation({
  phone,
  sareeName,
  orderId,
}: {
  phone: string;
  sareeName: string;
  orderId: string;
}) {
  // Placeholder – later replace with Twilio / Meta API
  console.log(
    `📲 WhatsApp: Order ${orderId} confirmed for ${sareeName} → ${phone}`
  );
}
