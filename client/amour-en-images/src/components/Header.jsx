import React from "react";

function Header () {

	return (
		<header>
			<div className="m-10">
				<h1 className="mb-4 text-3xl font-extrabold text-gray-900 text-black md:text-5xl lg:text-6xl">
					Notre
					<span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-red-400"> Amour </span> en Images.
					<small className="ms-2 font-semibold text-gray-500 text-gray-400"> car je t'aime trop </small>
				</h1>
				<p className="text-2xl font-normal text-gray-500 lg:text-xl text-gray-600">
					Salut Sarah ! Je t'ai fait ce petit site internet pour qu'on puisse paratager nous souvenir et plus jamais les perdres. Je rajouterais surement plus de trucs, mais c'est déja pas mal !
				</p>
			</div>
		</header>
	)
}

export default Header
