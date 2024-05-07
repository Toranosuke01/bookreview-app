interface AuthState {
  isSignIn: boolean;
  iconSubmitted: boolean;
}

export interface RootState {
  auth: AuthState;
}

export type FormValues = {
  name: string;
  email: string;
  password: string;
};

export type ImageUploadFormProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export interface ErrorResponse {
  "ErrorCode": number,
  "ErrorMessageJP": string,
  "ErrorMessageEN": string
}
