export interface AvailableProducts {
    productReferenceId: string
    name: string
    price: number
    isoCurrencyCode: string
}
export interface ApiResponse {
    content: {
        totalCount: number;
        pageIndex: number;
        limit: number;
        isLastPage: boolean;
        results: AvailableProducts[];
    };
    errors: any[];
    warnings: any[];
    information: any[];
    isValid: boolean;
}