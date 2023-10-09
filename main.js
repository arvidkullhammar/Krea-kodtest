//import { numberSequence, bingoBoards } from './testData.js'
import { numberSequence, bingoBoards } from './realData.js'

function getBoardBingoLines(board, numbers) {
  const bingoLines = []

  for (let row of board) {
    if (isBingoLine(row, numbers)) {
      bingoLines.push(row)
    }
  }

  for (let i = 0; i <= 4; i++) {
    const column = getColumn(board, i)
    if (isBingoLine(column, numbers)) {
      bingoLines.push(column)
    }
  }

  return bingoLines
}

function getColumn(board, index) {
  const newRow = board.map((row) => {
    return row[index]
  })
  return newRow
}

function isBingoLine(list, numbers) {
  const hasBingo = list.every((number) => numbers.includes(number))
  return hasBingo
}

function getBingoIndex(board, numbers) {
  const bingoIndex = board.map((line) => {
    //return the index of the number that gives to line bingo
    return Math.max(...line.map((number) => numbers.indexOf(number)))
  })

  //return the index of the number that gives the board bingo first
  return Math.min(...bingoIndex)
}

function main(gameBoards, numbers) {
  //get all lines that gets bingo on each board
  const bingoLinesPerBoard = gameBoards.map((board) => {
    return getBoardBingoLines(board, numbers)
  })

  //get the index of the number that gives bingo for each board
  const bingoIndexes = bingoLinesPerBoard.map((board) =>
    getBingoIndex(board, numbers)
  )

  const highestBingoIndex = Math.max(...bingoIndexes)
  const indexOfLastBoardToGetBingo = bingoIndexes.indexOf(highestBingoIndex)
  const lastBoardToGetBingo = gameBoards[indexOfLastBoardToGetBingo]
  const finalNumbersSequence = numbers.slice(0, highestBingoIndex + 1)

  //Get sum of all unchecked numbers of the board
  const sumOfFilteredBoard = []
    .concat(...lastBoardToGetBingo)
    .filter((number) => !finalNumbersSequence.includes(number))
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    })

  //sum of unchecked numbers times the last drawn number
  const result =
    sumOfFilteredBoard * finalNumbersSequence[finalNumbersSequence.length - 1]
  console.log('result', result)
}

main(bingoBoards, numberSequence)
