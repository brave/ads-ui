export interface IUserState {
  accessToken: string;
  email: string;
  error: boolean;
  id: string;
  processing: boolean;
  signedIn: boolean;
  success: boolean;
  errorObject?: any;
}
