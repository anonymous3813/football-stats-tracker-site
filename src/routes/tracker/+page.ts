import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const data = "Bank";

    return {
        props: {
            data: data
        }
    };
};