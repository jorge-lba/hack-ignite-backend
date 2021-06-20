type SenderMessage = {
  body: string;
  from: string;
  to: string;
};

interface ITelecommunicationProvider {
  sendTextMessage({ body, from, to }: SenderMessage): Promise<any>;
}

export { ITelecommunicationProvider };
