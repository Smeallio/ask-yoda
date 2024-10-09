import { Box, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <>
      <Typography variant="h1" color="secondary" sx={{ textTransform: "none", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "1.5rem", borderRadius: "2rem" }}>
        You WANT To ASK&#8200;, WHAT Do?
      </Typography>
      {/* <Box
        component="img"
        src="../images/yoda-circle.png"
        alt="YODA"
        sx={{ width: "50%", height: "auto", marginTop: 2 }}
      /> */}
    </>
  );
};

export default Header;
