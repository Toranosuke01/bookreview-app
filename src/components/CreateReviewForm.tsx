import axios, { AxiosError } from "axios";
import { env } from "../const";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { FieldErrors, useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { CreateReviewFormValues, ErrorResponse } from "../types/types";

export const CreateReviewForm = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const defaultValues = {
    title: "",
    url: "",
    detail: "",
    review: ""
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
     defaultValues 
    });

  const onsubmit = async (data: CreateReviewFormValues) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${cookies.token}`
        }
      };
      const reviewResponse = await axios.post(`${env.url}/books`, data, config);
      console.log(reviewResponse);
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        alert(axiosError.response.data.ErrorMessageJP);
      } 
      console.error(error);
    };
  };

  const onerror = (err: FieldErrors<CreateReviewFormValues>) => {
    console.log(err);
  }

  return (
    <>
        <>
          <form 
            onSubmit={handleSubmit(onsubmit, onerror)} 
            noValidate
            className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-center text-xl">新規書籍レビュー</h1>
            <div className="mb-2">
              <TextField label="タイトル" margin="normal"
                {...register("title", {
                  required: "タイトルは必須入力です。",
                  minLength: {
                    value: 2,
                    message: "タイトルは2文字以上で入力してください。",
                  }
                })}
                error={"title" in errors}
                helperText={errors.title?.message} 
                sx={{ width: '400px' }}
              />
            </div>
            <div className="mb-2">
              <TextField label="URL" margin="normal"
                {...register("url", {
                  required: "URLは必須入力です。",
                  pattern: {
                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/,
                    message: "URLの形式が不正です。",
                  }
                })} 
                error={"url" in errors}
                helperText={errors.url?.message}
                sx={{ width: '400px' }}
              />
            </div>
            <div className="mb-2">
              <TextField 
                label="内容" 
                margin="normal"
                multiline
                rows={4} 
                {...register("detail", {
                  required: "内容は必須入力です。",
                  minLength: {
                    value: 3,
                    message: "内容は3文字以上で入力してください。",
                  }
                })}
                error={"detail" in errors}
                helperText={errors.detail?.message} 
                sx={{ width: '400px' }}
              />
            </div>
            <div className="mb-2">
              <TextField 
                label="レビュー" 
                margin="normal"
                multiline
                rows={4} 
                {...register("review", {
                  required: "レビューは必須入力です。",
                  minLength: {
                    value: 10,
                    message: "レビューは10文字以上で入力してください。",
                  }
                })}
                error={"review" in errors}
                helperText={errors.review?.message} 
                sx={{ width: '400px' }}
              />
            </div>
            <div className="mb-4">
              <Button variant="contained"
                type="submit"
                sx={{ width: '400px' }}
              >
                投稿
              </Button>
            </div>
            <Link 
              to="/"
              className="hover:text-blue-700 hover:underline text-center"
            >
              ホームへ
            </Link>
          </form>
        </>
    </>
  )};
