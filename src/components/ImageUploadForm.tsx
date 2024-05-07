import Compressor from "compressorjs";
import axios from "axios";
import { env } from "../const";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldErrors, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, IconButton, Avatar, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { ImageUploadFormProps } from "../types/types";
import { setIcon } from "../authSlice";

export const ImageUploadForm: React.FC<ImageUploadFormProps>= ({ page, setPage }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null); 
  const [cookies, setCookie] = useCookies(["token", "iconUrl"]);
  const dispatch = useDispatch();

  type FormValues = {
    icon?: FileList;
  };
  const defaultValues = {
    icon: undefined
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues 
   });

  const onsubmit = async () => {
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 800,
        maxHeight: 800,
        success: async (compressedResult) => {
          const formData = new FormData();
          const finalFile = new File([compressedResult], file.name, {
            type: compressedResult.type,
            lastModified: Date.now(),
          });
          formData.append('icon', finalFile);

          const config = {
            headers: {
              authorization: `Bearer ${cookies.token}`
            }
          };

          try {
            const response = await axios.post(`${env.url}/uploads`, formData, config);
            const iconUrl = response.data.iconUrl;
            dispatch(setIcon());
            setCookie("iconUrl", iconUrl);
            navigate("/");
          } catch (error) {
            console.error(error);
          }
        },
        error(err) {
          console.error('Compression Error:', err.message);
        },
      });
    }
  };
  
  const onerror = (err: FieldErrors<FormValues>) => {
    console.log(err);
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newFile = event.target.files[0];
      setFile(newFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(newFile);
    }
  };

  const handleSkip = () => {
    dispatch(setIcon());
    setCookie("iconUrl", "example.jpg");
    navigate("/");
  }

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit, onerror)} noValidate className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-center text-xl mb-4">あなたのアイコンを設定しましょう</h1>
        <IconButton
          color="primary"
          component="label"
          sx={{ marginBottom: 2 }}
        >
          <input
            hidden
            accept="image/png, image/jpeg"
            type="file"
            {...register("icon", {
              required: "アイコンをアップロードしてください。"
            })}
            onChange={handleAvatarChange}
          />
          <Avatar
            src={preview}
            sx={{ width: 90, height: 90 }}
            alt="ユーザーアイコン"
          />
        </IconButton>
        {errors.icon && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errors.icon.message}
          </Typography>
        )}
        <Button
          variant="contained"
          type="submit"
          sx={{ width: '300px' }}
        >
          保存
        </Button>
        <button onClick={handleSkip} className="text-center hover:text-blue-700 hover:underline mt-4">
          スキップ
        </button>
      </form>
    </>
  );
};
