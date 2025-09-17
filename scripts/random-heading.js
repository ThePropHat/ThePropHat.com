// array of possible h2 texts
const headings = [
  "they call me theprophat.com",
  "i dwell at theprophat.com",
  "you've reached theprophat.com",
  "you came to theprophat.com to subscribe to my youtube channel *mind controls you*",
  "theprophat.com proudly supports the fantastic four",
  "welcome to theprophat.com",
  "www.theprophat.com",
  "",
  "its 'the-prop-hat'",
  "how did you get here?",
  "do you know the way out of here?",
  "theprophat.com is proudly hosted in Twin Peaks",
  "click here to visit theprophat.com!",
  "do you want to play MINECRAFT?",
  "do you like to play MINECRAFT?",
  "you very own resident fantastic four fan at www.theprophat.com",
  "THEPROPHAT IS ONLINE",
];

// pick random heading
const randomIndex = Math.floor(Math.random() * headings.length);

// replace h2 text
document.getElementById("random-heading").innerText = headings[randomIndex];