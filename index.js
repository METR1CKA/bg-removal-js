import { removeBackground } from '@imgly/background-removal-node'
import path from 'path'
import fs from 'fs'

const inputPath = './image.png'
const outputPath = './output.png'

if (!fs.existsSync(inputPath)) {
    console.error('Image not found at', inputPath)
    process.exit(1)
}

const absolutePath = path.resolve(inputPath)

const imgUrl = `file://${absolutePath}`

async function blobToBuffer(blob) {
    const arrayBuffer = await blob.arrayBuffer()
    return Buffer.from(arrayBuffer)
}

async function main() {
    try {
        const blob = await removeBackground(imgUrl)

        const buffer = await blobToBuffer(blob)

        fs.writeFileSync(outputPath, buffer)

        console.log('Image saved to', outputPath)
    } catch (ERR) {
        console.error(ERR)
    }
}

main()
