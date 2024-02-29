export type RegistrationForm = {
  email: string;
  fullName: string;
  marketingOptIn?: boolean;
  advertiser: {
    name: string;
    url: string;
    description?: string;
    marketingChannel?: string;
    other?: string;
  };
  country?: string;
  mediaSpend?: string;
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
  country: undefined,
  mediaSpend: "",
};
