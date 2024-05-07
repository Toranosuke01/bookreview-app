import axios, { AxiosError } from "axios";
import { env } from "../const";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { FieldErrors, useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { LogInFormValues, RootState, ErrorResponse } from "../types/types";
import { signIn, setIcon } from "../authSlice";

export const LogInForm = () => {
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(["token", "iconUrl"]);
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  const iconSubmitted = useSelector((state: RootState) => state.auth.iconSubmitted);

  const defaultValues = {
    email: "",
    password: "",
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
     defaultValues 
    });

  const onsubmit = async (data: LogInFormValues) => {
    try {
      const signinResponse = await axios.post(`${env.url}/signin`, data);
      console.log(signinResponse);
      const token = signinResponse.data.token;
      dispatch(signIn());
      setCookie("token", token);

      const userResponse = await axios.get(`${env.url}/users`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      console.log(userResponse);
      const iconUrl = userResponse.data.iconUrl;
      if (iconUrl) {
        dispatch(setIcon());
        setCookie("iconUrl", iconUrl);
      } else {
        dispatch(setIcon());
        setCookie("iconUrl", "example.jpg");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        alert(axiosError.response.data.ErrorMessageJP);
      } 
      console.error(error);
    };
  };
  console.log(auth, iconSubmitted);
  if (auth) {
    return <Navigate to="/" replace={true} />;
  }

  const onerror = (err: FieldErrors<LogInFormValues>) => {
    console.log(err);
  }

  return (
    <>
        <>
          <form 
            onSubmit={handleSubmit(onsubmit, onerror)} 
            noValidate
            className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-center text-xl">ログイン</h1>
            <div className="mb-2">
              <TextField type="email" label="メールアドレス" margin="normal"
                {...register("email", {
                  required: "メールアドレスは必須入力です。",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "メールアドレスの形式が不正です。",
                  }
                })} 
                error={"email" in errors}
                helperText={errors.email?.message}
                sx={{ width: '400px' }}
              />
            </div>
            <div className="mb-6">
              <TextField type="password" label="パスワード" margin="normal"
                {...register("password", {
                  required: "パスワードは必須入力です。",
                  minLength: {
                    value: 8,
                    message: "パスワードは8文字以上で入力してください。",
                  }
                })} 
                error={"password" in errors}
                helperText={errors.password?.message}
                sx={{ width: '400px' }}
              />
            </div>
            <div className="mb-4">
              <Button variant="contained"
                type="submit"
                sx={{ width: '400px' }}
              >
                ログイン
              </Button>
            </div>
            <Link 
              to="/signup"
              className="hover:text-blue-700 hover:underline text-center"
            >
              新規登録はこちら
            </Link>
          </form>
        </>
    </>
  )};
