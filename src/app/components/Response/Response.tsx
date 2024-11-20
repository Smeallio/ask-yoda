import { Box, Button, Typography } from "@mui/material";
import { ResponseProps } from "@/app/interfaces/ResponseProps";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const Response: React.FC<ResponseProps> = ({
  yodaResponseText,
  audioLoading,
  audioResponseUrl,
  resetData,
}) => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column-reverse", md: "column" }}
      sx={{ maxWidth: "30rem" }}
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
          marginBottom: "2rem",
          "&::after": {
            content: '""',
            position: "absolute",
            left: { xs: "50%", md: 0 },
            // top: { xs: 0, md: "50%" },
            bottom: { xs: 0, md: "auto" },
            width: 0,
            height: 0,
            border: "3rem solid transparent",
            borderTopColor: { xs: "white", md: "transparent" },
            borderRightColor: { xs: "transparent", md: "white" },
            borderBottomLeftRadius: "10%",
            borderLeft: 0,
            borderBottom: 0,
            marginTop: { xs: 0, md: "-2rem" },
            marginLeft: { xs: 0, md: "-3rem" },
            marginBottom: { xs: "-3rem", md: 0 },
          },
        }}
      >
        {yodaResponseText}
      </Typography>
      {audioLoading ? (
        <LoadingSkeleton
          width="30rem"
          height="5rem"
          message="Yoda will speak soon..."
        />
      ) : (
        <Box my={4}>
          {audioResponseUrl && (
            <audio controls style={{ width: "100%", height: "40px" }}>
              <source src={audioResponseUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </Box>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          textTransform: "none",
          width: "30rem",
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
