import jwt from "jsonwebtoken"
import { } from "dotenv/config"

export const CheckTokenMiddleware = (id) => {
    return (req, res, next) => {
        if (!req.headers.authorization) return res.send({ message: "Вы не авторизованы" })
        const token = req.headers.authorization.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.KEY)
            let hasValidToken = false
            id.forEach(id => {
                if (decoded.id = id) hasValidToken = true
            })
            if (!hasValidToken) {
                return res.send({ message: "Нет доступа" })
            }
            next();
        } catch (error) {
            // Если возникает ошибка TokenExpiredError, отправляем статус 403 "Доступ запрещен"
            if (error.name === 'TokenExpiredError') {
                return res.status(403).json({ message: "Ваш токен устарел. Войдите снова." });
            }
            // В случае других ошибок отправляем статус 500 и сообщение об ошибке
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }
}