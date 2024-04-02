export interface IComment{
    id: string;
    userId: string;
    contentId: string;
    dispatch: Date;
    message: string;
    thread: Comment[];
}