import { Provider } from "tsyringe";
import twilio from "twilio";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

import { ITelecommunicationProvider } from "../ITelecommunicationPriovider";

type SenderMessage = {
  body: string;
  from: string;
  to: string;
};

class TwilioTelecommunicationProvider implements ITelecommunicationProvider {
  private client: twilio.Twilio;

  private TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
  private TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

  constructor() {
    this.client = twilio(this.TWILIO_ACCOUNT_SID, this.TWILIO_AUTH_TOKEN);
  }

  async sendTextMessage({
    body,
    from,
    to,
  }: SenderMessage): Promise<MessageInstance> {
    const response = await this.client.messages.create({
      body,
      from,
      to,
    });

    return response;
  }
}

export { TwilioTelecommunicationProvider };
