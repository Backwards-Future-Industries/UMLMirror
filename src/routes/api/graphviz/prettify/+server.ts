import { json, type RequestHandler } from '@sveltejs/kit';
import { prettify } from '$lib/server/graphviz';

export const POST: RequestHandler = async ({ request }) => {

    let { classes, associations } = await request.json();

    let result = prettify(classes, associations);

    return json({result: result});
};