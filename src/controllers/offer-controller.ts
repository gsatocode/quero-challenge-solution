import { Request, Response } from "express";
import { OfferService } from "../services/offer-service";
import { validateFilters } from "../utils/validator";

export class OfferController {
    private offerService: OfferService;

    constructor() {
        this.offerService = new OfferService();
    }

    public getOffers = async (req: Request, res: Response): Promise<void> => {
        try {
            const filters = validateFilters(req.query);
            const result = this.offerService.getOffers(filters);

            res.status(200).json({
                success: true,
                message: 'Offers load successfully',
                ...result
            });
        }catch (error) {
            console.error('Error in getOffers', error);~
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }

    public getFilterOptions = async(req: Request, res: Response): Promise<void> => {
        try {
            const filterOptions = {
                level: [
                    { value: 'bacharelado', label: 'Graduação (bacharelado) 🎓' },
                    { value: 'tecnologo', label: 'Graduação (tecnólogo) 🎓' },
                    { value: 'licenciatura', label: 'Graduação (licenciatura) 🎓' }
                ],
                kinds: [
                    { value: 'presencial', label: 'Presencial 🏫' },
                    { value: 'ead', label: 'EaD 🏠' }
                ],
                sortOptions: [
                    { value: 'courseName', label: 'Nome do Curso 📝' },
                    { value: 'offeredPrice', label: 'Preço com Desconto 📉' },
                    { value: 'rating', label: 'Avaliação 🌟' }
                ],
                fields:[
                    'courseName',
                    'rating',
                    'fullPrice',
                    'offeredPrice',
                    'discountPercentage',
                    'kind',
                    'level',
                    'iesLogo',
                    'iesName' 
                ],
            };

            res.status(200).json({                                 
                success: true,
                message: 'Filter options load successfully',
                data: filterOptions,
            })
        }catch (error) {
            console.error('Error in getFilterOptions', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }
}