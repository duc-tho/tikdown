import { ApiCore } from "./utilities/core";

// todo API
const url = "todos";

const todoApi = new ApiCore({
     getAll: true,
     getSingle: false,
     post: false,
     put: false,
     patch: false,
     remove: false,
     url: url,
});

export { todoApi };
