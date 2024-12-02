import { Box, Typography } from "@mui/material";
import { StyledLoadingSkeleton } from "@/app/theme/muiTheme";
import { LoadingSkeletonProps } from "@/app/interfaces/LoadingSkeletonProps";

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width,
  height,
  message,
}) => {
  return (
    <Box
      position="relative"
      width={{ xs: `${width - 10}%`, lg: `${width + 400}px` }}
      height={{ xs: `${height - 3}rem`, lg: `${height}rem` }}
      maxWidth={{ xs: "30rem", md: "none" }}
      margin="2rem auto"
    >
      <StyledLoadingSkeleton variant="rectangular" height="100%" width="100%" />
      <Typography
        variant="body1"
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSkeleton;
