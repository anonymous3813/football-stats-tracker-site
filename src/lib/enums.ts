// enums.ts
export enum PlayType {
	Run = 'Run',
	Pass = 'Pass',
	Punt = 'Punt'
}

export enum PassResult {
	Complete = 'Complete',
	Incomplete = 'Incomplete',
	Sacked = 'Sacked'
}

export enum PATOption {
	FailedPAT = 'Failed PAT',
	OnePAT = '1 PAT',
	TwoPAT = '2 PAT',
	PickTwo = 'Pick 2'
}

export enum Down {
	First = '1st down',
	Second = '2nd down',
	Third = '3rd down',
	Fourth = '4th down'
}

export enum PlayOutcome {
	Neither = 'Neither',
	FirstDown = '1st Down',
	TD = 'TD',
	SAFETY = 'Safety',
}

export enum IncompleteOutcome {
	NoInt = 'No Int',
	Intercepted = 'Intercepted',
	PickSix = 'Pick 6'
}
