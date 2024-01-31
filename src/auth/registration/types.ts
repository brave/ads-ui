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
  address: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
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
  address: {
    street1: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  },
};
