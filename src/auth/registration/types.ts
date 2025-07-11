export type RegistrationForm = {
  user: {
    email: string;
    fullName: string;
  };
  marketingOptIn?: boolean;
  advertiser: {
    name?: string;
    url?: string;
    description?: string;
    marketingChannel?: string;
    other?: string;
    vertical?: string | null;
  };
  country?: string;
  mediaSpend?: string;
  domain?: string;
};

export const initialValues: RegistrationForm = {
  user: {
    email: "",
    fullName: "",
  },
  marketingOptIn: false,
  advertiser: {
    name: "",
    url: "",
    description: "",
    marketingChannel: "",
    other: "",
    vertical: null,
  },
  country: "",
  mediaSpend: "",
  domain: "",
};
