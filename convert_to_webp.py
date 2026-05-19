from PIL import Image
from pathlib import Path

INPUT_FOLDER = Path("projects")
MAX_WIDTH = 1600
QUALITY = 85

supported = {".jpg", ".jpeg", ".png"}

converted = 0
skipped = 0

for input_path in INPUT_FOLDER.rglob("*"):
    if not input_path.is_file():
        continue

    if input_path.suffix.lower() not in supported:
        skipped += 1
        continue

    output_path = input_path.with_suffix(".webp")

    try:
        img = Image.open(input_path).convert("RGB")

        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            new_height = int(img.height * ratio)
            img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)

        img.save(output_path, "WEBP", quality=QUALITY, method=6)
        print(f"OK: {input_path} → {output_path.name}")
        converted += 1

    except Exception as e:
        print(f"ОШИБКА: {input_path} — {e}")

print(f"\nГотово: {converted} файлов сконвертировано, {skipped} пропущено.")