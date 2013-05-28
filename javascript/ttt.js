var Game = {
  init: function(){
    // Not sure here if global variables are right way to go...
    currentPlayer = 'p1'
    game = this
    playerPositionTracker = []
    this.addListeners()
  }

  , addListeners: function(){
    $('.cell').click(this.checkCellForPlayerPiece)
  }

  , checkCellForPlayerPiece: function(){
    if ($(this).html()) return
    // another global variable
    $cell = $(this)
    game.runUpdates()
  }

  , runUpdates: function(){
    game.updateCell()
    game.updatePlayerPositionTracker()
    game.checkForWinner()
    game.disableBoardIfWinner()
    game.updateCurrentPlayer()
    game.updateBoardCurrentPlayerText()
  }

  , updateCell: function(){
    $cell.html('<img src="images/' + currentPlayer + '.jpg">')
  }

  , updatePlayerPositionTracker: function(){
    playerPositionTracker[$cell.attr('data-position')]
      = currentPlayer
  }

  , updateCurrentPlayer: function(){
    if (currentPlayer == 'p1'){ currentPlayer = 'p2' }
    else { currentPlayer = 'p1'}
  }

  , updateBoardCurrentPlayerText: function(){
    console.log($('.player-number').val())
    $('.player-number').text(currentPlayer.slice(1))
  }

  , checkForWinner: function(){
    game.checkRows()
    game.checkColumns()
    game.checkDiagonals()
  }

  // Refactor me!!
  , checkRows: function(){
    if (playerPositionTracker[0] != undefined &&playerPositionTracker[0] === playerPositionTracker[1] && playerPositionTracker[1] === playerPositionTracker[2]){
      $('.winner').html("<h1>Player " + playerPositionTracker[0].slice(1) + " wins!</h1>")
    }
    if (playerPositionTracker[3] != undefined && playerPositionTracker[3] === playerPositionTracker[4] && playerPositionTracker[4] === playerPositionTracker[5]){
      $('.winner').html("<h1>Player " + playerPositionTracker[3].slice(1) + " wins!</h1>")
    }
    if (playerPositionTracker[6] != undefined && playerPositionTracker[6] === playerPositionTracker[7] && playerPositionTracker[7] === playerPositionTracker[8]){
      $('.winner').html("<h1>Player " + playerPositionTracker[6].slice(1) + " wins!</h1>")
    }
  }

  // Refactor me!!
  , checkColumns: function(){
    if (playerPositionTracker[0] != undefined &&playerPositionTracker[0] === playerPositionTracker[3] && playerPositionTracker[3] === playerPositionTracker[6]){
      $('.winner').html("<h1>Player " + playerPositionTracker[0].slice(1) + " wins!</h1>")
    }
    if (playerPositionTracker[1] != undefined && playerPositionTracker[1] === playerPositionTracker[4] && playerPositionTracker[5] === playerPositionTracker[7]){
      $('.winner').html("<h1>Player " + playerPositionTracker[1].slice(1) + " wins!</h1>")
    }
    if (playerPositionTracker[2] != undefined && playerPositionTracker[2] === playerPositionTracker[5] && playerPositionTracker[5] === playerPositionTracker[8]){
      $('.winner').html("<h1>Player " + playerPositionTracker[2].slice(1) + " wins!</h1>")
    }
  }

// Refactor me!!
  , checkDiagonals: function(){
    if (playerPositionTracker[0] != undefined && playerPositionTracker[0] === playerPositionTracker[4] && playerPositionTracker[4] === playerPositionTracker[8]){
      $('.winner').html("<h1>Player " + playerPositionTracker[0].slice(1) + " wins!</h1>")
    }
    if (playerPositionTracker[2] != undefined && playerPositionTracker[2] === playerPositionTracker[4] && playerPositionTracker[4] === playerPositionTracker[6]){
      $('.winner').html("<h1>Player " + playerPositionTracker[2].slice(1) + " wins!</h1>")
    }
  }

  , disableBoardIfWinner: function(){
    if ($('.winner').html()){ game.insertHiddenElements()}
  }

// Inserts values into each '.cell' <div> as a way to trick
// the checkCellForPlayerPiece() function into thinking all
// cells have something in them already
  , insertHiddenElements: function(){
    $('.cell').each(function(i){
      if ($(this).html() === '') { $(this).html('<p hidden></p>') }
    })
  }
}


$(function(){
  Game.init()
})
