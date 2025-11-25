import React, { useState } from "react";
import { Box, Typography, Stack, Divider, Button } from "@mui/material";
import BasketItem from "./BasketItem";
import { useProductStore } from "../store/productStore";
import delivery from "../assets/delivery.png";
import { useEffect } from "react";

interface BasketProps { openDelivery: () => void }

const Basket: React.FC<BasketProps> = ({ openDelivery }) => {
  const [expanded, setExpanded] = useState(false);
  const cart = useProductStore((s) => s.cart);
  const totalCount = useProductStore((s) => s.cart.reduce((t, i) => t + i.quantity, 0));
  const totalPrice = useProductStore((s) => s.cart.reduce((t, i) => t + i.product.price * i.quantity, 0));
  const [showCheckout] = useState(false);
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
        maxWidth: expanded ? "300px" : "145px",
        boxSizing: "border-box",
      }}
    >
      <Box
        onClick={handleToggle}
        sx={{
          display: 'flex',
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
          zIndex: 20,
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
          <Typography variant="subtitle2">{totalCount}</Typography>
        </Box>
      </Box>
      {expanded && (
        <>
          <Box
            onClick={handleClose}
            sx={{
              position: 'fixed',
              inset: 0,
              zIndex: 9,
              background: 'transparent',
            }}
          />
          <Stack
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              bgcolor: "#fff",
              borderRadius: 2,
              overflow: "hidden",
              maxHeight: "70vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 0 10px rgba(0,0,0,0.16)",
              paddingTop: 5,
            }}
          >
            <Box sx={{ flex: 1, overflow: "auto", px: 1.25 }}>
              {cart.length === 0 ? (
                <Box sx={{ pt: 2, pb: 1 }}>
                  <Typography variant="body1" color="text.secondary">
                    Тут пока пусто :(
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={1.375} divider={<Divider />} sx={{ borderBottom: "1px solid #e0e0e0", borderTop: "1px solid #e0e0e0", py: 1.375 }}>
                  {cart.map((item) => (
                    <BasketItem
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
                  p: "13px 10px 16px",
                  bgcolor: "#fff",
                }}
              >
                <Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">Итого</Typography>
                    <Typography variant="body1">{totalPrice} ₴</Typography>
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
          </Stack>
        </>
      )}

    </Box>
  );
};
export default Basket;
