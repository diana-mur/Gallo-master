import React, { useEffect, useState } from 'react'
import './admin-compon/admin.css'

// Изображения игр
import cs2Image from '../../../public/img/cs2.png'
import warzoneImage from '../../../public/img/warzone.png'
import dota2Image from '../../../public/img/dota2.png'
import valorantImage from '../../../public/img/valorant.png'
import apexImage from '../../../public/img/apex.png'
import mobileLegendsImage from '../../../public/img/ML.png'

// Список игр
const games = [
	{ name: 'CS 2', image: cs2Image },
	{ name: 'War Zone', image: warzoneImage },
	{ name: 'DOTA 2', image: dota2Image },
	{ name: 'Valorant', image: valorantImage },
	{ name: 'Apex', image: apexImage },
	{ name: 'Mobile Legend', image: mobileLegendsImage },
]

function Admin() {
	const [clientsData, setClientsData] = useState([])
	const [token, setToken] = useState('')
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedGame, setSelectedGame] = useState(null)
	const [isAlertShown, setIsAlertShown] = useState(false)
	const [isPromptShown, setIsPromptShown] = useState(false)

	// Обработчик поиска
	const handleSearchChange = e => {
		setSearchQuery(e.target.value)
	}

	// Фильтрация клиентов по поисковому запросу и выбранной игре
	const filteredClients = clientsData?.filter(client => {
		const matchesSearch =
			client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			client.vk?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			client.price.toLowerCase().includes(searchQuery.toLowerCase())

		const matchesGame = selectedGame ? client.game === selectedGame : true

		return matchesSearch && matchesGame
	})

	useEffect(() => {
		// Если токен уже есть или промпт уже был показан, выходим
		if (token != '' || isPromptShown) return

		// Запрашиваем пароль через prompt
		const password = prompt('Введите пароль:')
		setIsPromptShown(true)

		// Если пароль был введён
		if (password) {
			// Запрашиваем токен с сервера
			fetch(`${import.meta.env.VITE_API_URL}/auth`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					password,
				}),
			})
				.then(res => res.json())
				.then(json => {
					if (json.token) {
						// Если токен получен, сохраняем его
						setToken(json.token)
					} else {
						// Показываем alert только один раз при неверном пароле
						if (!isAlertShown) {
							alert('Неверный пароль')
							setIsAlertShown(true)
						}
					}
				})
				.catch(error => {
					console.error('Ошибка при аутентификации:', error)
				})
		}
	}, [token, isPromptShown, isAlertShown])

	useEffect(() => {
		// Если токена нет, не запрашиваем данные
		if (!token) return

		// Запрашиваем данные клиентов
		fetch(`${import.meta.env.VITE_API_URL}/admin`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(json => setClientsData(json.data))
			.catch(error => {
				console.error('Ошибка при получении данных:', error)
			})
	}, [token])

	if (token) {
		return (
			<div className='admin-panel'>
				{/* Поисковая строка */}
				<div className='search-bar'>
					<input
						type='text'
						placeholder='Поиск по почте, игре, имени или ВК'
						value={searchQuery}
						onChange={handleSearchChange}
					/>
				</div>

				<div className='content'>
					{/* Панель фильтров игр */}
					<div className='filter-panel'>
						<h3>Фильтр по играм</h3>
						<ul>
							{games.map((game, index) => (
								<li key={index}>
									<button onClick={() => setSelectedGame(game.name)}>
										{game.name}
									</button>
								</li>
							))}
							<li>
								<button onClick={() => setSelectedGame(null)}>Все игры</button>
							</li>
						</ul>
					</div>

					{/* Список клиентов */}
					<div className='client-list'>
						<table>
							<thead>
								<tr>
									<th>Игра</th>
									<th>Цена</th>
									<th>Имя</th>
									<th>Почта</th>
									<th>ВК</th>
									<th>Доп. информация</th>
									<th>Герой</th>
									<th>Ачивка</th>
									<th>От уровня</th>
									<th>До уровня</th>
									<th>От ранга</th>
									<th>До ранга</th>
								</tr>
							</thead>
							<tbody>
								{filteredClients?.map(client => (
									<tr key={client.id}>
										<td>{client.game}</td>
										<td>{client.price}</td>
										<td>{client.name}</td>
										<td>{client.email}</td>
										<td>
											<a
												href={`https://${client.social}`}
												target='_blank'
												rel='noreferrer'
											>
												{client.social}
											</a>
										</td>
										<td>{client.details}</td>
										<td>{client.character}</td>
										<td>{client.achieve}</td>
										<td>{client.rankfrom}</td>
										<td>{client.rankto}</td>
										<td>{client.rangefrom}</td>
										<td>{client.rangeto}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
	else {
		// Если токен отсутствует, не рендерим ничего
		return null
	}
}

export default Admin
