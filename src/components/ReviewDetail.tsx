import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { env } from "../const";
import { Paper, Typography, Box } from "@mui/material";


const ReviewDetail = () => {
  const { reviewId } = useParams();
  const [cookie] = useCookies(["token"]);
  const [detail, setDetail] = useState({
    id: "",
    title: "",
    url: "",
    detail: "",
    review: "",
    reviewer: "",
    isMine: false
  });

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`${env.url}/books/${reviewId}`, {
          headers: {
            authorization: `Bearer ${cookie.token}`
          }
        });
        setDetail(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetail();
  }, [reviewId, cookie.token]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Paper
        elevation={3}
        sx={{
          width: 800,
          height: 'auto',
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'left',
          justifyContent: 'center',
          padding: 2
        }}
        >
          <Typography 
            variant="h5"
            sx={{ mb: 4 }}
            style={{ overflow: 'auto', minWidth: 0 }}
          >
            {detail.title}
          </Typography>
          <Typography 
            sx={{ mb: 2, color: 'grey.600' }}
          >
            {detail.reviewer}さんの投稿
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2, color: 'grey.600' }}>
              URL:
            </Typography>
            <Link 
              to={`${detail.url}`}
              className="hover:text-blue-700 hover:underline border p-3 flex-1"
              style={{ overflow: 'auto', minWidth: 0 }}
            >
              {detail.url}
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2, color: 'grey.600' }} >
              内容:
            </Typography>
            <div
              className="border p-3 flex-1"
              style={{ overflow: 'auto', minWidth: 0 }}
            >
              {detail.detail}
            </div>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2, color: 'grey.600' }} >
              書評:
            </Typography>
            <div
              className="border p-3 flex-1"
              style={{ overflow: 'auto', minWidth: 0 }}
            >
              {detail.review}
            </div>
          </Box>
        </Paper>
        <Link 
            to="/"
            className="hover:text-blue-700 hover:underline text-center mt-4"
          >
            ホームへ
        </Link>
      </div>
      { detail.isMine &&
      (<Link
        to={`/edit/${detail.id}`}
        className="absolute top-24 right-20 text-white bg-blue-500 p-2 m-2 rounded hover:bg-blue-700"
      >
        レビュー編集
      </Link>)
      }
    </>
  );
};

export default ReviewDetail;
