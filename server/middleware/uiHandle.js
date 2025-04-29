export default (app) => {
  if (process.env.NODE_ENV !== "production") return;

  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
  );
};
