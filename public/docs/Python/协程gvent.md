## 安装

```shell
pip3 install gevent
```



## 使用

```python
from gevent import monkey
import gevent, time

monkey.patch_all() # 一个补丁，让time.sleep() 阻塞能够被 gevent 识别

start_time = time.time()

ls = [x for x in range(100)]

def test(x):
    time.sleep(2)
    print(x)

task_list = [] # 异步任务列表
for i in ls:
    task = gevent.spawn(test, i) # 生成异步任务
    task_list.append(task)

gevent.joinall(task_list, timeout=5) # 加入到协程队列执行，超时时间为5

print(time.time() - start_time)
```

>关于 monkey
>
>```python
>monkey.patch_all(
>      socket = True,
>      dns = True,
>      time = True,
>      select = True,
>      thread = True,
>      os = True,
>      ssl = True,
>      httplib = False,
>      subprocess = True,
>      sys = False,
>      aggressive = True,
>      Event = False,
>      builtins = True,
>      signal = True
>)
>```



## queue

**理解 queue**

> 之前的 task_list 相当于存了 100 个异步任务
>
> 下面的思路是，创建 20 个异步任务的容器，一个容器每次从总的 队列 里拿出数据再继续执行

> 以下代码用以理解上述表达

```python
from gevent import monkey
import gevent, time

monkey.patch_all()

start_time = time.time()

ls = [x for x in range(100)]

def test():
    while len(ls) != 0: # 关键，这里的循环让任务反复进行
        x = ls.pop() # 每次任务删一个，拿一个
        time.sleep(2)
        print(x)

task_list = []
for i in range(20): # 创建 20 个异步任务
    task = gevent.spawn(test)
    task_list.append(task)

gevent.joinall(task_list)

print(time.time() - start_time)
```



**使用 queue**

```python
from gevent import monkey
import gevent, time
from gevent.queue import Queue

monkey.patch_all()

start_time = time.time()

ls = [x for x in range(100)]

queue_ls = Queue()
for i in ls:
    queue_ls.put_nowait(i) # 存储数据

def test():
    while not queue_ls.empty(): # 判断队列是否为空，.full() 判断是否为满
        x = queue_ls.get_nowait() # 从队列里取出，不再传了，而是取
        print(queue_ls.qsize()) # 打印队列长度
        time.sleep(2)
        print(x)

task_list = []
for i in range(20): # 20 个异步任务
    task = gevent.spawn(test) # 运行的异步任务传进去
    task_list.append(task)

gevent.joinall(task_list)

print(time.time() - start_time)
```



> 以下来源[知乎](https://zhuanlan.zhihu.com/p/208997626)

**常用方法**

q = Queue.Queue()

- q.qsize() 返回队列的大小
- q.empty() 如果队列为空，返回True,反之False
- q.full() 如果队列满了，返回True,反之False q.full 与 maxsize 大小对应
- q.get([block[, timeout]]) 获取队列，timeout等待时间
- q.get_nowait() 相当q.get(False) 非阻塞
- q.put(item) 写入队列，timeout等待时间
- q.put_nowait(item) 相当q.put(item, False)
- q.task_done() 在完成一项工作之后，q.task_done() 函数向任务已经完成的队列发送一个信号
- q.join() 实际上意味着等到队列为空，再执行别的操作
