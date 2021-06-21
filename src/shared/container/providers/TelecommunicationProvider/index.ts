import { container } from "tsyringe";

import { TwilioTelecommunicationProvider } from "./implementations/TwillioTelecommunicationProvider";
import { ITelecommunicationProvider } from "./ITelecommunicationPriovider";

container.registerSingleton<ITelecommunicationProvider>(
  "TwilioTelecommunicationProvider",
  TwilioTelecommunicationProvider
);
