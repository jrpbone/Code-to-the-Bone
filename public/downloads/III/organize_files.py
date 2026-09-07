"""A small file organizer by Code to the Bone (jrpbone).

Preview by default; pass --apply to move files. Python 3.10+, no packages needed.
"""

import argparse
from pathlib import Path
import shutil


# Customize these rules to suit your folder.
RULES = {
    ".pdf": "Documents",
    ".jpg": "Images",
    ".jpeg": "Images",
    ".png": "Images",
    ".csv": "Spreadsheets",
    ".xlsx": "Spreadsheets",
    ".zip": "Archives",
}


def organize(folder: Path, apply: bool = False) -> int:
    """Organize top-level files only. Return the number of filesystem errors."""
    errors = 0
    count = 0
    for source in sorted(folder.iterdir(), key=lambda path: path.name.lower()):
        if source.is_symlink() or not source.is_file():
            continue
        category = RULES.get(source.suffix.lower())
        if category is None:
            continue

        destination_folder = folder / category
        destination = destination_folder / source.name
        if destination_folder.is_symlink() or (
            destination_folder.exists() and not destination_folder.is_dir()
        ):
            print(f"SKIP: {source.name} (destination folder is a link or a file)")
            continue
        if destination.exists() or destination.is_symlink():
            print(f"SKIP: {source.name} (destination already exists)")
            continue

        if not apply:
            print(f"PLAN: {source.name} -> {category}/{source.name}")
            count += 1
            continue

        try:
            destination_folder.mkdir(exist_ok=True)
            # Reserve the filename exclusively so existing files aren't overwritten.
            with destination.open("xb"):
                pass
            try:
                shutil.move(str(source), str(destination))
            except OSError:
                destination.unlink(missing_ok=True)
                raise
            print(f"MOVED: {source.name} -> {category}/{source.name}")
            count += 1
        except FileExistsError:
            print(f"SKIP: {source.name} (destination already exists)")
        except OSError as error:
            print(f"ERROR: {source.name}: {error}")
            errors += 1

    action = "Moved" if apply else "Would move"
    print(f"\n{action} {count} file(s). Errors: {errors}.")
    if not apply:
        print("Preview only. Run again with --apply to move these files.")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Sort files by extension. By Code to the Bone (jrpbone)."
    )
    parser.add_argument("folder", type=Path, help="Folder to organize (quote paths with spaces)")
    parser.add_argument("--apply", action="store_true", help="Move files; default is preview only")
    args = parser.parse_args()
    folder = args.folder.expanduser().resolve()
    if not folder.is_dir():
        parser.error(f"Not a folder: {folder}")
    try:
        return 1 if organize(folder, args.apply) else 0
    except OSError as error:
        print(f"ERROR: Cannot read folder: {error}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
