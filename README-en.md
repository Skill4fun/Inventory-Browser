[Hungarian version](/README.md)


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Skill4fun/Inventory-Browser">
  <img src="/docs/icons/LOGO_transparent-background.png" alt="Logo" width="120" height="120">
  </a>

<div id="top"></div>
<h1 align="center">Inventory Browser</h1>

  <p align="center">
    An App designed to display the current inventory of a company in a browsable, user-friendly manner, generate quotations and useful reports for a variety of purposes.
    <br />
    <a href="https://github.com/Skill4fun/Inventory-Browser"><strong>Explore the project directory »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Skill4fun/Inventory-Browser">View Demo</a>
    ·
    <a href="https://github.com/Skill4fun/Inventory-Browser/issues">Report Bug</a>
    ·
    <a href="https://github.com/Skill4fun/Inventory-Browser/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#target-areas-of-use">Target areas of use</a></li>
        <li><a href="#structure-of-the-site">Structure of the site</a></li>
        <li><a href="#displayed-content">Displayed content</a></li>
        <li><a href="#user-permissions">User permissions</a></li>
        <li><a href="#roadmap">Roadmap</a></li>
        <li><a href="#built-with">Built with</a></li>
      </ul>
    </li>
    <li><a href="#configuration">Configuration</a></li>
    <li><a href="#contribution">Contribution</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

The app is designed to display the current inventory of an international consumer electronics and computer accessories manufacturer in a browsable, user-friendly manner and generate useful, exportable reports for a variety of purposes.
The initial raw data the App uses is provided by the factory's hourly updated XML data-feed for approximately 3,000 unique products.



### Target areas of use

#### Sales
>_Useful tool in the field:
>The App helps to present the factory's assortment transparently during negotiations. We can display the product portfolio quickly and simply, filter it by category or search among products by other criteria.
>It provides information about current stocks, prices, as well as photos and other specs of each product._
>
>_Support in other sales activities:
>It simplifies the compilation of different custom quotes as you can browse between products and find all relevant data in one place.
>In the future, it will be possible to compile and export Special Offers/quotations, downloadable in excel/pdf format_

#### Business Development
>_The App provides features where you display various long-term statistical analyzes / statements / charts to help us keep track of current market trends and needs. Based on these, our business strategy can be more accurate and effective.
>It helps to determine the right pricing policy and future product developments (supply expansion, product delisting) aiming the best possible rate of return and the lowest possible risk._


## Structure of the site
_(in accordance with the [roadmap](#roadmap))_

#### Displayed content
>Pages available to **Guest** visitors
>* **Landing page** - _the current promotional products are displayed_  
>* **Registration page** - _guests can get access to the site by filling in the registration form_  
>* **Login page** - _registered users can login to the site here_
>
>Pages available to **Logged in** users
>* **Profil page** - _the user can update the user details previously provided_  
>* **Inventory browser** - _browse products, filter, free word search, display product data/descriptions/images_  
>* **Quotation request** - _the user can create a list of selected products for which he/she would like to request a specific quote_  
>* **Quotation requests sent** - _list of quotation requests previously submitted by the user_  

#### User permissions
>**Guest**  
>* Can browse the site, view current promotions
>* Can sign up on the site  
>
>**Registered user**  
>* Access product data, use the stock browser
>* Can create a quotation request list of relevant products, but cannot send it yet
>* Can modify own user details
>
>**Registered and email verified user**   
>* Can send the quotation request list
>* Can see previously submitted quote requests
<p align="right">(<a href="#top">back to top</a>)</p>


#
<!-- ROADMAP -->
<details> 
  <summary><h2>Roadmap<h2/></summary>  

- [X] Displaying current promotions and discounted products - main page
- [X] User registration
    - [X] Email verification (automatic confirmation link sending)
- [X] User login
- [X] Admin login, unique permissions
- [X] Inventory browser
    - [X] Load and display products with details and photos
    - [X] Filter displayed products
    - [X] Search product by ID/name
- [X] Compilation of a quotation request list
    - [X] compiling and sending list of selected products
    - [ ] export compiled list in excel format
    - [ ] export compiled list in pdf/word format
    - [ ] send list by email
- [ ] Special offer maker - Admin side
    - [ ] compiling a list of selected products - with date, name, qty, price, specs, photo, available stocks
    - [ ] export compiled list in excel format
- [ ] Statistics - Admin side
    - [ ] display changes in distribution prices for a given period
    - [ ] represent changes on a chart/diagram
- [ ] Automatic scheduled database update
    - [ ] Scheduled corporate database connection via xml/csv datafeed
    - [ ] EU Customs Tariff API connection - collection of product data (product category, customs tariff number/EKAER validation)
    - [ ] EU EPREL API connection - collection of product specifications (EPREL product data sheets, QR code)
    - [X] Database update (prices, stocks, product range)
- [ ] Contact form - sending user e-mail to the admin
<p align="right">(<a href="#top">back to top</a>)</p>
</details>

#
<br/>

<!-- STACK -->
## Built with
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
>**Test:**  
>* [Jest](https://jestjs.io/)
>* [Mailtrap](https://mailtrap.io/)
>
>**API documentation:**  
>* [Swagger/OpenAPI](https://swagger.io/specification/)  
>

<!-- CONFIGURATION -->
## Configuration
  
1. create `.env` files in the `backend` and `frontend` directory based on `.env.example`
2. run `docker compose build` command in root directory, then
3. the `docker compose up` command can be used to start the application
4. use `npm run loadData` command in the `backend` root directory to load our database with test products (in the case of an online database, the total upload time is 2-3 minutes)
5. use `npm run loadArticles` command in the `backend` root directory, to load our database with some test promotional articles
6. Inventory Browser app: http://localhost:3000/
7. Open API dokumentation: http://localhost:4000/api-docs

<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag `enhancement`.

>1. Fork the Project
>2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
>3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
>4. Push to the Branch (`git push origin feature/AmazingFeature`)
>5. Open a Pull Request

<!-- CONTACT -->
## Contact

>Gergely Almasi 
>
>[![LinkedIn][linkedin-shield]][linkedin-url] [![twitter][twitter-shield]][twitter-url] 
>
>_Project Link: [https://github.com/Skill4fun/Inventory-Browser](https://github.com/Skill4fun/Inventory-Browser)_  
>
>
><!-- ACKNOWLEDGMENTS -->
>##### _Acknowledgments:_
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

<p align="right">(<a href="#top">back to top</a>)</p>



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
