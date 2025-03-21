//--------------------------------------------------------------//
//----------------------Importation-----------------------------//
//--------------------------------------------------------------//

/**
 * Import la classe formulaire depuis le fichier Formulaire.js
 */
import {Formulaire} from './Formulaire.js';

//---------------------------------------------------------------------//
//----------------------Variables globales-----------------------------//
//---------------------------------------------------------------------//

/**
 * globalStatus     =>      Definition du status pour l'affichage des cartes
 * htmlCode         =>      Code HTML pour le formulaire
 * listForm         =>      Liste des classes des cartes
 */

let globalStatus = 0;

let htmlCode = `<div class="form" id="form">
                    <div class="close-container" id='exit'>
                        <div class="leftright"></div>
                        <div class="rightleft"></div>
                        <label class="close">close</label>
                    </div>
                    <div class="title2">Create activity</div>
                    <div class="input-container ic1">
                        <input class="input" id="title" type="text" placeholder=" " required="required"/>
                        <div class="cut"></div>
                        <label for="title" class="placeholder">Nom de l'activite</label>
                    </div>
                    <div class="input-container ic2">
                        <input class="input" type="text" id="desc" placeholder=" " required="required"/>
                        <div class="cut"></div>
                        <label for="desc" class="placeholder">Description</label>
                    </div>
                    <div class="input-container ic2">
                        <input id="date" class="input" type="date" required="required"/>
                    </div>
                    <div class="input-container ic2">
                        <select id="status" class="input">
                            <option value="1">To do</option>
                            <option value="2">Doing</option>
                            <option value="3">Done</option>
                        </select>
                    </div>
                    <button type="text" class="submit" id ="bSubmit">submit</button>
                </div>`;

let listForm = [];

//-----------------------------------------------------//
//----------------------Fonctions----------------------//
//-----------------------------------------------------//

/**
 * Genere l'HTML pour le formulaire de creation de taches
 */
function genForm()
{
    const formCard = document.getElementsByTagName("main")[0];
    formCard.innerHTML = htmlCode + formCard.innerHTML;
    const RecupSubmit = document.querySelector('#bSubmit');
    RecupSubmit.addEventListener('click', function()
    {
        let title = document.getElementById("title").value;
        let desc = document.getElementById("desc").value;
        let date = document.getElementById("date").value;
        let status = document.getElementById("status").value;
        if (title =='' || desc =='' || date =='' || status=='')
            window.alert("attention champ vide");
        else
        {
            newList(new Formulaire(title, desc, date, status));
            regroupStatus();
        }
    });
    document.getElementById("exit").addEventListener("click", function()
    {
        document.getElementById("form").animate([
            { transform: 'translateX(0px)' },
            { transform: 'translateX(-350px)' }],
            { duration: 1000 });
        setTimeout(() => { document.getElementById("form").remove(); }, 1000);
    });
};

/**
 * Ajoute une classe a la liste et met a jour la liste dans le localStorage
 */
function newList(newForm)
{
    let tmp = JSON.parse(localStorage.getItem('listForms'));
    listForm = [];
    if (tmp)
        for (let x = 0; x < tmp.length; x++)
            if (tmp[x])
                listForm.push(new Formulaire(tmp[x].title, tmp[x].desc, tmp[x].date, tmp[x].status));
    if (newForm)
        listForm.push(newForm);
    let test = [];
    for (let elem of listForm)
        test.push(elem.genOut());
    localStorage.setItem("listForms", JSON.stringify(test));
    return (listForm);
}

/**
 * Mise a jour du statut d'une des cartes de la liste et mise a jour de celle-ci dans le localStorage
 */
function compareStatus(x, elem)
{
    let tmp_title = elem.getElementsByClassName('title')[0].textContent;
    let tmp_desc = elem.getElementsByClassName('desc')[0].textContent;
    let tmp_date = elem.getElementsByClassName('date')[0].textContent;
    let index = 0;
    for (let elem of listForm)
    {
        if ((elem.title == tmp_title) && (elem.desc == tmp_desc) && (elem.date == tmp_date))
            break;
        index++;
    }
    console.log(index);
    listForm[index].status = x;
    let tmp = [];
    for (let elem of listForm)
        tmp.push(elem.genOut());
    localStorage.setItem("listForms", JSON.stringify(tmp));
    regroupStatus();
}

/**
 * Parcourt toutes les cartes pour ajouter un addEventlistener sur les logo de poubelles
 * Cela permet de retirer la carte de la liste et de localStorage
 */
function addClickTrash(listForm)
{
    let newPoub = document.getElementsByClassName('card');
    for (let elem of newPoub)
    {
        let tmp_title = elem.getElementsByClassName('title')[0].textContent;
        let tmp_desc = elem.getElementsByClassName('desc')[0].textContent;
        let tmp_date = elem.getElementsByClassName('date')[0].textContent;
        let timeLeft = elem.getElementsByClassName('timeLeft')[0].textContent;
        let status = elem.getElementsByClassName('statusHidden')[0].textContent;
        let status1 = elem.getElementsByClassName('status1')[0];
        let status2 = elem.getElementsByClassName('status2')[0];
        let status3 = elem.getElementsByClassName('status3')[0];
        timeLeft = timeLeft.substr(2);
        let classeFace = elem.getElementsByClassName('face1')[0]
        if(timeLeft >= 20)
            classeFace.style.backgroundColor = '#81c654';
        else if (timeLeft >= 10)
            classeFace.style.backgroundColor = '#e89721';
        else  
            classeFace.style.backgroundColor = '#f44242';
        status1.style.opacity = status2.style.opacity = status3.style.opacity = "0.2";
        if (status == 1)
            status1.style.opacity = "1";
        else if (status == 2 )
            status2.style.opacity = "1";
        else if (status == 3 )
            status3.style.opacity = "1";
        status1.addEventListener('click', function() 
        {
            status1.style.opacity = "1"; 
            status2.style.opacity = "0.2";
            status3.style.opacity = "0.2";
            compareStatus(1, elem); //12
        });
        status2.addEventListener('click', function() 
        {
            status1.style.opacity = "0.2"; 
            status2.style.opacity = "1";
            status3.style.opacity = "0.2";
            compareStatus(2, elem); //12
        });
        status3.addEventListener('click', function()
        {
            status1.style.opacity = "0.2";
            status2.style.opacity = "0.2";
            status3.style.opacity = "1";
            compareStatus(3, elem);
        });
        let poubelle = elem.getElementsByClassName('delete')[0];
        poubelle.addEventListener('click', function ()
        {
            let tmp = [], index = 0, index1 = 0;
            for (let elem of listForm)
            {
                if ((elem.title == tmp_title) && (elem.desc == tmp_desc) && (elem.date == tmp_date))
                    break;
                index++;
            }
            for (let elem of listForm)
                if (index != index1++)
                    tmp.push(elem);
            let test = [];
            for (let elem of tmp)
                test.push(elem.genOut());
            localStorage.setItem("listForms", JSON.stringify(test));
            regroupStatus();
        });
    }
}

/**
 * Gere l'affichage des cartes en fonction du status global
 */
function regroupStatus()
{
    let tmp = '';
    const formCard = document.getElementsByTagName("main")[0];
    const byValue = (a,b) => a.time - b.time;
    const byText = (a,b) => a.title.localeCompare(b.title);
    listForm = newList(null);
    if(globalStatus == 4)
        for (let elem of [...listForm].sort(byValue))
            tmp += elem.affCard();
    else if (globalStatus == 5)
        for (let elem of [...listForm].sort(byText))
            tmp += elem.affCard();
    else
        for (let elem of listForm)
            if(elem.status == globalStatus || globalStatus == 0)
                tmp += elem.affCard();
    formCard.innerHTML='<div id="all_card" class="container" >' + tmp + '</div>';
    addClickTrash(listForm);
}

//-------------------------------------------------------------------------//
//----------------------Ajout de fonction aux actions----------------------//
//-------------------------------------------------------------------------//

/**
 * Fonction au click
 * 
 *      Animation pour les barres du menu burger
 */
document.getElementById("menu_burger").addEventListener("click", function()
{
    document.getElementById("menu_burger").classList.toggle("open");
});

/** 
 * Fonction au click
 * 
 *      Apparition et disparition du menu avec une animation avant la disparition
*/
document.getElementById("jsID").addEventListener("click", function()
{
    var x = document.getElementById("burger");
    if (x.style.display === "block")
    {
        x.animate([
            { transform: 'translateX(0px)' },
            { transform: 'translateX(20vw)' }],
            { duration: 1000 }
        );
        setTimeout(() => {  x.style.display = "none"; }, 1000);
    }
    else
        x.style.display = "block";
});

/**
 * Fonction au click
 * 
 *      Genere le formulaire
 */
document.querySelector('#genForm').addEventListener('click', function()
{
    genForm();
});

/**
 * Fonction au click
 * 
 *      Definit la valeur de globalStatus (0) et relance l'affichage
 */
document.getElementById('reset').addEventListener('click', function()
{
    globalStatus = 0
    regroupStatus()
});

/**
 * Fonction au click
 * 
 *      Definit la valeur de globalStatus (1) et relance l'affichage
 */
document.getElementById('toDo').addEventListener('click', function()
{
    globalStatus = 1
    regroupStatus()
});

/**
 * Fonction au click
 * 
 *      Definit la valeur de globalStatus (2) et relance l'affichage
 */
document.getElementById('going').addEventListener('click', function()
{
    globalStatus = 2
    regroupStatus()
});

/**
 * Fonction au click
 * 
 *      Definit la valeur de globalStatus (3) et relance l'affichage
 */
document.getElementById('done').addEventListener('click', function()
{
    globalStatus = 3
    regroupStatus()
});

/**
 * Fonction au click
 * 
 *      Definit la valeur de globalStatus (4) et relance l'affichage
 */
document.getElementById('urgent').addEventListener('click', function()
{
    globalStatus = 4
    regroupStatus()
});

/**
 * Fonction au click
 * 
 *      Definit la valeur de globalStatus (5) et relance l'affichage
 */
document.getElementById('alpha').addEventListener('click', function()
{
    globalStatus = 5
    regroupStatus()
});

//----------------------------------------------------------------//
//----------------------Execution par defaut----------------------//
//----------------------------------------------------------------//

regroupStatus();