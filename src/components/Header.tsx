import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { env } from "../const";
import { useDispatch } from "react-redux";
import { signOut } from "../authSlice";
import { IconButton, Avatar, Tooltip, AppBar, Container, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  const [cookie, , removeCookie] = useCookies(["token", "iconUrl"]);
  const [userResponse, setUserResponse] = useState({
    name: "",
    iconUrl: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${env.url}/users`, {
          headers: {
            authorization: `Bearer ${cookie.token}`
          }
        });
        setUserResponse(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (cookie.token) {
      fetchUserData();
    }
  }, [cookie.token]);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters style={{ justifyContent: 'center', minHeight: '80px' }}>
            <Typography variant="h6">
              書籍レビュー
            </Typography>
            {cookie.token ? (
              <>
                <div className="absolute left-5">
                  <Tooltip title="User settings">
                    <IconButton onClick={() => {navigate("/profile")}} sx={{ p: 0 }}>
                      <Avatar src={cookie.iconUrl} />
                    </IconButton>
                  </Tooltip>
                  <Typography textAlign="center">{userResponse.name}</Typography>
                </div>
                <button
                  onClick={() => {
                    removeCookie("token");
                    removeCookie("iconUrl");
                    dispatch(signOut());
                    navigate("/");
                  }}
                  className="text-white hover:underline absolute right-5"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white hover:underline absolute right-5"
              >
                ログイン
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
