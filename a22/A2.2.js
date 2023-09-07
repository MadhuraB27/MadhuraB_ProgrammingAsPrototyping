let topTextInput, bottomTextInput;
let fontSizeSlider;
let fontColorSliderR, fontColorSliderG, fontColorSliderB;
let fontSelector;
let memeImage;
let imageSelector;
let selectedImage; 

function setup() {
  let can=createCanvas(600, 600);
  can.parent('column-two');

  imageSelector = createSelect();  
  imageSelector.option('Tuxedo and norml pooh', 'images/Tuxedo Winnie The Pooh.png');
  imageSelector.option('oh yes oh no', 'images/oh yes oh no meme.png');
  imageSelector.option('drake hotline bling', 'images/drake meme.jpg');
  imageSelector.changed(changeImage);
  imageSelector.parent('column-one');

  
  topTextInput = createInput('Top text');
  topTextInput.parent('column-one');
  
  bottomTextInput = createInput('Bottom text');
  bottomTextInput.parent('column-one');
  
  fontSizeSlider = createSlider(10, 100, 36); 
  fontSizeSlider.parent('column-one');
  
  fontColorSliderR = createSlider(0, 255, 255);
  fontColorSliderR.parent('column-one');
  
  fontColorSliderG = createSlider(0, 255, 255);
  fontColorSliderG.parent('column-one');
  
  fontColorSliderB = createSlider(0, 255, 255);
  fontColorSliderB.parent('column-one');
  
  fontSelector = createRadio();
  fontSelector.option('Impact');
  fontSelector.option('Comic Sans');
  fontSelector.option('Times New Roman');
  fontSelector.selected('Impact');
  fontSelector.parent('column-one');
  
  let generateButton = createButton('Make Meme');
  generateButton.parent('column-one');
  generateButton.mousePressed(generateMeme);
}

function draw() {
  background(0,0.0);
  imageMode(CENTER);
  
  if (selectedImage) {
    image(selectedImage, width / 2, height / 2); 
  }
  
  
  textSize(fontSizeSlider.value());
  colorMode(RGB);
  fill(0); // Set text color to black
  
  let selectedFont = fontSelector.value();
  textFont(selectedFont);
  
  text(topTextInput.value(), width / 5, 160);
  text(bottomTextInput.value(), width / 5, height - 240);
}

function changeImage() {
  const selectedImagePath = imageSelector.value();

  if (selectedImagePath) {
    loadImage(selectedImagePath, (img) => {
      // Callback function to handle image load
      selectedImage = img;
      redrawCanvas(); // Redraw the canvas with the new image
    });
  }
}

function redrawCanvas() {
  background(0); // Clear the canvas with a black background

  if (selectedImage) {
    image(selectedImage, width / 2, height / 2);
  }

  textSize(fontSizeSlider.value());
  colorMode(RGB);

  let r = fontColorSliderR.value();
  let g = fontColorSliderG.value();
  let b = fontColorSliderB.value();

  fill(r, g, b);
  textAlign(CENTER, CENTER);

  let selectedFont = fontSelector.value();
  textFont(selectedFont);

  text(topTextInput.value(), width / 2, 160);
  text(bottomTextInput.value(), width / 2, height - 240);
}

function changeImage() {
  selectedImage = loadImage(imageSelector.value());
}

function saveMeme() {
  saveCanvas('meme', 'png'); // Save the canvas as 'meme.png' 
}