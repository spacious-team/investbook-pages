import { client } from '../client/client.gen';

export function configureApiClient(): void {
  client.setConfig({ baseUrl: import.meta.env['VITE_API_BASE_URL'] });
}
