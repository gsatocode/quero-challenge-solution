export interface Offer {
  courseName: string;
  rating: number;
  fullPrice: number;
  offeredPrice: number;
  kind: 'presencial' | 'ead';
  level: 'bacharelado' | 'tecnologo' | 'licenciatura';
  iesLogo: string;
  iesName: string;
}

export interface FormattedOffer {
  courseName?: string;
  rating?: number;
  fullPrice?: string;
  offeredPrice?: string;
  discountPercentage?: string;
  kind?: string;
  level?: string;
  iesLogo?: string;
  iesName?: string;
}

export interface QueryFilters {
  level?: string[];
  kind?: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'courseName' | 'offeredPrice' | 'rating';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  fields?: string[];
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse {
  data: FormattedOffer[];
  pagination: PaginationInfo;
  filters: QueryFilters;
}

export interface OfferStats {
  totalOffers: number;
  averageRating: number;
  averageDiscount: number;
  levelDistribution: Record<string, number>;
  kindDistribution: Record<string, number>;
  priceRanges: {
    min: number;
    max: number;
    avg: number;
  };
}