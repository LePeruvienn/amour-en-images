import React from "react";
import { useState } from "react";
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Importation des icônes

function Image ({ idImage, nom, date, description, src }) {

	// Mise en place des constantes
	const __STATE_VIEW__ = 0;
	const __STATE_EDIT__ = 1;

	// définition de la source de l'image
	const _src = `http://localhost:8000/${src}`;

	// Définition de l'état de l'image (mode édition ou non )
	const [state, setState] = useState (__STATE_VIEW__);
	const [newName, setNewName] = useState (nom);
	const [newDate, setNewDate] = useState (date);
	const [newDescription, setNewDescription] = useState (description);

	const handleEdit = () => {
		setState(state === __STATE_VIEW__ ? __STATE_EDIT__ : __STATE_VIEW__);
	}

	const deleteImage = async () => {

		if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'image "${nom}" ?`)) {
			try {
				// On fait une requête à notre API
				const response = await fetch (`http://localhost:8000/api/images/delete/${idImage}/`, {
					method: "DELETE",
				});

			} catch (err) {
				
				// Si il ya eu des erreurs on les affiches
				console.error (err);
			}
		}
	}

	return (
		<div className="w-full relative mx-auto h-auto overflow-hidden rounded-lg group">
			{/* Image */}
			<img
				src={_src}
				alt={nom}
				className="w-full h-auto relative z-0 rounded-lg transition-all duration-300 group-hover:scale-110"
			/>

			{/* Overlay noir sur l'image au survol */}
			<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>

			{/* Texte en haut de l'image (visible uniquement au survol) */}
			<div className="absolute top-2 left-2 text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
				{state === __STATE_VIEW__ ? ( // <===== CA MARCHE PAS TOUTES CETTE PARTIE LA !!
					<span>{nom}</span>
				) : (
					<input
						type="text"
						value={newName}
						className="text-white bg-black"
						onChange={(e) => setNewName(e.target.value)}
					/>
				)}
			</div>
			{/* Description au centre de l'image (visible uniquement au survol) */}
			<div className="absolute inset-0 flex justify-center items-center text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
				<p>
					{description}
				</p>
			</div>


			{/* Date en bas à gauche (visible uniquement au survol) */}
			<div className="absolute bottom-2 left-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
				{date}
			</div>

			{/* Icônes en bas à droite (visible uniquement au survol) */}
			<div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
				{/* Icône de modification */}
				<button className="text-white p-2" onClick={handleEdit}>
					<FaEdit />
				</button>
				
				{/* Icône de suppression */}
				<button className="text-white p-2" onClick={deleteImage}>
					<FaTrashAlt />
				</button>
			</div>
		</div>
	);
}

export default Image;
