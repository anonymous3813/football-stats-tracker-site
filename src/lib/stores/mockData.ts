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
        down: 1,
        offense: true,
        selectedPlayType: PlayType.Pass,
        selectedPassResult: PassResult.Complete,
        selectedPAT: PATOption.OnePAT,
        intercepted: IncompleteOutcome.NoInt,
        playOutcome: PlayOutcome.TD,
        targetedPlayer: 82,
        qbNum: 12, 
        yards: 35,
        lastPlayOfHalf: false
      },
      {
        id: "play2",
        down: 2,
        offense: false,
        selectedPlayType: PlayType.Run,
        selectedPassResult: "" as PassResult | "",
        selectedPAT: PATOption.TwoPAT,
        intercepted: IncompleteOutcome.NoInt,
        playOutcome: PlayOutcome.FirstDown,
        targetedPlayer: 0,
        qbNum: 0, 
        yards: 12,
        lastPlayOfHalf: false
      },
      {
        id: "play3",
        down: 3,
        offense: false,
        selectedPlayType: PlayType.Punt,
        selectedPassResult: "" as PassResult | "",
        selectedPAT: "" as PATOption | "",
        intercepted: IncompleteOutcome.Intercepted,
        playOutcome: PlayOutcome.Neither,
        targetedPlayer: 10,
        qbNum: 0,
        yards: -5,
        lastPlayOfHalf: false
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
        playOutcome: PlayOutcome.Neither,
        targetedPlayer: 11,
        qbNum: 9,
        yards: 0,
        lastPlayOfHalf: false
      },
      {
        id: "play5",
        down: 2,
        offense: true,
        selectedPlayType: PlayType.Run,
        selectedPassResult: "" as PassResult | "",
        selectedPAT: "" as PATOption | "",
        intercepted: IncompleteOutcome.NoInt,
        playOutcome: PlayOutcome.Neither,
        targetedPlayer: 25,
        qbNum: 9,
        yards: -3,
        lastPlayOfHalf: false
      }
    ]
  }
];
