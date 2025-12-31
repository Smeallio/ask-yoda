import { Box, Button, Typography } from "@mui/material";
import { ResponseProps } from "app/interfaces/ResponseProps";
import { StyledSpeechBubble } from "app/theme/muiTheme";

const Response: React.FC<ResponseProps> = ({ yodaResponseText, resetData }) => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column-reverse", md: "column" }}
      width="100%"
      sx={{ maxWidth: { xs: "25rem", sm: "30rem", md: "35rem" } }}
    >
      <StyledSpeechBubble>{yodaResponseText}</StyledSpeechBubble>
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
