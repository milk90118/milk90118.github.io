---
layout: single
title: "關於 M醬"
permalink: /about/
author_profile: false
classes: wide
toc: false
show_introduction: true
---

<div class="introduction">
  <img src="{{ site.author.avatar }}" alt="M醬的頭像" class="profile-image">
  <h2 class="intro-title">{{ site.author.introduction.title }}</h2>
  
  <div class="intro-text">
    <p>{{ site.author.introduction.description }}</p>
  </div>
  
  {% if site.author.introduction.skills %}
  <div class="skills">
    {% for skill in site.author.introduction.skills %}
      <span class="skill-tag">{{ skill }}</span>
    {% endfor %}
  </div>
  {% endif %}
  
  {% if site.author.introduction.quote %}
  <blockquote class="quote">
    {{ site.author.introduction.quote }}
  </blockquote>
  {% endif %}
  
  {% if site.author.introduction.interests %}
  <div class="interests-section">
    <h3>🌟 我的興趣領域</h3>
    <div class="interests-grid">
      {% for interest in site.author.introduction.interests %}
        <div class="interest-item">{{ interest }}</div>
      {% endfor %}
    </div>
  </div>
  {% endif %}
  
  {% if site.author.links %}
  <div class="social-links">
    {% for link in site.author.links %}
      <a href="{{ link.url }}" class="social-link" title="{{ link.label }}">
        {% if link.label contains "Email" %}📧
        {% elsif link.label contains "GitHub" %}🐙
        {% elsif link.label contains "Portfolio" %}💼
        {% elsif link.label contains "Blog" %}📝
        {% elsif link.label contains "Twitter" %}🐦
        {% elsif link.label contains "Instagram" %}📷
        {% else %}🔗
        {% endif %}
      </a>
    {% endfor %}
  </div>
  {% endif %}
</div>

## 🎯 我的學習旅程

作為一名醫學生，我對**醫療科技**和**人工智慧**的結合特別有興趣。我相信技術可以讓醫療變得更加精準和人性化。

### 💻 技術背景

我專精於前端開發，特別是：
- **React** 和現代 JavaScript 框架
- **Python** 用於數據分析和機器學習
- **UI/UX 設計**，注重使用者體驗

### 🏥 醫學 × 科技

目前我正在探索：
- 醫學影像 AI 診斷
- 電子病歷系統優化
- 遠距醫療平台開發

## 📝 為什麼寫部落格？

這個部落格是我的**數位筆記本**，記錄著：

- 🧠 **學習心得** - 將複雜的概念簡化分享
- 💡 **技術探索** - 實驗新工具和方法的過程
- 🌱 **成長軌跡** - 從錯誤中學習的寶貴經驗
- 🎨 **創作展示** - 有趣的專案和設計作品

## 🤝 讓我們連結！

我很樂意與志同道合的朋友交流，無論你是：
- 👨‍💻 **開發者** - 一起討論技術和最佳實踐
- 👨‍⚕️ **醫學生** - 分享學習經驗和職涯規劃
- 🎨 **設計師** - 探討使用者體驗和視覺設計
- 🌟 **學習者** - 互相激勵，共同成長

歡迎透過 [Email](mailto:{{ site.email }}) 或 [GitHub](https://github.com/{{ site.github_username }}) 與我聯絡！

---

*「學習是一場永無止境的冒險，而分享讓這場冒險變得更加精彩。」* ✨