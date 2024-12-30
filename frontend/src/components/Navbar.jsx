// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" height={"10vh"}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/stocks")}>
            Stocks
          </Button>
          <Button color="inherit" onClick={() => navigate("/news")}>
            News
          </Button>
          <Button color="inherit" onClick={() => navigate("/clustering")}>
            Clustering
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
