(function () {

  var helloSpeaker = (function () {
    var speakWord = "Hello";

    function speak(name) {
      console.log(speakWord + " " + name);
    }

    return {
      speak: speak
    };
  })();

  var byeSpeaker = (function () {
    var speakWord = "Good Bye";

    function speak(name) {
      console.log(speakWord + " " + name);
    }

    return {
      speak: speak
    };
  })();

  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  for (var i = 0; i < names.length; i++) {

    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === "j") {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }

  }

  console.log("=== Custom logic: names ending with 'a' ===");

  for (var i = 0; i < names.length; i++) {
    var lastLetter = names[i].charAt(names[i].length - 1).toLowerCase();

    if (lastLetter === "a") {
      console.log("Special Hello " + names[i]);
    }
  }

})();
