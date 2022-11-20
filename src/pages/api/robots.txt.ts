const robotsTxt = `User-agent: *\n Allow: /`;

export async function get( {params, request} : {params: {id: string}, request: Request} ) {

    console.log("params", params);
    console.log("request", request);

    return {
        body: robotsTxt
    }
}