const model = require("../assets1/ml/model.json");

function traverseTree(tree, features) {
  let node = 0;

  while (tree.children_left[node] !== -1) {
    const featureIndex = tree.feature[node];
    const threshold = tree.threshold[node];

    if (features[featureIndex] <= threshold) {
      node = tree.children_left[node];
    } else {
      node = tree.children_right[node];
    }
  }

  const value = tree.value[node][0];

  return value[0] > value[1] ? -1 : 1;
}

export function predict(features) {
  let votes = [];

  for (let tree of model.trees) {
    votes.push(traverseTree(tree, features));
  }

  const phishingVotes = votes.filter((v) => v === -1).length;
  const legitVotes = votes.filter((v) => v === 1).length;

  return phishingVotes > legitVotes ? -1 : 1;
}
