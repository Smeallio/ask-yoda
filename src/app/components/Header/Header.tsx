import { Box, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          textTransform: "none",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "1.25rem 2.5rem",
          borderRadius: "2rem",
        }}
      >
        want to ask&#8202;, what do you?
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
