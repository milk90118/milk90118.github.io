#!/bin/bash

DATE=$(date +"%Y-%m-%d")
TIME=$(date +"%Y-%m-%dT%H:%M:%S%z")
FILENAME="_posts/${DATE}-auto-post.md"

cat <<EOF > $FILENAME
---
title: "每日自動筆記 📝"
date: ${TIME}
categories:
  - 日記
tags:
  - 自動產生
layout: single
author_profile: true
read_time: true
---

💡 **這是由 GitHub Actions 自動建立的每日筆記文章**

🌸 你可以開始在這裡記錄今日的學習與反思。
EOF
