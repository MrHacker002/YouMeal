import React, { useState } from "react";
import { Box, Typography, Stack, Divider, Button } from "@mui/material";
import CardItem from "./CardItem";
import { useProductStore } from "../store/productStore";
import delivery from "../assets/delivery.png";
import { useEffect } from "react";
import { useForm } from "react-hook-form"

interface CardmobProps { openDelivery: () => void }

const Cardmob: React.FC<CardmobProps> = ({ openDelivery }) => {
  const [expanded, setExpanded] = useState(false);
  const { getTotalCount, getTotalPrice, cart } = useProductStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [method, setMethod] = useState<'pickup' | 'delivery'>('pickup');
  const handleToggle = () => setExpanded((v) => !v);
  const handleClose = () => setExpanded(false);

  useEffect(() => {
    if (showCheckout) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showCheckout]);
  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#fff",
        borderRadius: 3,
        py: 2,
        px: 1.25,
        mb: 2,
      }}
    >
      <Box
        onClick={handleToggle}
        sx={{
          display: 'flex',
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography variant="h3">Корзина</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#F2F2F3",
            borderRadius: 1.5,
            px: 1.625,
            py: 0.125,
          }}
        >
          <Typography variant="subtitle2">{getTotalCount()}</Typography>
        </Box>
      </Box>
      {expanded && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1300,
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: "0 0 10px rgba(0,0,0,0.16)",
            overflow: "hidden",
            maxHeight: "70vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            onClick={handleToggle}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              px: 1.25,
              py: 2,
            }}
          >
            <Typography variant="h3">Корзина</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#F2F2F3",
                borderRadius: 1.5,
                px: 1.625,
                py: 0.125,
              }}
            >
              <Typography variant="subtitle2">{getTotalCount()}</Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 1, overflow: "auto", p: 1.25 }}>
            {cart.length === 0 ? (
              <Box sx={{ pt: 2, pb: 1 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Тут пока пусто :(
                </Typography>
              </Box>
            ) : (
              <Stack spacing={1} divider={<Divider />}>
                {cart.map((item) => (
                  <CardItem
                    key={item.product.id}
                    product={item.product}
                    quantity={item.quantity}
                  />
                ))}
              </Stack>
            )}
          </Box>
          {cart.length > 0 && (
            <Box
              sx={{
                p: 1.25,
                borderTop: "1px solid #e0e0e0",
                bgcolor: "#fff",
              }}
            >
              <Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">Итого</Typography>
                  <Typography variant="body1">{getTotalPrice()} ₴</Typography>
                </Stack>
                <Button variant="contained" color="primary" sx={{ mt: 2.375, mb: 1 }} fullWidth onClick={openDelivery}>
                  Оформить заказ
                </Button>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" gap={1}>
                    <img src={delivery} alt="delivery" />
                    <Typography variant="subtitle2">Бесплатная доставка</Typography>
                  </Stack>
                  <Typography
                    variant="subtitle2"
                    sx={{ cursor: "pointer", color: "text.secondary" }}
                    onClick={handleClose}
                  >
                    Свернуть
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
export default Cardmob;
