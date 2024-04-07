const app = require("./app");

const port = process.env.PORT;
const mode = process.env.NODE_ENV;

app.listen(port, () => {
  console.log(`Server running in ${mode} mode on port ${port}`);
});
