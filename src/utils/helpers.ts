import type { Position } from '../types/TypeSnake'

export const isInRange = (head: Position, position: Position, range: number) =>
  Math.abs(head[0] - position[0]) <= range &&
  Math.abs(head[1] - position[1]) <= range
