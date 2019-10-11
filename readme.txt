CVS
SVN
VSS

集中式：
1、必须要依赖于一台中央服务器（搭建服务器）
2、必须要联网
3、所有的操作都由服务器完成

Git：
分布式
1、随意位置都可以作为代码仓库（不需要搭建服务器）
2、所有操作都是本机完成（随意拷贝，本地操作完成后再上传至远程仓库）

Git相比其它版本工具更加安全和高效！

Git作者：Linus Torvalds

-------------------------------------------------------------------------------------------------------

原理/特点：
***三阶段管理***

阶段        颜色        状态                        操作
工作区      红色        Untracked（未追踪）          加入暂存（交由Git工具进行预处理——索引、分析统计、镜像）
暂存区      绿色        Staged（被索引/记录）        取消暂存（回到工作区状态），进行提交（最终被Git管理）
仓库区                  Commited（已提交）          实现版本比较，分支，上传，回退

只有暂存区内容才会在提交时被写入仓库（文件不能跳过暂存区直接写入仓库）

-------------------------------------------------------------------------------------------------------

如何通过Git管理项目代码？
1、将当前项目所在目录初始化为一个本地仓库
git init

这时会在当前工程的根目录下创建一个.git文件夹（这就是本地仓库目录——隐藏的）
通过dir /ah查看

2、在当前项目/仓库中，配置身份（如果没有配置，在提交代码时会提醒）
git config user.name "zhangsan"
git config user.email "itany@163.com"
查看
git config user.name
git config user.email

上面操作一定要在一个本地仓库中执行！！！

3、设置全局的身份（如果在一个仓库中，如果没有配置过身份，那么就使用全局身份）
git config --global user.name "zhangsan"
git config --global user.email "zhangsan@163.com"
查看
git config --global user.name
git config --global user.email

全局身份的配置和查看无所谓项目/仓库位置！

4、查看当前工作区中所有内容（文件和目录）的状态
git status

5、将文件或者目录加入暂存区（被Git识别索引）
git add Readme.txt gulpfile.js package.json
git add src/

技巧：将工作区中所有希望被暂存的内容一并加入暂存区！
git add .
git add -A
git add --all

6、配置忽略清单（将项目中永远不需要被Git状态识别的内容全部定义为一个列表）
在项目/仓库的根目录下，定义.gitignore

7、写入/提交到本地仓库库
git commit -m "init project"

8、文件重命名
再次add .，再次commit即可

9、删除文件
I、从本地手动删除，再add .，再commit即可
或者
II、直接通过git rm xxx.js，再commit即可

10、移除被暂存的文件（还要继续编辑）
git rm --cached xxx.js

11、移除被暂存的目录（该目录下的内容还要继续编辑）
git rm --cached -r doc/

----------------------------------------------------------------------------------------------

查看git中的指定命令的详细语法帮助
git commit --help
git help commit

----------------------------------------------------------------------------------------------

查看所有提交日志
git log

查看最近三次提交信息
git log -3

查看指定时间
git log --after "Wed Sep 25 00:00:00 2019 +0800"

git log --before "Tue Sep 24 16:51:30 2019 +0800"

git log --after "Wed Sep 25 00:00:00 2019 +0800" --before "Wed Sep 25 10:00:00 2019 +0800"

查看指定提交者
git log --author "yufeng"

查看指定时间范围内某个提交者的提交信息
git log --after "Wed Sep 25 00:00:00 2019 +0800" --before "Wed Sep 25 10:00:00 2019 +0800" --author "yufeng"

----------------------------------------------------------------------------------------------

三个阶段文件内容的相互比较
仓库：<hr />
暂存：<hr color="red" />
工作：<hr color="blue" />

比较暂存区和工作区
git diff hello.htm

比较暂存区和仓库区
git diff --cached hello.htm

比较工作区和仓库区
git diff HEAD hello.htm

红色显示的内容是两个区比较相对远的那个区的差异内容
绿色显示的内容是两个区比较相对近的那个区的差异内容

----------------------------------------------------------------------------------------------

版本回退

1、当前工作区诸多代码被编辑，突然发现这些代码都编写有问题，想整个工作区回退到仓库的最新版（回到早上检出仓库代码之时）
git reset --hard

2、当前工作区某些文件恢复到仓库最新代码（今天绝大部分代码还是没问题的，几个文件希望回到早上检出仓库代码之时）
git checkout -- index.htm

3、几天来的代码需求理解错误，需要将整个工作区回退到仓库的某个提交点
I、先通过git log --oneline，查看提交id和信息
II、根据提交信息，获取提交id
III、git reset --hard 6abaa4d

4、代码从星期五回退到星期一，这时发现，星期三的代码其实也是有用的，应该回退到星期三就可以了
这时，你会发现，通过git log --oneline，看不见星期二到星期五的提交id和信息了
这时，通过git reflog查看历来所有提交日志，这个会包括回退历史之间的日志
git reset --hard d0ea493    （这个d0ea493就是星期三的提交id）

5、现在只想将某些个文件回退到某个提交id（工作区还是位于星期五，但是某个文件回到星期一）
git checkout bf3dd0c -- gulpfile_base.js

----------------------------------------------------------------------------------------------

分支

在项目开发过程中，现在需要同时完成两个任务：
1、之前bugs修改
2、新功能的扩展
可以通过分支，同时完成上述工作！

分支是在创建时分支时当前代码的镜像，不同分支可以同时进行编码，相互之间不受干扰！

查看当前分支（当前分支会以绿色显示，前面有*号）
git branch  当初始化项目后，就默认会有一个主分支master

创建分支（注意：在哪个分支的基础上创建分支，一定要先激活/切换/检出那个基础分支，基础分支要显示为绿色*）
git branch fix_bugs
git branch new_feature

激活/切换/检出分支
git checkout fix_bugs
git checkout new_feature

注意：在做操作时，一定反复确认，自己是在哪个分支上进行！

当子分支结束开发后，项目经理需要合并分支到主分支!
1、先检出要合并到的主分支（在这里要检出主分支）
git checkout master
2、再合并要合并的子分支（在这里是fix_bugs或者new_feature）
git merge fix_bugs -m "merge fix_bugs"
git merge new_feature -m "merge new_feature"

技巧：
如果要导出项目打版本，接着继续开发，可以切出一个主分支，然后继续在主分支上开发！
git branch v1.0

分支的删除
git branch -d v1.0
git branch --delete v1.0

注意：在两种情况下，分支不能删除！！！
1、当前正在激活的分支（绿色*），当前分支不能删除
2、如果子分支有过提交，尚未和其它分支合并，该子分支也不能删除（合并过的子分支就可以删除了）
    可以通过git branch -D v1.0强制删除尚未合并的子分支

创建并切换分支
git checkout -b xxx = git branch xxx + git checkout xxx

----------------------------------------------------------------------------------------------

分支冲突

1、如果两个子分支修改了同一个文件的同一位置的代码，那么它们试图合并时，会报告冲突(conflict)！
2、如果在切出子分支后，主分支修改了和子分支同一个文件的同一位置的代码，那么它们试图合并时，会报告冲突(conflict)！

怎么解决冲突：
1、编辑冲突文件
将>>>>> HEAD ===== <<<<<< fix_bugs都删除后，编辑冲突的内容
2、再加暂存，再提交

技巧：在多人协作时，如果你已经完成了工作，尽早提交，因为第一个人是不报冲突的！

----------------------------------------------------------------------------------------------

远程仓库（所有代码在上传至远程仓库前，都必须在本地完成所有操作——暂存、提交、合并、冲突）

github
gitee 码云

不管使用哪一种远程仓库，所有操作命令都是一致的，唯一区别就是远程地址的不同！

1、首先要在远程创建一个仓库

2、在本地仓库注册远程仓库的地址
git remote add wbs19071 https://github.com/yufeng2/wbs19071

3、查看本地仓库关联的远程仓库
git remote -v
git remote --verbose

4、重命名远程仓库的注册引用名
git remote rename wbs19071 myproj

5、删除本地仓库中注册的远程仓库引用名
git remote rm test
git remote remove test

6、上传本地仓库分支到远程仓库
git push wbs19071 master

7、上传本地仓库分支到远程仓库并重命名远程分支
git push wbs19071 new_feature:new_feature_page

8、查看远程仓库的分支列表
git remote show wbs19071

9、下载远程仓库分支到本地
注意：在下载时，要确定自己当前本地分支正在激活哪一个，因为下载是和本地当前分支做合并！
git pull wbs19071 fix_bugs:fix_bugs2（这时给远程分支下载并重命名，这样就不用在意当前在哪一个分支，因为重命名就是另存为）

10、删除远程分支
git push wbs19071 -d new_feature_page

11、重命名远程分支
没有直接重命名远程分支的命令，如果你一定要重命名，只能先删除远程分支，然后再上传，上传时自己重命名！

----------------------------------------------------------------------------------------------

使用github的远程仓库，发布个人静态页面（只能展现html, css, js和images，不能执行php等动态服务器页面）

两种方式：
I、（对远程仓库名没有要求，但是远程分支名一定要为gh-pages）
1、将本地要上传的分支push到远程仓库并重命名为gh-pages
git push wbs19071 myweb:gh-pages

2、访问页面
https://yufeng2.github.io/wbs19071/switcher.htm

如果文件名为index.htm（默认主页），那么访问地址可以省略为：https://yufeng2.github.io/wbs19071

II、（远程仓库名一定要为yufeng2.github.io，远程分支名一定要为master）
1、注册远程仓库yufeng2.github.io（记得在本地仓库注册）
git remote add myweb https://github.com/yufeng2/yufeng2.github.io
2、将本地myweb分支上传到远程仓库的master
git push myweb myweb:master

3、访问页面
https://yufeng2.github.io/
