#!/usr/bin/env python3
"""selfhost-fonts.py <source-build-dir> <variant-dir> <public-dir> <public-url> <prefix>

Takes every @font-face rule next/font put in the source app's production build (.next/static/**/*.css), copies the
font files it references into <public-dir>, and writes <variant-dir>/source/app/fonts.css with the same rules under
"<prefix> <Family>" names, plus one class per next/font variable class that sets the same CSS variable to the
prefixed names. Prints the mapping from each next/font variable to its class, for the layouts.

Why: the gallery loads every entry's fonts into one page, and next/font registers faces under the font's plain
name, so other entries' faces with the same name (other files, other axes) can stand in for this entry's.
"""
import os, re, shutil, sys, glob, json

build, variant, public_dir, public_url, prefix = sys.argv[1:6]
os.makedirs(public_dir, exist_ok=True)
faces, classes, seen = [], {}, set()
for css_path in sorted(glob.glob(os.path.join(build, ".next/static/**/*.css"), recursive=True)):
    css = open(css_path).read()
    for rule in re.findall(r"@font-face\{[^}]*\}", css):
        def media(m):
            name = os.path.basename(m.group(1))
            shutil.copyfile(os.path.join(build, ".next/static/media", name), os.path.join(public_dir, name))
            return f"url({public_url}/{name})"
        rule = re.sub(r"url\((?:/_next/static|\.\.)/media/([^)]+)\)", media, rule)
        rule = re.sub(r"font-family:([^;}]+)", lambda m: "font-family:" + f'"{prefix} {m.group(1).strip().strip(chr(34))}"', rule)
        if rule not in seen:
            seen.add(rule)
            faces.append(rule)
    for cls, body in re.findall(r"\.([a-zA-Z0-9_]+-module__[A-Za-z0-9_]+__variable)\{([^}]*)\}", css):
        var, value = body.split(":", 1)
        fams = [f.strip().strip('"') for f in value.split(",")]
        classes[cls] = (var.strip(), ", ".join(f'"{prefix} {f}"' for f in fams))

out = [f"/* Gallery adaptation: the {len(faces)} @font-face rules next/font served in the source's production build, with the",
       f"   font files under {public_url} and family names prefixed \"{prefix}\", so other entries' faces with the same",
       "   names can't stand in for them. The classes set the same CSS variables the source's next/font classes set. */"]
out += faces
mapping = {}
for cls, (var, value) in sorted(classes.items()):
    short = "gf-" + cls.split("-module__")[0].rsplit("_", 1)[0].replace("_", "-") + "-" + var.strip("-").replace("font-", "")
    mapping[cls] = {"class": short, "var": var}
    out.append(f".{short}{{{var}:{value}}}")
open(os.path.join(variant, "source/app/fonts.css"), "w").write("\n".join(out) + "\n")
print(json.dumps(mapping, indent=1))
print(len(faces), "faces,", len(os.listdir(public_dir)), "files", file=sys.stderr)
