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
            bottom: "25%",
            width: 0,
            height: 0,
            border: "3rem solid transparent",
            borderRightColor: "white",
            borderBottomLeftRadius: "10%",
            borderLeft: 0,
            borderBottom: 0,
            marginTop: "-2rem",
            marginLeft: "-3rem",
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
        sx={{ textTransform: "none", width: "30rem" }}
        onClick={resetData}
      >
        ask another question{" "}
      </Button>
    </Box>
  );
};

export default Response;
