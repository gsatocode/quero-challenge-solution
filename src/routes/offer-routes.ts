import { OfferController } from "../controllers/offer-controller";
import { Router } from "express";

const router = Router();
const offerController = new OfferController();

router.get('/', offerController.getOffers);
router.get('/filter-options', offerController.getFilterOptions);

export default router;