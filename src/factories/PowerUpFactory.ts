import type { Position } from '../types/TypeSnake'
import { Bonus, Magnet, Slow } from '../powerups'
import { PowerUp } from '../components/PowerUp'

export class PowerUpFactory
{
  static createPowerUp(type: string, position: Position): PowerUp | null
  {
    switch (type)
    {
      case 'magnet':
        return new Magnet(position)
      case 'slow':
        return new Slow(position)
      case 'bonus':
        return new Bonus(position)
      default:
        return null
    }
  }
}
