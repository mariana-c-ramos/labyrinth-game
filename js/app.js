$(document).ready(function () {

  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')
  
  const worldMap = [
    [1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1],
    [1,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0],
    [1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] 
  ]
  
  const cols = 20
  const size = parseInt(canvas.width / cols)
  const world = []
  
  worldMap.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      world.push({
        type: col === 1 ? 'BLOCK' : 'FLOOR',
        x: colIndex * size,
        y: rowIndex * size,
        width: size,
        height: size,
      })
    })
  });
  
  const floors = world.filter(elm => elm.type === 'FLOOOR');
  const blocks = world.filter(elm => elm.type === 'BLOCK');
  
  const player = {
    x: 30,
    y: -15,
    width: size,
    height: size,
    
    //fill: imagePlayer,
    moveUp: function() {
      const self = this
      let hit = false
     
      blocks.forEach(elm => {
        if (self.y - size === elm.y && self.x === elm.x) {
          hit = true
        }
      })
      
      if (!hit) this.y -= size
      if (self.y <= 0) {
        gameOver()  
      }
  
    },
    moveDown: function() {
      const self = this
      let hit = false
     
      blocks.forEach(elm => {
        if (self.y + size === elm.y && self.x === elm.x) {
          hit = true
        }
      })
      
      if (!hit) this.y += size
       
    },
    moveLeft: function() {
      const self = this
      let hit = false
     
      blocks.forEach(elm => {
        if (self.x - size === elm.x && self.y === elm.y) {
          hit = true
        }
      })
      
      if (!hit) this.x -= size
    },
    moveRight: function() {
      const self = this
      let hit = false
     
      blocks.forEach(elm => {
        if (self.x + size === elm.x && self.y === elm.y) {
          hit = true
        }
      })
      
      if (!hit) this.x += size
  
      if (self.x >= 285) {
        gameWon()  
      } 
    }
  }
  
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    blocks.forEach(elm => {
      ctx.fillRect(elm.x, elm.y, elm.width, elm.height)
      ctx.fillStyle="#bf895b"
    })
    
    floors.forEach(elm => {
      ctx.rect(elm.x, elm.y, elm.width, elm.height)
    });
  
    
    var imagePlayer = new Image();
    imagePlayer.src = "./assets/images/player.png";
  
    var pattern  =  ctx.createPattern(imagePlayer, 'repeat')
    ctx.save()
    ctx.fillStyle = pattern
    ctx.fillRect(player.x, player.y, player.width, player.height)
    ctx.restore()
  
  }
  render()
 
  $('.btn-arrow').on('click', function () {
    var classes = $(this).attr('class').split(' ')[1]

    switch(classes) {
      case 'btn-arrow-top': player.moveUp(); break
      case 'btn-arrow-bottom': player.moveDown(); break
      case 'btn-arrow-left': player.moveLeft(); break
      case 'btn-arrow-right': player.moveRight(); break
    }
    render()
  })


  // FirstScreen
  $('.btn').on('click', function () {
    $('.firstscreen').hide()
    $('.secondscreen').show()
    $('.btn-arrow-bottom').click()
    $('.pop-start').animate({
      opacity: '1'
    }, 0, function () {
      setTimeout(() => {
        $('.pop-start').hide()
      }, 3000);
    })
  })


  // SecondScreen
  // Show path
  $('.btn-hint').on('click', function () {

    $('.path').animate({
      opacity: '1'
    }, 200, function () {
      setTimeout(() => {
        $('.path').hide()
      }, 2000);
    })
  })

  // Countdown
  document.getElementById("timer").innerHTML="00:20"; 
  var seconds=20;
  var timer;
  function myFunction() {
    if (seconds < 20) {
      document.getElementById("timer").innerHTML = "00:" + seconds;
    }
    if (seconds > 0 ) {
        seconds--;
    } 
    else {
        clearInterval(timer);

        if (won === 0) {
          gameOver()
        }
    }
  }

  var arrows = document.querySelectorAll(".btn-arrow")
  for (i=0; i<arrows.length; i++) {
    arrows[i].addEventListener('click', countdownButton)
  } 
  document.getElementById("btn-hint").addEventListener('click', countdownButton)

  function countdownButton () {
    if(!timer) {
      timer = window.setInterval(function() {
        myFunction();
      }, 800);
    }
  }

  // Game Over or Won
  var won = 0
  function gameWon() {
    $(".pop-final").css({
      'opacity': '1'
    })
    $('.fireworks').show()

    setTimeout(() => {
      $('.secondscreen').hide()
    }, 2000)
    won = 1
  }

  function gameOver() {
    $('.secondscreen').hide()
  }
})