import { Grid, Stack, Typography } from "@mui/material";
import burgerHeader from "../assets/burger_header.png";
import logo from "../assets/LogoHeader.png";

const Header: React.FC = () => {
  return (
    <Stack
      //   bgcolor="orange"
      position="relative"
      zIndex={1}
      sx={{
        mb: 7.5,
        mt: 3,
        "&::before": {
          content: '""',
          display: "block",
          width: "200%",
          height: "145%",
          backgroundColor: "orange",
          borderRadius: "50%",
          position: "absolute",
          bottom: -4,
          left: 0,
          zIndex: -1,
          transform: "translate(-25%, 5%)",
        },
      }}
    >
      <Stack direction="row" justifyContent="center" mb={3} gap={0.5}>
        <Typography variant="h2" sx={{ color: "white" }}>
          YourMeal
        </Typography>
        <img src={logo} alt="logo" />
      </Stack>
      <Grid container direction={{ xs: "column", md: "row-reverse" }}>
        <Grid>
          <Stack alignItems="center" mb={2.5}>
            <Stack alignItems="center" mb={2}>
              <Typography variant="h1" sx={{ color: "white" }}>
                Только самые
              </Typography>
              <Typography variant="h1" sx={{ color: "red" }}>
                сочные бургеры!
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ color: "white" }}>
              Бесплатная доставка от 599₽
            </Typography>
          </Stack>
        </Grid>
        <Grid>
          <Stack alignItems="center">
            <img src={burgerHeader} alt="burger" />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
export default Header;
