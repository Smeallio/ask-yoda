import { Box, Button, Typography } from "@mui/material";
import { ResponseProps } from "app/interfaces/ResponseProps";
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
          marginBottom: { xs: "2rem", md: 0 },
          "&::after": {
            content: '""',
            position: "absolute",
            left: { xs: "55%", md: 0 },
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
          width={100}
          height={5}
          message="Yoda will speak soon..."
        />
      ) : (
        <Box my={{ xs: 2, md: 4 }}>
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
