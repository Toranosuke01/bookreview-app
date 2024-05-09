import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm, FieldErrors } from 'react-hook-form';
import Compressor from 'compressorjs';
import { Link } from 'react-router-dom';
import { ProfileFormValues } from '../types/types';
import axios from 'axios';
import { env } from '../const';

export const EditProfileForm = () => {
  const [preview, setPreview] = useState<string>("");
  const [cookies, setCookie] = useCookies(["token", "iconUrl"]);

  const config = {
    headers: {
      authorization: `Bearer ${cookies.token}`
    }
  };

  const defaultValues = {
    name: "",
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
     defaultValues 
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${env.url}/users`, {
          headers: {
            authorization: `Bearer ${cookies.token}`
          }
        });
        reset({ name: response.data.name }); 
        setPreview(response.data.iconUrl);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    if (cookies.token) {
      fetchUserData();
    }
  }, [cookies.token, reset]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newFile = event.target.files[0];
      new Compressor(newFile, {
        quality: 0.6,
        maxWidth: 800,
        maxHeight: 800,
        success: async (compressedResult) => {
          const formData = new FormData();
          const finalFile = new File([compressedResult], newFile.name, {
            type: compressedResult.type,
            lastModified: Date.now(),
          });
          formData.append('icon', finalFile);

          try {
            const response = await axios.post(`${env.url}/uploads`, formData, config);
            const iconUrl = response.data.iconUrl;
            setCookie("iconUrl", iconUrl);
            alert("アイコンを更新しました。");
          } catch (error) {
            console.error(error);
          }
        },
        error(err) {
          console.error('Compression Error:', err.message);
        },
      });
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(newFile);
    }
  };

  const onsubmit = async (data: ProfileFormValues) => {
    try {
      const response = await axios.put(`${env.url}/users`, data, config);
      alert(`ユーザー名を${response.data.name}に更新しました。`);
    } catch (error) {
      console.error(error);
    }
  }

  const onerror = (err: FieldErrors<ProfileFormValues>) => {
    console.log(err);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl mb-8">プロフィール編集</h1>
      <IconButton
        color="primary"
        component="label"
        sx={{ marginBottom: 2 }}
      >
        <input
          hidden
          accept="image/png, image/jpeg"
          type="file"
          onChange={handleAvatarChange}
        />
        <Avatar
          src={preview}
          sx={{
            width: 90,
            height: 90, 
            border: '1px solid #888888'
          }}
          alt="ユーザーアイコン"
        />
      </IconButton>
      <form onSubmit={handleSubmit(onsubmit, onerror)} noValidate className="flex flex-col items-center">
        <div className="mb-2">
          <TextField label="名前" margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
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
        <Button
          variant="contained"
          type="submit"
          sx={{ width: '300px' }}
        >
          変更を保存
        </Button>
      </form>
      <Link 
        to="/"
        className="hover:text-blue-700 hover:underline text-center mt-4"
      >
        ホームへ
      </Link>
    </div>
  );
};
