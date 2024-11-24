import { useEffect, useState } from "react";
import Image from "./Image.jsx"

function Images () {

	// Images datas
	const [images, setImages] = useState([]);

	// On utilise useEffect pour mettre à jour le composant juste après avoir récupérer les valeurs de l'API
	useEffect (() => {
		// Récupération des images ...
		fetchImages ();
	}, []);

	// définitions de la fonction asychrone ..
	const fetchImages = async () => {

		try {
			// On fait une requête à notre API
			const response = await fetch ("http://localhost:8000/api/images/");
			// On récupère les données JSON
			const data = await response.json ();
			// On met dans la variables images les données récupérées
			setImages (data);

		} catch (err) {
			
			// Si il ya eu des erreurs on les affiches
			console.error (err);
		}
	}

	// For each images we create his own Image Component
	return (
		<div className="grid grid-cols-3 gap-4 m-5">
			{images.map ((image) => (
				<Image
					key={image.idImage}
					idImage={image.idImage}
					nom={image.nom}
					date={image.date}
					description={image.description}
					src={image.src}
				/> 
			))}
		</div>
	)
}

export default Images;
