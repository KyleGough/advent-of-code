import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { init } from 'z3-solver';

export const day24p2 = async (input: string) => {
  const hailstones = input.split('\n').slice(0, 3).map(parseLine);
  const { Context } = await init();
  const { Solver, Real } = Context('main');

  const px = Real.const('px');
  const py = Real.const('py');
  const pz = Real.const('pz');
  const vx = Real.const('vx');
  const vy = Real.const('vy');
  const vz = Real.const('vz');

  const solver = new Solver();

  for (let i = 0; i < hailstones.length; i++) {
    const pos = hailstones[i].pos;
    const vel = hailstones[i].vel;
    const t = Real.const(`t${i}`);

    solver.add(px.add(vx.mul(t)).eq(t.mul(vel.x).add(pos.x)));
    solver.add(py.add(vy.mul(t)).eq(t.mul(vel.y).add(pos.y)));
    solver.add(pz.add(vz.mul(t)).eq(t.mul(vel.z).add(pos.z)));
  }

  const isSat = await solver.check();
  if (isSat !== 'sat') return -1;

  const model = solver.model();
  const x = Number(model.eval(px));
  const y = Number(model.eval(py));
  const z = Number(model.eval(pz));
  return x + y + z;
};

const parseLine = (input: string) => {
  const matches = [...input.matchAll(/-?\d+/g)];
  const values = matches.map((i) => parseInt(i[0]));
  const pos = { x: values[0], y: values[1], z: values[2] };
  const vel = { x: values[3], y: values[4], z: values[5] };
  return { pos, vel };
};

const input = getPuzzle(__dirname).input;
run(async () => await day24p2(input)); // 856642398547748
