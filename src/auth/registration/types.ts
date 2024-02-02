export type AccountSetup = "managed" | "self";

export type RegistrationForm = {
  email: string;
  fullName: string;
  marketingOptIn?: boolean;
  setup?: AccountSetup;
  advertiser: {
    name: string;
    url: string;
    description?: string;
    marketingChannel?: string;
    other?: string;
  };
};

export const initialValues: RegistrationForm = {
  email: "",
  fullName: "",
  marketingOptIn: false,
  advertiser: {
    name: "",
    url: "",
    description: "",
    marketingChannel: "",
    other: "",
  },
};
