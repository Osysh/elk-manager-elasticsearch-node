
// Engine
export const MIN_START_LOADING_TIME = parseInt(
  process.env.MIN_START_LOADING_TIME || "1000",
  10
);
export const MAX_START_LOADING_TIME = parseInt(
  process.env.MAX_START_LOADING_TIME || "1000",
  10
);
export const MIN_STOP_LOADING_TIME = parseInt(
  process.env.MIN_STOP_LOADING_TIME || "1000",
  10
);
export const MAX_STOP_LOADING_TIME = parseInt(
  process.env.MAX_STOP_LOADING_TIME || "1000",
  10
);
export const ON_DISPATCHER_TIME = parseInt(
  process.env.ON_DISPATCHER_TIME || "1000",
  10
);

// Config
export const JVM_SIZE = parseInt(process.env.JVM_SIZE || "3", 10);
export const PASSWORD = process.env.PASSWORD || "password";
export const PORT = parseInt(process.env.PORT || "9500", 10);
