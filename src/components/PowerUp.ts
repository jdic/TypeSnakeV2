import type { IPowerUp, Position } from '../types/TypeSnake'

export abstract class PowerUp implements IPowerUp
{
  constructor(public type: string, public position: Position)
  {  }

  abstract activate(): void
}
