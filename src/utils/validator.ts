import { QueryFilters } from "../interface/index";

const validLevels = ['bacharelado', 'licenciatura', "tecnologo"];
const validKinds = ['presencial', 'ead'];
const validSortBy = ['courseName', 'offeredPrice', 'rating'];
const validSortOrder = ['asc', 'desc'];
const validFields = ['courseName', 'rating', 'fullPrice', 'offeredPrice', 'discountPercentage', 'kind', 'level', 'iesLogo', 'iesName'];

export const validateFilters = (query: Record<string, any>): QueryFilters => {
    const filters: QueryFilters = {}

    // Level validation
    if (query.level) {
        const levels = Array.isArray(query.level) ? query.level : [query.level];
        const validatedLevels = levels.filter((level: string) => validLevels.includes(level));
        if (validatedLevels.length > 0) {
            filters.level = validatedLevels
        }
    }

    // Kind validation
    if (query.kind) {
        const kinds = Array.isArray(query.kind) ? query.kind : [query.kind];
        const validatedKinds = kinds.filter((kind: string) => validKinds.includes(kind));
        if (validatedKinds.length > 0) {
            filters.kind = validatedKinds
        }
    }

    // Price range validation
    if (query.mixPrice !== undefined) {
        const minPrice = parseFloat(query.minPrice);
        if (!isNaN(minPrice) && minPrice >= 0) {
            filters.minPrice = minPrice
        }
    }

    if (query.maxPrice !== undefined) {
        const maxPrice = parseFloat(query.maxPrice);
        if (!isNaN(maxPrice) && maxPrice >= 0) {
        filters.maxPrice = maxPrice;
        }
    }

    // Search validation
    if (query.search && typeof query.search === 'string') {
        filters.search = query.search.trim();
    }

    // Sort validation
    if (query.sortBy && validSortBy.includes(query.sortBy)) {
        filters.sortBy = query.sortBy;
    }

    if (query.sortOrder && validSortOrder.includes(query.sortOrder)) {
        filters.sortOrder = query.sortOrder;
    }

    // Pagination validation
    if (query.page !== undefined) {
        const page = parseInt(query.page);
        if (!isNaN(page) && page > 0) {
            filters.page = page;
        }
    }

    if (query.limit !== undefined) {
        const limit = parseInt(query.limit);
        if (!isNaN(limit) && limit > 0 && limit <= 100) {
            filters.limit = limit
        }
    }

    // Fields validation
    if (query.fields) {
        const fields = Array.isArray(query.fields) ? query.fields : query.fields.split(',');
        const validatedFields = fields
            .map((field: string) => field.trim())
            .filter((field: string) => validFields.includes(field));
        
        if(validatedFields.length > 0) {
            filters.fields = validatedFields;
        }
    }

    return filters;
}