import express from "express";
import path from "path";
import { json } from "body-parser";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// IMPORTANTE: ajuste conforme a exportação do seu routers.ts
// Se routers.ts exporta { mountRouters }, mantenha assim:
import { mountRouters } from "./project_source/routers";

if (typeof mountRouters === "function") {
  mountRouters(app);
}

app.use(json());

// Caminho correto do build do frontend
const clientBuildPath = path.join(__dirname, "project_source", "build");

app.use(express.static(clientBuildPath));

app.get("*", (_, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
