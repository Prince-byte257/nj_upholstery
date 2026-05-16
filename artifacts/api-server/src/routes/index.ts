import { Router, type IRouter } from "express";
import healthRouter from "./health";
import servicesRouter from "./services";
import galleryRouter from "./gallery";
import reviewsRouter from "./reviews";
import searchRouter from "./search";
import quotesRouter from "./quotes";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(servicesRouter);
router.use(galleryRouter);
router.use(reviewsRouter);
router.use(searchRouter);
router.use(quotesRouter);
router.use(statsRouter);

export default router;
