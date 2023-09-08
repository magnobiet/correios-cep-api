import { VercelRequest, VercelResponse } from "@vercel/node";
import CEPService from "./cep.service";

export default async function CEPController(
  request: VercelRequest,
  response: VercelResponse
) {
  const { cep } = request.query;

  if (!cep || cep.length !== 8) {
    response.statusCode = 404;

    return response.send({ error: "Invalid or not found CEP" });
  }

  const service = new CEPService();

  return response.json(await service.get(cep as string));
}
