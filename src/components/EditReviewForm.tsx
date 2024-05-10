import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useForm, FieldErrors } from "react-hook-form";
import axios from "axios";
import { env } from "../const";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { EditReviewFormValues } from "../types/types";;


export const EditReviewForm = () => {
  const { reviewId } = useParams();
  const [cookie] = useCookies(["token"]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const defaultValues = {
    title: "",
    url: "",
    detail: "",
    review: "",
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
     defaultValues 
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`${env.url}/books/${reviewId}`, {
          headers: {
            authorization: `Bearer ${cookie.token}`
          }
        });
        reset({
          title: response.data.title,
          url: response.data.url,
          detail: response.data.detail,
          review: response.data.review
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetail();
  }, [reviewId, cookie.token, reset]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${env.url}/books/${reviewId}`, {
        headers: {
          authorization: `Bearer ${cookie.token}`
        }
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      handleClose();
    }
  }

  const onsubmit = async (data: EditReviewFormValues) => {
    try {
      const response = await axios.put(`${env.url}/books/${reviewId}`, data, {
        headers: {
          authorization: `Bearer ${cookie.token}`
        }
      });
      console.log(response);
      navigate("/")
    } catch (error) {
      console.error(error);
    };
  }

  const onerror = (err: FieldErrors<EditReviewFormValues>) => {
    console.log(err);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl mb-8">書籍レビュー編集</h1>
        <form onSubmit={handleSubmit(onsubmit, onerror)} noValidate className="flex flex-col items-center">
          <div className="mb-2">
            <TextField label="タイトル" margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
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
              InputLabelProps={{
                shrink: true,
              }}
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
              InputLabelProps={{
                shrink: true,
              }}
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
              label="書評" 
              margin="normal"
              multiline
              rows={4} 
              InputLabelProps={{
                shrink: true,
              }}
              {...register("review", {
                required: "書評は必須入力です。",
                minLength: {
                  value: 10,
                  message: "書評は10文字以上で入力してください。",
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
              変更を保存
            </Button>
          </div>
        </form>
        <Button variant="contained"
          onClick={handleClickOpen}
          sx={{
            width: '400px',
            backgroundColor: 'red',
            '&:hover': {
              backgroundColor: 'darkred'
            }
          }}
        >
          書籍を削除
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"書籍を削除"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                本当にこの書籍を削除しますか？
              </DialogContentText>
            </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button onClick={handleDelete} color="error" autoFocus>
              削除
            </Button>
          </DialogActions>
        </Dialog>
        <Link 
          to="/"
          className="hover:text-blue-700 hover:underline text-center mt-4"
        >
          ホームへ
        </Link>
      </div>
    </>
  );
};

