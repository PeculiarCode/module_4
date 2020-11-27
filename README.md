# module_4

# Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

## 构建历程

1. 从配置文件和 shell 语句读取合并参数初始化 Compiler 对象
2. 加载所有配置插件,找到配置文件的 entry 入口文件,执行对象 run 方法开始编译
3. 从 entry 出发,调用所有 loader 对模块进行编译,找到模块依赖,递归该步骤直到所有入口依赖文件都经过该步骤处理
4. 根据入口和模块依赖关系,组装成一个个包含多个模块的 chunk,再把 chunk 转换成一个单独的文件加入输出列表
5. 根据配置确定输出路径和文件名,把文件内容写入文件系统

## 打包过程

### 打包初始化

1.  npm init 初始化 package.json 文件
2.  package.json 配置脚本

```json
"scripts": {
   "build": "webpack"
}
```

3.  安装 webpack 稳定版本 4.0 和 webpack-cli 版本 3.0

```js
 npm install --save-dev webpack@4
 npm install --save-dev webpack-cli@3
```

### 打包常用配置项

1. mode
   设置打包环境,*production*为生产环境,*development*为开发环境

```js
module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
}
```

2. devtool

-   为了追踪错误和报告,js 提供 source map 功能将编译后的代码映射回原始代码
-   根据个人喜好开发环境配置 devtool : "cheap-module-eval-source-map",生产环境配置 devtool : "none"

3. entry
   打包入口文件,可以是字符串,对象,数组

```js
//默认形式
module.exports = {
    entry: './src/index.js',
}

// 对象形式
module.exports = {
    entry: {
        a: './src/entry-a',
        b: ['./src/entry-b1', './src/entry-b2'],
    },
}
//数组形式
module.exports = {
    entry: ['./src/entry1', './src/entry2'],
}
```

4. output

```js
module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'), //表示绝对路径,输出路径
        filename: '[name].bundle.js', //打包后的文件名
    },
}
```

5.  module

    -   webpack 可以使用 loader 来预处理文件,这允许你打包除 JavaScript 之外的任何静态资源,可以使用 Node.js 来很简单地编写自己的 loader
    -   加载 js 资源

    ```js
    //安装相应依赖
    // npm install --save-dev babel-loader @babel/core @babel/preset-env
    //配置文件的配置选项
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                            },
                        },
                    ],
                },
            ],
        },
    }
    ```

    -   加载 css

    ```js
    // npm install --save-dev style-loader css-loader
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    //load加载顺序是从下往上
                    use: [
                        {
                            loader: 'style-loader', // 将 JS 字符串生成为 style 节点
                        },
                        {
                            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
                        },
                    ],
                },
            ],
        },
    }
    ```

    -   加载图片

    ```js
    //npm install --save-dev file-loader
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ['file-loader'],
                },
            ],
        },
    }
    ```

    -   加载字体

    ```js
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: ['file-loader'],
                },
            ],
        },
    }
    ```

6.  设定 HtmlWebpackPlugin

    ```js
    //  npm install --save-dev html-webpack-plugin
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, './public/index.html'),
            }),
        ],
    }
    ```

7.  清理打包后的文件夹

    ```js
    // npm install --save-dev clean-webpack-plugin
    const CleanWebpackPlugin = require('clean-webpack-plugin')
    module.exports = {
        plugins: [new CleanWebpackPlugin(path.resolve(__dirname, 'dist'))],
    }
    ```

8.  Split CSS

    ```js
    //npm install --save-dev mini-css-extract-plugin
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    module.exports = {
        plugins: [
            new MiniCssExtractPlugin({
                // 类似 webpackOptions.output里面的配置 可以忽略
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // 这里可以指定一个 publicPath
                                // 默认使用 webpackOptions.output中的publicPath
                                publicPath: '../',
                            },
                        },
                        'css-loader',
                    ],
                },
            ],
        },
    }
    ```

9.  devServer

```json
  "scripts": {
    "serve": "webpack-dev-server"
  }
```

```js
// npm install webpack-dev-server --save-dev
//运行命令npm run serve启动服务
module.exports = {
    devServer: {
        open: true,
        port: 9000, // 设置端口号，默认8080
    },
}
```

# 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路

## 不同点

-   loade 它是一个转换器，将 A 文件进行编译形成 B 文件,这里操作的是文件,比如将 A.scss 转换为 A.css,单纯的文件转换过程
-   plugin 是一个扩展器,针对是 loader 结束后 webpack 打包的整个过程,它并不直接操作文件
-   plugin 而是基于事件机制工作,会监听 webpack 打包过程中的某些节点,执行广泛的任务

## 模拟 loader 和 plugin 实现

-   开发 loader
-   loader 本身就是函数,接收输入返回输出

```js
// 将编写的loader配置在生产环境
// 执行命令npm run build观察控制台 
// --- reverse-loader output: redaol-kcapbew
// --- uppercase-loader output: Redaol-kcapbew
```

-   模拟 plugin生成filelist.md文件
    -   webpack 启动后,在读取配置的过程中会先执行 new MyPlugin(options) 初始化一个 MyPlugin 获得其实例
    -   在初始化 compiler 对象后,再调用 myPlugin.apply(compiler) 给插件实例传入 compiler 对象
    -   插件实例在获取到 compiler 对象后,就可以通过 compiler.plugin(事件名称, 回调函数) 监听到 Webpack 广播出来的事件
    -   可以通过 compiler 对象去操作 webpack
