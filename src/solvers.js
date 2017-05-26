/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // Create new board
  var board = new Board({n: n});
  // get rows from board
  var rows = board.rows();
  console.log(board.get(n));
  var solution = placeRook(n);

  function placeRook(n) {
    // for each box, place a rook and check conflicts
    rows.forEach(function(row, r) {
      row.forEach(function(col, c) {
        // if not conflict, keep the rook
        board.togglePiece(r, c);
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(r, c);
        }
      });
    });
    return board.rows();
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  // var solutionBoard = [];

  function getSolutions(currRowIndex) {
    if (currRowIndex === n - 1) {
      solutionCount++;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(currRowIndex, i);
        if (!board.hasAnyRooksConflicts()) {
          getSolutions(currRowIndex + 1);
        }
        board.togglePiece(currRowIndex, i);
      }
    }
  }

  getSolutions(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutionCount));
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  // get rows from board
  var solution;

  function placeQueen(currRowIndex, currColumnIndex) {
    if (currRowIndex === n) {
      solution = board.rows();
    } else {
      board.togglePiece(currRowIndex, currColumnIndex);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(currRowIndex, currColumnIndex);
      }
      for (var i = 0; i < n; i++) {
        board.togglePiece(currRowIndex + 1, i);
        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(currRowIndex + 1, i);
        } else if (board.get(i).reduce(function(a, b) {return a + b;}) === 0) {
          continue;
        } else if (!board.hasAnyQueensConflicts()) {
          placeQueen(currRowIndex + 1);
        }
      }
    }
  }
  for (var j = 0; j < n; j++) {
    placeQueen(0, j);
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  var board = new Board({n: n});
  // var solutionBoard = [];

  function getSolutions(currRowIndex) {
    if (currRowIndex === n) {
      solutionCount++;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(currRowIndex, i);
        if (!board.hasAnyQueensConflicts()) {
          getSolutions(currRowIndex + 1);
        }
        board.togglePiece(currRowIndex, i);
      }
    }
  }

  getSolutions(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
