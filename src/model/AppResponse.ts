export class AppResponse<T> {
  constructor(
    public status: 0 | 1,
    public responseObject: T | null,
    public error: string | null,
    public totalPage?: number | null,
    public currentPage?: number | null,
  ) {}
}
