/**
 * 
 * @param {*} id the event's id
 * @param {*} name the event's name
 * @param {*} dates all dates for the event
 * @param {*} author who created the event
 * @param {*} description what it is
 */
export const Event  = class
{
    constructor(id, name, dates, author, description )
    {
        this.id = id;
        this.name = name;
        this.dates = dates;
        this.author = author;
        this.description = description;
    }

    /**
     * Create the HTML card for the event
     * 
     *      1   Extrait chaque date de la liste
     *      2   Cree une colonne dans le tableau
     *      3   PArcourt chaque participant pour l'event
     *      4   Ajoute la disponibilite d'un participant (A. si le participant n'est pas encore dans le tableau on l'ajoute)
     *      5   Ajoute le code HTML rempli a la page web
     */
    create()
    {
        let arrayTrGuys = [],
            arrayNamesGuys = [],
            firstTr = '',
            positionArray;

        for (let elem of this.dates) //1
        {
            firstTr += `<td class="name">${elem.date.substr(8, 2)}/${elem.date.substr(5, 2)}/${elem.date.substr(0, 4)}</td>`;//2
            for (let elem1 of elem.attendees) //3
            {
                positionArray = arrayNamesGuys.indexOf(elem1.name);
                if (positionArray != -1)//4
                    arrayTrGuys[positionArray] += (elem1.available)?"<td class='ok'></td>":"<td class='no'></td>";
                else//A
                {
                    arrayNamesGuys.push(elem1.name);
                    arrayTrGuys.push(`<tr><td class='name'>${elem1.name}</td>` + ((elem1.available)?"<td class='ok'></td>":"<td class='no'></td>"));
                }
            }
        }
        arrayTrGuys.forEach(elem => elem += '</tr>');

        //5
        document.getElementById('main').innerHTML += `
                            <section class="event" id='${this.id}'>
                                <h2>
                                    ${this.name}
                                </h2>
                                <p class="description">
                                    ${this.description}
                                </p>
                                <p class='author'>
                                    Cree par ${this.author}
                                </p>
                                <div class = "scroll__card">
                                    <table>
                                        <tr>
                                            <td></td> 
                                            ${firstTr}
                                        </tr>
                                        <tr>
                                            ${arrayTrGuys.join('')}
                                        </tr>
                                        <tr>
                                            <td class="name">
                                                <input class="inputTXT" id="name${this.id}" type="text" required maxlength="256" placeholder="Entrez un nom">
                                            </td>
                                            ${`<td class="no"></td>`.repeat(this.dates.length) + `</tr>`}
                                    </table>
                                </div>
                                <button class="buttonDate" aria-label="buttonForm" id="formButton">Valider</button>
                                <section>
                                    <button class="buttonLeftMiddle" aria-label="buttonForm" id="formButton">Modifier</button>
                                    <button class="buttonLeftMiddle" aria-label="buttonForm" id="formButton">+ date</button>
                                    <button class="buttonDel" aria-label="buttonForm" id="formButton">Supprimer</button>
                                </section>
                            </section>`;
    }
}