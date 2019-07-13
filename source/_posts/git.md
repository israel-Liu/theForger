---
title: git help
date: 2016-12-23 17:38:37
tags:
---
虽说git操作应该是理解后使用的，但是有时候脑袋就是不好使，还是写个笔记记录一下
#### Your identity
```CPP
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```
#### Your editor
```CPP
$ git config --global core.editor emacs
```
#### Checking your settings
```CPP
$ git config --list
```
#### Getting a git repository
```CPP
// Initializing a Repository in an Existing Directory
$ git init
// Cloning an Existing Repository
$ git clone https://github.com/user_name/repository.git
$ git clone https://github.com/user_name/repository.git local_folder_name
```
#### The Three States
![](https://github.com/israel-Liu/theForger/raw/master/images/git_three _states.png)
#### Recording Changes to the Repository
![](https://github.com/israel-Liu/theForger/raw/master/images/record_change _repository.png)
```CPP
// Checking the Status of Your Files
$ git status
// Tracking New Files // 每次修改都重新add添加更改
$ git add README
// Ignoring Files
$ cat .gitignore
// Viewing Your Staged and Unstaged Changes
$ git diff
$ git diff --staged
$ git diff --cached
// Committing Your Changes
$ git commit
$ git commit -m "Story 182: Fix benchmarks for speed"
// Skipping the Staging Area
$ git commit -a -m 'added new benchmarks'
// Removing Files
$ rm PROJECTS.md
$ git rm PROJECTS.md
$ git rm --cached README
// Moving Files
$ git mv file_from file_to
```
#### Viewing the Commit History
```CPP
// 很多操作，这里先写一个
$ git log
```
#### Undoing Things
```CPP
$ git commit --amend
// Unstaging a Staged File
$ git reset HEAD CONTRIBUTING.md
// Unmodifying a Modified File
$ git checkout -- CONTRIBUTING.md
// Revert merged
$ git merge --abort
// Revert any operation
$ git reflog
// 3 is HEAD number
$ git reset --hard HEAD~3
```
#### Working with Remotes
```CPP
// Showing Your Remotes
$ git remote -v
// Fetching and Pulling from Your Remotes
$ git fetch [remote-name]
// Pushing to Your Remotes
$ git push origin master
// Inspecting a Remote
$ git remote show origin
// Removing and Renaming Remotes
$ git remote rm paul
$ git remote rename pb paul
```
#### Tagging
```CPP
// Listing Your Tags
$ git tag
// 还有一大推，这里先忽略
```
#### A branch and its commit history
![](https://github.com/israel-Liu/theForger/raw/master/images/git_branching.png)
#### Branches in a Nutshell
```CPP
// Creating a New Branch
$ git branch testing    // 创建一个新指针，指向当前提交点（HEAD指针记录当前branch）
// 查看当前HEAD
$ git log --oneline --decorate
// Switching Branches  // 切换分支会改变工作目录文件
$ git checkout testing // 移动HEAD指针指向testing分支
// 获取全部log，可以看到指针指向
$ git log --oneline --decorate --graph --all
```
#### Basic Branching and Merging
![Hotfix branch based on master](https://github.com/israel-Liu/theForger/raw/master/images/merge_branch.png)
```CPP
// Basic Branching
// 合并新分支的提交（上图hotfix）在原分支（上图master）上执行merge
$ git checkout master     // 切换分支（HEAD指向master工作目录改变）
$ git merge hotfix        // 合并新提交
$ git branch -d hotfix    // Deleted branch hotfix (3a0874c).
```
![Work continues on iss53](https://github.com/israel-Liu/theForger/raw/master/images/merge_two.png)
```CPP
// Basic Merging
// 合并两个没有前后关系的分支(上图master和iss53都是在一个点继续提交的)
$ git checkout master    // Switched to branch 'master'
$ git merge iss53        // Merge made by the 'recursive' strategy.
// 这种情况会产生一个新的提交(master会指向这个提交，提交由前面C3，4，5合并生产)

// Basic Merge Conflicts // 上面情况可能会产生冲突，下面介绍解决冲突
// 解决冲突前，git没法产生新的提交点
$ git mergetool          // 这里不继续介绍了，建议用图形工具
// use "git commit" to conclude merge
```
#### Branch Management
```CPP
$ git branch             // 查看当前所有分支(主要自己本地(remote)建的)
$ git branch -v          // -v带最后一次提交信息
// To see which branches are already merged into the branch you’re on
$ git branch --merged    //(--no-merged)
```
#### Branching Workflows
```CPP
// Long-Running Branches
// Topic Branches
```
#### Remote Branches
![Server and local repositories after cloning](https://github.com/israel-Liu/theForger/raw/master/images/remote_branch.png)
```CPP
// 同步origin所在服务器，我还没有的数据
$ git fetch                 // git fetch origin
// 创建远端服务器新分支，和别人共享使用
$ git push origin serverfix // git push <remote> <branch>
// 合并远端别人的提交
$ git merge origin/serverfix
// 使用别人分享的远端分子
$ git checkout -b serverfix origin/serverfix
```
#### Tracking Branches
```CPP
// the branch it tracks is called an “upstream branch”
$ git checkout --track origin/serverfix
```
#### Pulling
```CPP
// Deleting Remote Branches
$ git push origin --delete serverfix
// 本地分支推送到远端分支
// 远端分支不存在的时候使用
// the branch it tracks is called an “upstream branch”
$ git push --set-upstream origin <origin_name>
```
#### Rebasing
![](https://github.com/israel-Liu/theForger/raw/master/images/rebase.png)
```CPP
// The Basic Rebase
$ git checkout experiment   // 移动C4到C3的后面
$ git rebase master         // 把experiment合并到master的线，不产生新节点
// 把master向前移动获取experiment上的提交
$ git checkout master
$ git merge experiment
```
#### More Interesting Rebases
```CPP
// 比较复杂这里先不说了
```
#### Set Use SSH
```CPP
// Command line instructions
Git global setup
git config --global user.name "Israel.liu"
git config --global user.email "israel.liu.theForger@gmail.com"
// Create a new repository
git clone https://Israel.liu@github.com/Israel.liu/tools.git
cd tools
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
// Existing folder
cd existing_folder
git init
git remote add origin https://Israel.liu@github.com/Israel.liu/tools.git
git add .
git commit -m "Initial commit"
git push -u origin master
// Existing Git repository
cd existing_repo
git remote add origin https://Israel.liu@github.com/Israel.liu/tools.git
git push -u origin --all
git push -u origin --tags
```
```CPP
// ssh
[Generating Your SSH Public Key](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key)
1.使用命令 ssh-keygen -o 这个命令会在 .ssh 下面生成两个id_rsa文件，有后缀 .pub 的是贴到网站上面的。没有的是 private key. 这个时候命令行已经可以了 .
2.一些gui工具比如小乌龟需要 .ppk 类型的 private key。window上需要可以使用putty生成。https://www.putty.org/。
3.load那个 private key 然后 save private key 到另外一种格式 .ppk 给小乌龟用就行了 


// Set use ssh branch
git remote set-url origin git@git.github.com:main/client.git

```

	branch-n-g 上更改了 InstanceMgr 里面的代码
	branch-n 上也更改了 InstanceMgr 里面代码。

	使用 git merge origin/branch-n 为啥没用更改下来 branch-n 上面的代码？
	难道是因为我本地没有先执行 git merge origin/branch-n-g 把 branch-n-g 上面的代码更新下来？我记得我更新了啊
	那为啥 执行 git merge origin/branch-n 就可以更新下来代码，是因为 merge 时候自动选取的节点不对吗？
