import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    IconButton,
    Typography,
    Box,
    Button,
    Stack,
    styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SxProps, Theme } from '@mui/material/styles';
import { Product, useProductStore } from '../store/productStore';

interface ItemPopupProps {
    open: boolean;
    onClose: () => void;
    product?: Product | null;
    paperSx?: SxProps<Theme>;
}

const StyledImage = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '16px',
});

const ItemPopup: React.FC<ItemPopupProps> = ({ open, onClose, product, paperSx }) => {
    const { addToCart } = useProductStore();
    const [count, setCount] = useState(1);

    const handleAdd = () => {
        if (!product) return;
        for (let i = 0; i < count; i += 1) {
            addToCart(product);
        }
        setCount(1);
        onClose();
    };
    const handleInc = () => setCount((c) => c + 1);
    const handleDec = () => setCount((c) => (c > 1 ? c - 1 : c));
    const handleClose = () => { setCount(1); onClose(); };
    const getPrice = () => {
        if (!product) return 0;
        return product.price * count;
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
            <DialogTitle sx={{ p: 0, mb: 1.5 }}>
                <Typography variant="h2">{product ? product.name : 'Товар'}</Typography>
                <IconButton
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 10, top: 10, p: 0 }}
                    aria-label="Закрыть"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0, flex: 1, overflow: 'auto' }}>
                {product ? (
                    <Box>
                        <StyledImage src={product.image} alt={product.name} />
                        {product.description && (
                            <Typography variant="body1">
                                {product.description}
                            </Typography>
                        )}
                        {product.ingridient && (
                            <Box sx={{ mt: 1.25 }}>
                                <Typography variant="subtitle2">
                                    Состав:
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, mt: 0.5 }}>
                                    {product.ingridient.split(',').map((ing, idx) => {
                                        const clean = ing.trim();
                                        const capped = clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : clean;
                                        return (
                                            <Typography key={idx} variant="subtitle2">{capped}</Typography>
                                        );
                                    })}
                                </Box>
                            </Box>
                        )}
                        <Typography variant="subtitle2" sx={{ color: '#B1B1B1' }} >
                            {product.weight}
                            {typeof product.kkall === 'number' ? `, ккал ${product.kkall}` : ''}
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="body1">Товар не найден</Typography>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 0, mb: 2 }} >
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAdd}
                    disabled={!product}
                >
                    Добавить
                </Button>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        bgcolor: '#F2F2F3',
                        flexShrink: 0,
                        borderRadius: 2,
                        px: 0.375,
                        width: { xs: 68, md: 74 },
                        height: { xs: 30, md: 40 },
                    }}
                >
                    <Button
                        onClick={handleDec}
                        size="small"
                        disabled={count <= 1}
                        sx={{
                            minWidth: 'inherit',
                            px: 0.625,
                            color: 'text.primary',
                            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                        }}
                    >
                        <Typography variant="body1">-</Typography>
                    </Button>
                    <Typography variant="body1">{count}</Typography>
                    <Button
                        onClick={handleInc}
                        size="small"
                        sx={{
                            minWidth: 'inherit',
                            px: 0.625,
                            color: 'text.primary',
                            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                        }}
                    >
                        <Typography variant="body1">+</Typography>
                    </Button>
                </Stack>
            </DialogActions>
            <Typography variant='h3' align='right'>{getPrice()}₴</Typography>
        </Dialog>
    );
};

export default ItemPopup;

