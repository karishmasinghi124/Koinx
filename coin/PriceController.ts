const Controller = require('@nestjs/common');
const Get = require('@nestjs/common');
const axios = require('axios');

@Controller('price')
export class PriceController {
  @Get()
  async getPrice(query: any) {
    const { fromCurrency, toCurrency, date } = query;
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}&localization=false`;

    try {
      const response = await axios.get(apiUrl);
      const price = response.data.market_data.current_price[toCurrency.toLowerCase()];
      return { price };
    } catch (error) {
      return { error: 'Error fetching data' };
    }
  }
}
