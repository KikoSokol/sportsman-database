function getGoldPersonInformation()
{
    const url = "api.php?operation=goldPerson";
    const request = new Request(url, {
            method:'POST'
        });

    fetch(request)
        .then(request => request.json())
        .then(data =>
        {
            let tableGold = document.getElementById("bodyGold");
            tableGold.innerHTML = "";
            data.forEach(d => {
                tableGold.append(getRowForTableGold(d));
            });

            // $('#tableGold').DataTable({
            //     data:data,
            //     columns: [
            //         { data: 'meno',},
            //         { data: 'priezvisko',},
            //         { data: 'rok',},
            //         { data: 'mesto', },
            //         { data: 'typ',},
            //         { data: 'disciplina',},
            //     ],
            //     "paging":   false,
            //     "ordering": false,
            //     "info":     false,
            //     "searching": false,
            //
            //
            //
            //
            //
            //
            // });

        });
}


function getRowForTableGold(tableData)
{
    let tr = document.createElement("tr");
    tr.append(getLinkColumnForTableRow(tableData.meno,tableData.id));
    tr.append(getLinkColumnForTableRow(tableData.priezvisko,tableData.id));
    tr.append(getColumnForTableGoldRow(tableData.rok));
    tr.append(getColumnForTableGoldRow(tableData.mesto));
    tr.append(getColumnForTableGoldRow(tableData.typ));
    tr.append(getColumnForTableGoldRow(tableData.disciplina));
    tr.append(getEditableButton(tableData.id));
    tr.append(getDeleteButton(tableData.id));

    return tr;

}

function getColumnForTableGoldRow(data)
{
    let td = document.createElement("td");
    td.innerText = data;

    return td;
}



function getBestPersonInformation()
{
    const url = "api.php?operation=bestPerson";
    const request = new Request(url, {
        method:'POST'
    });

    fetch(request)
        .then(request => request.json())
        .then(data =>
        {
            let tableBest = document.getElementById("bodyBest");
            tableBest.innerHTML = "";
            data.forEach(d => {
                tableBest.append(getRowForBestTable(d));
            });

        });


}


function getRowForBestTable(tableData)
{
    let tr = document.createElement("tr");
    tr.append(getLinkColumnForTableRow(tableData.name,tableData.id));
    tr.append(getLinkColumnForTableRow(tableData.surname,tableData.id));
    tr.append(getColumnForBestTableRow(tableData.birth_day));
    tr.append(getColumnForBestTableRow(tableData.birth_place));
    tr.append(getColumnForBestTableRow(tableData.birth_country));
    tr.append(getColumnForBestTableRow(tableData.death_day));
    tr.append(getColumnForBestTableRow(tableData.death_place));
    tr.append(getColumnForBestTableRow(tableData.death_country));
    tr.append(getEditableButton(tableData.id));
    tr.append(getDeleteButton(tableData.id));

    return tr;
}

function getColumnForBestTableRow(data)
{
    let td = document.createElement("td");
    td.innerHTML = data;

    return td;
}


function getLinkColumnForTableRow(data,id)
{
    let td = document.createElement("td");
    let link = document.createElement("a");
    link.setAttribute("href", "infoAboutPerson.html?id=" + id);
    link.append(data);

    td.append(link);

    return td;
}



function getEditableButton(id)
{
    let td = document.createElement("td");

    let a = document.createElement("a");
    a.setAttribute("href","update.html?id=" + id);
    // a.setAttribute("href","update.html?isNew=true");

    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-primary");

    let i = document.createElement("i");
    i.classList.add("bi");
    i.classList.add("bi-pencil-fill");

    button.append(i);
    a.append(button);

    td.append(a);

    return td;
}

function getDeleteButton(id)
{
    let td = document.createElement("td");

    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-danger");
    button.onclick = function () {
        deletePerson(id);
        getBestPersonInformation();

    }

    let i = document.createElement("i");
    i.classList.add("bi");
    i.classList.add("bi-trash");

    button.append(i);

    td.append(button);

    return td;
}

function deletePerson(personId)
{
    const url = "api.php?operation=deletePerson";
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
            console.log(data);
        });
}



function setTables()
{
    getGoldPersonInformation();
    getBestPersonInformation();
}





