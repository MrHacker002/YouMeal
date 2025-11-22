import { Typography, Stack, IconButton } from "@mui/material";
import Logo from "../assets/LogoFooter.png";
import Call from "../assets/Call.png";
import TG from "../assets/Icons/TgIcon.tsx";
import VK from "../assets/Icons/VkIcon.tsx";

const Footer: React.FC = () => {
    return (
        <Stack sx={{ p: { xs: '23px 7px 27px' }, mt: 10 }} bgcolor={'#FFF'} gap={{ xs: 3 }}>
            <Stack direction="row" gap={{ xs: 0.5, md: 1 }}>
                <Typography variant="h1" color="#FF7020">
                    YourMeal
                </Typography>
                <img src={Logo} alt="logo"></img>
            </Stack>
            <Stack gap={{ xs: 1 }} >
                <Typography variant="subtitle1">Номер для заказа</Typography>
                <Stack direction="row" gap={0.5} alignItems={"center"}>
                    <img src={Call} alt="call" />
                    <Typography variant="body1">+7(930)833-38-11</Typography>
                </Stack>
            </Stack>
            <Stack gap={{ xs: 1 }}>
                <Typography variant="subtitle1">Мы в соцсетях</Typography>
                <Stack direction="row" gap={2}>
                    <IconButton
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            bgcolor: '#FF7020',
                            '&:hover': { bgcolor: '#FFAB08' },
                            p: 0,
                        }}
                        aria-label="VK"
                    >
                        <VK />
                    </IconButton>
                    <IconButton
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            bgcolor: '#FF7020',
                            '&:hover': { bgcolor: '#FFAB08' },
                            p: 0,
                        }}
                        aria-label="Telegram"
                    >
                        <TG />
                    </IconButton>
                </Stack>
            </Stack>
            <Stack mt={{ xs: 1.25 }}>
                <Typography fontSize={12}>© YouMeal, 2022</Typography>
                <Typography fontSize={12}>Design: Anastasia Ilina</Typography>
            </Stack>
        </Stack>
    )
};
export default Footer;
