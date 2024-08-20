import type { Position } from '../types/TypeSnake'
import { PowerUp } from '../components/PowerUp'

export class Bonus extends PowerUp
{
  constructor(position: Position)
  {
    super('bonus', position)
  }

  activate()
  {
    
  }
}
