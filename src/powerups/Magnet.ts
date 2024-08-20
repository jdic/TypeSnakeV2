import type { Position } from '../types/TypeSnake'
import { PowerUp } from '../components/PowerUp'

export class Magnet extends PowerUp
{
  constructor(position: Position)
  {
    super('magnet', position)
  }

  activate()
  {
    
  }
}
