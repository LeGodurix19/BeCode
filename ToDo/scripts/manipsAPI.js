/**
 * Construct for the object
 * 
 * @param {string} method Stock the method (GET, POST,...)
 * @param {*} object The object for the body fetch
 */
export function fetchP(method, object)
{
    this.method = method;
    this.headers = {
                        "Content-Type": "application/json",
                    };
    this.body= JSON.stringify(object);
}

/**
 * Resume in one function the fetch and his params
 * 
 * @param {string} link The API command to execute (/api/events/)
 * @param {*} method What we do on the API
 * @returns The object gives by the fetch
 */
 export async function fetchParams(link, method)
{
    let linkGlob = `http://127.0.0.1:3000`;
    const response = await fetch(linkGlob + link, method);
    let stock = await response.json();
    return stock;
}

/**
 * Return all events in the API
 * 
 * @returns array objects return by the fetch(all events)
 */
export async function giveAllEventsAPI()
{
    let method = {
        method: 'GET'
    }
    return await fetchParams(`/api/events/`, method);
}

/**
 * Return an event with an id
 * 
 * @param {string} id event's id
 * @returns object return by fetch (the id's event)
 */
export async function giveOneEventAPI(id)
{
    let method = {
        method: 'GET'
    }
    return await fetchParams(`/api/events/` + id + `/`, method)
}

/**
 * Add event in the API
 * 
 * @param {*} object Object with : name, dates[], author, description
 * @returns object return by fetch
 */
export async function pushEventAPI(object)
{
    let method = new fetchP('POST', object);
    return await fetchParams(`/api/events/`, method)
}

/**
 * Update an event with the id. The update is about the description, name and author
 * 
 * @param {string} id the event's id
 * @param {*} object object with : description, name, author
 * @returns event update
 */
export async function updateEventAPI(id, object)
{
    let method = new fetchP('PATCH', object);
    return await fetchParams(`/api/events/` + id + `/`, method)
}

/**
 * Delete the id's event
 * 
 * @param {string} id the event's id
 * @returns succes or error
 */
export async function deleteEventAPI(id)
{
    let method = {
                    method: 'DELETE'
                }
    return await fetchParams((`/api/events/` + id + `/`), method)
}

/**
 * Add dates in an event
 * @param {string} id the event's id
 * @param {*} object object with : dates[]
 * @returns object of the event
 */
export async function updateDatesEventAPI(id, object)
{
    let method = new fetchP('POST', object);
    return await fetchParams((`/api/events/` + id + `/add_dates`), method)
}

/**
 * Add one guy in the API
 * 
 * @param {string} id The event's id
 * @param {*} object The object to include in API
 * @returns 
 */
export async function addPeopleEventAPI(id, object)
{
    let method = new fetchP('POST', object);
    return await fetchParams((`/api/events/` + id + `/attend`), method)
}

/**
 * Update a guy in the API
 * 
 * @param {string} id The event's id
 * @param {*} object The object with datas to update in API
 * @returns 
 */
export async function updatePeopleEventAPI(id, object)
{
    let method = new fetchP('PATCH', object);
    return await fetchParams((`/api/events/` + id + `/attend`), method)
}

/***********************************  MANUAL  ***********************************
 * 
 *      giveAllEventsAPI( - )
 * 
 * Return all events inside the API
 * 
************
 *      giveOneEventAPI( id )
 * 
 *      id = ' xxxxxxxx '
 * 
 * Return the event with this id
 * 
 ************
 *      pushEventAPI( object )
 *      
 *      object = {
 *                  name: ' xxxx ',
 *                  dates: ['yyyy-mm-dd', 'yyyy-mm-dd', ...],
 *                  author: ' xxxx ',
 *                  description: ' xxxx ',
 *              }
 * Add the event with the datas in the object
 * 
 ************
 *      updateEventAPI( id , object )
 * 
 *      id = ' xxxxxxxx '
 *      object = {
 *                  name: ' xxxx ',
 *                  dates: ['yyyy-mm-dd', 'yyyy-mm-dd', ...],
 *                  author: ' xxxx ',
 *                  description: ' xxxx ',
 *              } (min one element)
 * Modif the datas of the id's event with the object's datas
 * 
 ************ 
 *      deleteEventAPI( id )
 *
 *      id = ' xxxxxxxx '
 * 
 * Delete the event with this id
 *  
 ************ 
 *      updateDatesEventAPI( id , object )
 *
 *      id = ' xxxxxxxx '
 *      object = {
 *                  dates: ['yyyy-mm-dd', 'yyyy-mm-dd', ...],
 *               }
 * 
 * Add news dates for the event
 * 
 ************ 
 *      addPeopleEventAPI( id , object )
 * 
 *      id = ' xxxxxxxx '
 *      object = {
 *                  name: 'xxx',
 *                  dates: [
 *                  {
 *                      date: 'yyyy-mm-dd',
 *                      available: boolean
 *                  }, ...],
 *               }
 * 
 * Add a guy in th event with the avaibility for the dates
 * 
 ************ 
 *      updatePeopleEventAPI( id , object )
 *      
 *      id = ' xxxxxxxx '
 *      object = {
 *                  name: 'xxx',
 *                  dates: [
 *                  {
 *                      date: 'yyyy-mm-dd',
 *                      available: boolean
 *                  }, ...],
 *               }
 * 
 * Change the avaibility of a guy
 * 
*********************************************************************************/