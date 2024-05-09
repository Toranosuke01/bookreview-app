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

export type ProfileFormValues = {
  name: string;
};


export type ImageUploadFormProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export type BooksPaginationProps = {
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

export interface ErrorResponse {
  "ErrorCode": number,
  "ErrorMessageJP": string,
  "ErrorMessageEN": string
}

export type Book = {
  id: "string",
  title: "string",
  url: "string",
  detail: "string",
  review: "string",
  reviewer: "string"
};
