import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import * as xml from "xml-parse";
import CEPResponse from "./cep-response.interface";

export default class CEPService {
  public http: AxiosInstance = axios.create({
    baseURL: "https://apps.correios.com.br",
  });

  private getValueTagByName(
    nodes: Array<{ tagName: string; innerXML: string }>,
    tag: string
  ): string {
    const value = nodes.find(({ tagName }) => tagName === tag)!.innerXML;

    return value !== ">" ? value : "";
  }

  private getRequestBody(cep: string): string {
    return `<?xml version="1.0"?>
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">
        <soapenv:Body>
          <cli:consultaCEP>
            <cep>${cep}</cep>
          </cli:consultaCEP>
        </soapenv:Body>
      </soapenv:Envelope>
    `;
  }

  private get requestHeaders(): AxiosRequestConfig<any> {
    return { headers: { "Content-Type": "text/xml; charset=utf-8" } };
  }

  public async get(cep: string): Promise<CEPResponse> {
    const { data } = await this.http.post<string>(
      "/SigepMasterJPA/AtendeClienteService/AtendeCliente",
      this.getRequestBody(cep),
      this.requestHeaders
    );

    const responseNodes = xml.parse(data)[1]?.childNodes;

    return {
      cep: this.getValueTagByName(responseNodes, "cep"),
      state: this.getValueTagByName(responseNodes, "uf"),
      city: this.getValueTagByName(responseNodes, "cidade"),
      neighborhood: this.getValueTagByName(responseNodes, "bairro"),
      address: this.getValueTagByName(responseNodes, "end"),
      complement: this.getValueTagByName(responseNodes, "complemento2"),
    };
  }
}
