import useSWR from 'swr'
export function useFetch<Data = any, Error = any>(url: string) {
    const fetcher = (url: string) => fetch(url).then((res: any) => res.json());
    const { data, error } = useSWR(url, fetcher);
    return { data, error }
  }