async function listaValidada(listaDelinks) {
  const listaUrls = extraiLinks(listaDelinks);
  const listaStatus = await verificaUrl(listaUrls);
  const resultado = listaDelinks.map((objeto, indice) => ({
    ...objeto,
    status: listaStatus[indice],
  }));
  console.log(resultado);
}

function extraiLinks(listaDeLinks) {
  return listaDeLinks.map((link) => Object.values(link).join());
}

function trataErro(erro) {
  if (erro.cause.code === "ENOTFOUND") {
    return "link não encontrado";
  } else {
    return "ocorreu um erro desconhecido";
  }
}

async function verificaUrl(listaDeUrls) {
  const listaStatus = await Promise.all(
    listaDeUrls.map(async (url) => {
      try {
        const response = await fetch(url);
        return response.status;
      } catch (erro) {
        return trataErro(erro);
      }
    })
  );
  return listaStatus;
}

export default listaValidada;
