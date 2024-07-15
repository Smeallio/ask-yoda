import { Box, Typography } from "@mui/material";

interface ResponseProps {
  response: string;
}

const Response: React.FC<ResponseProps> = ({ response }) => {
  return (
    <Box display="flex" alignItems="center" mt={2} color={"white"}>
      <Box
        component="img"
        src="../images/yoda-glow.png"
        alt="YODA"
        position="relative"
        bottom="0"
        width="50%"
        height="auto"
        mt={2}
        mr={4}
        flexShrink={0}
      />
      <Typography
        variant="body1"
        sx={{
          backgroundColor: "white",
          color: "black",
          padding: "1rem",
          borderRadius: "10px",
          display: "inline-block",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            top: "25%",
            width: 0, 
            height: 0,
            border: "3rem solid transparent",
            borderRightColor: "white",
            borderTopLeftRadius: "15%",
            borderLeft: 0,
            borderTop: 0,
            marginTop: 0,
            marginLeft: "-3rem",
          }
        }}
      >
        {response}
      </Typography>
    </Box>
  );
};

export default Response;
