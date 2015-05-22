Template.character.onRendered(function() {
  // Inspired by https://i.imgur.com/dQMXh6Z.gif

    var canvas = this.find('#canvas');
    var ctx = canvas.getContext('2d');
    var arcs = [];
    var centerX, centerY;

    var drawArc = function(x, y, radius, color, angle, size, separations, width) {
        var spaceSeparation = Math.PI / 5;
        var pieceSize = (size - (spaceSeparation * separations)) / (separations + 1);
        for (var i = 0; i <= separations; i++) {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = width;
          ctx.arc(x, y, radius, angle + (pieceSize + spaceSeparation) * i, angle + (pieceSize + spaceSeparation) * i + pieceSize, false);
          ctx.stroke();
          ctx.closePath();
        }

    };

    var makeArc = function(options) {
        var obj = {};
        obj.radius = options.radius;
        obj.separations = options.separations;
        obj.color = options.color;
        obj.speed = options.speed;
        obj.width = options.width || 10;
        obj.direction = 0;
        obj.angle = options.angle || Math.PI / 4;
        obj.size = options.size;
        obj.draw = function() {
            drawArc(centerX, centerY, obj.radius, obj.color, obj.angle, obj.size, obj.separations, obj.width);
            obj.direction += Math.PI / 180;
            obj.angle += Math.PI / 180 * Math.sin(obj.direction) * obj.speed;
        };

        return obj;
    };

    var init = function() {
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
        var currentRadius = 30;
        for (var i = 0; i < 8; i++) {
          var width = 5 + Math.random() * 6;
            arcs.push(makeArc({
              width: width,
              radius: currentRadius,
              color: '#98ECF0',
              speed: 5 + Math.random() * 5,
              size: 2 * Math.PI - Math.random() * Math.PI,
              separations: Math.round(Math.random() * 4),
              angle: Math.random() * Math.PI
            }));
          currentRadius += 10 + width;
        }
    };
    var loop = function(j) {
        // Add a motion blur
        ctx.fillStyle = 'rgba(2, 7, 13, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < arcs.length; i++) {
            arcs[i].draw();
        }
      if (j < 180) {
        setTimeout(function(){loop(j + 1);}, 100/6);
      }
    };
    init();
    loop(0);
});
