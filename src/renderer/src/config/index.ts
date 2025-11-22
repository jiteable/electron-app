const config = {
  api:
    import.meta.env.MODE == "development"
      ? "/api"
      : import.meta.env.RENDERER_VUE_API_BASEURL,
};

export default config;
