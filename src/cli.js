import fs from 'fs'
import pegaArquivo from './index.js'
import { Console } from 'console'

async function processaTexto(caminho){

    try{
        fs.lstatSync(caminho)
    } catch(erro){
        if (erro.code === 'ENOENT'){
            console.log("Arquivo ou diretório não existe.")
            return
        }
    }

    if (fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(caminho)
        console.log(resultado)
    } else if (fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async nomeDeArquivo => {
            const resultado = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            console.log(resultado)
        })
    }

}

const caminho = process.argv[2];
processaTexto(caminho)
