class FileListPlugin {
    apply(compiler) {
        //emit是一个异步钩子，使用tapAsync对其进行接入，也可以使用tapPromise/tap(synchronous)
        compiler.hooks.emit.tapAsync(
            'FileListPlugin',
            (compilation, callback) => {
                // 为生成的文件创建一个头字符串:
                let filelist = 'In this build:\n\n'
                // 循环所有已编译的文件
                // 为每个文件名添加一个新行项
                for (let filename in compilation.assets) {
                    filelist += '- ' + filename + '\n'
                }

                // 将这个列表作为新的文件资源插入webpack构建中:
                compilation.assets['filelist.md'] = {
                    source: function () {
                        return filelist
                    },
                    size: function () {
                        return filelist.length
                    },
                }

                callback()
            }
        )
    }
}

module.exports = FileListPlugin
