export type CommentAuthor = {
	name: string;
	avatarUrl: string;
	isPro: boolean;
};

export type Comment = {
	id: string;
	date: string;
	user: CommentAuthor;
	comment: string;
	rating: number;
};

export type CommentFormState = {
	rating: number;
	comment: string;
};
