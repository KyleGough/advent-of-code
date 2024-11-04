interface Requirement {
  product: string;
  quantity: number;
}

interface Reaction {
  quantity: number;
  requirements: Requirement[];
}

const parseReaction = (input: string): Record<string, Reaction> => {
  const [requirementList, product] = input.split(' => ');
  const [quantity, productName] = product.split(' ');
  const requirements = requirementList.split(', ').map((r) => ({
    product: r.split(' ')[1],
    quantity: parseInt(r.split(' ')[0]),
  }));

  return {
    [productName]: {
      quantity: parseInt(quantity),
      requirements,
    },
  };
};

export const parseReactions = (input: string): Record<string, Reaction> => {
  const reactions = input.split('\n').map(parseReaction);
  return reactions.reduce((prev, curr) => Object.assign(curr, prev), {});
};

export const getOreCount = (
  reactions: Record<string, Reaction>,
  fuelRequired = 1
): number => {
  const stockpile: Record<string, number> = Object.keys(reactions).reduce(
    (prev, curr) => ({ ...prev, [curr]: 0 }),
    {}
  );

  const requirements = reactions['FUEL'].requirements.map((r) => ({
    ...r,
    quantity: r.quantity * fuelRequired,
  }));

  let oreCount = 0;

  while (requirements.length) {
    const requirement = requirements.pop() as Requirement;
    const product = requirement.product;
    const stock = stockpile[product];
    let quantity = requirement.quantity;

    // Take fully from stockpile.
    if (quantity <= (stockpile[product] ?? 0)) {
      stockpile[product] -= quantity;
      continue;
    }

    // Take partially from stockpile.
    quantity -= stock;
    delete stockpile[product];

    // Calculate number of reactions required.
    const productProduced = reactions[product].quantity;
    const reactionCount = Math.ceil(quantity / productProduced);

    // Leftovers.
    const leftover = productProduced * reactionCount - quantity;
    stockpile[product] = (stockpile[product] ?? 0) + leftover;

    for (const reactionProduct of reactions[product].requirements) {
      if (reactionProduct.product === 'ORE') {
        oreCount += reactionCount * reactionProduct.quantity;
      } else {
        let requirementUpdated = false;

        // Update requirement if exists.
        for (const current of requirements) {
          if (current.product === reactionProduct.product) {
            current.quantity += reactionCount * reactionProduct.quantity;
            requirementUpdated = true;
            break;
          }
        }

        // Create new requirement.
        if (!requirementUpdated) {
          requirements.push({
            ...reactionProduct,
            quantity: reactionProduct.quantity * reactionCount,
          });
        }
      }
    }
  }

  return oreCount;
};
