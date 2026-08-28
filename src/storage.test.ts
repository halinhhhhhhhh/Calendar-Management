import { describe, expect, it } from 'vitest'
import { emptyData, parseStoredData } from './storage'

describe('storage', () => {
  it('returns empty data when storage is empty', () => {
    expect(parseStoredData(null)).toEqual(emptyData)
  })

  it('rejects a payload containing an invalid record', () => {
    expect(() =>
      parseStoredData(
        JSON.stringify({
          events: [{ id: 'invalid' }],
          deadlines: [],
          notes: [],
        }),
      ),
    ).toThrow('Corrupt storage')
  })
})
