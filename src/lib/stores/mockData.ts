import type { Game2 } from "$lib/types";
import {
  PlayOutcome,
  PlayType,
  PassResult,
  PATOption,
  Down,
  IncompleteOutcome
} from "$lib/enums";

export const mockGames: Game2[] = [
  {
    id: "game1",
    teamName: "Packers",
    opponent: "Lions",
    scoreTeam1: 21,
    scoreTeam2: 17,
    date: new Date(2023, 10, 15),
    plays: [
      {
        id: "play1",
        down: 1,  // enum Down.First = 'First down'
        offense: true,
        selectedPlayType: PlayType.Pass,  // 'Pass'
        selectedPassResult: PassResult.Complete,  // 'Complete'
        selectedPAT: PATOption.OnePAT,  // '1 PAT'
        intercepted: IncompleteOutcome.NoInt,  // 'No Int'
        playOutcome: PlayOutcome.TD,  // 'TD'
        targetedPlayer: 82,
        yards: 35
      },
      {
        id: "play2",
        down: 2, // 'Second down'
        offense: false,
        selectedPlayType: PlayType.Run,  // 'Run'
        selectedPassResult: "" as PassResult | "", // empty string if allowed, else omit or use null/undefined
        selectedPAT: PATOption.TwoPAT, // '2 PAT'
        intercepted: IncompleteOutcome.NoInt, // 'No Int' (use closest valid enum)
        playOutcome: PlayOutcome.FirstDown, // '1st Down'
        targetedPlayer: 0,
        yards: 12
      },
      {
        id: "play3",
        down: 3, // 'Third down'
        offense: false,
        selectedPlayType: PlayType.Punt, // 'Punt' instead of 'defense' (not in enum)
        selectedPassResult: "" as PassResult | "",
        selectedPAT: "" as PATOption | "",
        intercepted: IncompleteOutcome.Intercepted, // 'Intercepted'
        playOutcome: PlayOutcome.Neither, // 'Neither' (use closest valid enum)
        targetedPlayer: 10,
        yards: -5
      }
    ]
  },
  {
    id: "game2",
    teamName: "Saints",
    opponent: "Bears",
    scoreTeam1: 14,
    scoreTeam2: 28,
    date: new Date(2023, 10, 22),
    plays: [
      {
        id: "play4",
        down: 1,
        offense: true,
        selectedPlayType: PlayType.Pass,
        selectedPassResult: PassResult.Incomplete,
        selectedPAT: "" as PATOption | "",
        intercepted: IncompleteOutcome.NoInt,
        playOutcome: PlayOutcome.Neither,  // 'Neither' instead of 'incomplete'
        targetedPlayer: 11,
        yards: 0
      },
      {
        id: "play5",
        down: 2,
        offense: true,
        selectedPlayType: PlayType.Run,
        selectedPassResult: "" as PassResult | "",
        selectedPAT: "" as PATOption | "",
        intercepted: IncompleteOutcome.NoInt,
        playOutcome: PlayOutcome.Neither,  // 'Neither' instead of 'fumble'
        targetedPlayer: 25,
        yards: -3
      }
    ]
  }
];
