export function pluralize(count: number, words: string[]) {
	const pluralRules = new Intl.PluralRules('en', { type: 'ordinal' });
	const pluralForm = pluralRules.select(count);

	switch (pluralForm) {
		case 'one':
			return `${count} ${words[0]}`;
		default:
			return `${count} ${words[1]}`;
	}
}
