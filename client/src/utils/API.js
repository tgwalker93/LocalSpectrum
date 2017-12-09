import axios from "axios";

export default {
  // Gets all books
  user: function () {
    return axios.get("/api/auth/user/");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
  saveUser: function (userData) {
    return axios.post("/api/users/saveUser", userData)
  },
  logout: function () {
    console.log("LogoutAPI")
    return axios.post("/api/auth/logout")
  },
  login: function (userData) {
    console.log("LoginAPI")
    return axios.post("/api/auth/login", userData)
  },
  //Get user data once on the profile page
  getUserData: function (id) {
    console.log("I'm in front-end API getUserData and the ID is " + id);
    return axios.get("/api/profile/getUserData/" + id)
  },

  signUp: function(userObj) {
    return axios.post("/api/auth/signup", userObj);
  },
  // getItems: function (itemIds) {
  //   console.log("I'm in front-end API and the ID is " + itemIds);
  //   itemIds = {itemIds};
  //   return axios.get("/api/profile/getItems", itemIds);
  // },
  saveItem: function (item) {
    console.log("i'm in save item");
    console.log(item);
    return axios.post("/api/profile/saveItem", item)
  },
  getItems: function(user) {
    console.log("IM IN UTILS/API getItems!!!!!!");
    console.log(user);
    return axios.get("/api/profile/getItems/" + user.user._id);
  },
  getItemReviews: function (item) {
    return axios.get("/api/profile/getItemReviews", item)
  },
  postReview: function(reviewObj) {
    console.log("I'm in the utils/API front-end postReview, below is the reviewObj that I received");
    console.log(reviewObj);
    return axios.post("/api/home/postReview", reviewObj);
  },
  search: function (searchObj) {
    console.log("I'M IN AXiOS SEARCH FRONT ENT UTILS/API")
    console.log(searchObj)
    return axios.get("/api/home/search/search=" + searchObj.search + "&location=" + searchObj.location);
  }
};