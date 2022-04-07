import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';

export const usePromise = <T>(callback: () => Promise<AxiosResponse<T>>, dependencyList: React.DependencyList): [T | undefined, unknown, boolean] => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [result, setResult] = React.useState<T>();
  const [error, setError] = React.useState<any>();

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const response = await callback();
        setResult(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyList);

  return [result, error, loading];
}
