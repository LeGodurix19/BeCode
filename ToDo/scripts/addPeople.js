import { addPeopleEventAPI} from "./manipsAPI.js";
import { updatePeopleEventAPI} from "./manipsAPI.js";
import { giveOneEventAPI} from "./manipsAPI.js";

function newDate(date, available)
{
    this.date = date;
    this.available = available;
}

function newOne(name, dates)
{
    this.name = name;
    this.dates = dates;
}

function nameIsIn(list, name)
{
    let x = 0;
    list.forEach(element => ((element.name == name) ? x = 1: x))
    return x;
}

export async function addOne(id)
{
    let event = await giveOneEventAPI(id),
        lineTab = [...(document.getElementById(id).getElementsByTagName('tr')[document.getElementById(id).getElementsByTagName('tr').length - 1].getElementsByTagName('td'))].slice(1),
        name = document.getElementById('name' + id.toString()).value,
        objectOut = new newOne(name, []);
    if (name.length == 0)
    {
        window.alert("Il faut completer le nom");
        return
    }
    for (let x = 0; x < lineTab.length; x++)
        objectOut.dates.push(new newDate(event.dates[x].date, ((lineTab[x].className == 'no') ? false: true)));
    (!nameIsIn(event.dates[0].attendees, name)) ? await addPeopleEventAPI(id, objectOut) : await updatePeopleEventAPI(id, objectOut);
}