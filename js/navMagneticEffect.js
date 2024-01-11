function setProperty({ element, property, value }) {
  // value *= amplifier;

  element.style.setProperty("--" + property, value + "%");
}

function applyMagneticEffect({ element, reducer = { x: 2, y: 1.5 } }) {
  element.addEventListener("mouseleave", (e) => {
    setProperty({ element, property: "x", value: 0 });
    setProperty({ element, property: "y", value: 0 });
  });

  element.addEventListener("mousemove", (e) => {
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    //offsetX -> [0,width].. le tranformer à [-width/2,width/2] 👇🏾 = -width/2
    // value/width -> [-.5 , .5]
    // *2 -> value [-1,1]
    //*100-> value[-100%,100%]
    //Reducer ( déviser le percentage sur ??(à nous de le préciser à la fois pour x et y))
    const cursor = {
      x: (2 * 100 * (e.offsetX - width / 2)) / width,
      y: (2 * 100 * (e.offsetY - height / 2)) / height,
    };

    cursor.x = cursor.x / reducer.x;
    cursor.y = cursor.y / reducer.y;

    setProperty({ element, property: "x", value: cursor.x });

    setProperty({ element, property: "y", value: cursor.y });
  });
}

const anchors = document.querySelectorAll(".nav-menu a");

anchors.forEach((anchor) => {
  applyMagneticEffect({ element: anchor, reducer: { x: 2, y: 2 } });
});
