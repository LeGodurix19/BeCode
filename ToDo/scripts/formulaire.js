import { pushEventAPI } from "./manipsAPI.js";

/**
 * Extract the datas from the form and add the object in the API
 */
export async function formulaire()
{
    let tEvent = document.getElementById('tEvent');
    let tDescrp = document.getElementById('tDescrp');
    let tAutor = document.getElementById('tAutor');
    let tDate = document.getElementById('tDate');
    if (tEvent.value == '' || tDescrp.value == '' || tAutor.value == '' || tDate.value == '')
        alert("Il vous manque une ou plusieurs donnees");
    else if (tEvent.value.length >= 256 || tDescrp.value.length >= 256 || tAutor.value.length >= 256 || tDate.value.length >= 256)
        alert("Taille maximum pour une entree est de 256 caracteres");
    else
    {
        await pushEventAPI({
                        "name": tEvent.value,
                        "dates": [tDate.value],
                        "author": tAutor.value,
                        "description": tDescrp.value
                    });
        tEvent.value = '';
        tDescrp.value = '';
        tAutor.value = '';
        tDate.value = '';
    }
}