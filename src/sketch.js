import "p5/lib/addons/p5.dom";

export default function sketch(p) {
  let circles = [];
  let snowflakes = [];

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
 
    this.circles();
 
   
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
    p.fill('white');
    p.textFont("Verdana");
    p.textSize(48);
    p.textStyle(p.BOLD);
    p.textAlign(p.CENTER);
    p.text("Axel Vestberg", window.innerWidth / 2, window.innerHeight / 2 - 70);
    //subheading (for some reason this is the color of snowflakes)
    p.fill(240)
    /*
    p.textSize(24);
    p.textStyle(p.NORMAL);
    p.textFont("Verdana");
    p.text(
      "Christmas is coming.",
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    */
  };


  p.draw = () => {
      

    if (window.innerWidth > 700) {
        p.background(140, 140, 140);
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
} else {
    p.background('brown');
  let t = p.frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (var i = 0; i < p.random(2); i++) {
    snowflakes.push(new p.snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}
    text();
  };
// snowflake class
p.snowflake = function() {
    // initialize coordinates
    this.posX = 0;
    this.posY = p.random(-50, 0);
    this.initialangle = p.random(0, 2 * p.PI);
    this.size = p.random(2, 5);
  
    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = p.sqrt(p.random(p.pow(window.innerWidth / 2, 2)));
  
    this.update = function(time) {
      // x position follows a circle
      let w = 0.6; // angular speed
      let angle = w * time + this.initialangle;
      this.posX = window.innerWidth / 2 + this.radius * p.sin(angle);
  
      // different size snowflakes fall at slightly different y speeds
      this.posY += p.pow(this.size, 0.5);
  
      // delete snowflake if past end of screen
      if (this.posY > window.innerHeight) {
        let index = snowflakes.indexOf(this);
        snowflakes.splice(index, 1);
      }
    };
  
    this.display = function() {
      p.ellipse(this.posX, this.posY, this.size);
    };
  }
p.windowResized = function() {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  }
}
