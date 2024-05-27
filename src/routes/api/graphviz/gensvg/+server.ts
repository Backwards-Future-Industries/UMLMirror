import { json, type RequestHandler } from '@sveltejs/kit';
import { generateSVG} from '$lib/server/graphviz';

export const POST: RequestHandler = async ({ request }) => {

    let { classes, associations } = await request.json();

    let result = generateSVG(classes, associations);

    return json({result: result});
};