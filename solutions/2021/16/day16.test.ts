import { day16p1 } from './p1';
import { day16p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 16 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day16p1('8A004A801A8002F478')).toBe(16);
    expect(day16p1('620080001611562C8802118E34')).toBe(12);
    expect(day16p1('C0015000016115A2E0802F182340')).toBe(23);
    expect(day16p1('A0016C880162017C3686B18A3D4780')).toBe(31);
  });

  test('Part 1 Input', () => {
    expect(day16p1(input)).toBe(940);
  });

  test('Part 2 Example', () => {
    expect(day16p2('C200B40A82')).toBe(3);
    expect(day16p2('04005AC33890')).toBe(54);
    expect(day16p2('880086C3E88112')).toBe(7);
    expect(day16p2('CE00C43D881120')).toBe(9);
    expect(day16p2('D8005AC2A8F0')).toBe(1);
    expect(day16p2('F600BC2D8F')).toBe(0);
    expect(day16p2('9C005AC2F8F0')).toBe(0);
    expect(day16p2('9C0141080250320F1802104A08')).toBe(1);
  });

  test('Part 2 Input', () => {
    expect(day16p2(input)).toBe(13_476_220_616_073);
  });
});
