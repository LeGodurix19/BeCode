import { updateEventAPI } from "./manipsAPI.js";

/**
 * Modif the event's datas
 * 
 * @param {*} id the event's id
 * @returns 
 */
export async function modifEvent(id)
{
    let section = document.getElementById(id);
    let newObject = {
        "name": prompt("Entrez un nouveau titre.", section.getElementsByTagName('h2')[0].innerText),
        "description": prompt("Entrez une nouvelle description.", section.getElementsByClassName('description')[0].innerText),
        "author": prompt("Entrez un nouveau auteur.")
    }
    if (newObject.author.length >= 256 || newObject.name.length >= 256 || newObject.description.length >= 256)
    {
        alert("Taille maximum pour une entree est de 256 caracteres");
        return
    }
    await updateEventAPI(id, newObject);
}