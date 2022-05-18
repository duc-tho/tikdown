import { ApiCore } from "./utilities/core";

// todo API
const url = `api`;

const tiktokApi = new ApiCore({
     getAll: false,
     getSingle: true,
     post: false,
     put: false,
     patch: false,
     remove: false,
     url: url,
});

export { tiktokApi };
