export type Difficulty = 'easy' | 'medium' | 'hard' | 'custom'
export type Range = 'exact' | 'expanded'
export type Direction = [number, number]
export type Position = [number, number]

export interface IIcons
{
  apple: string
  snake: string
}

export interface ISpeeds
{
  easy: number
  medium: number
  hard: number
}

export interface IPowerUp
{
  type: string
  position: Position
  activate(): void
}

export interface IBoard
{
  width: number
  height: number
  getRandomPosition(): Position
}

export interface ITypeSnake
{
  board?:
  {
    width: number
    height: number
  }
}
