#!/usr/bin/env node
import fs from "fs";
import pegaArquivo from "./index.js";
import listaValidada from "./http-validacao.js";

async function imprimeTexto(resultado, valida) {
  if (valida) {
    await listaValidada(resultado);
  } else {
    console.log(resultado);
  }
}

async function processaTexto(caminho, valida) {
  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      console.log("Arquivo ou diretório não existe.");
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArquivo(caminho);
    imprimeTexto(resultado, valida);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeDeArquivo) => {
      const resultado = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
      imprimeTexto(resultado, valida);
    });
  }
}

const caminho = process.argv[2];
const valida = process.argv[3] === "--valida";
processaTexto(caminho, valida);
