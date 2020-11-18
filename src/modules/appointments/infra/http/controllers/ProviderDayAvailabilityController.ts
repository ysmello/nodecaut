import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.body;

    const listProviderMonthAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      day,
      year,
    });

    return response.json(availability);
  }
}
