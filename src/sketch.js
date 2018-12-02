import "p5/lib/addons/p5.dom";

export default function sketch(p) {
  let circles = [];
    let r, g, b;
  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    this.circles();
    r = p.random(50, 255);
    g = p.random(0, 200);
    b = p.random(50, 255);
  };

  //clean up after redirect
  /* Reuse this code when starting to implement routing
  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.clicked) {
      p.remove();
      props.history.push("/signup");
    }
  };
*/

  p.circles = function() {
    for (let i = 0; i < 25; i++) {
      let circle = {
        x: Math.floor(Math.random() * (window.innerWidth - 80) + 60),
        y: Math.floor(Math.random() * (window.innerHeight - 80) + 60),
        diameter: Math.floor(Math.random() * 30 + 20),
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4
      };
      circles.push(circle);
    }
  };

  const changeVelocity = c => {
    if (c.x + c.diameter / 2 > window.innerWidth || c.x - c.diameter / 2 < 0) {
      c.dx = -c.dx;
    }
    if (c.y + c.diameter / 2 > window.innerHeight || c.y - c.diameter / 2 < 0) {
      c.dy = -c.dy;
    }
    c.x += c.dx;
    c.y += c.dy;
  };

  const text = () => {
    //title
    p.noStroke();
    p.fill(235, 81, 96);
    p.textFont("Verdana");
    p.textSize(48);
    p.textStyle(p.BOLD);
    p.textAlign(p.CENTER);
    p.text("Axel Vestberg", window.innerWidth / 2, window.innerHeight / 2 - 70);
    //subheading
    p.fill(179, 172, 167)
    p.textSize(24);
    p.textStyle(p.NORMAL);
    p.textFont("Verdana");
    p.text(
      "Building...",
      window.innerWidth / 2,
      window.innerHeight / 2
    );
  };

  p.draw = () => {
    p.background(r, g, b);
    //loop through circles to draw them and draw lines between
    circles.forEach(c => {
      p.noStroke();
      p.fill(255, 255, 255, 50);
      p.ellipse(c.x, c.y, c.diameter, c.diameter);
      changeVelocity(c);
      circles.forEach(circleTwo => {
        let a = Math.abs(c.x - circleTwo.x);
        let b = Math.abs(c.y - circleTwo.y);
        let distance = Math.sqrt(a * a + b * b);
        if (distance < 200) {
          p.stroke(255, 255, 255, 70);
          p.line(c.x, c.y, circleTwo.x, circleTwo.y);
        }
      });
    });
    text();
    p.deviceMoved();
  };

    p.deviceMoved = function() {   
    r = p.map(p.accelerationX, -90, 90, 100, 175);
    g = p.map(p.accelerationY, -90, 90, 100, 200);
    b = p.map(p.accelerationZ, -90, 90, 100, 200);   
}
}