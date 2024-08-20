import type { Direction, Position } from '../types/TypeSnake'

export class Snake
{
  private direction: Direction = [0, -1]
  private body: Position[] = [[10, 10]]

  constructor(private boardWidth: number, private boardHeight: number)
  {  }

  getHead(): Position
  {
    return this.body[0]
  }

  getBody(): Position[]
  {
    return this.body
  }

  setDirection(newDirection: Direction): void
  {
    if (this.isValidDirection(newDirection))
    {
      this.direction = newDirection
    }
  }

  move(): void
  {
    const head = this.getNewHeadPosition()

    this.body.unshift(head)
  }

  private isValidDirection(newDirection: Direction): boolean
  {
    const isValid =
      newDirection[0] === -this.direction[0] &&
      newDirection[1] === -this.direction[1] ||
      this.body.length === 1

    return !isValid
  }

  private getNewHeadPosition(): Position
  {
    const head = this.getHead()

    head[0] = (head[0] + this.direction[0] + this.boardWidth) % this.boardWidth
    head[1] = (head[1] + this.direction[1] + this.boardHeight) % this.boardHeight

    return head
  }

  checkCollision(): boolean
  {
    const head = this.getHead()

    const hasCollision = this.body
      .slice(1)
      .some((part) => part[0] === head[0] && part[1] === head[1])

    return hasCollision
  }

  grow(): void
  {
    const tail = this.body[this.body.length - 1]

    this.body.push([...tail])
  }
}
