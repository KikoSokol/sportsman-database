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


function init()
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let personId = parseInt(urlParams.get("id"));

    loadPersonData(personId);
    loadPlacingOfPerson(personId);


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


function loadPlacingOfPerson(personId)
{
    const url = "api.php?operation=placingOfPerson";
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
            let tablePlacing = document.getElementById("bodyPlacing");
            tablePlacing.innerHTML = "";
            data.forEach(d => {
                tablePlacing.append(getRow(d));
            });

        });
}

function getRow(data)
{
    let tr = document.createElement("tr");
    tr.append(getColumn(data.miesto));
    tr.append(getColumn(data.disciplina));
    tr.append(getColumn(data.rok));
    tr.append(getColumn(data.typ));
    tr.append(getColumn(data.mesto));
    tr.append(getColumn(data.krajina));
    tr.append(getColumn(data.poradie));

    return tr;
}

function getColumn(data)
{
    let td = document.createElement("td");
    td.innerHTML = data;

    return td;
}