import React, { useState } from "react";
import { Product, useProductStore } from "../store/productStore";
import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import ItemPopup from "./ItemPopup";

interface ProductsListProps {
  products: Product[];
  activeCategory: string;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  activeCategory,
}) => {
  const { addToCart } = useProductStore();
  const [selected, setSelected] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const openPopup = (product: Product) => {
    setSelected(product);
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
    setSelected(null);
  };
  return (
    <Stack gap={2}>
      <Typography variant="h2">{activeCategory}</Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid size={{ xs: 6, md: 3 }} key={product.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 0.5,
                borderRadius: 1.5,
                backgroundColor: "#FFFFFF",
                cursor: "pointer",
              }}
              onClick={() => openPopup(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              />
              <Typography variant="h3" sx={{ mb: 0.5 }}>
                {product.price} ₴
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {product.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {product.weight}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                Добавить
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      <ItemPopup product={selected} open={open} onClose={closePopup} />
    </Stack>
  );
};

export default ProductsList;
