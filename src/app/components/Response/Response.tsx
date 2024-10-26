import { Box, Button, Typography } from "@mui/material";
import { ResponseProps } from "@/app/interfaces/ResponseProps";

const Response: React.FC<ResponseProps> = ({
  yodaResponseText,
  audioResponseUrl,
  resetData,
}) => {
  return (
    <Box display="flex" flexDirection="column" sx={{ maxWidth: "30rem" }}>
      <Typography
        variant="body1"
        sx={{
          backgroundColor: "white",
          color: "black",
          padding: "1rem",
          borderRadius: "0.5rem",
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
          },
        }}
      >
        {yodaResponseText}
      </Typography>
      <Box my={4}>
        {audioResponseUrl && (
          <audio controls style={{ width: "100%", height: "40px" }}>
            <source src={audioResponseUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ textTransform: "none", width: "30rem" }}
        onClick={resetData}
      >
        ask another question{" "}
      </Button>
    </Box>
  );
};

export default Response;
