export default {
  API_URL:
    import.meta.env.VITE_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_API_URL
      : import.meta.env.VITE_PROD_API_URL,
};
