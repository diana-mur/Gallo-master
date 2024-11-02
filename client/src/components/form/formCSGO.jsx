import React, { useState } from 'react'

import cs2Image from '../../../public/img/cs2.png'
import warzoneImage from '../../../public/img/warzone.png'
import dota2Image from '../../../public/img/dota2.png'
import valorantImage from '../../../public/img/valorant.png'
import apexImage from '../../../public/img/apex.png'
import mobileLegendsImage from '../../../public/img/ML.png'

function FormCSGO() {
	const [currentGameIndex, setCurrentGameIndex] = useState(0)
	const [range, setRange] = useState({ from: '', to: '' }) // для селекта
	const [rank, setRank] = useState({ from: '0', to: '200' }) // для инпута
	const [activeInput, setActiveInput] = useState('from')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [social, setSocial] = useState('')
	const [details, setDetails] = useState('')
	const [selectedCharacter, setSelectedCharacter] = useState('')
	const [selectedAchievement, setSelectedAchievement] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [total, setTotal] = useState('')
	const [isEmail, setIsEmail] = useState(false)

	// Список игр с изображениями
	const games = [
		{ name: 'CS 2', unit: 'Эло', image: cs2Image },
		{ name: 'War Zone', unit: 'рейтингу', image: warzoneImage },
		{ name: 'DOTA 2', unit: 'mmr', image: dota2Image },
		{ name: 'Valorant', unit: 'званию', image: valorantImage },
		{ name: 'Apex', unit: 'рангу', image: apexImage },
		{ name: 'Mobile Legend', unit: 'звёздам', image: mobileLegendsImage },
	]

	// Ранги для Apex
	const apexRanks = [
		{ name: 'Новичок', min: 0, max: 1000, price: 0.8 }, // цена за один уровень в рублях
		{ name: 'Бронза', min: 1001, max: 3000, price: 1.1 },
		{ name: 'Серебро', min: 3001, max: 5400, price: 1.3 },
		{ name: 'Золото', min: 5401, max: 8200, price: 1.7 },
		{ name: 'Платина', min: 8201, max: 11400, price: 1.8 },
		{ name: 'Бриллиант', min: 11401, max: 15000, price: 2.4 },
		{ name: 'Мастер', min: 15001, max: 34900, price: 2.4 }
	]

	const apexCharacters = [
		'Wraith',
		'Bloodhound',
		'Octane',
		'Lifeline',
		'Pathfinder',
		'Gibraltar',
	]

	const apexAchievements = [
		{ name: '20 + 3k в одиночном', price: 2000 },
		{ name: '20 убийств + 4000 урона', price: 1500 },
		{ name: 'Один в поле воин', price: 2000 },
		{ name: 'Зверь-Одиночка', price: 1500 },
		{ name: 'Жатва (20 убийств)', price: 1200 },
		{ name: 'Гнев Легенды 4 (4000 урона)', price: 800 },
		{ name: 'Командная работа 4', price: 4000 },
		{ name: '5 Серий побед', price: 12000 },
		{ name: 'Три в одном', price: 3000 },
		{ name: 'Убийца 1', price: 200 },
		{ name: 'Убийца 2', price: 1000 },
		{ name: 'Убийца 3', price: 4500 },
		{ name: 'Убийца 4', price: 8000 },
		{ name: 'Гнев Легенды 1 (2000 урона)', price: 200 },
		{ name: 'Гнев Легенды 2 (3000 урона)', price: 700 },
		{ name: 'Командная работа 1', price: 700 },
		{ name: 'Командная работа 2', price: 1500 },
		{ name: 'Командная работа 3', price: 2500 },
		{ name: 'Уничтожение отряда', price: 600 },
		{ name: 'Со всеми деталями', price: 400 },
		{ name: 'Универсальный игрок', price: 11000 },
		{ name: 'Командное позерство 1', price: 1100 },
		{ name: 'Командное позерство 2', price: 1500 },
		{ name: 'Командное позерство 3', price: 300 },
		{ name: 'Дальнобойщик', price: 1500 },
		{ name: 'Мастер на все руки', price: 28000 },
		{ name: 'Без свидетелей', price: 4000 },
		{ name: 'Высший хищник', price: 2200 },
		{ name: 'Снайпер', price: 1000 },
		{ name: 'Двойные обязательства', price: 2300 },
		{ name: 'Чистая победа 1', price: 2000 },
		{ name: 'Чистая победа 2', price: 3300 },
		{ name: 'Лихой снайпер', price: 2100 },
		{ name: 'Огневая серия', price: 1200 },
		{ name: 'Своих не бросаем', price: 400 },
		{ name: 'Быстрое убийство', price: 2800 },
		{ name: 'Отзыв подкреплений', price: 600 },
		{ name: 'Лидер', price: 200 },
		{ name: 'Продолжение следует', price: 400 },
		{ name: '4 Серии побед', price: 5500 },
		{ name: '3 Серии побед', price: 2300 },
		{ name: 'Серия побед', price: 1300 }
	]

	// Волорант
	const valorantRanks = [
		{ name: 'Железо', num: 1 },
		{ name: 'Бронза', num: 2 },
		{ name: 'Серебро', num: 3 },
		{ name: 'Золото', num: 4 },
		{ name: 'Платина', num: 5 },
		{ name: 'Алмаз', num: 6 },
		{ name: 'Восхождение', num: 7 },
		{ name: 'Бессмертие', num: 8 },
		{ name: 'Радиант', num: 9 },
	]

	const ML = [
		{ num: 1, name: 'Эпик' },
		{ num: 2, name: 'Легенда', price: 100 },
		{ num: 3, name: 'Мифический', price: 200 }
	]

	const mifik = [
		{ name: 'Мифический', min: 0, max: 25, price: 12 }, // цена за одну звезду в данном диапазоне
		{ name: 'Мифическая честь', min: 26, max: 50, price: 20 },
		{ name: 'Мифическая слава', min: 51, max: 100, price: 30 },
		{ name: 'Мифический бессмертный', min: 101, max: 200, price: 35 }
	]

	const CS = [
		{ name: '3', price: 675 }, // уровни 3-4
		{ name: '4', price: 690 },
		{ name: '5', price: 945 },
		{ name: '6', price: 1155 },
		{ name: '7', price: 1440 },
		{ name: '8', price: 1507 },
		{ name: '9', price: 2425 },
	]

	const Dota = [
		{ min: 0, max: 1500, price: 0.9 },
		{ min: 1501, max: 2500, price: 1.1 },
		{ min: 2501, max: 3000, price: 1.5 },
		{ min: 3001, max: 3500, price: 1.9 },
		{ min: 3501, max: 4000, price: 2.3 },
		{ min: 4001, max: 4500, price: 2.7 },
		{ min: 4501, max: 5000, price: 3.1 },
		{ min: 5001, max: 5100, price: 3.5 },
		{ min: 5101, max: 5200, price: 3.7 },
		{ min: 5201, max: 5300, price: 3.9 },
		{ min: 5301, max: 5400, price: 4.1 },
		{ min: 5401, max: 5500, price: 4.3 },
		{ min: 5501, max: 5600, price: 4.7 },
		{ min: 5601, max: 5700, price: 5.1 },
		{ min: 5701, max: 5800, price: 5.5 },
		{ min: 5801, max: 5900, price: 5.9 },
		{ min: 5901, max: 6000, price: 6.3 },
		{ min: 6001, max: 6100, price: 6.7 },
		{ min: 6101, max: 6200, price: 6.9 },
		{ min: 6201, max: 6300, price: 7.3 },
		{ min: 6301, max: 6400, price: 7.7 },
		{ min: 6401, max: 6500, price: 8.1 },
		{ min: 6501, max: 6600, price: 8.5 },
		{ min: 6601, max: 6700, price: 8.9 },
		{ min: 6701, max: 6800, price: 9.3 },
		{ min: 6801, max: 6900, price: 9.7 },
		{ min: 6901, max: 7000, price: 10.1 },
		{ min: 7001, max: 7100, price: 10.5 },
		{ min: 7101, max: 7200, price: 10.9 },
		{ min: 7201, max: 7300, price: 11.3 },
		{ min: 7301, max: 7400, price: 11.7 },
		{ min: 7401, max: 7500, price: 12.1 },
		{ min: 7501, max: 7600, price: 12.5 },
		{ min: 7601, max: 7700, price: 13 },
		{ min: 7701, max: 7800, price: 13.4 },
		{ min: 7801, max: 7900, price: 13.8 },
		{ min: 7901, max: 8000, price: 15 },
	]

	const CoD = [
		{ min: 0, max: 1000, price: 2 },
		{ min: 1001, max: 2000, price: 2.5 },
		{ min: 2001, max: 3000, price: 3 },
		{ min: 3001, max: 4000, price: 5 },
		{ min: 4001, max: 5000, price: 8 },
		{ min: 5001, max: 6000, price: 9 },
		{ min: 6001, max: 7000, price: 10 },
		{ min: 7001, max: 8000, price: 10.5 },
		{ min: 8001, max: 9000, price: 13 },
		{ min: 9001, max: 10000, price: 16 },
		{ min: 10001, max: 11000, price: 20 },
		{ min: 11001, max: 12000, price: 25 },
		{ min: 12001, max: 13000, price: 26 },
		{ min: 13001, max: 14000, price: 29 },
		{ min: 14001, max: 15000, price: 32 },
		{ min: 15001, max: 16000, price: 36 },
		{ min: 16001, max: 17000, price: 38 },
		{ min: 17001, max: 18000, price: 40 },
		{ min: 18001, max: 19000, price: 42 },
		{ min: 19001, max: 30000, price: 43 },
	]

	const nextGame = () => {
		setRange({ from: '', to: '' })
		setRank({ from: '0', to: '200' })
		setSelectedCharacter('')
		setSelectedAchievement('')
		setCurrentGameIndex(prevIndex =>
			prevIndex === games.length - 1 ? 0 : prevIndex + 1
		)
	}

	const prevGame = () => {
		setRange({ from: '', to: '' })
		setRank({ from: '0', to: '200' })
		setSelectedCharacter('')
		setSelectedAchievement('')
		setCurrentGameIndex(prevIndex =>
			prevIndex === 0 ? games.length - 1 : prevIndex - 1
		)
	}

	// Введенное значение в инпуте влияет на селект ранг (Apex)
	function handleInputSelectChange(valueInput, value, setValueSelect, array, setValueInput) {
		if (!valueInput || !value || !setValueSelect || !array) {
			return setValueInput(prev => ({ ...prev, [value]: valueInput }))
		}

		if (valueInput > 34900) {
			setValueInput(prev => ({ ...prev, [value]: 34600 }))
			return
		}
		else {
			setValueInput(prev => ({ ...prev, [value]: valueInput }))
		}

		let valueRank = array.find(item => Number(item.min) <= Number(valueInput) && Number(valueInput) <= Number(item.max)
		)

		return setValueSelect(prev => ({ ...prev, [value]: valueRank?.name }))
	}


	// Выбранное значение ранга влияет на инпут (Apex)
	const handleSelectInputChange = (valueSelect, value, setValueInput, array) => {
		let valueRank = array.find(item =>
			item.name == valueSelect
		);

		return setValueInput(prev => ({ ...prev, [value]: valueRank.min }));
	}

	const handleSelectChange = (e) => {
		const { name, value } = e.target
		setRange(prevRange => ({
			...prevRange,
			[name]: value,
		}))
	}

	const handleInputChange = (e) => {
		const value = e.target.value
		if (value >= 0 && value <= 30000) {
			setRank(prevRange => ({
				...prevRange,
				[activeInput]: value,
			}))
		}
	}

	const handleFocus = e => {
		setActiveInput(e.target.name)
	}

	const handleCharacterChange = e => {
		setSelectedCharacter(e.target.value)
	}

	const handleAchievementChange = e => {
		setSelectedAchievement(e.target.value)
	}

	const handleEmail = (e) => {
		const input = e.target.value
		setEmail(input)
		const clean = /^[^\s@]+@[^\s@]+\.\[^\s@]/
		setIsEmail(clean.test(input))
	}	

	const summaStars = (star, array) => {
		let summa = 0
		for (let i = 0; i < array.length; i++) {
			if ((star / array[i].max) <= 1 && (star / array[i].max) > 0) {
				summa += (star - array[i].min) * array[i].price
				console.log(summa);

				summa.toFixed(2)
				summa = parseFloat(summa.toFixed(2))
				return summa
			} else {
				(i > 1) ?
					summa += (array[i].max - array[i - 1].max) * array[i].price
					:
					summa += array[i].max * array[i].price
			}
		}
	}

	const calculatePrice = () => {
		// Логика расчета цены
		if (games[currentGameIndex].name === 'Apex') {
			let totalCost = 0;

			for (let mmr = Number(rank.from) + 1; mmr <= Number(rank.to); mmr++) {
				// Найти диапазон MMR, к которому относится текущее значение
				const rang = apexRanks.find(item => mmr >= item.min && mmr <= item.max);
				if (rang) {
					totalCost += rang.price; // Добавить цену из найденного диапазона
					totalCost.toFixed(2)
				}
			}
			totalCost = parseFloat(totalCost.toFixed(2))

			const achivka = apexAchievements.find(item => item.name == selectedAchievement)

			if (achivka) {
				totalCost += achivka.price
			}
			totalCost = parseFloat(totalCost.toFixed(2))
			setTotal(totalCost);
		}

		if (games[currentGameIndex].name === 'CS 2') {
			let totalCost = 0;

			for (let mmr = Number(range.from); mmr < Number(range.to); mmr++) {
				// Найти диапазон уровней, к которому относится текущее значение
				const rang = CS.find(item => mmr == item.name);
				if (rang) {
					totalCost += rang.price; // Добавить цену из найденного диапазона
					totalCost.toFixed(2)
				}
			}
			totalCost = parseFloat(totalCost.toFixed(2))
			setTotal(totalCost);
		}

		if (games[currentGameIndex].name === 'Mobile Legend') {
			let totalCost = 0;
			let sum1 = 0
			let sum2 = 0

			const numFrom = ML.find(item => range.from == item.name)
			const numTo = ML.find(item => range.to == item.name)

			for (let index = Number(numFrom.num); index <= Number(numTo.num); index++) {

				// Найти диапазон уровней, как объектов, к которому относится текущее значение
				const rang = ML.find(item => index == item.num);

				if (rang.num != 1) {
					totalCost += rang.price; // Добавить цену из найденного диапазона
					totalCost.toFixed(2)
				}
			}
			if (range.to == 'Мифический') {
				sum1 = summaStars(rank.from, mifik);
				sum2 = summaStars(rank.to, mifik);
			}

			if (range.from == 'Эпик' || range.from == 'Легенда') {
				totalCost += sum2;
			}
			else {
				totalCost += (sum2 - sum1);
			}

			totalCost = parseFloat(totalCost.toFixed(2))
			setTotal(totalCost);
		}

		if (games[currentGameIndex].name === 'War Zone') {
			let totalCost = 0;

			for (let mmr = Number(rank.from) + 1; mmr <= Number(rank.to); mmr++) {
				// Найти диапазон MMR, к которому относится текущее значение
				const rang = CoD.find(item => mmr >= item.min && mmr <= item.max);

				if (rang) {
					totalCost += rang.price; // Добавить цену из найденного диапазона
					totalCost.toFixed(2)
				}
			}
			totalCost = parseFloat(totalCost.toFixed(2))
			setTotal(totalCost);
		}

		if (games[currentGameIndex].name === 'DOTA 2') {
			let totalCost = 0;

			for (let mmr = Number(rank.from) + 1; mmr <= Number(rank.to); mmr++) {
				// Найти диапазон MMR, к которому относится текущее значение
				const rang = Dota.find(item => mmr >= item.min && mmr <= item.max);
				console.log(mmr);

				if (rang) {
					totalCost += rang.price; // Добавить цену из найденного диапазона
					totalCost.toFixed(2)
				}
			}
			totalCost = parseFloat(totalCost.toFixed(2))
			setTotal(totalCost);
		}

		if (games[currentGameIndex].name === 'Valorant') {
			let totalCost = 0;

			const num1 = valorantRanks.find(item => range.from == item.name)?.num;
			const num2 = valorantRanks.find(item => range.to == item.name)?.num;

			const priceRangs2 = 100 * (1.44 ** num2); //
			let sumDivisions = 0;

			// если ранги разные
			for (let mmr = num1; mmr < num2; mmr++) {
				const priceRangs = 100 * (1.44 ** mmr);

				if (mmr == num1) {
					let x = 0;

					rank.from == 1
						?
						x = 0
						:
						rank.from == 2
							?
							x = 1
							:
							x = 2

					sumDivisions -= (priceRangs * x) / 3;
				}

				totalCost += priceRangs;
				totalCost.toFixed(2)
			}

			// если один ранг
			if (num1 == num2) {
				const priceRangs = 100 * (1.44 ** num1);
				let x = 0;
				let x2 = 0;

				rank.from == 1
					?
					x = 0
					:
					rank.from == 2
						?
						x = 1
						:
						x = 2

				sumDivisions -= (priceRangs * x) / 3;
				console.log(sumDivisions);


				rank.to - rank.from == 1
					?
					x2 = 1
					:
					rank.to - rank.from == 2
						?
						x2 = 2
						:
						x2 = 0

				sumDivisions += priceRangs2 * (x2 / 3);
				totalCost += sumDivisions;
				totalCost = parseFloat(totalCost.toFixed(2))
				setTotal(totalCost);
			}
			else if (num1 != num2) {
				let x2 = 0;

				rank.to == 1
					?
					x2 = 0
					:
					rank.to == 2
						?
						x2 = 1
						:
						x2 = 2

				sumDivisions += priceRangs2 * (x2 / 3);
				totalCost += sumDivisions;
				totalCost = parseFloat(totalCost.toFixed(2))
				setTotal(totalCost);

			}
		}

		setIsModalOpen(true) // Открываем модалку
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const sendForm = async () => {
		fetch(`${import.meta.env.VITE_API_URL}/form`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				social,
				details,
				game: games[currentGameIndex].name,
				rankFrom: rank?.from,
				rankTo: rank?.to,
				rangeFrom: range?.from,
				rangeTo: range?.to,
				character: selectedCharacter,
				achieve: selectedAchievement,
				price: total
			}),
		})
	}

	return (
		<div className='boost-calculator' id='bust'>
			<div className='boost-calculator__left'>
				<h2 className='boost-calculator__title roboto-bold'>
					Выберите игру и буст
				</h2>
				<p className='boost-calculator__description roboto-light'>
					У каждой игры своя единица буста, в зависимости
					<br /> от игры и количества единиц мы поможем вам
					<br /> расчитать цену.
				</p>

				<div className='boost-calculator__game-selector'>
					<button onClick={prevGame} className='boost-calculator__arrow-button'>
						{'<'}
					</button>
					<span className='boost-calculator__game-name roboto-bold'>
						{games[currentGameIndex].name}
					</span>
					<button onClick={nextGame} className='boost-calculator__arrow-button'>
						{'>'}
					</button>
				</div>

				<div className='boost-calculator__range-selector roboto-light'>
					{/* apex */}
					{games[currentGameIndex].name === 'Apex' && (
						<>
							<p className='boost-calculator__range-label'>Выбрать ранг:</p>
							<div className='boost-calculator__slider-inputs'>
								<select
									name='from'
									value={range.from}
									onChange={e => {
										handleSelectChange(e);
										handleSelectInputChange(e.target.value, 'from', setRank, apexRanks)
									}}
									className='boost-calculator__input'
								>
									<option key={0} value="Не выбрано">Не выбрано</option>
									{apexRanks.map((rank, index) => (
										<option key={index + 1} value={rank.name}>
											{rank.name}
										</option>
									))}
								</select>
								<input type="text"
									className='boost-calculator__input'
									pattern='[0-9]'
									maxLength={5}
									value={rank.from}
									onChange={e => {
										handleInputSelectChange(e.target.value, 'from', setRange, apexRanks, setRank);

									}}
								/>
								<select
									name='to'
									value={range.to}
									onChange={e => {
										handleSelectChange(e);
										handleSelectInputChange(e.target.value, 'to', setRank, apexRanks)
									}}
									className='boost-calculator__input'
								>
									<option key={0} value="Не выбрано">Не выбрано</option>
									{apexRanks.map((rank, index) => (
										<option key={index + 1} value={rank.name}>
											{rank.name}
										</option>
									))}
								</select>
								<input type="text"
									className='boost-calculator__input'
									pattern='[0-9]'
									maxLength={5}
									value={rank.to}
									onChange={e => {
										handleInputSelectChange(e.target.value, 'to', setRange, apexRanks, setRank)
									}}
								/>
							</div>

							<p className='boost-calculator__range-label'>
								Выбрать персонажа и ачивку:
							</p>
							<div className='boost-calculator__slider-inputs'>
								<select
									value={selectedCharacter}
									onChange={handleCharacterChange}
									className='boost-calculator__input'
								>
									<option key={0} value="Не выбрано">Не выбрано</option>
									{apexCharacters.map((character, index) => (
										<option key={index + 1} value={character}>
											{character}
										</option>
									))}
								</select>
								<select
									value={selectedAchievement}
									onChange={handleAchievementChange}
									className='boost-calculator__input'
								>
									<option key='0' value="Без ачивки">Без ачивки</option>
									{apexAchievements.map((achievement, index) => (
										<option key={index + 1} value={achievement.name}>
											{achievement.name}
										</option>
									))}
								</select>
							</div>
						</>
					)}
					{games[currentGameIndex].name === 'Valorant' && (
						<>
							<p className='boost-calculator__range-label'>Выбрать звание:</p>
							<div className='boost-calculator__slider-inputs'>
								<select
									name='from'
									value={range.from}
									onChange={handleSelectChange}
									className='boost-calculator__input'
								>
									<option key={0} value="Не выбрано">Не выбрано</option>
									{valorantRanks.map((rank, index) => (
										<option key={index + 1} value={rank.name}>
											{rank.name}
										</option>
									))}
								</select>
								<select
									name='from'
									value={rank.from}
									onChange={handleInputChange}
									onFocus={handleFocus}
									className='boost-calculator__input'
								>
									<option key={0} value="Не выбрано">Не выбрано</option>
									<option key={1} value={1}>1</option>
									<option key={2} value={2}>2</option>
									<option key={3} value={3}>3</option>
								</select>
								<select
									name='to'
									value={range.to}
									onChange={handleSelectChange}
									className='boost-calculator__input'
								>
									<option key={0} value="Не выбрано">Не выбрано</option>
									{valorantRanks.map((rank, index) => (
										<option key={index + 1} value={rank.name}>
											{rank.name}
										</option>
									))}
								</select>
								<select
									name='to'
									value={rank.to}
									onChange={handleInputChange}
									onFocus={handleFocus}
									className='boost-calculator__input'
								>
									<option key={0} value="Не выбрано">Не выбрано</option>
									<option key={1} value={1}>1</option>
									<option key={2} value={2}>2</option>
									<option key={3} value={3}>3</option>
								</select>
							</div>
						</>
					)}
					{games[currentGameIndex].name === 'Mobile Legend' && (
						<>
							<p className='boost-calculator__range-label'>Выбрать звание:</p>
							<div className='boost-calculator__slider-inputs'>
								<select
									name='from'
									value={range.from}
									onChange={handleSelectChange}
									className='boost-calculator__input'
								>
									<option key={0} value="Не выбрано">Не выбрано</option>
									{ML.map((rank, index) => (
										<option key={index + 1} value={rank.name}>
											{rank.name}
										</option>
									))}
								</select>
								<select
									name='to'
									value={range.to}
									onChange={handleSelectChange}
									className='boost-calculator__input'
								>
									<option key={0} value="Не выбрано">Не выбрано</option>
									{ML.map((rank, index) => (
										<option key={index + 1} value={rank.name}>
											{rank.name}
										</option>
									))}
								</select>
							</div>

							{range.to == 'Мифический' && (
								<div className="">
									<p className='boost-calculator__range-label'>
										Выбрать кол-во по {games[currentGameIndex].unit}:
									</p>
									<div className='boost-calculator__slider-inputs'>
										<input
											type='number'
											name='from'
											pattern='[0-9]'
											value={rank.from}
											onChange={handleInputChange}
											onFocus={handleFocus}
											placeholder='От'
											className='boost-calculator__input'
										/>
										<input
											type='number'
											name='to'
											pattern='[0-9]'
											value={rank.to}
											onChange={handleInputChange}
											onFocus={handleFocus}
											placeholder='До'
											className='boost-calculator__input'
										/>
									</div>
									<input
										type='range'
										min='0'
										max='200'
										value={rank[activeInput]}
										onChange={handleInputChange}
										className='boost-calculator__range'
										style={{
											background: `linear-gradient(to right, red 0%, red ${rank[activeInput] / 2}%, gray ${rank[activeInput] / 2}%, gray 100%)`,
										}}
									/>
								</div>
							)}
						</>
					)}
					{games[currentGameIndex].name === 'CS 2' && (
						<>
							<p className='boost-calculator__range-label'>Выбрать уровень:</p>
							<div className='boost-calculator__slider-inputs'>
								<select
									name='from'
									value={range.from}
									onChange={handleSelectChange}
									className='boost-calculator__input'
								>
									<option key={0} value="Не выбрано">Не выбрано</option>
									{CS.map((lvl, index) => (
										<option key={index + 1} value={lvl.name}>
											{lvl.name}
										</option>
									))}
								</select>
								<select
									name='to'
									value={range.to}
									onChange={handleSelectChange}
									className='boost-calculator__input'
								>
									<option key={0} value="Не выбрано">Не выбрано</option>
									{CS.map((lvl, index) => (
										<option key={index + 1} value={lvl.name}>
											{lvl.name}
										</option>
									))}
								</select>
							</div>
						</>
					)}
					{games[currentGameIndex].name === 'DOTA 2' && (
						<>
							<p className='boost-calculator__range-label'>
								Выбрать кол-во по {games[currentGameIndex].unit}:
							</p>
							<div className='boost-calculator__slider-inputs'>
								<input
									type='number'
									name='from'
									pattern='[0-9]'
									value={rank.from}
									onChange={handleInputChange}
									onFocus={handleFocus}
									placeholder='От'
									className='boost-calculator__input'
								/>
								<input
									type='number'
									name='to'
									pattern='[0-9]'
									value={rank.to}
									onChange={handleInputChange}
									onFocus={handleFocus}
									placeholder='До'
									className='boost-calculator__input'
								/>
							</div>
							<input
								type='range'
								min='0'
								max='8000'
								value={rank[activeInput]}
								onChange={handleInputChange}
								className='boost-calculator__range'
								style={{
									background: `linear-gradient(to right, red 0%, red ${rank[activeInput] / 80}%, gray ${rank[activeInput] / 80}%, gray 100%)`,
								}}
							/>
						</>
					)}
					{games[currentGameIndex].name === 'War Zone' && (
						<>
							<p className='boost-calculator__range-label'>
								Выбрать кол-во по {games[currentGameIndex].unit}:
							</p>
							<div className='boost-calculator__slider-inputs'>
								<input
									type='number'
									name='from'
									pattern='[0-9]'
									min='0'
									max='30000'
									value={rank.from}
									onChange={handleInputChange}
									onFocus={handleFocus}
									placeholder='От'
									className='boost-calculator__input'
								/>
								<input
									type='number'
									name='to'
									pattern='[0-9]'
									min='0'
									max='30000'
									value={rank.to}
									onChange={handleInputChange}
									onFocus={handleFocus}
									placeholder='До'
									className='boost-calculator__input'
								/>
							</div>
							<input
								type='range'
								min='0'
								max='30000'
								value={rank[activeInput]}
								onChange={handleInputChange}
								className='boost-calculator__range'
								style={{
									background: `linear-gradient(to right, red 0%, red ${rank[activeInput] / 300}%, gray ${rank[activeInput] / 300}%, gray 100%)`,
								}}
							/>
						</>
					)}
					<div className='wrapBtn'>
						<button
							onClick={calculatePrice}
							className='boost-calculator__calculate-button roboto-medium'
						>
							Рассчитать цену
						</button>
						{isModalOpen && (
							<div className='modal'>
								<div className='modal-content'>
									<button className='close-button' onClick={closeModal}>
										&times;
									</button>
									<h3 className='model-title'>Расчётная стоимость буста:</h3>
									<h2 className='model-price'>{total} руб.</h2>
									<form>
										<div className='name_email'>
											<div className='form-group'>
												<label className='form-label'>Имя</label>
												<input
													type='text'
													className='input-field'
													placeholder='Введите ваше имя'
													value={name}
													onChange={e => setName(e.target.value.replace(/[^А-Яа-яA-Za-z-]/g, ''))}
												/>
												<span className='Name'></span>
											</div>
											<div className='form-group'>
												<label className='form-label'>
													Email (обязательно)
												</label>
												<input
													type='email'
													className='input-field'
													placeholder='Email address'
													value={email}
													onChange={handleEmail}
												/>
												<span className='Email'></span>
											</div>
										</div>
										<div className='form-group'>
											<label className='form-label special-m'>
												Ссылка на соц. сеть
												<br />
												(необязательно)
											</label>
											<input
												type='text'
												className='input-field'
												placeholder='vk.com'
												value={social}
												onChange={e => setSocial(e.target.value.replace(/[^А-Яа-яA-Za-z-/:]/g, ''))}
											/>
											<span className='Network'></span>
										</div>
										<div className='form-group'>
											<label className='form-label margB'>
												Уточнения для связи:
											</label>
											<textarea
												className='textarea-field'
												placeholder='Комментарии...'
												value={details}
												onChange={e => setDetails(e.target.value.replace(/[^А-Яа-яA-Za-z0-9-]/g, ''))}
											></textarea>
										</div>
										{
											isEmail && total > 0 && <button onClick={sendForm} type='submit' className='submit-button'>
												Отправить
											</button>
										}
										{
											!isEmail && <button onClick={sendForm} type='submit' className='submit-button' disabled>
												Отправить
											</button>
										}
									</form>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Изображение игры, которое меняется */}
			<div className='boost-calculator__right'>
				<img
					src={games[currentGameIndex].image}
					alt={games[currentGameIndex].name}
					className='boost-calculator__game-image'
				/>
			</div>
		</div>
	)
}

export default FormCSGO
