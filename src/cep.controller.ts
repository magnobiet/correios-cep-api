import { VercelRequest, VercelResponse } from "@vercel/node";
import CEPService from "./cep.service";

export default async function CEPController(
  request: VercelRequest,
  response: VercelResponse
) {
  const { cep } = request.query;

  if (!cep || cep.length !== 8) {
    response.statusCode = 204;
    response.send("CEP not found");
  }

  const service = new CEPService();

  response.json(await service.get(cep as string));
}
