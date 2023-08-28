export type RegistrationForm = {
  email: string;
  fullName: string;
  advertiser: {
    name: string;
    url: string;
    phone?: string;
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
  advertiser: {
    name: "",
    url: "",
  },
  address: {
    street1: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  },
};

export const GradientText = {
  backgroundImage:
    "linear-gradient(96.46deg, #FF2869 -4.13%, #930BFE 82.88%), linear-gradient(0deg, #111317, #111317);",
  backgroundClip: "text",
  color: "transparent",
};
