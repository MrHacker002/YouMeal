import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Эндпоинт для получения заказа
app.post("/api/order", (req, res) => {
    const { name, phone, floor, flatNum } = req.body;
    // подстрахуемся под разные варианты поля адреса
    const address = req.body.address ?? req.body.adress ?? req.body.addres ?? null;
    // method может прийти как 'delivery' | 'pickup' или 'Доставка' | 'Самовывоз'
    const rawMethod = req.body.method;
    const method = rawMethod === 'delivery' ? 'Доставка' : rawMethod === 'pickup' ? 'Самовывоз' : rawMethod;

    console.log("Способ получения:", method);
    console.log("Имя:", name);
    console.log("Номер телефона:", phone);

    if (method === "Доставка") {
        console.log("Адрес:", address);
        console.log("Этаж:", floor);
        console.log("Номер квартиры/домофон:", flatNum);
    }

    res.json({ success: true, message: "Заказ получен", data: { ...req.body, address, method } });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Сервер запущен на http://localhost:${PORT}`));
