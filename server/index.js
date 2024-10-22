import { } from "dotenv/config"
import express from "express"
import cors from "cors"
import bcrypt from "bcrypt"
import { sql } from "./db.js";
import { generateAccessToken } from "./generToken.js";
import { CheckTokenMiddleware } from "./RoleMW.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// отправка формы
app.post('/form', async (req, res) => {
    const { name, email, social, details, game, rankFrom, rankTo, rangeFrom, rangeTo, character, achieve, price } = req.body

    const newOrder = await sql`INSERT INTO UserOrder (name, email, social, details, game, rankFrom, rankTo, rangeFrom, rangeTo, character, achieve, price) VALUES (${name}, ${email}, ${social}, ${details}, ${game}, ${rankFrom}, ${rankTo}, ${rangeFrom}, ${rangeTo}, ${character}, ${achieve}, ${price}) RETURNING *`
    return res.send({ newOrder })
})

// вход в админку
app.post('/auth', async (req, res) => {
    console.log(req.body);

    const { password } = req.body
    if (!password) {
        return res.send({mes: 'Пароль не введен'})
    }

    const user = await sql`select * from Admin where id = 1`

    if (!user) {
        return res.status(400).json({ message: `Пользователь не найден` })
    }

    const validPassword = bcrypt.compareSync(password, user[0].password)

    if (!validPassword) {
        return res.status(400).json({ message: `Введенный пароль неверный` })
    }

    const token = generateAccessToken(user[0].id)

    return res.json({ token })
})

// вывод данных в админку
app.get('/admin', CheckTokenMiddleware([1]), async (req, res) => {
    const data = await sql`select * from UserOrder`
    return res.send({ data })
})

const start = async () => {
    await sql`create table if not exists UserOrder(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        social VARCHAR(255) NOT NULL,
        details TEXT,
        game VARCHAR(255) NOT NULL,
        rankFrom VARCHAR(255),
        rankTo VARCHAR(255),
        rangeFrom VARCHAR(255),
        rangeTo VARCHAR(255),
        character VARCHAR(255),
        achieve VARCHAR(255),
        price VARCHAR(255) NOT NULL          
    )`

    await sql`create table if not exists Admin(
        id SERIAL PRIMARY KEY,    
        password VARCHAR(255) NOT NULL
    )`

    // для регистрации админа расскомить и закоммить обратно
    // const hashPass = bcrypt.hashSync(process.env.password, 11)
    // await sql`INSERT INTO Admin(password) VALUES(${hashPass})`

    app.listen(port, () => {
        console.log('Сервер работает');
    })
}

start()