import React, { useState } from "react";

function ImageCreate () {

	// Constante statut image bien ajout
	const __STATUS_OK__ = "Ton Image à bien été ajouté !"

	// Mise en place des différentes variables d'états
	const [name, setName] = useState ("");
	const [date, setDate] = useState ("");
	const [description, setDescription] = useState ("");
	const [status, setStatus] = useState ("");
	const [src, setSrc] = useState (null);

	// Fonction qui permet d'ajouter une image à la base de données
	const addImage = async () => {

		// Si le champ nom et date n'as pas été rempli, renvoie l'erreur et on arrete
		if (!name || !date)
			return setStatus("Il faut complété la date et le nom");

		// On créer une nouveau formulaire (on est obligé pour pouvoir stocker l'image)
		const imageData = new FormData();
		// On ajoute les élément au formulaire
		imageData.append("nom", name);
		imageData.append("date", date);
		imageData.append("description", description);
		if (src) imageData.append("src", src); // On ajoute que si l'image est pas vide, sinon bug !

		// On essaye de faire la requête à l'API
		try {
			// On fait une requête à notre API
			const response = await fetch ("https://leperuvienn.pythonanywhere.com/api/images/create/", {
				// Ici pas de contexte comme on envoie des données avec différent contexte (fichiers)
				method: "POST",
				body: imageData
			});
	
		// Si il ya une erreur on l'affiche dans la console
		} catch (err) {
			
			setStatus ("Error: " + err);
			console.error (err);

			return;
		}

		setStatus (__STATUS_OK__);
	}

	// Affichage du formulaire
	return (
		<div>
			<div className="flex flex-wrap justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">

				<input
					type="text"
					placeholder="Nom de l'image ..."
					className="mx-2 p-2 border border-gray-400 rounded"
					onChange={(e) => setName (e.target.value)}
				/>
				<input
					type="date"
					placeholder="Date de l'image ..."
					className="mx-2 p-2 border border-gray-400 rounded"
					onChange={(e) => setDate (e.target.value)}
				/>
				<input
					type="text"
					placeholder="Description de l'image ..."
					className="mx-2 p-2 border border-gray-400 rounded"
					onChange={(e) => setDescription (e.target.value)}
				/>
				<input
					type="file"
					accept="image/*"
					className="mx-2 p-2 border border-gray-400 rounded"
					onChange={(e) => setSrc (e.target.files[0])}
				/>

				<button
					className="mx-4 p-2 border border-gray-400 rounded"
					onClick={addImage}
				> 
					Ajouter l'image
				</button>

			</div>
			<p className={`mt-2 text-center ${status === __STATUS_OK__ ? "text-green-500" : "text-red-500"}`}>
			  {status}
			</p>
		</div>
	)
}

export default ImageCreate;
