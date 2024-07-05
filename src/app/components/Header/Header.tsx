import { Box, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <>
      <Typography variant="h1" color="secondary" sx={{ textTransform: "none" }}>
        You WANT To ASK, WHAT Do?
      </Typography>
      <Box
        component="img"
        src="../images/yoda-circle.png"
        alt="YODA"
        sx={{ width: "50%", height: "auto", marginTop: 2 }}
      />
    </>
  );
};

export default Header;
