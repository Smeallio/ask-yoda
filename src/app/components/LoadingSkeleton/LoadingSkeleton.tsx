import { Stack } from "@mui/material";
import { StyledLoadingSkeleton } from "@/app/theme/muiTheme";

const LoadingSkeleton: React.FC = () => {
  return (
    <Stack spacing={1}>
      <StyledLoadingSkeleton variant="rectangular" width={100} height={100} />
    </Stack>
  );
};

export default LoadingSkeleton;
