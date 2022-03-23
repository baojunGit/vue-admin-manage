import { expect } from '@jest/globals'
import { flip } from '../../src/api/coverage'

it('测试flip方法', () => {
  expect(flip(true)).toBe('正')
})
