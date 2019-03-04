// API结果返回接口

export interface ApiResult<T> {
    StateCode?: number;
    Data?: T;
    Message?: string;
}



