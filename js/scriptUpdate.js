let newPerson = false;
let chyba = false;

function setInputField(data)
{
    let id = document.getElementById("id");
    id.value = data.id;

    let name = document.getElementById("meno");
    name.value = data.name;

    let surname = document.getElementById("priezvisko");
    surname.value = data.surname;

    let dateOfBirth = document.getElementById("datumNarodenia");
    console.log("Datum narodenia      " + data.birth_day);
    dateOfBirth.value = setDateFromDatabaseToInput(data.birth_day);

    let cityOfBirth = document.getElementById("mestoNarodenia");
    cityOfBirth.value = data.birth_place;

    let stateOfBirth = document.getElementById("krajinaNarodenia");
    stateOfBirth.value = data.birth_country;

    let dateOfDeath = document.getElementById("datumUmrtia");
    dateOfDeath.value = setDateFromDatabaseToInput(data.death_day);

    let cityOfDeath = document.getElementById("mestoUmrtia");
    cityOfDeath.value = data.death_place;

    let stateOfDeath = document.getElementById("krajinaUmrtia");
    stateOfDeath.value = data.death_country;
}

function setDateFromDatabaseToInput(date)
{
    if(date === "")
        return;

    let dateString = date.split(".");


    if(dateString[1].toString().length === 1)
        dateString[1] = "0" + dateString[1];

    if(dateString[0].toString().length === 1)
        dateString[0] = "0" + dateString[0];

    return dateString[2] + "-" + dateString[1] + "-" + dateString[0];
}

function setDateFromInputToDatabase(date)
{
    if(date === "" || date === null)
        return "";
    let dateString = date.split("-");
    if(dateString.length === 0)
        return;

    return dateString[2] + "." + dateString[1] + "." + dateString[0];
}



function init()
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let isNewPerson = urlParams.get("isNew");
    let personId = parseInt(urlParams.get("id"));
    if(isNewPerson)
    {
        newPerson = true;
    }
    else
    {
        newPerson = false;
        loadPersonData(personId);
    }
}

function loadPersonData(personId)
{
    const url = "api.php?operation=getPersonDetail";
    const request = new Request(url, {
        method:'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: personId }),
    });

    fetch(request)
        .then(request => request.json())
        .then(data =>
        {
            setInputField(data);
        });
}


function save()
{
    if(newPerson)
    {
        uploadNewPerson();
    }
    else {
        updateExistPerson();
    }
    console.log("chyba:  " + chyba);

    if(chyba)
    {
        window.location.replace("http://147.175.98.142/zd2ks97933/index.html");
    }

}

function uploadNewPerson()
{
    const url = "api.php?operation=insertPerson";
    const request = new Request(url, {
        method:'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: getInputData(true),
    });

    fetch(request)
        .then(request => request.json())
        .then(data =>
        {
            console.log(data);
            if(!data)
            {
                chyba = true;
                window.alert("Niekde nastala chyba (Daná osoba už existuje v databáze)");
            }
            else
            {
                chyba = false;
            }


        });
}

function updateExistPerson()
{
    const url = "api.php?operation=updatePerson";
    const request = new Request(url, {
        method:'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: getInputData(false),
    });

    fetch(request)
        .then(request => request.json())
        .then(data =>
        {
            console.log(data);
            if(!data)
            {
                chyba = true;
                window.alert("Niekde nastala chyba");

            }
            else
            {
                chyba = false;
            }


        });
}


function getInputData(isNew)
{
    let id = document.getElementById("id");
    id = id.value;

    console.log("aaa >  " + id);

    let name = document.getElementById("meno");
    name = name.value;

    console.log("meno>  " + name + " typ>  " + typeof name);

    let surname = document.getElementById("priezvisko");
    surname = surname.value;

    let dateOfBirth = document.getElementById("datumNarodenia");
    dateOfBirth = setDateFromInputToDatabase(dateOfBirth.value);

    console.log(dateOfBirth);

    let cityOfBirth = document.getElementById("mestoNarodenia");
    cityOfBirth = cityOfBirth.value;

    let stateOfBirth = document.getElementById("krajinaNarodenia");
    stateOfBirth = stateOfBirth.value;

    let dateOfDeath = document.getElementById("datumUmrtia");
    dateOfDeath = setDateFromInputToDatabase(dateOfDeath.value);

    let cityOfDeath = document.getElementById("mestoUmrtia");
    cityOfDeath = cityOfDeath.value;

    let stateOfDeath = document.getElementById("krajinaUmrtia");
    stateOfDeath = stateOfDeath.value;


    if(isNew)
    {
        return JSON.stringify({name:name,surname:surname,birth_day:dateOfBirth,birth_place:cityOfBirth,birth_country:stateOfBirth, death_day:dateOfDeath, death_place:cityOfDeath,death_country:stateOfDeath})

    }
    return JSON.stringify({ id: id,name:name,surname:surname,birth_day:dateOfBirth,birth_place:cityOfBirth,birth_country:stateOfBirth, death_day:dateOfDeath, death_place:cityOfDeath,death_country:stateOfDeath})

}