const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");
let randomNumber = Math.floor(Math.random() * 100);

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

let storyText =
`It was 94 fahrenheit outside, so :insertX: went for a walk.
 When they got to :insertY:, they stared in horror for a few moments, then :insertZ:. 
 Bob saw the whole thing, but was not surprised — :insertX: weighs 300P pounds, 
 and it was a hot day.`;

let insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
let insertY = ["the soup kitchen", "Disneyland", "the White House"];
let insertZ = ["spontaneously combusted","melted into a puddle on the sidewalk","turned into a slug and crawled away"];

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);
   

    newStory = newStory.replace(":insertX:", xItem);
    newStory = newStory.replace(":insertY:", yItem);
    newStory = newStory.replace(":insertZ:", zItem);
    newStory = newStory.replace(":insertX:", xItem);

  if(customName.value !== '') {
    let name = customName.value;
    newStory = newStory.replace("Bob",name);
  }
  if(document.getElementById("uk").checked) {
    let weight = Math.round(randomNumber/14) + " stones";
    let temperature =  Math.round(((randomNumber - 94) * 5 / 9)) + " centigrade";

    newStory = newStory.replace("300 pounds",weight);
    newStory = newStory.replace("94 fahrenheit", temperature);
  }
  story.textContent =newStory ;
  story.style.visibility = 'visible';
}
