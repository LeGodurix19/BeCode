/**
 * Genere l'object de conversion pour la classe
 * Details:
 *      1       Attribue les valeurs de base
 * 
 * Params:
 *      title       =   Titre
 *      desc        =   Description
 *      date        =   Date
 *      status      =   Status
 * 
 * Return:
 *      Rien
 */
function Out(title,desc,date,status)
{
    this.title = title; //1
    this.desc = desc;
    this.date = date;
    this.status = status;
 }

/**
 * Classe formulaire
 * Stocke les donnees :
 *      -titre          =>      t
 *      -description    =>      dsc
 *      -date           =>      d
 *      -status         =>      s
 *      -time           =>      Difference entre maintenant et la fin du projet
 */
export class Formulaire
{
    /**
     * Consrtuit la classe avec les parametres donnes
     * Details:
     *      1       Attribue les valeurs de base
     *      2       Prise du temps present
     *      3       Calcul du declage entre temps presant et fin du projet
     *      4       Attribution de cette difference sur time
     * 
     * Params:
     *      t       =   Titre
     *      dsc     =   Description
     *      d       =   Date
     *      s       =   Status
     * 
     * Return:
     *      Rien
     */
    constructor(t, dsc, d, s)
    {
        this.title = t; //1
        this.desc = dsc;
        this.date = d;
        this.status = s;

        let today = new Date(); //2 
        let difference = new Date(this.date).getTime() - today.getTime(); //3
        this.time = Math.ceil(difference / (1000 * 3600 * 24)); //4
    }

    /**
     * Genere le code HTML de la carte avec les donnees de la classe
     * Details:
     *      ...
     * 
     * Params:
     *      Rien
     * 
     * Return
     *      htmlCode        =   Code HTML genere pour la carte
     */
    affCard()
    {
        let htmlCode = `<div class="card">
                            <div class="face face1">
                                <div class="content">
                                    <h3 class="title">${this.title}</h3>
                                    <div class="timeLeft">J-${this.time}</div>
                                    <span class="status1" opacity="0.2"><img src="assets/images/deadline.png" alt="deadline"></span>
                                    <span class="status2" opacity="0.2"><img src="assets/images/processing-time.png" alt="processing-time"></span>
                                    <span class="status3" opacity="0.2"><img src="assets/images/support.png" alt="suport"></span>
                                    <div class="statusHidden">${this.status}</div>
                                </div>
                            </div>
                            <div class="face face2">
                                <div class="content">
                                    <div class="desc">${this.desc}</div>
                                    <div class="date">${this.date}</div>
                                    <div class="delete"><img class="trash" alt="trash" src="assets/images/trash.svg"></div>
                                </div>
                            </div>
                        </div>`;
        return htmlCode;
    }

    /**
     * Genere un objet avec les donnees de creations de la classe
     * Details:
     *      ...
     * 
     * Params:
     *      Rien
     * 
     * Return:
     *      L'objet nouvellement cree en copie de la classe
     */
    genOut()
    {
        return(new Out(this.title, this.desc, this.date, this.status));
    }
}