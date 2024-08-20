import type { Position } from '../types/TypeSnake'
import { PowerUp } from '../components/PowerUp'

export class Slow extends PowerUp
{
  constructor(position: Position)
  {
    super('slow', position)
  }

  activate()
  {
    
  }
}
