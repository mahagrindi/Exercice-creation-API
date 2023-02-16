var express = require("express");
var data = require("./data");

var app = express();

app.use(express.json());

/******************************************  I  ***************************************/

// 1
//GET /persons
app.get("/persons", function (req, res) {
  res.send(data.persons);
});

//GET /cities/1

app.get("/cities/:id", function (req, res) {
  const ville = data.cities.find((c) => c.id === parseInt(req.params.id));
  if (!ville) {
    res.status(404).send("this ville not found");
  }

  res.status(200).send(ville);
});

//GET /cities/1/persons

app.get("/cities/:id/persons", function (req, res) {
  const personnesDansVilleId = data.persons.filter((personne) => {
    return (
      personne.cities &&
      personne.cities.some((ville) => ville.id === parseInt(req.params.id))
    );
  });

  console.log(personnesDansVilleId);

  res.status(200).send(personnesDansVilleId);
});

//2
//GET /persons?sort=name
app.get("/person", function (req, res) {
  const array = data.persons;

  array.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });

  console.log(array);
  res.send(array);
});

//GET /persons?name=Jack
app.get("/personsName", (req, res) => {
  const name = req.query.name; // Récupère la valeur du paramètre name dans la requête

  const personsWithName = data.persons.filter((person) => person.name === name);
  console.log(personsWithName);

  res.json(personsWithName);
});

//GET /persons?city=1

app.get("/personscity", (req, res) => {
  const cityId = req.query.city;
  const result = [];

  data.persons.forEach((person) => {
    if (person.cities)
      person.cities.forEach((city) => {
        if (city.id == cityId) {
          result.push(person);
        }
      });
  });
  console.log(result);
  res.json(result);
});

//GET /persons?city=1&sort=name

app.get("/personscitysort", (req, res) => {
  const cityId = req.query.city;
  const result = [];

  data.persons.forEach((person) => {
    if (person.cities)
      person.cities.forEach((city) => {
        if (city.id == cityId) {
          result.push(person);
        }
      });
  });
  result.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });
  console.log(result);
  res.json(result);
});

//GET /persons?fields=id,name&city=1&sort=name

app.get("/personscitysortfields", (req, res) => {
  const cityId = req.query.city;
  const fields = req.query.fields.split(",");
  const sortBy = req.query.sort;

  const result = [];

  data.persons.forEach((person) => {
    if (person.cities)
      person.cities.forEach((city) => {
        if (city.id == cityId) {
          const filteredPerson = {};
          fields.forEach((field) => {
            filteredPerson[field] = person[field];
          });
          result.push(filteredPerson);
        }
      });
  });

  if (sortBy) {
    result.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  }

  res.json(result);
});
//GET /persons?fields=id,name/cities?fields=id,name
app.get("/personsCities", (req, res) => {
  const personFields = req.query.fields.split("/");
  const cityFields = req.query.fields.split("/");

  const result = [];

  data.persons.forEach((person) => {
    const filteredPerson = {};
    personFields.forEach((field) => {
      filteredPerson[field] = person[field];
    });

    filteredPerson.cities = [];
    if (person.cities)
      person.cities.forEach((city) => {
        const filteredCity = {};
        cityFields.forEach((field) => {
          filteredCity[field] = city[field];
        });
        filteredPerson.cities.push(filteredCity);
      });

    result.push(filteredPerson);
  });

  res.json(result);
});

/******************************************  II   ***************************************/

// La liste des personnes
app.get("/persons", function (req, res) {
  res.send(data.persons);
});

//La liste des personnes en précisant les champs que l’on souhaite obtenir (id, name, cities)

app.get("/persons/AllChamps", function (req, res) {
  const personnesAvecInfos = data.persons.map(({id, name, cities}) => ({
    id,
    name,
    cities,
  }));

  personnesAvecInfos.forEach((item, index) => {
    if (!item.cities) {
      personnesAvecInfos.splice(index, 1);
    }
  });
  res.send(personnesAvecInfos);
});

//La liste des personnes triées selon un champ (id ou name)
app.get("/persone", function (req, res) {
  const array = data.persons;

  if (req.query.sort === "id") {
    array.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (req.query.sort === "name") {
    array.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  console.log(array);
  res.send(array);
});

//Une personne en fonction de son id

app.get("/persone/:id", function (req, res) {
  const persone = data.persons.find((c) => c.id === parseInt(req.params.id));
  if (!persone) {
    res.status(404).send("this persone not found");
  }

  res.status(200).send(persone);
});

//La liste des personnes en fonction de leur nom

app.get("/persone/:name", function (req, res) {
  const filteredPeople = data.persons.filter((person) =>
    person.name.includes(req.params.name)
  );

  if (!filteredPeople) {
    res.status(404).send("this persone not found");
  }

  res.status(200).send(filteredPeople);
});

//La liste des villes
app.get("/villes", function (req, res) {
  res.send(data.cities);
});

//Une ville en fonction de son id
app.get("/villes/:id", function (req, res) {
  const ville = data.cities.find((c) => c.id === parseInt(req.params.id));
  if (!ville) {
    res.status(404).send("this ville not found");
  }

  res.status(200).send(ville);
});

// Ajouter une personne
app.post("/persone", function (req, res) {
  const addpersone = {id: data.persons.length + 1, name: req.body.name};
  data.persons.push(addpersone);
  res.status(200).send(data.persons);
});

//Ajouter une ville
app.post("/ville", function (req, res) {
  const addville = {id: data.cities.length + 1, name: req.body.name};
  data.cities.push(addville);
  res.status(200).send(data.cities);
});

//Modifier une personne

app.patch("/ModifierPersone/:name", (req, res) => {
  const nameToModify = req.params.name;
  const newName = req.body.name;

  for (let i = 0; i < data.persons.length; i++) {
    if (data.persons[i].name === nameToModify) {
      data.persons[i].name = newName;
      break;
    }
  }

  res.send(`Person ${nameToModify} updated with new age ${newName}`);
});

//Ajouter une ville à une personne

app.patch("/AddCitesPersone/:villeId", (req, res) => {
  const personName = req.body.name;
  const villeId = req.params.villeId;

  const ville = data.cities.find((c) => c.id === parseInt(villeId));

  for (let i = 0; i < data.persons.length; i++) {
    if (data.persons[i].name === personName) {
      data.persons[i].cities.push(ville);
      break;
    }
  }

  res.send(`Person ${personName} `);
});

// Supprimer une ville à une personne

app.patch("/DelateCitiesPersone/:villeId", (req, res) => {
  const personName = req.body.name;
  const villeId = req.params.villeId;

  const ville = data.cities.find((c) => c.id === parseInt(villeId));

  for (let i = 0; i < data.persons.length; i++) {
    if (data.persons[i].name === personName) {
      data.persons[i].cities.forEach((item, index) => {
        if (item.id === villeId) {
          data.persons[i].cities.splice(index, 1);
        }
      });

      break;
    }
  }

  res.send(data.persons);
});

//Supprimer une personne
app.delete("/api/persone/:id", function (req, res) {
  const persone = data.persons.find((c) => c.id === parseInt(req.params.id));
  data.persons.pop(persone);
  res.status(200).send(data.persons);
});

//Supprimer une ville

app.delete("/api/ville/:id", function (req, res) {
  const cities = data.cities.find((c) => c.id === parseInt(req.params.id));
  data.cities.pop(persone);
  res.status(200).send(data.cities);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server is up and running  "));
