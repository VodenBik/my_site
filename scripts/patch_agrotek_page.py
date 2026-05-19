from pathlib import Path
import re

p = Path('agrotek.html')
text = p.read_text(encoding='utf-8')

text = text.replace('class="nav-logo">СТА<span>.</span></a>', 'class="nav-logo">СТАНИСЛАВ<span>.</span></a>')
text = text.replace('src="projects/agrotek-cover.webp"', 'src="projects/covers/agrotek-cover.webp"')

pattern = re.compile(
    r'<div class="images-grid-3" style="margin-top:16px">\s*'
    r'<img class="img-ph case-img" src="projects/agrotek/7\.webp"[^>]*>\s*'
    r'<img class="img-ph case-img" src="projects/agrotek/13\.webp"[^>]*>\s*'
    r'<img class="img-ph case-img" src="projects/agrotek/15\.webp"[^>]*>\s*'
    r'</div>',
    re.S,
)
replacement = '''<div class="images-grid" style="margin-top:16px">
      <img class="img-ph wide case-img" src="projects/agrotek/7.webp" alt="Агротек — цель, сила, путь">
      <img class="img-ph wide case-img" src="projects/agrotek/15.webp" alt="Агротек — финальный слайд">
    </div>'''
text, count = pattern.subn(replacement, text, count=1)

if count != 1:
    raise SystemExit('Agrotek 3-image grid block not found')

p.write_text(text, encoding='utf-8')
print('agrotek.html patched')
