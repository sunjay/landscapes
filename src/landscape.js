const ROUGHNESS = 1.2;

export function displaceMidpoints(path, iteration, width, height) {
  const reduction = (2 ** -ROUGHNESS) ** iteration;

  const displacement = height / 4 * reduction;
  const bounds = [
    -displacement,
    displacement,
  ];

  return path.slice(1).reduce((acc, y) => {
    const midpoint = (acc[acc.length - 1] + y) / 2;

    const amount = bounds[Math.floor(Math.random() * bounds.length)];
    return [...acc, midpoint + amount, y];
  }, [path[0]]);
}
