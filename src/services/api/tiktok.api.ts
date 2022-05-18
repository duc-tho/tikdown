import { ApiCore } from "./utilities/core";

// todo API
const url = `aweme/v1/multi/aweme/detail`;

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
