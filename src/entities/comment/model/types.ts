export interface IComment{
    id?: string;
    userId: string;
    contentId: string;
    dispatch: string;
    message: string;
    thread: IComment[];
}