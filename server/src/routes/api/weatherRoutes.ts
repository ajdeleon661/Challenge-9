import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
const router = Router();
import WeatherService from '../../service/weatherService.js';

// import HistoryService from '../../service/historyService.js';

// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const { cityName } = req.body;
  WeatherService.getWeather(cityName)
    .then((weatherData) => {
      res.status(200).json(weatherData);
    }
    )
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    });
  // TODO: save city to search history
  HistoryService.saveCity(cityName)
    .then(() => {
      console.log('City saved to search history');
    })
    .catch((error) => {
      console.error('Error saving city to search history:', error);
    });
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});


// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});
  

export default router;
