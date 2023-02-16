

1. Utiliser des noms au pluriel pour obtenir des données

	o GET /persons : obtenir la liste des personnes.
	
	o GET /cities/1 : obtenir la ville dont l’id est égal à 1.
	
	o GET /cities/1/persons : obtenir les personnes qui habitent la ville dont l’id est égal à 1. Cette notation reste la même si on remplace GET par un autre verbe.
	
	
2. Ordonner et Filtrer les données

	o GET /persons?sort=name : la liste des personnes dans l’ordre lexicographique.
	
	o GET /persons?name=Jack : toutes les personnes dont le champ name est Jack.
	
	o GET /persons?city=1 : la liste des personnes dont l’id de ville est 1.
	
	o GET /persons?city=1&sort=name : Les deux critères précédents en même temps.
	
	o GET /persons?fields=id,name&city=1&sort=name : La même requête que précédemment, mais on ne retourne que les id et les noms des personnes.
	
	o GET /persons?fields=id,name/cities?fields=id,name : Les id et noms des personnes, avec les id et noms de leurs villes.
	
	
II. Travail à réaliser


On souhaite créer un nouveau serveur qui intègre les données des deux tableaux ci-dessus et qui répond aux requêtes listées ci-dessous. Ecrivez ce nouveau serveur, et essayer de créer le maximum de services que vous pouvez parmi ceux de la liste :

	1. GET
		0. La liste des personnes
		1. La liste des personnes en précisant les champs que l’on souhaite obtenir (id, name, cities)
		2. La liste des personnes triées selon un champ (id ou name)
		3. Une personne en fonction de son id
		4. La liste des personnes en fonction de leur nom
		5. La liste des villes
		6. Une ville en fonction de son id
		
	2. PUT/POST
	
		0. Ajouter une personne
		1. Ajouter une ville
		3. PATCH
		0. Modifier une personne (au minimum le champ nom)
		1. Ajouter une ville à une personne (en donnant juste l’id de la ville)
		2. Supprimer une ville à une personne
		
	4. DELETE
		0. Supprimer une personne
		1. Supprimer une ville
