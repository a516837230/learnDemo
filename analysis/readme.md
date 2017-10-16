# 解析字符串
将kindle的mycliping文件解析为正常文本
## 目标
完成解析 Mycliping.txt的任务，将标记规范的输出。 技术实现上，这里主要着重利用正则解析给定的字 符串（省去通过 FileReader Api来读取文件这一步骤）
## 要求
1. 考虑到系统切换为英文的情况，中间关于标记位置与时间的部分变为英文。考虑到解析英文可加分 "‑ Your Highlight on Location 2619‑2625 | Added on  Tuesday, February 21, 2017 1­11­53 AM"
2. mark中的time，转化为标准的时间格式 YYYY‑MM‑DD hh:mm:ss，月份与年份如果为个位数，需要补全十位为0，即5月 份需显示为05 "2016年5月2日星期一 下午3­08­36" 格式化为 2016‑05‑02 03­08­36
3. mark中的content为空，则去掉该条记录，以防止空的记录。
## 待解析字符串
    var sourceString =
    'Harry Potter and the Chamber of Secrets (Rowling, J.K.)
    - 您在位置 #3251-3252的标注 | 添加于 2017年1月12日星期四 下午11:39:43
    There was barely a face to be seen in the school that didn’t look worried and tense, and any laughter that rang thr
    ==========
    知更鸟女孩 ([美] 查克·温迪格)
    - Your Highlight on Location 2619-2625 | Added on Tuesday, February 21, 2017 1:11:53 AM
    他就像个精通怀柔之术的太极高手，又像个超然世外的禅宗大师，对她循循善诱，无声无息间便将她咄咄逼人的戾气化解得无影无踪。
    ==========
    知更鸟女孩 ([美] 查克·温迪格)
    - Your Highlight on Location 2619-2625 | Added on Tuesday, February 21, 2017 1:11:53 AM
    ==========
    把生命浪费在美好的事物上 (吴晓波)
    - 您在位置 #240-248的标注 | 添加于 2016年4月18日星期一 下午7:43:37
    近年来，还突然喜欢看建筑师、设计师的文字，因为我觉得他们的实用感是我们这些做文章的人需要学习的，房子是建来让人住的，服装是裁剪出让人穿的，
    ==========
    把生命浪费在美好的事物上 (吴晓波)
    - 您在位置 #366-367的标注 | 添加于 2016年5月2日星期一 下午3:08:36
    我们的书单决定了我们的过去，同时也指向一个辽阔的未来。
    ==========

## 输出结果
    var mark = [
    { // 样例
    title: "把生命浪费在美好的事物上",
    author: "吴晓波",
    postion: "366", // 取 ”您在位置 #366-367的标注“中的366既可,如果是#240-248则选取240即可
    time: "2016年5月2日星期一 下午3:08:36",
    content: "我们的书单决定了我们的过去，同时也指向一个辽阔的未来。"
    },
    ... // 其余的解析结果
    ]
