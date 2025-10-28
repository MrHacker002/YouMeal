import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Эндпоинт для получения заказа
app.post("/api/order", (req, res) => {
    const { name, phone, floor, flatNum } = req.body;
    const address = req.body.address ?? req.body.adress ?? req.body.addres ?? null;

    console.log("Имя:", name);
    console.log("Номер телефона:", phone);
    console.log("Адрес:", address);
    console.log("Этаж:", floor);
    console.log("Номер квартиры/домофон:", flatNum);

    res.json({ success: true, message: "Заказ получен", data: { ...req.body, address } });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Сервер запущен на http://localhost:${PORT}`));
