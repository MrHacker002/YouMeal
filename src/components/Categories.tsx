import React from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { categories } from "../store/categoryStore";

interface CategoriesProps {
  activeCategory: string; // slug
}

const Categories: React.FC<CategoriesProps> = ({ activeCategory }) => {
  const navigate = useNavigate();
  const handleChange = (_: React.MouseEvent<HTMLElement>, value: string | null) => {
    if (!value) return;
    navigate(`/category/${encodeURIComponent(value)}`);
  };
  return (
    <Box
      sx={{
        overflowX: "auto",
        width: "100vw",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE и Edge
        "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
        lineHeight: "0"
      }}
    >
      <ToggleButtonGroup
        value={activeCategory}
        exclusive
        onChange={handleChange}
        sx={{ gap: 1 }}
      >
        {categories.map((category) => (
          <ToggleButton
            key={category.slug}
            value={category.slug}
            sx={{
              transition: "background 0.2s",
            }}
          >
            <img
              src={category.icon}
              alt={category.label}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            <Typography variant="body1">{category.label}</Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default Categories;
