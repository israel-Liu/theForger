---
title: git help
date: 2016-12-23 17:38:37
tags:
---
虽说git操作应该是理解后使用的，但是有时候脑袋就是不好使，还是写个笔记记录一下
#### Your identity
```
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```
#### Your editor
```
$ git config --global core.editor emacs
```
#### Checking your settings
```
$ git config --list
```
#### Getting a git repository
```
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
```
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
```
// 很多操作，这里先写一个
$ git log
```
#### Undoing Things
```
$ git commit --amend
// Unstaging a Staged File
$ git reset HEAD CONTRIBUTING.md
// Unmodifying a Modified File
$ git checkout -- CONTRIBUTING.md
```
#### Working with Remotes
```
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
```
// Listing Your Tags
$ git tag
// 还有一大推，这里先忽略
```
### git push
```
// 本地分支推送到远端分支
// 远端分支不存在的时候使用
$ git push --set-upstream origin <origin_name>
```
