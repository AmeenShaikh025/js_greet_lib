(function (global, $) {
  //create a fn  thant returns a fn constructor so that we
  //don't need to use new every time in app.js when we call Greetr

  var Greetr = function (firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };

  //outsiders cannot use it as it is not exposed

  var supportedLangs = ["en", "es"];

  var greetings = {
    en: "Hello",
    es: "Hola",
  };

  var formalGreetings = {
    en: "Greetings",
    es: "Saludos",
  };

  var logMessages = {
    en: "Logged in",
    es: "Registrado",
  };

  //outsiders cannot use it as it is not exposed

  //add methods in this proto, because memory efficient
  Greetr.prototype = {
    fullName: function () {
      return this.firstName + " " + this.lastName;
    },
    validate: function () {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid Language!";
      }
    },
    greeting: function () {
      return greetings[this.language] + " " + this.firstName + " :)";
    },
    formalGreeting: function () {
      return formalGreetings[this.language] + ", " + this.fullName();
    },
    //chaining methods
    greet: function (formal) {
      var msg;

      //if undefined or null it will be coerced to 'false'
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // "this" referes to the calling object at execution time
      //makes the method chainable
      return this;
    },
    log: function () {
      //Internet Explorer doesn't have a console fn so use below if() to check it
      if (console) {
        console.log(logMessages[this.language] + ": " + this.fullName());
      }

      return this;
    },
    setLang: function (newLang) {
      this.language = newLang;

      //check if the language is "en" or "es"
      this.validate();

      return this;
    },
    HTMLGreeting: function (selector, formal) {
      if (!$) {
        throw "jQuery not loaded";
      }

      if (!selector) {
        throw "Missing jQuery selector";
      }

      var msg;

      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      $(selector).html(msg);

      return this;
    },
  };

  //Greeter constructor
  Greetr.init = function (firstName, lastName, language) {
    var self = this;

    self.firstName = firstName || "";
    self.lastName = lastName || "";
    self.language = language || "en";

    self.validate();
  };

  //setting constructor protype to Greetr proto
  Greetr.init.prototype = Greetr.prototype;

  //exposing the Greetr fn to gloabl object(i.e, windows)
  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
