import type { Position } from '../types/TypeSnake'
import { Board } from './Board'

export class Apple
{
  private position: Position

  constructor(private board: Board)
  {
    this.position = this.board.getRandomPosition()
  }

  getPosition(): Position
  {
    return this.position
  }

  regenerate(): void
  {
    this.position = this.board.getRandomPosition()
  }
}
