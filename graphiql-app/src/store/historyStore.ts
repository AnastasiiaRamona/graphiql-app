import { create } from 'zustand';
import { HistoryState, RequestEntry } from './types';
import addToLocalStorageArray from '@/utils/addToLocalStorageArray';

const useHistoryStore = create<HistoryState>((set) => ({
  request: null,

  addRequest: (link: string, url: string) =>
    set(() => {
      const cleanedLink = link.replace(/^\/(en|ru)\//, '/');

      let methodType = 'UNKNOWN';
      const methodMatch = cleanedLink.match(
        /^\/(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS|graphql)/
      );
      if (methodMatch) {
        methodType = methodMatch[1];
      }

      const newRequest: RequestEntry = {
        method: methodType,
        link: cleanedLink,
        dateTime: new Date().toISOString(),
        url: url,
      };
      addToLocalStorageArray('queryHubHistory', newRequest);
      return { request: newRequest };
    }),
}));

export default useHistoryStore;
