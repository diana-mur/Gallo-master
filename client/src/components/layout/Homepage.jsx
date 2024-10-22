import React from 'react'
import Footer from './footer'
import Header from './header'
import './layout.css'
import FormCSGO from '../form/formCSGO'

function Homepage() {
	return (
		<>
			<Header />
			<div className='shine'></div>
			<main>
				<section className='sectionMain'>
					<div className='mainpich'></div>
					<div className='maintext'>
						<p>
							Команда по бусту аккаунтов в играх занимается повышением уровня и
							<br /> улучшением игровых показателей для клиентов. Мы анализируем
							<br /> рынок и целевую аудиторию, чтобы предложить наиболее
							<br /> востребованные услуги. Наша команда состоит из опытных
							игроков,
							<br /> которые выполняют заказы по прокачке быстро и качественно.
							Мы
							<br /> предлагаем прозрачное отслеживание прогресса и гарантируем
							<br /> высокий уровень сервиса.
						</p>
					</div>
				</section>
				<section>
					<div className='shine2'></div>
					<div>
						<FormCSGO />
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Homepage
