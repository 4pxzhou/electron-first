const information = document.getElementById('info')
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`

const func = async ()=>{
    const response = await window.versions.ping()
    console.log(response)
}

func()

const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click',()=>{
    const title = titleInput.value
    window.electronApi.setTitle(title)
})

const openFileButton = document.getElementById('btn1')
const filePathElement = document.getElementById('filePath')

openFileButton.addEventListener('click', async () => {
    const filePath = await window.electronApi.openFile()
    filePathElement.innerText = filePath
})
