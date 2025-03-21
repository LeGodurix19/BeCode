import { updateDatesEventAPI } from "./manipsAPI.js";

/**
 * Take a new date to add in the event
 * 
 * @param {*} id the event's id
 * @returns 
 */
export async function  addDate(id)
{
    let date = [];
    date.unshift(prompt ("Ajoute le jour (jj)"));
    date.unshift(prompt ("Ajoute le mois (mm)"));
    date.unshift(prompt ("Ajoute le jour (aaaa)"));
    if (date[0] < 2023 || date[0] > 2100 || date[1] > 12 || date[2] > 31)
    {
        alert ('Format incorrect');
        return
    }

    if (!confirm ('Voulez-vous vraiment ajouter cette date?'))
        return;

    await updateDatesEventAPI(id,{"dates": [date.join('-')]});
}