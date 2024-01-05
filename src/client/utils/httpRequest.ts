import { API_PORT } from '../../constants';

type Methods = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

const apiUrl = `http://localhost:${API_PORT}`;
export async function httpRequest<TRes> (
	data: unknown = {},
	path: string = '/',
	method?: Methods,
): Promise<TRes> {
	return await fetch(`${apiUrl}${path}`, {
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' },
		method,
	})
		.catch((e) => {
			throw { code: 'FETCH_ERROR', stack: e };
		})
		.then(async (response) => {
			const data = await response.json();
			if (response.ok) {
				return data;
			}
			throw data;
		});
}
