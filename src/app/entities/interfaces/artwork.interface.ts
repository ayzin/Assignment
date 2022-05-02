export interface ArtworkListData {
    data: ArtworkList[];
    pagination: PaginationData;
}

export interface ArtworkList {
    id?: any;
    image_id?: string;
    title: string;
    artist_title: string;
    date_start?: number | Date | string ;
    date_end?: number | Date | string;
    material_titles: any;
    place_of_origin: string;
    style_id: string;
    style_title: string;
}

export interface PaginationData {
    current_page: number;
    limit: number;
    next_url: string;
    offset: number;
    total: number;
    total_pages: number;
}

export interface QueryOption {
    limit?: number;
    page?: number;
    ids?: any;
    fields?: any;
}

export interface  FilterStyleTitle {
    style_title : string;
    id: any;
}
export interface sortOptions {
    id: number;
    sortType: string;
}

export interface SearchQueryOption {
    'fields'? : string;
    'size'?: number;
    'page'?: number;
    'sort[date_start]'?: string;
    'sort[title]'? : string;
    'sort[artist_title]'? : string;
}

