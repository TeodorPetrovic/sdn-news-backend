import { Router, Application } from 'express';
import { StatsController } from '../controllers/statsController';

const router = Router();
const statsController = new StatsController();

export function setStatsRoutes(app: Application): void {
    app.use('/api/stats', router);
    router.get('/', statsController.getStats.bind(statsController));
}