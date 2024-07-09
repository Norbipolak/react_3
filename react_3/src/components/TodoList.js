import { useState } from "react";

function TodoList() {
    const [currentTask, setCurrentTask] = useState("");
    //kell mindig egy currentTask, mert ezt fogjuk majd mindig belerakni egy tömbbe, ahol gyüjtjük ezeket a task-okat!!! 
    const [currentImportance, setCurrentImportance] = useState(0);
    //majd lesz egy select optionökkel és ott minden task-hoz meg kell adni, hogy milyen importance-ü a task!!! 
    const [tasks, setTasks] = useState([]);
    //ebbe gyüjtjük majd a task-okat és majd ezt jelenítjük meg, hogy milyen task-okat vittünk fel eddig!!! 
    const [errors, setErrors] = useState("");
    //ez itt még egy üres string lesz, de majd ezt set-eljük egy üres tömbre a függvényen belül és beletesszük az error-oka ha lesznek!!! 

    const createTask = ()=> {
        let errorExists = false;
        //csinálunk egy ilyen változót, hogy van-e error és majd csak akkor jelenítjük meg az error tömböt ha ennek az értéke az true lesz!!!! 
        setErrors([]);

        //első error ha felhasználó nem írt be semmit az input mezőbe, ilyenkor belerakunk valamit az errors tömbbe és az errorExists true lesz 
        if(currentTask.length === 0) {
            setErrors(e=>[...e, "A feladat leírása nem lehet üres!"]);
            //fontos, hogy ha set-elünk valamit, akkor az egy arrow függvénnyel kell!!!!! 
            errorExists = true;
            //fontos, hogy ezt létrehoztuk itt bent egy let-vel és akkor meg tudjuk változtatni az értékét, mint ebben az esetben!!! 
        }

        //másik hiba, ha nem választottunk ki fontosságot!!! 
        if(currentImportance === 0) {
            setErrors(e=>[...e, "Kötelező beállítani a fontosságot!"]);
            errorExists = true;
        }

        //nagyon fontos, hogyha volt error akkor nem menjünk tovább a függényben, ez fontos, hogy az elején ez már meg legyen!!!!!!!
        if(errorExists) 
            return;

        /*
        itt jön az, hogy miket kell beletenni az üres tasks tömbbe, van két useState-s változónk az importance és a currentTask és 
        ezeket akarjuk megjeleníteni egyben és ehhez kell majd egy objektum, tehát minden egyes task majd egy objektum lesz a tasks 
        tömbbe értékpárokkal a kulcs az az lesz, amit megadunk, lehet bármi az érték pedig a currentTask és a currentImportancr kell,
        hogy legyen és ezt minden lefutásnál task felvételnél belerakjuk egy tömbbe 
        tasknál lehet egy trim()-et használni, hogy a whitespace-eket ezzel kivédjük!!!!! 
        */ 
        const taskObj = {
            task: currentTask.trim(),
            importance: currentImportance
        }
        //itt meg ezeket belerakjuk a tömbbe 
        setTasks(t=>[...t, taskObj]);

        //nagyon fontos, hogyha ezeket már beleraktunk, akkor ki kell űríteni a currentTask és a currentImportance értékét, hogy fel tudjuk 
        //vinni új task-okat!!!! 
        setCurrentTask("");
        setCurrentImportance(0);
    };

    /*
    lesz egy ilyen, hogy completeTask ez azt csinálja, hogy a task-okat, amiket már elvégeztünk, azokat ke tudjuk majd törölni és 
    ehhez azt kell, hogy kivedjük azt amelyik akarjuk és ezt majd egy index alapján fogjuk kivenni, amit majd megkapunk úgy, hogy végigmegyünk 
    egy map-val a tasks tömbbön és akkor minden elemnek lesz majd egy index-e!!!! 
    3 részből áll a törlés 
    1. létrehozunk egy új tömböt, ugyanazt mint az eredeti tömb és kibontjuk a spread operator-val
    2. a splice-val kitöröljük azt az index-ű elemet, amelyiket szeretnénk 
    3. és ez az új tömbbel, amiben már a splice miatt nincsen bent az a task, amelyiket töröltünk, ezzel set-teljük a tasks tömböt!!!! 
    */
    const completeTask = (i)=> {
        const t = [...tasks]; 
        t.splice(i, 1);
        setTasks(t);
    }

    return(
        <div className="container center-text">
            {
                errors.length !== 0 ? errors.map((e, i)=><h2 style={{color:"red"}} key={i}>{e}</h2>) : ""
            }

            <h3>Teendő elnevezése</h3>
            <input type="text" value={currentTask} className="center-input"
            onChange={(e)=>setCurrentTask(e.target.value)}
            ></input>

            <h3>Fontosság</h3>
            <select value={currentImportance} className="center-input"
            onChange={(e)=>setCurrentImportance(parseInt(e.target.value))}>
                <option value={0}>Válassz fontosságot!</option>
                <option value={1}>kicsit fontos</option>
                <option value={2}>közepesen fontos</option>
                <option value={3}>nagyon fontos</option>
            </select>

            <button className="center-input"
            onClick={createTask}
            >Teendők felvitele</button>

            <ul className="tasks-ul">
                {
                    tasks.map((t, i)=> {
                        let bgColor = "";

                        switch(t.importance) {
                            case 1: 
                                bgColor = "red";
                                break;
                            case 2: 
                                bgColor = "orange";
                                break;
                            case 3:
                                bgColor = "crimson";
                                break;
                        }

                        return <li style={{backgroundColor: bgColor}} key={i}>{t.task}
                            <button className="small-input"
                            onClick={()=>completeTask(i)}>Megoldottam</button>
                        </li>
                    })
                }
            </ul>

        </div>
    );

/*
    {
        errors.length !== 0 ? errors.map((e, i)=><h2 style={{color:"red"}} key={i}>{e}</h2>) : ""
    }

Van ez az errors tömb és csak akkor megyünk végig rajta egy map-val, ha ennek a length-je az nagyon, mint nulla 
és akkor a ? -ban, tehát ha ez igaz, akkor végigmegyünk egy map-val és kiírjuk az error-t, ami benne van, ha meg : tehát nem igaz, hogy van 
error, akkor meg egy üres string lesz az értéke!!!! 

    <h3>Teendő elnevezése</h3>
    <input type="text" value={currentTask} className="center-input"
    onChange={(e)=>setCurrentTask(e.target.value)}
    ></input>
**************
itt a az input-nál a fontos dolgok
1. type az legyen text, mert ebbe bele szeretnénk írni valamit 
2. value az mindig az legyen a változó értéke, amit hozzákötünk ehhez az input,hoz, tehát a változó aktuális értéke, amit az input-ból majd 
kiszedünk 
3. onChange -> ha megváltozik ennek az állapota, tehét a felhasználó mást írt be, akkor ezt az új értéket ki akarjuk innen szedni 
    és ezzel set-eleni a currentTask-ot, fontos, hogy úgy tudjuk kiszedni az értéket, hogy van egy event objektum, aminek van egy olyanja 
    hogy target és azon belül value és nekünk ez kell majd, ezzel fogjuk set-telni a currentTask-ot!!!!! 

***************
            <h3>Fontosság</h3>
            <select value={currentImportance} className="center-input"
            onChange={(e)=>setCurrentImportance(parseInt(e.target.value))}>
                <option value={0}>Válassz fontosságot!</option>
                <option value={1}>kicsit fontos</option>
                <option value={2}>közepesen fontos</option>
                <option value={3}>nagyon fontos</option>
            </select>

Itt az a select-re csináltuk meg ugyanazt mint az input-ra az elöbb 
1. hozzákötjük value-val a megfelelő useState-s változónak az értékét!!! 
2. onChange-vel kiszedjük amit kell e.target.value és ezzel majd set-teljük a currentImportance-nak az értékét 
    mivel itt ez egy szám lesz, mert az option-öknek a value-ja egy szám, ezért amikor megszerezzük, akkor parseInt-elni kell 
    ez nagyon fontos, mert a e.target.value az mindig egy string-et ad majd vissza!!!!! 
3. csinálunk optio-öket a megfelelő value-val és leírással
***************************
    <button className="center-input"
    onClick={createTask}
    >Teendők felvitele</button>

Csinálunk egy button-t, mert ezzek tudjuk majd felvinni az adatokat, ennek egy onClick-vek megadtuk a függvényt, amit csináltunk 
mi történik ebbe 
1. megnézzük, hogy van-e hibánk, ha igen, akkor ezeket belerakjuk az errors tömbbe és kiírjuk ha viszont nincsen ez onnan tudjuk, hogy 
létrehoztunk egy let-es errorExists változót és ha ennek az értéke az true, akkor van hibánk, de alapból false, megadtuk, hogy mik lehetnek a hibák
egy if-ben és ott ennek a változónak az értékét mindig true-ra állítjuk és berakjuk a megfelelő szöveget az errors tömbbe 
ha ez a errorExists true muóiután megnéztük, hogy mik lehetnek a lehetséges hibák, akkor kiírjuk azokat és nem is megyünk tovább a függvényben 
hanem return-ölünk!!!! 

ha nincsen hiba, akkor csinálunk egy objektumot, amiben benne van az importance meg a currentTask és ezt beletesszük a tasks tömbbe!!!!! 
és nagyon fontos, hogy a importance és a task-ot majd az eredeti értékre, tehát nullára és egy üres string-re kell majd itt sel-elni 
hogy majd több dolgot is fel tudjunk majd vinni!!!!! 
*************************
            <ul className="tasks-ul">
                {
                    tasks.map((t, i)=> {
                        let bgColor = "";

                        switch(t.importance) {
                            case 1: 
                                bgColor = "red";
                                break;
                            case 2: 
                                bgColor = "orange";
                                break;
                            case 3:
                                bgColor = "crimson";
                                break;
                        }

                        return <li style={{backgroundColor: bgColor}} key={i}>{t.task}
                            <button className="small-input"
                            onClick={()=>completeTask(i)}>Megoldottam</button>
                        </li>
                    })
                }
            </ul>

Ez egy nagyon fontos rész, mert itt akarjuk megjeleníteni a tasks-okat egy ul-ben megyünk majd végig rajtuk és fontos, hogy 
majd egy li-t adunk vissza minden egyes task-ra 
fontos dolgok
1. most csináltunk egy {} a map-nál, mert itt belül még be akarjuk állítani a backgroundColor-t, attól függően, hogy milyen importance-a van 
    az egyes task-nak
    - létrehozunk egy let-es változót, amit majd egy switch-vel, amit a t.importance-ra csinálunk megcsináljuk, hogy van 3 darab 
    case, mert 3-féle értéke lehet majd a t.importance-nek!!! minden egyes case-nél adunk egy valamilyen backgroundColor-t 
    és ezt majd a li-nél egy style-val megadjuk -> <li style={{backgroundColor: bgColor}}
2. fontos, hogy itt van {} és ezért kell return is 
3. csináltunk egy button, fontos, hogy ez az li-ben legyen, aminek megadtuk a completeTask-ot, ami vár egy i-t, hogy majd melyik indexű task-ot 
akarjuk majd kitörölni!!! ezt meg is adjuk majd itt meghívásnál, mert a map megad nekünk egy i-t minden elemre onClick={()=>completeTask(i)}
és ha rákattintunk ez kiveszi a megfelelő task-ot ez a függvény a tasks tömbből, splice-ot használtuk itt!!!! 
4. meg fontos, hogy ez a task ez egy tömb objektumokkal, ezért úgy kell majd hívatkozni, hogy t.importance és t.task!!!!!! 
*/ 
}

export default TodoList;