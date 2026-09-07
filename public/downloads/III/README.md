# Automate one boring task with Python

Created by **Code to the Bone (jrpbone)**

This small organizer uses Python's `pathlib` and `shutil` to sort files into
subfolders. It previews its plan first and only moves files with `--apply`.

## Requirements

- Python 3.10 or newer.
- No third-party packages or installation commands are needed.

## Try it on copies first

1. Extract the downloaded ZIP.
2. Create a test folder and copy a few PDFs, images, spreadsheets, and ZIPs into it.
3. Open a terminal in the extracted folder containing `organize_files.py`.
4. Preview the moves (replace the example path with your test folder):

   ```powershell
   py organize_files.py "C:\Users\YourName\Desktop\Organizer Test"
   ```
5. Check the `PLAN` lines, then run with `--apply` when ready:

   ```powershell
   py organize_files.py "C:\Users\YourName\Desktop\Organizer Test" --apply
   ```

On Windows, use `python` instead of `py` if that is your Python command.
On macOS or Linux, use:

```sh
python3 organize_files.py "$HOME/Organizer Test"
python3 organize_files.py "$HOME/Organizer Test" --apply
```

## Sorting rules

| File extension                | Destination inside your chosen folder |
| ----------------------------- | ------------------------------------- |
| `.pdf`                      | `Documents/`                        |
| `.jpg`, `.jpeg`, `.png` | `Images/`                           |
| `.csv`, `.xlsx`           | `Spreadsheets/`                     |
| `.zip`                      | `Archives/`                         |

Extensions are case-insensitive, so `.PNG` works too. Edit `RULES` near the top
of the script to add extensions or change folder names.

## What to expect

- Preview mode does not create folders or move files.
- Only files directly inside the chosen folder are considered; subfolders are
  not scanned. Unsupported file types remain where they are.
- Existing destination filenames are skipped, including when you run it again.
- Symbolic links are skipped. Destination folders that are links or files are
  also skipped.
- An unreadable folder or failed move produces an error and a nonzero exit code.
- Run one instance at a time, on a folder you control. Close other programs that
  are using those files before applying moves.
- There is no automatic undo. To undo a move, move the file back from its
  category subfolder. Keep original copies when experimenting.

Use `py organize_files.py --help` for the command options.

## Credit

**Code to the Bone (jrpbone)** — https://github.com/jrpbone
