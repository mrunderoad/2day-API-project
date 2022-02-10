export default class YearService {
  static async getYear() {
    try {
      const response = await fetch(``);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message
    }
  }
}