export interface IUserState {
  accessToken: string;
  email: string;
  error: boolean;
  processing: boolean;
  signedIn: boolean;
  success: boolean;
  errorObject?: any;
}
