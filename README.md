
[Angol nyelvű verzió](/README-en.md)


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Skill4fun/Inventory-Browser">
  <img src="/docs/icons/LOGO_transparent-background.png" alt="Logo" width="120" height="120">
  </a>

<div id="top"></div>
<h1 align="center">Készletböngésző</h1>

  <p align="center">
    Egy speciális alkalmazás, raktárkészletek böngészésére és hasznos kimutatások, árajánlatok generálására.
    <br />
    <a href="https://github.com/Skill4fun/Inventory-Browser"><strong>Projektmappa felderítése »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Skill4fun/Inventory-Browser">Demo megtekintése</a>
    ·
    <a href="https://github.com/Skill4fun/Inventory-Browser/issues">Hiba bejelentése</a>
    ·
    <a href="https://github.com/Skill4fun/Inventory-Browser/issues">Új funkció kérése</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tartalomjegyzék</summary>
  <ol>
    <li>
      <a href="#projekt-összefoglaló">Projekt Összefoglaló</a>
      <ul>
        <li><a href="#alkalmazási-területek">Alkalmazási területek</a></li>
        <li><a href="#az-oldal-felépítése">Az oldal felépítése</a></li>
        <li><a href="#megjelenített-tartalom">Megjelenített tartalom</a></li>
        <li><a href="#felhasználói-jogosultságok">Felhasználói jogosultságok</a></li>
        <li><a href="#ütemterv">Ütemterv</a></li>
        <li><a href="#alkalmazott-technológiák">Alkalmazott technológiák</a></li>
      </ul>
    </li>
    <li><a href="#alkalmazás-telepítése-és-konfigurálása">Alkalmazás telepítése és konfigurálása</a></li>
    <li><a href="#közreműködés">Közreműködés</a></li>
    <li><a href="#kapcsolat">Kapcsolat</a></li>
    <li><a href="#köszönet-az-alábbi-tartalmakért-melyek-segítségemre-voltak-a-fejlesztés-során">Hasznos linkek</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## Projekt Összefoglaló

Ez az alkalmazás azzal céllal jött létre, hogy egy elektronikai eszközök és számítástechnikai kiegészítők gyártásával foglalkozó nemzetközi vállalat mindenkori aktuális készlet adatait, különböző célok szerint rendszerezze és felhasználóbarát módon megjelenítse. 
Az így nyert adatokból hasznos kimutatásokat generálhatunk, melyeket akár exportálhatunk is offline használatra.

Az alkalmazás által használt nyers készlet adatokat a vállalat óránként frissülő XML adatfolyama biztosítja, hozzávetőleg 3000 egyedi cikszámmal ellátott termékhez.

### Alkalmazási területek

#### Értékesítés
>Használat a fielden:  
>_Egy hasznos eszköz, amely segít a gyár szortimentjének átlátható, interaktív prezentálásában üzleti tárgyalások során. A termékportfóliót gyorsan és egyszerűen megjeleníthetjük, szűrhetünk benne kategóriára, vagy kereshetünk a termékek között egyéb szempontok alapján.
>Átfogó információkat kaphatunk minden egyes termékről, beleértve az elérhető készleteket, aktuális árakat és termékfotókat._
>
>Árajánlatok összeállítása:  
>_Mivel hatékonyan böngészhetünk a termékek között és minden releváns adatot megtalálhatunk egy helyen, nagyban megkönnyíti számunkra a sokszor kihívást jelentő komplex árajánlatok összeállítását.
>Nincs más dolgunk, mint kiválasztani a kívánt termékeket, beállítani a szükséges paramétereket, majd elmenteni a végleges ajánlatot. Az elkészített árajánlatokat több féle formátumban is letölthetjük offline használatra._

#### Üzletfejlesztés
>_A bejövő adatok feldolgozásával az alkalmazás képes különböző hosszú távú statisztikai elemzések / kimutatások / diagramok megjelenítésére, amelyek segítenek az aktuális trendek és piaci igények nyomonkövetésében. Ezek alapján üzleti stratégiánk pontosabb és hatékonyabb lehet.  
>Segít olyan kardinális kérdésekben, mint a megfelelő árazáspolitika meghatározása és a jövőbeni termékfejlesztések (kínálatbővítés, termékkivezetés) megtervezése, ezzel csökkentve a rejtett kockázatokat és javítva a várható megtérülési rátát._


## Az oldal felépítése
_(az [ütemterv](#ütemterv)-vel összhangban)_

#### Megjelenített tartalom
>**Vendég** látogatók számára elérhető oldalak
>* **Landing Page** - _az aktuális promóciós termékek jelennek meg_  
>* **Regisztrációs oldal** - _a látogató a regisztrációs form kitöltésével hozzáférést szerezhet az oldalhoz_  
>* **Bejelentkezési oldal** - _a regisztrált felhasználók itt jelentkezhetnek be az oldalra_
>
>**Bejelentkezett** felhasználók számára elérhető oldalak
>* **Profil oldal** - _a felhasználó frissítheti a korábban megadott regisztrációs adatait_  
>* **Készlet böngésző** - _böngészés a termékek között, szűrés, szabadszavas keresés, termékadatok/leírások/képek megjelenítése_  
>* **Árajánlatbekérő** - _a felhasználó listát készíthet a kiválasztott termékekből, amelyekre szeretne egyedi árajánlatot kérni_  
>* **Elküldött árajánlatkérések** - _a felhasználó által korábban beküldött árajánlatkérések terméklistája_  

#### Felhasználói jogosultságok
>**Vendég**  
>* Nézelődhet az oldalon, megtekintheti az aktuális promóciókat
>* Regisztrálhat az oldalon  
>
>**Regisztrált felhasználó**  
>* Hozzáfér a termékekadatokhoz, használhatja a készlet böngészőt
>* Árajánlatbekérő listát készíthet a számára releváns termékekből, de elküldeni még nem tudja
>* Módosíthatja a saját felhasználói adatait
>Regisztrált és az emailes verifikáción átesett felhasználó:  
>* Elküldheti az ajánlatigényeit
>* Megtekintheti a korábban beküldött árajánlatigényeit
<p align="right">(<a href="#top">Ugrás a tetejére</a>)</p>


#
<!-- ROADMAP -->
<details> 
  <summary><h2>Ütemterv<h2/></summary>  

- [X] Aktuális promociók, leárazott termékek megjelenítése - főoldal
- [X] Felhasználó regisztráció
    - [X] Emailes verifikáció (automatikus megerősítő link küldés)
- [X] Felhasználó bejelentkezés
- [X] Admin bejelentkezés, egyedi jogosultságok
- [X] Készletböngésző
    - [X] Termékek betöltése és megjelenítése specifikációkkal és fotókkal
    - [X] Termékek szűrése és megjelenítése
    - [X] Keresés termékre, cikkszám/név alapján
- [X] Árajánlat-bekérő lista összeállítása
    - [X] a kiválasztott termékekből lista készítése és elküldése
    - [ ] összeállított lista exportálása excel formátumban
    - [ ] összeállított lista exportálása pdf/word formátumban
    - [ ] emailben elküldi a listát
- [ ] Egyedi árajánlatkészítő - Admin oldal
    - [ ] a kiválasztott termékek listájának összeállítása - dátummal, névvel, mennyiséggel, árral, specifikációkkal, fotóval, elérhető készletekkel
    - [ ] összeállított lista exportálása excel formátumban
- [ ] Statisztikák - Admin oldal
    - [ ] megjeleníti az eladási árak változásait egy adott időszakra vonatkozóan
    - [ ] változások vizuális ábrázolása charton/diagramon
- [ ] Automatikus ütemezett adatbázis frissítés
    - [ ] Ütemezett vállalati adatbázis kapcsolat xml/csv datafeed-en keresztül
    - [ ] EU Vámtarifa API kapcsolat - termékadatok begyüjtése (termékkategória, vámtarifaszám/EKAER validáció)
    - [ ] EU EPREL API kapcsolat - termékspecifikációk begyüjtése (EPREL termékadatlapok, QR-kód)
    - [X] Adatbázis frissítése (árak, készletek, temékszortiment)
- [ ] Kapcsolat felvételi form - felhasználói email küldés az admin részére
<p align="right">(<a href="#top">Ugrás a tetejére</a>)</p>
</details>

#
<br/>

<!-- STACK -->
## Alkalmazott technológiák
>**Backend:**
>* [MongoDB](https://www.mongodb.com/)
>* [Express](https://expressjs.com/)
>* [Node](https://nodejs.org/)
>* [JSON Web Token](https://jwt.io/)
>* [Nodemailer](https://nodemailer.com/)
>* [Docker](https://www.docker.com/)
>
>**Frontend:**  
>* [React](https://reactjs.org/)
>* [Semantic UI React](https://react.semantic-ui.com/)
>* [Styled-components](https://styled-components.com/)
>* [Docker](https://www.docker.com/)
>
>**Teszt:**  
>* [Jest](https://jestjs.io/)
>* [Mailtrap](https://mailtrap.io/)
>
>**API dokumentáció:**  
>* [Swagger/OpenAPI](https://swagger.io/specification/)  
>

<!-- CONFIGURATION -->
## Alkalmazás telepítése és konfigurálása
  
1. .env file-ok létrehozása a .env.example alapján a backend és frontend mappában
2. docker-compose build parancs futtatása az applikáció gyökérkönyvtárában, majd
3. docker-compose --env-file ./.env.dev up paranccsal indítható el az applikáció
4. a backend gyökér-könyvtárban az - npm run loadData - parancs futtatásával feltölthetjük az adatbázisunkat a termékekkel. (online adatbázisnál 2-3 perc a teljes felöltési idő)
5. a backend gyökér-könyvtárban az - npm run loadArticles - parancs futtatásával feltölthetjük az adatbázisunkat a promóciós cikkekkel.
6. Inventory Browser app: http://localhost:3000/
7. Open API dokumentáció: http://localhost:5500/api-docs


<!-- CONTRIBUTING -->
## Közreműködés

Örömmel fogadunk minden közreműködést! Amennyiben van olyan fejlesztési javaslata amit szívesen megosztana velünk, kérjük, egyszerűen nyisson egy új "issue"-t, írja meg javaslatás és lássa el a „patchrequest” tag-gel, vagy kövesse az alábbiakat:

>1. Fork-olja a projektet
>2. Hozza létre a saját fejlesztési branch-ét (`git checkout -b feature/AmazingFeature`)
>3. Commit-olja a változtatást (`git commit -m 'Add some AmazingFeature'`)
>4. Push-olja (`git push origin feature/AmazingFeature`)
>5. Végül nyisson egy Pull Request-et  

<!-- CONTACT -->
## Kapcsolat

>Gergely Almasi 
>
>[![LinkedIn][linkedin-shield]][linkedin-url] [![twitter][twitter-shield]][twitter-url] 
>
>_Project Link: [https://github.com/Skill4fun/Inventory-Browser](https://github.com/Skill4fun/Inventory-Browser)_  
>
>
><!-- ACKNOWLEDGMENTS -->
>##### _Köszönet az alábbi tartalmakért, melyek segítségemre voltak a fejlesztés során:_  
>_[Complete guide for Styled components in React](https://dev.to/elijahtrillionz/complete-guide-on-how-to-use-styled-components-in-react-360c)_  
>_[Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)_  
>_[Swagger Editor](https://editor.swagger.io/?docExpansion=none)_  
>_[Build component driven UI](https://storybook.js.org/)_  
>_[A useful tool for React testing](https://testing-playground.com/)_  
>_[The most visual and interactive way to learn Git branching](https://learngitbranching.js.org/)_  
>_[12 React UI Layout Grid Components & Libraries](https://blog.bitsrc.io/12-react-ui-layout-grid-components-and-libraries-for-2019-16e8aa5d0b08)_  
>_[Build any component and share it with your team!](https://bit.dev/)_  
>_[A custom hook for managing forms with ease](https://react-hook-form.com/api/useform/)_  
>_[Markdown Guide](https://www.markdownguide.org/basic-syntax/#reference-style-links)_  

<p align="right">(<a href="#top">Ugrás a tetejére</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/Skill4fun/Inventory-Browser.svg
[contributors-url]: https://github.com/Skill4fun/Inventory-Browser/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Skill4fun/Inventory-Browser.svg
[forks-url]: https://github.com/Skill4fun/Inventory-Browser/network/members
[stars-shield]: https://img.shields.io/github/stars/Skill4fun/Inventory-Browser.svg
[stars-url]: https://github.com/Skill4fun/Inventory-Browser/stargazers
[issues-shield]: https://img.shields.io/github/issues/Skill4fun/Inventory-Browser.svg
[issues-url]: https://github.com/Skill4fun/Inventory-Browser/issues
[license-shield]: https://img.shields.io/github/license/Skill4fun/Inventory-Browser.svg
[license-url]: https://github.com/Skill4fun/Inventory-Browser/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=logo=linkedin&colorB=0092cc
[linkedin-url]: https://linkedin.com/in/gergo-almasi
[product-screenshot]: images/screenshot.png
[twitter-shield]: https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2F
[twitter-url]: https://twitter.com/Skill4fun_
