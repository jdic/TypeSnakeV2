import { PowerUpFactory } from './factories/PowerUpFactory'
import { Snake, Apple, Board, PowerUp } from './components'
import type { Difficulty, ITypeSnake } from './types/TypeSnake'
import { isInRange } from './utils/helpers'
import * as readline from 'readline'
import { MESSAGES } from './constants/Messages'

export class Game
{
  private powerUps: PowerUp[] = []
  private intervalId: any = null
  private score: number = 0
  private clockTime: number
  private board: Board
  private snake: Snake
  private apple: Apple
  
  constructor(options?: ITypeSnake)
  {
    this.board = new Board(options?.board?.width || 20, options?.board?.height || 20)
    this.snake = new Snake(this.board.width, this.board.height)
    this.apple = new Apple(this.board)
    this.clockTime = 1000

    this.intializeKeyPressListener()
  }

  private intializeKeyPressListener(): void
  {
    readline.emitKeypressEvents(process.stdin)

    if (process.stdin.isTTY)
      process.stdin.setRawMode(true)

    const movementMap: Record<string, [number, number]> =
    {
      up: [0, -1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0]
    }

    process.stdin.on('keypress', (_, key) =>
    {
      if (key.ctrl && key.name === 'c')
        process.exit()

      const newDirection = movementMap[key.name]

      if (newDirection)
        this.snake.setDirection(newDirection)
    })
  }

  private checkForApple(): void
  {
    if (isInRange(this.snake.getHead(), this.apple.getPosition(), 1))
    {
      this.apple.regenerate()
      this.snake.grow()
      this.score += 1
      this.spawnPowerUps()
    }
  }

  private spawnPowerUps(): void
  {
    const powerUpTypes = ['magnet', 'slowmo', 'bonus']
    const randomPowerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]
    const position = this.board.getRandomPosition()
    const powerUp = PowerUpFactory.createPowerUp(randomPowerUp, position)

    if (powerUp)
      this.powerUps.push(powerUp)
  }

  private checkForPowerUps(): void
  {
    this.powerUps.forEach((powerUp, index) =>
    {
      if (isInRange(this.snake.getHead(), powerUp.position, 1))
      {
        powerUp.activate()

        this.powerUps.splice(index, 1)
      }
    })
  }

  private update(): void
  {
    this.snake.move()

    if (this.snake.checkCollision())
    {
      console.log(MESSAGES.LOSE)

      clearInterval(this.intervalId)
      process.exit()
    }

    this.checkForApple()
    this.checkForPowerUps()
    this.draw()
  }

  private getIcon(type: string): string
  {
    const icons: Record<string, string> =
    {
      background: '⬛',
      body: '🐍',
      apple: '🍎',
      magnet: '🧲',
      slowmo: '🧊',
      bonus: '🍐'
    } as const

    return icons[type]
  }

  private draw(): void
  {
    let board = ''

    for (let i = 0; i < this.board.height; i++)
    {
      let row = ''

      for (let j = 0; j < this.board.width; j++)
      {
        const isApple =
          this.apple.getPosition()[0] === j &&
          this.apple.getPosition()[1] === i

        const isSnake =
          this.snake.getBody()
            .some((position) => position[0] === j && position[1] === i)

        if (isApple)
          row += this.getIcon('apple')

        else if (isSnake)
          row += this.getIcon('body')

        else
          row += this.getIcon('background')
      }

      board += row + '\n'
    }

    process.stdout.write('\x1b[H')
    process.stdout.write(board + '\n')
  }

  start()
  {
    this.intervalId = setInterval(() => this.update(), this.clockTime)
  }
}
