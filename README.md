[![https://github.com/tgwalker93/StockLeague/blob/master/public/assets/img/carousel1.gif](https://github.com/tgwalker93/StockLeague/blob/master/public/assets/img/carousel1.gif)](https://github.com/tgwalker93/StockLeague/blob/master/public/assets/img/carousel1.gif)
# Local Spectrum

A `NodeJS`, `MongoDB`, `Express`, and `ReactJS` application where users can query items within cities that were posted by other users. Users are free to add reviews, comments, and post their own items if they register. For each item posted, the user can add an image, title, and description. 

## Getting Started

You can refer to the link here to see the application deployed on Heroku: https://local-spectrum.herokuapp.com/


## In Progress

This application is still in progress, and there isn't much in the database. 

## Screenshots

In most cases, you won't find anything with searching because there is isn't much in the database. However, if you search "Apple" in "Irvine", or "Irvine, Ca", you will find an item. 

### Search Page
[![/images/Search.PNG](/images/Search.PNG)](/images/Search.PNG)


### Profile Page
[![/images/ProfilePage.PNG](/images/ProfilePage.PNG)](/images/ProfilePage.PNG)

### Posting a Comment
[![/images/postingComment.PNG](/images/postingComment.PNG)](/images/postingComment.PNG)

### Review Page
[![/images/ReviewPage.PNG](/images/ReviewPage.PNG)](/images/ReviewPage.PNG)













## Built With

* [React](https://reactjs.org/docs/) - Fron-End Framework
* [MongoDB](https://www.mongodb.com/) - Database
* [Node.js](https://nodejs.org/en/docs/) - Back-End Framework
* [Express.js](https://expressjs.com/) - Routing and middleware web framework
* [Passport.js](http://www.passportjs.org/docs) - Authentication middleware for Node
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Library for hashing passwords
* [Bootstrap](https://getbootstrap.com/docs/3.3/getting-started/) - Front-End Framework


## Authors

* **Tyler Walker** - *React/Node Developer* - [tgwalker93](https://github.com/tgwalker93)
* **Tammy Le** - *Front-End Developer* - [letam245](https://github.com/letam245)
* **Prathibha Chunchu** - *Front-End Developer* - [chunchuprati](https://github.com/chunchuprati)
* **Omar Solis** - *Back-End Developer* - [Yakoloi](https://github.com/Yakoloi)


---


[![HitCount](http://hits.dwyl.io/tgwalker93/StockLeague.svg)](http://hits.dwyl.io/tgwalker93/StockLeague)

# Create React Express App

## About This Boilerplate

This setup allows for a Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following commands:

```
yarn install
cd client
yarn install
cd ..
``

After both installations complete, run the following command in your terminal:

```
yarn start
```

That's it, your app should be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

After confirming that you have an up to date git repository and a Heroku app created, complete the following:

1. Build the React app for production by running the following command:

```
yarn build
```

2. Add and commit all changes to git

3. Push to Heroku

If all previous steps were followed correctly, your application should be deployed to Heroku!
