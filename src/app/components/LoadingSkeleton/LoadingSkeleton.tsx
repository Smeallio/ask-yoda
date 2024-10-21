import { Box, Typography } from "@mui/material";
import { StyledLoadingSkeleton } from "@/app/theme/muiTheme";

const LoadingSkeleton: React.FC = () => {
  return (
    <Box position="relative" width="30rem" height="15rem">
      <StyledLoadingSkeleton variant="rectangular" height="100%" width="100%" />
      <Typography
        variant="body1"
        position={"absolute"}
        top="50%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        Yoda is thinking...
      </Typography>
    </Box>
  );
};

export default LoadingSkeleton;
