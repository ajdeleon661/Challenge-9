// TODO: Define a City class with name and id properties

import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { City } from '../types/city.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const searchHistoryPath = path.join(__dirname, '../../data/searchHistory.json');
import { WeatherData } from '../types/weatherData.js';
import { WeatherService } from './weatherService.js';
import { City } from '../types/city.js';

// TODO: Complete the HistoryService class
class HistoryService {
  private async read(): Promise<City[]> {
    try {
      const data = await fs.promises.readFile(searchHistoryPath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);
      await fs.promises.writeFile(searchHistoryPath, data, 'utf-8');
    } catch (error) {
      throw error;
    }
  }

  async getCities(): Promise<City[]> {
    return await this.read();
  }

  async addCity(cityName: string): Promise<City> {
    const cities = await this.read();
    const newCity: City = { id: uuidv4(), name: cityName };
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }

  async removeCity(id: string): Promise<boolean> {
    const cities = await this.read();
    const filteredCities = cities.filter(city => city.id !== id);
    if (filteredCities.length === cities.length) {
      return false; // No city was removed
    }
    await this.write(filteredCities);
    return true;
  }
}

export default new HistoryService();
