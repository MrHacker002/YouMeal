import React, { ChangeEvent, useState } from "react";
import { Dialog, Typography, Input, RadioGroup, FormControlLabel, Radio, Stack, DialogTitle, DialogContent, DialogActions, Button, OutlinedInput, IconButton } from "@mui/material"
import { SxProps, Theme } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form"


interface DeliveryPopupProps {
    open: boolean;
    onClose: () => void;
    paperSx?: SxProps<Theme>;
}

const DeliveryPopup: React.FC<DeliveryPopupProps> = ({ open, onClose, paperSx }) => {
    const { register, handleSubmit } = useForm();
    const [method, setMethod] = useState<'pickup' | 'delivery'>('pickup');
    const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => setMethod(e.target.value as 'pickup' | 'delivery')
    const onSubmit = (data: any) => {
        // Здесь можно обработать оформление заказа
        // console.log(data, method);
    };
    return (
        <Dialog
            onClose={onClose}
            open={open}
            fullScreen
            slotProps={{
                paper: {
                    sx: [
                        {
                            boxSizing: 'border-box',
                            height: '100dvh',
                            borderRadius: 0,
                            py: 4,
                            px: 1.25,
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        },
                        paperSx,
                    ] as SxProps<Theme>,
                },
            }}
        >
            <DialogTitle sx={{ p: 0, mb: 2.25 }}>
                <Typography variant="h3">Доставка</Typography>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 10,
                        top: 10,
                        p: 0,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0, flex: 1, overflow: 'hidden' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack sx={{ gap: 1, mb: 3 }}>
                        <OutlinedInput {...register("name")} placeholder="Ваше имя" />
                        <OutlinedInput {...register("phone")} placeholder="Телефон" />
                    </Stack>
                    <RadioGroup value={method} onChange={onChangeRadio} sx={{ gap: 1, mb: 3 }}>
                        <FormControlLabel value="pickup" control={<Radio />} label="Самовывоз" />
                        <FormControlLabel value="delivery" control={<Radio />} label="Доставка" />
                    </RadioGroup>
                    {method === 'delivery' && (
                        <Stack direction='column' spacing={1}>
                            <OutlinedInput {...register("adress")} placeholder="Улица, дом, квартира" />
                            <Stack direction="row" spacing={1}>
                                <OutlinedInput {...register("floor")} placeholder="Этаж" />
                                <OutlinedInput {...register("flatNum")} placeholder="Домофон" />
                            </Stack>
                        </Stack>
                    )}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onSubmit)}>Оформить</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DeliveryPopup;
