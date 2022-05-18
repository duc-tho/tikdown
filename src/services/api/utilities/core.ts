// core.js

import { apiProvider } from "./provider";

interface ApiCoreOption {
     getAll: boolean;
     getSingle: boolean;
     post: boolean;
     put: boolean;
     patch: boolean;
     remove: boolean;
     url: string;
}

export class ApiCore {
     getAll: any = undefined;
     getSingle: any = undefined;
     post: any = undefined;
     put: any = undefined;
     patch: any = undefined;
     remove: any = undefined;

     constructor(options: ApiCoreOption) {
          if (options.getAll) {
               this.getAll = () => {
                    return apiProvider.getAll(options.url);
               };
          }

          if (options.getSingle) {
               this.getSingle = (id: string) => {
                    return apiProvider.getSingle(options.url, id);
               };
          }

          if (options.post) {
               this.post = (model: object) => {
                    return apiProvider.post(options.url, model);
               };
          }

          if (options.put) {
               this.put = (model: object) => {
                    return apiProvider.put(options.url, model);
               };
          }

          if (options.patch) {
               this.patch = (model: object) => {
                    return apiProvider.patch(options.url, model);
               };
          }

          if (options.remove) {
               this.remove = (id: string) => {
                    return apiProvider.remove(options.url, id);
               };
          }
     }
}
