export const fetchData = async (path: string, method: string, data?: {}): Promise<any> =>
{
    const res = await fetch(path, {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: !!data ? JSON.stringify(data) : undefined
    });
    const resData = await res.json();
    console.log(resData);
    if (resData.errors)
    {
        throw Error(resData.errors)
    }
    if (resData.data)
    {
        return resData;
    }
};
