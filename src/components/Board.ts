import type { IBoard, Position } from '../types/TypeSnake'

export class Board implements IBoard
{
  constructor(public width: number, public height: number)
  {  }

  getRandomPosition(): Position
  {
    return [Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height)]
  }
}
