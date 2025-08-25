import * as path from "path";
import * as fs from "fs";
import {
  ApiResponse,
  FormattedOffer,
  Offer,
  OfferStats,
  PaginationInfo,
  QueryFilters,
} from "../interface/index";
import { formatKind, formatLevel, formatPrice } from "../utils/formatters";
import { calculateDiscountPercentage } from "../utils/formatters";

export class OfferService {
  private offers: Offer[] = [];

  constructor() {
    this.loadOffers();
  }

  private loadOffers(): void {
    try {
      const dataPath = path.join(process.cwd(), ".", "/data.json");
      const rawData = fs.readFileSync(dataPath, "utf8");
      const jsonData = JSON.parse(rawData);
      this.offers = jsonData.offers;
    } catch (error) {
      console.error("Error loading offers:", error);
      throw new Error("Failed to load offers data");
    }
  }

  private formatOffer(offer: Offer, selectedFields?: string[]): FormattedOffer {
    const formatted: FormattedOffer = {
      courseName: offer.courseName,
      rating: offer.rating,
      fullPrice: formatPrice(offer.fullPrice),
      offeredPrice: formatPrice(offer.offeredPrice),
      discountPercentage: calculateDiscountPercentage(
        offer.fullPrice,
        offer.offeredPrice
      ),
      kind: formatKind(offer.kind),
      level: formatLevel(offer.level),
      iesLogo: offer.iesLogo,
      iesName: offer.iesName,
    };

    if (selectedFields && selectedFields.length > 0) {
      const filteredOffer: FormattedOffer = {};
      selectedFields.forEach((field) => {
        if (field in formatted) {
          (filteredOffer as any)[field] = (formatted as any)[field];
        }
      });
      return filteredOffer;
    }
    return formatted;
  }

  private applyFilters(offers: Offer[], filters: QueryFilters): Offer[] {
    let filtered = [...offers];

    // Level filter
    if (filters.level && filters.level.length > 0) {
      filtered = filtered.filter((offer) =>
        filters.level!.includes(offer.level)
      );
    }

    // Kind filter
    if (filters.kind && filters.kind.length > 0) {
      filtered = filtered.filter((offer) => filters.kind!.includes(offer.kind));
    }

    // Price range filter
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(
        (offer) => offer.offeredPrice >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        (offer) => offer.offeredPrice <= filters.maxPrice!
      );
    }

    // Search filter
    if (filters.search) {
      const searchItem = filters.search
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      filtered = filtered.filter((offer) => {
        const courseName = offer.courseName
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')

        return courseName.includes(searchItem)
      })
    }

    return filtered;
  }

  private applySorting(offers: Offer[], filters: QueryFilters): Offer[] {
    if (!filters.sortBy) {
      return offers;
    }

    const sorted = [...offers];
    const sortOrder = filters.sortOrder || "asc";

    sorted.sort((a, b) => {
      let valueA: string | number;
      let valueB: string | number;

      switch (filters.sortBy) {
        case "courseName":
          valueA = a.courseName.toLowerCase();
          valueB = b.courseName.toLowerCase();
          break;
        case "offeredPrice":
          valueA = a.offeredPrice;
          valueB = b.offeredPrice;
          break;
        case "rating":
          valueA = a.rating;
          valueB = b.rating;
          break;
        default:
          return 0;
      }

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }

  private applyPagination(
    offers: Offer[],
    filters: QueryFilters
  ): { paginatedOffers: Offer[]; pagination: PaginationInfo } {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const totalItems = offers.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedOffers = offers.slice(startIndex, endIndex);

    const pagination: PaginationInfo = {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    return { paginatedOffers, pagination };
  }

  public getOffers(filters: QueryFilters = {}): ApiResponse {
    try {
      let filteredOffers = this.applyFilters(this.offers, filters);

      filteredOffers = this.applySorting(filteredOffers, filters);

      const { paginatedOffers, pagination } = this.applyPagination(
        filteredOffers,
        filters
      );

      const formatedOffers = paginatedOffers.map((offer) =>
        this.formatOffer(offer, filters.fields)
      );

      return {
        data: formatedOffers,
        pagination,
        filters,
      };
    } catch (error) {
      console.error("Error geting offers", error);
      throw new Error("Failed to load offers");
    }
  }
}
