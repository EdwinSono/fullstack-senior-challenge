class SunatAPI {
  async getExchangeRate(): Promise<any> {
    const response = await fetch('https://api.apis.net.pe/v1/tipo-cambio-sunat');
    return response.json();
  }
}

export { SunatAPI };
