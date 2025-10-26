import React from "react";
import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useCategoryStore, categories } from "../store/categoryStore";

const Categories: React.FC = () => {
  const { activeCategory, setActiveCategory } = useCategoryStore();
  return (
    <Box
      sx={{
        overflowX: "auto",
        width: "100%",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE и Edge
        "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
      }}
    >
      <ToggleButtonGroup
        value={activeCategory}
        exclusive
        onChange={(_, value) => value && setActiveCategory(value)}
        sx={{ minWidth: 600, py: 2, gap: 1, mx: 1.25 }}
      >
        {categories.map((category) => (
          <ToggleButton
            key={category.label}
            value={category.label}
            sx={{
              transition: "background 0.2s",
            }}
          >
            <img
              src={category.icon}
              alt={category.label}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            <Typography variant="subtitle1">{category.label}</Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default Categories;
