import { MailtrapClient } from "mailtrap";
import { env } from "../config/env";

export async function sendMessage(email: string, subject: string, text: string) {
  try {
    const mailtrapClient = new MailtrapClient({
      token: env.mailtrap.token
    });
    mailtrapClient
      .send({
        from: { name: "EcoGrow", email: env.mailtrap.senderEmail },
        to: [{ email: email }],
        subject: subject,
        text: text
      })
      .then(console.log)
      .catch(console.error);
  }
  catch (error) {
    console.log(error);
  }
}