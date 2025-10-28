import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Categories from "./Categories";
import Cardmob from "./Cardmob";
import { useProductStore } from "../store/productStore";
import { products } from "../data/products";
import ProductsList from "./ProductsList";
import { useCategoryStore } from "../store/categoryStore";
import DeliveryPopup from "./DeliveryPopup";
import Footer from "./Footer";


const Layout: React.FC = () => {
  const { setProducts } = useProductStore();
  const { activeCategory } = useCategoryStore();
  const [open, setOpen] = useState(false)
  const onCloseDelivery = () => {
    setOpen(false)
  }
  const onOpenDelivery = () => {
    setOpen(true)
  }
  React.useEffect(() => {
    setProducts(products);
  }, [setProducts]);
  return (
    <Stack
      direction="column"
      minHeight="100vh"
      bgcolor="#F9F9F9"
      overflow="hidden"
    >
      <Box component="header">
        <Header />
      </Box>
      <Box component="main" flexGrow={1}>
        <Categories />
        <Stack
          direction="column"
          spacing={2}
          sx={{
            mt: 3.75,
            px: 1.25,
            position: "relative",
          }}
        >
          <Cardmob openDelivery={onOpenDelivery} />
          <ProductsList products={products} activeCategory={activeCategory} />
        </Stack>
      </Box>
      <Box component="footer">
        <Footer />
      </Box>
      <DeliveryPopup open={open} onClose={onCloseDelivery} />
    </Stack>
  );
};

export default Layout;

