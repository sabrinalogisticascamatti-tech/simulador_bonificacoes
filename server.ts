import express from "express";
import path from "path";
import { json } from "body-parser";

// Ajuste conforme seu routers.ts: aqui assumo que ele exporta uma função `mountRouters(app: Express)`
import { mountRouters } from "./routers";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(json());

// Monta suas rotas (ajuste se seu routers.ts exportar diferente)
if (typeof mountRouters === "function") {
  mountRouters(app);
} else {
  // exemplo alternativo: se routers.ts exporta `router` do express
  // import router from "./routers";
  // app.use("/api", router);
  console.warn("mountRouters não é função — verifique o export de routers.ts");
}

// Serve o build do frontend. Ajuste 'client/build' se o build for gerado em outro lugar.
const clientBuildPath = path.join(__dirname, "client", "build"); // dist/server.js fica em /dist, por isso usamos __dirname
app.use(express.static(clientBuildPath));
app.get("*", (_, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
