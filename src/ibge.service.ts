import axios, { AxiosInstance } from "axios";
import { Municipio } from "./ibge-response.interface";

export default class IBGEService {
  public http: AxiosInstance = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1",
  });

  private async getCitiesFromState(state: string) {
    const { data } = await this.http.get<Array<Municipio>>(
      `localidades/estados/${state}/municipios`
    );

    return data;
  }

  public async getCity(state: string, city: string) {
    const cities = await this.getCitiesFromState(state);

    const response = [
      { id: 0, name: null, acronym: state },
      { id: 0, name: city },
    ];

    const cityFound = cities.find(({ nome }) => nome === city);

    if (cityFound?.id) {
      response[0].id = cityFound.microrregiao.mesorregiao.UF.id;
      response[0].name = cityFound.microrregiao.mesorregiao.UF.nome;

      response[1].id = cityFound.id;
    }

    return response;
  }
}
