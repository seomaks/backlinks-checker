import {
  appReducer, checkIndexingAC,
  InitialStateType,
  isStatusAC, liveLinksAC, setAppErrorAC, setEntitiesAC, setLinksAC,
  setProjectAC, setStatusCodeAC
} from "./app-reducer";

let startState: InitialStateType
beforeEach(() => {
  startState = {
    status: 'idle',
    project: 'mightytips.com',
    links: ['https://sportitnow.com/ice-hockey-world-championship-2022/',
      'https://cryptwerk.com/post/results-of-the-australian-football-championship-2021-2022/',
      'https://talkmarkets.com/contributor/Cents-For-Sense/blog/australias-11-best-soccer-players-of-all-time?post=352267',
      'https://allcitynews.net/the-5-best-countries-in-soccer/]'],
    entities: ['https://sportitnow.com/ice-hockey-world-championship-2022/',
      'https://cryptwerk.com/post/results-of-the-australian-football-championship-2021-2022/',
      'https://talkmarkets.com/contributor/Cents-For-Sense/blog/australias-11-best-soccer-players-of-all-time?post=352267',
      'https://allcitynews.net/the-5-best-countries-in-soccer/]'],
    statusCodes: [200, 200, 200, 200],
    isIndexing: ['Yep 😁', 'Yep 😁', 'Yep 😁', 'Nope 🤬'],
    liveLinks: ['Yep 😁', 'Yep 😁', 'Yep 😁', 'Nope 🤬'],
    error: 'error',
    limits: '100'
  };
});

test('correct status should be updated', () => {
  const action = isStatusAC('loading');
  const endState = appReducer(startState, action)

  expect(endState.status).toBe('loading');
});

test('correct project should be assigned', () => {
  const action = setProjectAC('mightytips.hu');
  const endState = appReducer(startState, action)

  expect(endState.project).toBe('mightytips.hu');
});

test('correct links must be set', () => {
  const action = setLinksAC(['https://clashroid.com/best-betting-apps-with-free-bets/',
    'https://www.hackzhub.com/trusted-sports-betting-apps-in-canada/']);
  const endState = appReducer(startState, action)

  expect(endState.links.length).toBe(2);
  expect(endState.links[0]).toBe('https://clashroid.com/best-betting-apps-with-free-bets/');
  expect(endState.links[1]).toBe('https://www.hackzhub.com/trusted-sports-betting-apps-in-canada/');
});

test('correct entities must be set', () => {
  const action = setEntitiesAC(['https://techyword.com/world-aquatics-championships/',
    'https://creebhills.com/2022/04/best-soccer-players-to-play-in-casino']);
  const endState = appReducer(startState, action)

  expect(endState.entities.length).toBe(2);
  expect(endState.entities[0]).toBe('https://techyword.com/world-aquatics-championships/');
  expect(endState.entities[1]).toBe('https://creebhills.com/2022/04/best-soccer-players-to-play-in-casino');
});

test('correct status codes must be set', () => {
  const action = setStatusCodeAC([200, 200, 404]);
  const endState = appReducer(startState, action)

  expect(endState.statusCodes.length).toBe(3);
  expect(endState.statusCodes[0]).toBe(200);
  expect(endState.statusCodes[2]).toBe(404);
});

test('correct links should be checked for indexing', () => {
  const action = checkIndexingAC(['Yep 😁', 'Nope 🤬']);
  const endState = appReducer(startState, action)

  expect(endState.isIndexing.length).toBe(2);
  expect(endState.isIndexing[0]).toBe('Yep 😁');
  expect(endState.isIndexing[1]).toBe('Nope 🤬');
});

test('correct live links should be checked', () => {
  const action = liveLinksAC(['Yep 😁', 'Nope 🤬', 'Yep 😁']);
  const endState = appReducer(startState, action)

  expect(endState.liveLinks.length).toBe(3);
  expect(endState.liveLinks[0]).toBe('Yep 😁');
  expect(endState.liveLinks[2]).toBe('Yep 😁');
});

test('correct error must be set', () => {
  const action = setAppErrorAC('New error');
  const endState = appReducer(startState, action)

  expect(endState.error).toBe('New error');
});