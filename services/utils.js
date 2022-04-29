const { createHash } = require("crypto");

function hash(string) {
  return createHash("sha256").update(string).digest("hex");
}

const timeStamp = Math.floor(Date.now() / 1000);
const url =
  "https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?fields=all&language=ENG&from=1&to=100&useSecondaryLanguage=false";
const apiKey = "e58e7642f4275d4b90d210f2af96cb7e";
const secret = "4af634c7d1";
const code = apiKey + secret + timeStamp;
const signature = hash(code);

const randomUsers = (maxUsers) => {
  const generate = () => {
    const nameList = [
      "Adrián",
      "Agustín",
      "Alberto",
      "Alejandro",
      "Alexander",
      "Alexis",
      "Alonso",
      "Andrés Felipe",
      "Ángel",
      "Anthony",
      "Antonio",
      "Bautista",
      "Benicio",
      "Benjamín",
      "Carlos",
      "Carlos Alberto",
      "Carlos Eduardo",
      "Carlos Roberto",
      "César",
      "Cristóbal",
      "Daniel",
      "David",
      "Diego",
      "Dylan",
      "Eduardo",
      "Emiliano",
      "Emmanuel",
      "Enrique",
      "Erik",
      "Ernesto",
      "Ethan",
      "Fabián",
      "Facundo",
      "Felipe",
      "Félix",
      "Félix María",
      "Fernando",
      "Francisco",
      "Francisco Javier",
      "Gabriel",
      "Gaspar",
      "Gustavo Adolfo",
      "Hugo",
      "Ian",
      "Iker",
      "Isaac",
      "Jacob",
      "Javier",
      "Jayden",
      "Jeremy",
      "Jerónimo",
      "Jesús",
      "Jesús Antonio",
      "Jesús Víctor",
      "Joaquín",
      "Jorge",
      "Jorge  Alberto",
      "Jorge Luis",
      "José",
      "José Antonio",
      "José Daniel",
      "José David",
      "José Francisco",
      "José Gregorio",
      "José Luis",
      "José Manuel",
      "José Pablo",
      "Josué",
      "Juan",
      "Juan Ángel",
      "Juan Carlos",
      "Juan David",
      "Juan Esteban",
      "Juan Ignacio",
      "Juan José",
      "Juan Manuel",
      "Juan Pablo",
      "Juan Sebastián",
      "Julio",
      "Julio Cesar",
      "Justin",
      "Kevin",
      "Lautaro",
      "Liam",
      "Lian",
      "Lorenzo",
      "Lucas",
      "Luis",
      "Luis Alberto",
      "Luis Emilio",
      "Luis Fernando",
      "Manuel",
      "Manuel Antonio",
      "Marco Antonio",
      "Mario",
      "Martín",
      "Mateo",
      "Matías",
      "Maximiliano",
      "Maykel",
      "Miguel",
      "Miguel  ngel",
      "Nelson",
      "Noah",
      "Oscar",
      "Pablo",
      "Pedro",
      "Rafael",
      "Ramón",
      "Raúl",
      "Ricardo",
      "Rigoberto",
      "Roberto",
      "Rolando",
      "Samuel",
      "Samuel David",
      "Santiago",
      "Santino",
      "Santos",
      "Sebastián",
      "Thiago",
      "Thiago Benjamín",
      "Tomás",
      "Valentino",
      "Vicente",
      "Víctor",
      "Víctor Hugo",
    ];

    const lastNameList = [
      "Garcia",
      "Gonzalez",
      "Rodriguez",
      "Fernandez",
      "Lopez",
      "Martinez",
      "Sanchez",
      "Perez",
      "Gomez",
      "Martin",
      "Jimenez",
      "Ruiz",
      "Hernandez",
      "Diaz",
      "Moreno",
      "Alvarez",
      "Muñoz",
      "Romero",
      "Alonso",
      "Gutierrez",
      "Navarro",
      "Torres",
      "Dominguez",
      "Vazquez",
      "Ramos",
      "Gil",
      "Ramirez",
      "Serrano",
      "Blanco",
      "Suarez",
      "Molina",
      "Morales",
      "Ortega",
      "Delgado",
      "Castro",
      "Ortiz",
      "Rubio",
      "Marin",
      "Sanz",
      "Nuñez",
      "Iglesias",
      "Medina",
      "Garrido",
      "Santos",
      "Castillo",
      "Cortes",
      "Lozano",
      "Guerrero",
      "Cano",
      "Prieto",
      "Mendez",
      "Calvo",
      "Cruz",
      "Gallego",
      "Vidal",
      "Leon",
      "Herrera",
      "Marquez",
      "Peña",
      "Cabrera",
      "Flores",
      "Campos",
      "Vega",
      "Diez",
      "Fuentes",
      "Carrasco",
      "Caballero",
      "Nieto",
      "Reyes",
      "Aguilar",
      "Pascual",
      "Herrero",
      "Santana",
      "Lorenzo",
      "Hidalgo",
      "Montero",
      "Ibañez",
      "Gimenez",
      "Ferrer",
      "Duran",
      "Vicente",
      "Benitez",
      "Mora",
      "Santiago",
      "Arias",
      "Vargas",
      "Carmona",
      "Crespo",
      "Roman",
      "Pastor",
      "Soto",
      "Saez",
      "Velasco",
      "Soler",
      "Moya",
      "Esteban",
      "Parra",
      "Bravo",
      "Gallardo",
      "Rojas",
      "Pardo",
      "Merino",
      "Franco",
      "Espinosa",
      "Izquierdo",
      "Lara",
      "Rivas",
      "Silva",
      "Rivera",
      "Casado",
      "Arroyo",
      "Redondo",
      "Camacho",
      "Rey",
      "Vera",
      "Otero",
      "Luque",
      "Galan",
      "Montes",
      "Rios",
      "Sierra",
      "Segura",
      "Carrillo",
      "Marcos",
      "Marti",
      "Soriano",
      "Mendoza",
    ];

    const randomPos = Math.floor(Math.random() * nameList.length);
    const randomPos2 = Math.floor(Math.random() * lastNameList.length);
    const name = nameList[randomPos];
    const lastName = lastNameList[randomPos2];
    const userName = `${name}${randomPos}`;
    const email = `${lastName}${randomPos}@email.com`;
    const password = `${randomPos}${userName}@!${lastName}${randomPos2}`;

    return {
      name,
      lastName,
      userName,
      email,
      password,
    };
  };

  const arr = [];
  for (let i = 0; i < maxUsers; i + 1) {
    arr.push(generate());
  }
  return arr;
};

module.exports = {
  url,
  apiKey,
  signature,
  randomUsers,
};
