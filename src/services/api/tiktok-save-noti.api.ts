import { ApiCore } from "./utilities/core";

// todo API
const url = `api/savenoti`;

const saveNotiApi = new ApiCore({
     getAll: false,
     getSingle: false,
     post: true,
     put: false,
     patch: false,
     remove: false,
     url: url,
});

export { saveNotiApi };
