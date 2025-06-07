import {
	PlayType,
	PassResult,
	PATOption,
	Down,
	PlayOutcome,
	IncompleteOutcome
} from '$lib/enums';

export const playTypes: PlayType[] = Object.values(PlayType);
export const passResults: PassResult[] = Object.values(PassResult);

export const patOptions: Record<PATOption, string> = {
	[PATOption.FailedPAT]: 'bg-red-500 hover:bg-red-600 focus:ring-red-400',
	[PATOption.OnePAT]: 'bg-green-500 hover:bg-green-600 focus:ring-green-400',
	[PATOption.TwoPAT]: 'bg-green-500 hover:bg-green-600 focus:ring-green-400',
	[PATOption.PickTwo]: 'bg-red-500 hover:bg-red-600 focus:ring-red-400'
};

export const downs: Record<Down, string> = {
	[Down.First]: 'bg-green-500 hover:bg-green-600 focus:ring-green-400',
	[Down.Second]: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400',
	[Down.Third]: 'bg-orange-400 hover:bg-orange-500 focus:ring-orange-300',
	[Down.Fourth]: 'bg-red-600 hover:bg-red-700 focus:ring-red-300'
};

export const playOutcomes: Record<PlayOutcome, string> = {
	[PlayOutcome.Neither]: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400',
	[PlayOutcome.FirstDown]: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400',
	[PlayOutcome.TD]: 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-400',
	[PlayOutcome.SAFETY]: 'bg-red-500 hover:bg-red-600 focus:ring-red-400'
};

export const IncompleteOutcomes: Record<IncompleteOutcome, string> = {
	[IncompleteOutcome.NoInt]: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400',
	[IncompleteOutcome.Intercepted]: 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-400',
	[IncompleteOutcome.PickSix]: 'bg-red-500 hover:bg-red-600 focus:ring-red-400'
};
