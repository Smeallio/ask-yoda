import { Box, Button, Typography } from "@mui/material";
import { ResponseProps } from "app/interfaces/ResponseProps";

const Response: React.FC<ResponseProps> = ({ yodaResponseText, resetData }) => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column-reverse", md: "column" }}
      width="100%"
      sx={{ maxWidth: { xs: "25rem", sm: "30rem", md: "35rem" } }}
    >
      <Typography
        variant="body1"
        sx={{
          backgroundColor: "white",
          color: "black",
          padding: "1rem",
          borderRadius: "0.5rem",
          display: "inline-block",
          position: "relative",
          marginTop: { xs: "2rem", md: 0 },
          marginBottom: { xs: 0, md: "2rem" },
          "&::after": {
            content: '""',
            position: "absolute",
            left: "-2rem",
            top: "20%",
            width: 0,
            height: 0,
            border: "2rem solid transparent",
            borderTop: "1rem solid transparent",
            borderBottom: "1rem solid transparent",
            borderRightColor: "white",
            borderLeft: 0,
          },
        }}
      >
        {yodaResponseText}
      </Typography>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          textTransform: "none",
          width: { xs: "100%", sm: "30rem", md: "100%" },
          marginTop: { xs: "2rem", md: 0 },
        }}
        onClick={resetData}
      >
        ask another question{" "}
      </Button>
    </Box>
  );
};

export default Response;
