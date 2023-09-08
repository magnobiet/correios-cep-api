import { VercelRequest, VercelResponse } from "@vercel/node";
import CEPService from "./cep.service";
import IBGEService from "./ibge.service";

export default async function CEPController(
  request: VercelRequest,
  response: VercelResponse
): Promise<VercelResponse> {
  const { cep } = request.query;

  if (!cep || cep.length !== 8) {
    response.statusCode = 404;

    return response.send({ error: "Invalid or not found CEP" });
  }

  const cepService = new CEPService();
  const ibgeService = new IBGEService();

  const cepFound = await cepService.get(cep as string);
  const [state, city] = await ibgeService.getCity(
    cepFound.state as string,
    cepFound.city as string
  );

  return response.json({
    ...cepFound,
    state,
    city,
  });
}
