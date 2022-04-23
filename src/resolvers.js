//@ts-check
const { findPlayer, findPlayers, createUserAndPlayer, createGame, findGame } = require('./game');
const { login, validateToken } = require('./user');

const authenticated = (fn) => (root, args, context) => {
  if (context.headers && context.headers.authorization) {
    const split = context.headers.authorization.split(' ');
    const user = validateToken(split[1]);
    return fn(root, args, context);  
  } else {
    throw new Error('Unauthorized');
  }
};

module.exports = {
  Query: {
    player: authenticated((root, { id }, context) => findPlayer(id)),
    players: authenticated((root, args, context) => findPlayers()),
    games: authenticated((root, args, context) => findGame()),
    game: authenticated((root, { id }, context) => findGame(id))
  },
  Mutation: {
    createUser: (root, { name, email, password }, context) => createUserAndPlayer({ name, email, password }),
    login: (root, { email, password }, context) => login({ email, password }),
    createGame: authenticated((root, { players, scores }, context) => createGame({ players, scores }))
  }
  // Game: { // TODO: Use dataloader to improve performance
  //   player1: authenticated((root, args, context) => findPlayer(root.player1)),
  //   player2: authenticated((root, args, context) => findPlayer(root.player2)),
  // }
};
