import { ApiCore } from "./utilities/core";

// todo API
const url = `api/history`;

const tiktokHistoryApi = new ApiCore({
     getAll: true,
     getSingle: false,
     post: true,
     put: false,
     patch: false,
     remove: false,
     url: url,
});

export { tiktokHistoryApi };
