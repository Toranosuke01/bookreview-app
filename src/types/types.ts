interface AuthState {
  isSignIn: boolean;
  iconSubmitted: boolean;
}

export interface RootState {
  auth: AuthState;
}

export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

export type LogInFormValues = {
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
