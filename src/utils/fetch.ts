type Fetch = typeof fetch;
type Opts = Parameters<Fetch>[1];

export const post = async (url: string, body: any) => {
    return f(url, {
        method: "post",
        body: JSON.stringify(body),
    });
};

export const del = async (url: string) => {
    return f(url, {
        method: "delete",
    });
};

export const get = async (url: string) => {
    return f(url, {
        method: "get",
    });
};

/**
 *
 * @param url url of the request
 * @param opts options for the request
 * @param client http client to use for the request
 * @returns Promise<[any, string | null, Response | null]>
 *                  [data,    error,      response]
 */
export const f = async (
    url: string,
    opts?: Opts,
    client: Fetch = fetch,
): Promise<{ data: any; err: string | null; res: Response | null }> => {
    let res: Response;
    let data: any;

    let _opts: Opts = {
        headers: {
            // accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    if (opts) {
        _opts = { ..._opts, ...opts };
    }

    try {
        res = await client(url, _opts);
        data = await res.json();
    } catch (err) {
        return { data: null, err: err as string, res: null };
    }

    if (res.status >= 400) {
        if (data && data.message) {
            return { data, err: data.message, res };
        } else if (typeof data === "string") {
            return { data, err: data, res };
        } else {
            return { data, err: "Something went wrong.", res };
        }
    }

    return { data: data, err: null, res };
};
