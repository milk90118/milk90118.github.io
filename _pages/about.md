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
    <h3>🌟 </h3>
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

### 💻 
- **C++** 
- **Python** 

### 🏥 

- **Deep Learning** 


## 🤝 

歡迎透過 [Email](mailto:{{ site.email }}) 或 [GitHub](https://github.com/{{ site.github_username }}) 與我聯絡！

---

** ✨
