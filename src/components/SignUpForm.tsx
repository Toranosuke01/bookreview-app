import axios, { AxiosError } from "axios";
import { env } from "../const";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { FieldErrors, useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { ImageUploadForm } from "./ImageUploadForm";
import { FormValues, RootState, ErrorResponse } from "../types/types";
import { signIn } from "../authSlice";

export const SignUpForm = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(["token", "iconUrl"]);
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  const iconSubmitted = useSelector((state: RootState) => state.auth.iconSubmitted);

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
     defaultValues 
    });
  const onsubmit = async (data: FormValues) => {
    try {
      const response = await axios.post(`${env.url}/users`, data);
      console.log(response);
      const token = response.data.token;
      dispatch(signIn());
      setCookie("token", token);
      setPage(2);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        alert(axiosError.response.data.ErrorMessageJP);
      } 
      console.error(error);
    };
  };
  console.log(auth, iconSubmitted);
  if (auth && iconSubmitted) {
    return <Navigate to="/" replace={true} />;
  } else if (auth && !iconSubmitted) {
    return <ImageUploadForm page={page} setPage={setPage} />;
  }

  const onerror = (err: FieldErrors<FormValues>) => {
    console.log(err);
  }

  return (
    <>
      {page === 1 && (
        <>
          <form 
            onSubmit={handleSubmit(onsubmit, onerror)} 
            noValidate
            className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-center text-xl">新規登録</h1>
            <div className="mb-2">
              <TextField label="名前" margin="normal"
                {...register("name", {
                  required: "名前は必須入力です。",
                  maxLength: {
                    value: 20,
                    message: "名前は20文字以内で入力してください。",
                  }
                })}
                error={"name" in errors}
                helperText={errors.name?.message} 
                sx={{ width: '400px' }}
              />
            </div>
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
                登録
              </Button>
            </div>
            <Link 
              to="/login"
              className="hover:text-blue-700 hover:underline text-center"
            >
              ログインはこちら
            </Link>
          </form>
        </>
      )} 
      {page === 2 && (
        <>
          <ImageUploadForm page={page} setPage={setPage}/>
        </>
      )};
    </>
  )};
