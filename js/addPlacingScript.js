function getAllPersons()
{
    const url = "api.php?operation=getAllPerson";
    const request = new Request(url, {
        method:'POST'
    });

    fetch(request)
        .then(request => request.json())
        .then(data =>
        {
            let selectPerson = document.getElementById("osoba");
            data.forEach(d => {
                selectPerson.add(createOptionForPerson(d));
            });

        });
}

function getAllOh()
{
    const url = "api.php?operation=getAllOh";
    const request = new Request(url, {
        method:'POST'
    });

    fetch(request)
        .then(request => request.json())
        .then(data =>
        {
            let ohSelect = document.getElementById("oh");
            data.forEach(d => {
                ohSelect.add(createOptionForOh(d));
            });

        });
}





function createOptionForPerson(data)
{
    let option = document.createElement("option");
    option.text = data.name + " " + data.surname;
    option.value = data.id;

    return option;
}

function createOptionForOh(data)
{
    let option = document.createElement("option");
    option.text = data.type + " " + data.year + " " + data.city + " " + data.country + " " + data.order;
    option.value = data.id;

    return option;
}


function loadAllDataForSelects()
{
    getAllPersons();
    getAllOh();
}

function getValue()
{
    let s = document.getElementById("osoba");

    console.log(s.value);
}


function save()
{
    let personId = document.getElementById("osoba").value;
    let ohId = document.getElementById("oh").value;
    let placing = document.getElementById("pozicia").value;
    let discipline = document.getElementById("disciplina").value;

    const url = "api.php?operation=insertPlacing";
    const request = new Request(url, {
        method:'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({personId:personId, ohId:ohId, placing:placing,discipline:discipline})
    });

    fetch(request)
        .then(request => request.json())
        .then(data =>
        {
            console.log(data);
        });

    window.location.replace("http://147.175.98.142/zd2ks97933/index.html");
}