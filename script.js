var g = .1,
    gd = 0,
    xs = 0,
    bx = 25,
    by = 200,
    move = false,
    power,
    xx,
    yy,
    y_diff,
    run = false,
    box = container.getBoundingClientRect(),
    box_x = box.left,
    box_y = box.top,
    pr = prince.getBoundingClientRect(),
    pr_x = pr.left + 30,
    pr_y = pr.top + 50

const insults = [
  'Nice try wkwk.',
  'Bisa liat lingkaran gk?🤣',
  'Ezz deck?',
  'Coba dengan mata terbuka gess.',
  'Ini bukan undian wkk',
  'Yahh, padahal udh didepan mata🥲.',
  'Ha. Ha. Ha.',
  'Santuy ae aku gk kemana mana kok.',
  'Wkwk lemah!',
  'Maen epep aja deck!😂'
]
insults.sort((a, b) => Math.random() - .5);
var i_num = 0

function updateInsult() {
  insult.innerHTML = insults[i_num]
  insult.style.opacity = '1'
  if(i_num == 9) {
    i_num = 0
  } else {
    i_num++
  }
}

function addBullet() {
  var a = document.createElement('div')
  a.id = 'actual'
  a.onmousedown = function() { pressDown() }
  document.body.appendChild(a)

  actual.style.setProperty('--top', pr_y + 'px')
  actual.style.setProperty('--left', pr_x + 'px')
}

function pressDown() {
  move = true
  actual.style.cursor = 'grabbing'
}

function fire() {
  actual.style.pointerEvents = 'none'
  actual.style.cursor = 'grab'
  actual.style.setProperty('--sword-angle', 'rotate(95deg)')
  setTimeout(function(){
    prince.style.background = 'var(--throwing)'
    prince.style.aspectRatio = '154/90'    
  }, 250)
  window.removeEventListener('mousemove', dragging)
  move = false

  var run = setInterval(function(){
    if(xx < window.innerWidth
       && xx > 0
       && yy < window.innerHeight
       && yy > 0) {
      xx += power,
        gd += g,
        yy += gd

      actual.style.setProperty('--top', yy + 'px')
      actual.style.setProperty('--left', xx + 'px')

      var bull = actual.getBoundingClientRect(),
          bull_mid = document.elementFromPoint(bull.left + (bull.width * .5), bull.top + (bull.height * .5))

      if(bull_mid.classList.contains('heart') 
         || bull.top <= 0 
         || bull.bottom > window.innerHeight
         || bull.right > window.innerWidth ) {
        clearInterval(run) 
        if(bull_mid.classList.contains('heart')) {
          bull_mid.style.opacity = '0' 
          actual.style.setProperty('--sword-shape', 'polygon(50% 25%, 65% 25%, 65% 75%, 100% 75%, 100% 85%, 60% 85%, 60% 100%, 40% 100%, 40% 85%, 0% 85%, 0% 75%, 35% 75%, 35% 25%)')
          container.style.background = 'var(--dragon-dead)'
          prince.style.background = 'var(--standing)'
          prince.style.aspectRatio = ''
          congrats.style.transform = 'translateX(0)'
          insult.style.opacity = ''
        } else {
          actual.remove()
          addBullet()
          window.addEventListener('mousemove', dragging)
          actual.addEventListener('mouseup', fire)
          prince.style.background = 'var(--standing)'
          prince.style.aspectRatio = ''
          updateInsult()
        }   
      }
    } else {
      actual.remove()
      clearInterval(run) 
      gd = 0      
      addBullet()
      window.addEventListener('mousemove', dragging)
      actual.addEventListener('mouseup', fire)
      prince.style.background = 'var(--standing)'
      prince.style.aspectRatio = ''
      updateInsult()
    }
  }, 1000/60)
  }

function dragging(e){
  xx = e.clientX,
    yy = e.clientY

  if(move && !run){    
    var y_diff = yy - pr_y,
        x_diff = pr_x - xx
    if(-y_diff * .08 > -15 && -y_diff * .08 < 0){
      gd = -y_diff * .08
    }
    if(x_diff > 0) {
      power = x_diff * .05
    }   

    if(y_diff > 0 && x_diff > 0) {
      prince.style.background = 'var(--back)'
      actual.style.setProperty('--sword-angle', 'rotate(-95deg)')
      actual.style.setProperty('--top', yy - 15  + 'px')
      actual.style.setProperty('--left', xx - 15  + 'px')
    }    
  }
}
window.addEventListener('mousemove', dragging)

function resetGame() {
  actual.remove()
  addBullet()
  container.style.background = 'var(--dragon)'
  congrats.style.transform = ''
  document.querySelector('.heart').style.opacity = '' 
  window.addEventListener('mousemove', dragging)
  actual.addEventListener('mouseup', fire)
}

resetGame()