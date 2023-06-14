



## 查看

### df.describe()

### df.head()

### df.tail()

### df.index

### df.columns

### df.T



## 排序

### 按轴排序

ascending=True, 升序

axis=0，按 index 排列

```python
df.sort_index(axis=1, ascending=False)
```

### 按值排序

```python
df.sort_values(by='B')
```



## 选择

获取数据

```python
df['A'] # 列

df[0:2] # 行

df['20130102':'20130104'] # 行
```



### 按标签

```python
df.loc[df.index[0]]
df.loc['20130102':'20130104', ['A', 'B']]
```



### 按位置
```python
df.iloc[3]
df.iloc[3:5, 0:2]
```



### 布尔值索引

```Python
df[df.A > 0] # 单列

df[df > 0] # 所有
```



### isin

```python
df2 = df.copy()
df2[df2['E'].isin(['two', 'four'])]
```



## 赋值

用索引自动对齐新增列的数据

```python
s1 = pd.Series([1, 2, 3, 4, 5, 6], index=pd.date_range('20130102', periods=6))
```



### 按标签

```python
df.at[dates[0], 'A'] = 0
```



### 按位置

```python
df.iat[0, 1] = 0
```



### 用 `where` 条件

```python
df2 = df.copy()

df2[df2 > 0] = -df2
```



## 缺失值

主要用 `np.nan` 表示缺失数据



## 重建索引

（reindex）可以更改、添加、删除指定轴的索引，并返回数据副本，即不更改原数据。

```python
df1 = df.reindex(index=dates[0:4], columns=list(df.columns) + ['E'])

df1.loc[dates[0]:dates[1], 'E'] = 1
```



### 删除所有含缺失值的行

```python
df1.dropna(how='any')
```



### 填充缺失值

```python
df1.fillna(value=5)
```





