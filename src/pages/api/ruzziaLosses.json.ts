export async function get( {params, request} : {params: {id: string}, request: Request} ) {

    console.log("params", params);
    console.log("request", request);

    return {
        body: JSON.stringify({
            name: 'Astro',
            url: 'https://astro.build/',
        }),
    };
}