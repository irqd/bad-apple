import "./public/css/style.css";

function imageToTable(imagePath, cellSize) {
  // Create a new Image object
  const image = new Image();
  // Set the source of the image to the specified imagePath
  image.src = imagePath;

  // Function to be executed when the image is fully loaded
  image.onload = function () {
    // Get the canvas element and its 2D rendering context
    const canvas = document.getElementById("imageCanvas");
    const context = canvas.getContext("2d");
    // Get the container div where the table will be placed
    const tableContainer = document.getElementById("tableContainer");

    // Set the canvas size to match the image size
    canvas.width = 150; // Adjusted for 100x100 resolution
    canvas.height = 110; // Adjusted for 100x100 resolution

    // Draw the image on the canvas
    context.drawImage(image, 0, 0, 150, 110); // Adjusted for 100x100 resolution

    // Generate the HTML table with checkboxes
    let tableHTML = "<table>";
    for (let y = 0; y < 110; y += cellSize) {
      // Adjusted for 100x100 resolution
      tableHTML += "<tr>";
      for (let x = 0; x < 150; x += cellSize) {
        // Adjusted for 100x100 resolution
        // Get the pixel data at the current position
        const pixelData = context.getImageData(x, y, 1, 1).data;
        // Check if the pixel is black (assuming black is [0, 0, 0])
        const isBlack =
          pixelData[0] === 0 && pixelData[1] === 0 && pixelData[2] === 0;

        // Add a table cell with a checkbox and a label
        tableHTML += `
                       <td>
                          <input type="checkbox" id="checkbox_${x}_${y}" ${
          isBlack ? "checked" : ""
        } />
                          <!-- <label for="checkbox_${x}_${y}" style="background-color: ${
          isBlack ? "#333" : "#fff"
        };"></label> -->
                       </td>`;
      }
      tableHTML += "</tr>";
    }
    tableHTML += "</table>";

    tableContainer.innerHTML = tableHTML;
  };
}

function startRender() {
  console.log("start");

  // Define the frame rate and calculate the delay for each frame
  const frameRate = 6; // frames per second
  const delayPerFrame = 3000 / frameRate; // milliseconds per frame

  for (let frame = 0; frame <= 6572; frame++) {
    (function (currentFrame) {
      setTimeout(() => {
        let paddedFrame = currentFrame;

        if (currentFrame < 10) {
          paddedFrame = `000${currentFrame}`.slice(-4);
        } else if (currentFrame < 100) {
          paddedFrame = `00${currentFrame}`.slice(-4);
        } else if (currentFrame < 1000) {
          paddedFrame = `0${currentFrame}`.slice(-4);
        }

        const imagePath = `./public/images/frames/frame-${paddedFrame}.jpg`;
        const cellSize = 4; // Adjusted for 100x100 resolution
        imageToTable(imagePath, cellSize);
      }, delayPerFrame * currentFrame);
    })(frame);

    console.log(frame);
  }
}

function renderStartButton() {
  const tableContainer = document.getElementById("tableContainer");
  const tableHTML = `
    <button id="start_bad_apple">Start Bad Apple</button>
  `;

  tableContainer.innerHTML = tableHTML;

  const startBadApple = document.getElementById("start_bad_apple");
  startBadApple.addEventListener("click", startRender);
}

// on document ready just set an empty table
document.addEventListener("DOMContentLoaded", () => {
  renderStartButton();
});
