import React, { useState } from "react";
import { Dialog, Typography, RadioGroup, FormControlLabel, Radio, Stack, DialogTitle, DialogContent, DialogActions, Button, OutlinedInput, IconButton } from "@mui/material"
import { SxProps, Theme } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import { SubmitHandler, useForm } from "react-hook-form"


interface DeliveryPopupProps {
    open: boolean;
    onClose: () => void;
    paperSx?: SxProps<Theme>;
}

interface OrderFormValues {
    name?: string;
    phone?: string;
    adress?: string;
    floor?: string;
    flatNum?: string;
    // method хранится во внешнем состоянии, не в форме
}

const DeliveryPopup: React.FC<DeliveryPopupProps> = ({ open, onClose, paperSx }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<OrderFormValues>();
    const [method, setMethod] = useState<'pickup' | 'delivery'>('pickup');
    const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => setMethod(e.target.value as 'pickup' | 'delivery')
    const onSubmit: SubmitHandler<OrderFormValues> = async (data) => {
        try {
            const payload = {
                ...data,
                method, // 'pickup' | 'delivery'
                // продублируем правильное имя поля адреса
                address: data.adress,
            };
            console.log("Отправляем данные:", payload);

            const response = await fetch("http://localhost:5000/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            console.log("Ответ API:", result);

            // Очистка формы
            alert("✅ Данные успешно отправлены!");
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            alert("❌ Не удалось отправить данные.");
        }
    };
    const errorText = (message: string) => (
        <Typography variant="body1" color="error" sx={{ "&::before": { display: "inline", content: '"⚠ "' } }}>
            {message}
        </Typography>
    );

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
                        <OutlinedInput
                            {...register("name", { required: true, pattern: /^[А-Яа-я ]+$/i })}
                            placeholder="Ваше имя"
                            error={Boolean(errors?.name)}
                        />
                        {errors?.name?.type === "required" && errorText("Это обязательное поле")}
                        {errors?.name?.type === "pattern" && (
                            errorText('Недопустимые символы')
                        )}
                        <OutlinedInput
                            {...register("phone", { required: true, pattern: /^\+?380\d{9}$/ })}
                            placeholder="Телефон"
                            error={Boolean(errors?.phone)}
                        />
                        {errors?.phone?.type === "required" && errorText("Это обязательное поле")}
                        {errors?.phone?.type === "pattern" && (
                            errorText('Введите номер в формате +380XXXXXXXXX')
                        )}
                    </Stack>
                    <RadioGroup value={method} onChange={onChangeRadio} sx={{ gap: 1, mb: 3 }}>
                        <FormControlLabel value="pickup" control={<Radio />} label="Самовывоз" />
                        <FormControlLabel value="delivery" control={<Radio />} label="Доставка" />
                    </RadioGroup>
                    {method === 'delivery' && (
                        <Stack direction='column' spacing={1}>
                            <OutlinedInput
                                {...register("adress", { required: true })}
                                placeholder="Улица, дом, квартира"
                                error={Boolean(errors?.adress)}
                            />
                            {errors?.adress?.type === "required" && errorText("Это обязательное поле")}
                            <Stack direction="row" spacing={1}>
                                <OutlinedInput
                                    {...register("floor", { required: true, min: 1, maxLength: 3 })}
                                    placeholder="Этаж"
                                    error={Boolean(errors?.floor)}
                                />
                                {errors?.floor?.type === "required" && errorText("Это обязательное поле")}
                                {errors?.floor?.type === "min" && errorText("Этаж должен быть не менее 1")}
                                {errors?.floor?.type === "maxLength" && errorText("Этаж не должен превышать 3 цифры")}
                                <OutlinedInput
                                    {...register("flatNum", { required: true, min: 1, maxLength: 4 })}
                                    placeholder="Домофон"
                                    error={Boolean(errors?.flatNum)}
                                />
                                {errors?.flatNum?.type === "required" && errorText("Это обязательное поле")}
                                {errors?.flatNum?.type === "min" && errorText("Номер должен быть не менее 1")}
                                {errors?.flatNum?.type === "maxLength" && errorText("Номер не должен превышать 4 цифры")}
                            </Stack>
                        </Stack>
                    )}
                </form>
            </DialogContent>
            <DialogActions sx={{ p: 0 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)} fullWidth >Оформить</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DeliveryPopup;
