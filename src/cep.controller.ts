import { VercelRequest, VercelResponse } from "@vercel/node";
import CEPService from "./cep.service";
import IBGEService from "./ibge.service";

function notFound(response: VercelResponse) {
  response.statusCode = 404;

  return response.send({ error: "Invalid or not found CEP" });
}

export default async function CEPController(
  request: VercelRequest,
  response: VercelResponse
): Promise<VercelResponse> {
  const cep = (request.query.cep as string).replace("-", "");

  console.info("cep", cep);

  if (!cep || cep.length !== 8) {
    return notFound(response);
  }

  const cepService = new CEPService();
  const ibgeService = new IBGEService();

  const cepFound = await cepService.get(cep as string);

  console.info("cepFound", cepFound);

  const [state, city] = await ibgeService.getCity(
    cepFound.state as string,
    cepFound.city as string
  );

  console.info("state", state);
  console.info("city", city);

  if (state.id === 0 && city.id === 0) {
    return notFound(response);
  }

  response.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate=59");

  return response.json({
    ...cepFound,
    state,
    city,
  });
}
