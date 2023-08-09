## 介绍

请直接访问官网，仅个人提取部分备忘：

- [Echarts](https://echarts.apache.org/handbook/zh/)
- [Echarts API](https://echarts.apache.org/zh/api.html#echarts)



## 引入

```shell
$ npm install echarts --save
```

> [cdnjs](https://cdnjs.com/libraries/echarts)

```js
import * as echarts from 'echarts/core';
```

[**按需引入**](https://echarts.apache.org/handbook/zh/basics/import/#%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5-echarts-%E5%9B%BE%E8%A1%A8%E5%92%8C%E7%BB%84%E4%BB%B6)



## 创建实例与尺寸

### 容器初始值

**方法一**：为容器设置样式

```css
.main {
    width: 100%;
    height: 100vh;
}
```

**方法二**：在初始化方法中指定大小

```js
let myChart = echarts.init(document.getElementById("main"), null, {
	width: 600,
	height: 400
});

// 第二个参数应该是主题，可以选择 'dark'，已经内置
// 返回 ECharts 实例
```



### 尺寸重置 / 响应

```js
let myChart = echarts.init(document.getElementById("main"), null, {
	width: 600,
	height: 400
});
window.addEventListener('resize', function() {
    myChart.resize();
    
    // 也可接收一个对象参数设置大小
    // myChart.resize({
  	//	width: 800,
  	//	height: 400
	// });
});
```



### 销毁实例

```js
echartsInstance.dispose()
```



## 数据集

使用实例方法 `echartsinstance.setOptions(option)` 进行配置。

### 配置数据

官方更推荐使用 `数据集（dataset）` 这个组件来管理数据，早前的数据存放位置请查看 [在系列中设置数据](https://echarts.apache.org/handbook/zh/concepts/dataset#在系列中设置数据)。

其中的 `source` 项可以是二维数组、对象数组等。

**二维数组**

```js
option = {
  legend: {},
  tooltip: {},
  dataset: {
    // 提供一份数据。
    source: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
  },
  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: { type: 'category' },
  // 声明一个 Y 轴，数值轴。
  yAxis: {},
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
};
```

**对象数组**

```js
option = {
  legend: {},
  tooltip: {},
  dataset: {
    // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
    // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
    // 如果不指定 dimensions，也可以通过指定 series.encode
    // 完成映射，参见后文。
    dimensions: ['product', '2015', '2016', '2017'],
    source: [
      { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
      { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
      { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
      { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
};
```



### 映射方向

[**series.seriesLayoutBy**](https://echarts.apache.org/zh/option.html#series-line.seriesLayoutBy)

值为 ` column | row `。指定数据的列还是行映射为系列

```js
option = {
    dataset: {
       source: [
         ['product', '2012', '2013', '2014', '2015'],
         ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
         ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
         ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
      ]
  },
    series: [
        
        // x zhou'w
        { type: 'xxx', seriesLayoutBy: 'row' },
        { type: 'xxx', seriesLayoutBy: 'row' },
        { type: 'xxx', seriesLayoutBy: 'row' },
        { type: 'xxx', seriesLayoutBy: 'row' },
        
    ]
}
```



[**series.encode**](https://echarts.apache.org/option.html#series.encode)

```js
option = {
    dataset: {
        source: [
            // 每一列称为一个『维度』。
            // 这里分别是维度 0、1、2、3、4。
            [12, 44, 55, 66, 2],
            [23, 6, 16, 23, 1],
            ...
        ]
    },
    series: {
        type: 'xxx',
        encode: {
            x: [3, 1, 5],      // 表示维度 3、1、5 映射到 x 轴。
            y: 2,              // 表示维度 2 映射到 y 轴。
            tooltip: [3, 2, 4] // 表示维度 3、2、4 会在 tooltip 中显示。
        }
    }
}
```

当使用 [dimensions](https://echarts.apache.org/zh/option.html#series.dimensions) 给维度定义名称后，`encode` 中可直接引用名称，例如：

```js
series: {
    type: 'xxx',
    dimensions: ['date', 'open', 'close', 'highest', 'lowest'],
    encode: {
        x: 'date',
        y: ['open', 'close', 'highest', 'lowest']
    }
}
```











## 样式

### 主题

**暗色**

```js
let chart = echarts.init(dom, 'dark');
```

**自定义主题**

编辑好后下载引入

-  [主题编辑器](https://echarts.apache.org/theme-builder.html)

```js
import theme from '主题名.json';

echarts.registerTheme('自定义名字', theme);

let chart = echarts.init(dom, '自定义名字');
```



### 直接设置样式

使用实例的方法 `echartsinstance.setOption()`，配置直接打开 [options](https://echarts.apache.org/zh/option.html#title) 查看即可。注意的是，这是万能配置项，不是专门配置样式用的。

映射的方式请查看 [visualMap](https://echarts.apache.org/zh/option.html#visualMap)



