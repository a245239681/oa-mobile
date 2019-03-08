// API结果返回接口

export interface ApiResult<T> {
    ActionName?: string;
    tag?: string;
    State?: number;
    Data?: T;
    Message?: string;
}



