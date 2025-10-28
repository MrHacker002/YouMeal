import React from "react";
import { Box, Typography, Button, Stack, Divider } from "@mui/material";
import { Product, useProductStore } from "../store/productStore";

interface CardItemProps {
  product: Product;
  quantity?: number;
}

const CardItem: React.FC<CardItemProps> = ({ product, quantity }) => {
  const { getProductQuantity, addToCart, removeFromCart } = useProductStore();

  if (!product) return null;

  const handleIncrement = () => addToCart(product);
  const handleDecrement = () => removeFromCart(product.id);

  const displayQuantity =
    typeof quantity === "number" ? quantity : getProductQuantity(product.id);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        src={product.image}
        alt={product.name}
        sx={{ width: 64, height: 52, objectFit: "cover", borderRadius: 2 }}
      />
      <Stack flexGrow={1} mx={0.75}>
        <Typography variant="body1">{product.name}</Typography>
        <Typography variant="body1" color="text.secondary">
          {product.weight}
        </Typography>
        <Typography variant="body1" sx={{ mt: 0.625 }}>
          {product.price} ₴
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          bgcolor: "#F2F2F3",
          borderRadius: 2,
          px: 0.375,
          width: { xs: 68, md: 74 },
          height: { xs: 30, md: 40 },
        }}
      >
        <Button
          onClick={handleDecrement}
          size="small"
          sx={{
            minWidth: "inherit",
            px: 0.625,
            color: "text.primary",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <Typography variant="body1">-</Typography>
        </Button>
        <Typography variant="body1">{displayQuantity}</Typography>
        <Button
          onClick={handleIncrement}
          size="small"
          sx={{
            minWidth: "inherit",
            px: 0.625,
            color: "text.primary",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <Typography variant="body1">+</Typography>
        </Button>
      </Stack>
      <Divider />
    </Box>
  );
};

export default CardItem;
