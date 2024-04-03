import chalk from "chalk";
import fs from "fs";

function pegaLinks(texto){
    const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)]
    const resultados = capturas.map(capturas => ({[capturas[1]]: capturas[2]}))
    return resultados.lenght !== 0 ? resultados : 'não há links no arquivo.'
}

function trataErro(erro){
    throw new Error(chalk.red(erro.code, "arquivo não encontrado."))
}

async function pegarArquivo(caminhoDoArquivo){
    const encoding = 'utf-8'
    try{
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return pegaLinks(texto)        
    } catch (erro){
        trataErro(erro)
    }
     
}

export default pegarArquivo
