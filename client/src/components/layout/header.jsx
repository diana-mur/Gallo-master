import React from 'react'

function Header() {
	return (
		<>
			<header>
				<div className='wrapHead'>
					<div className='wrapLogo'></div>
					<div>
						<span className='nameSite'>GALLO</span>
					</div>
					<a href='#bust'>
						<button type='button' className='headBtn roboto-medium'>
							Купить буст
						</button>
					</a>
				</div>
			</header>
		</>
	)
}

export default Header
