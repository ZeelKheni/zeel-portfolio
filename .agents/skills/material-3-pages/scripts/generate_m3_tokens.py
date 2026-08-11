import argparse
import sys
import colorsys

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    if len(hex_str) == 3:
        hex_str = ''.join([c*2 for c in hex_str])
    return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(
        max(0, min(255, int(round(rgb[0])))),
        max(0, min(255, int(round(rgb[1])))),
        max(0, min(255, int(round(rgb[2]))))
    )

def clamp(val, min_v=0.0, max_v=1.0):
    return max(min_v, min(max_v, val))

def generate_palette(seed_hex, is_expressive=False):
    r, g, b = hex_to_rgb(seed_hex)
    h, l, s = colorsys.rgb_to_hls(r/255.0, g/255.0, b/255.0)

    if is_expressive:
        s = clamp(s * 1.35)

    p_main = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h, clamp(l), clamp(s))])
    p_container_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h, 0.90, clamp(s * 0.75))])
    on_p_container_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h, 0.15, clamp(s * 0.95))])
    p_container_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h, 0.25, clamp(s * 0.85))])
    on_p_container_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h, 0.92, clamp(s * 0.60))])

    h_sec = (h + 0.03) % 1.0
    sec_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_sec, 0.40, clamp(s * 0.45))])
    sec_container_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_sec, 0.88, clamp(s * 0.4))])
    on_sec_container_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_sec, 0.14, clamp(s * 0.5))])
    sec_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_sec, 0.80, clamp(s * 0.45))])
    sec_container_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_sec, 0.26, clamp(s * 0.4))])
    on_sec_container_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_sec, 0.90, clamp(s * 0.4))])

    h_tert = (h + (0.22 if is_expressive else 0.16)) % 1.0
    s_tert = clamp(s * (1.1 if is_expressive else 0.6))
    tert_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_tert, 0.42, s_tert)])
    tert_container_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_tert, 0.90, clamp(s_tert * 0.5))])
    on_tert_container_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_tert, 0.15, clamp(s_tert * 0.8))])
    tert_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_tert, 0.80, s_tert)])
    tert_container_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_tert, 0.28, clamp(s_tert * 0.6))])
    on_tert_container_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_tert, 0.92, clamp(s_tert * 0.5))])

    h_neut = h
    s_neut = clamp(s * 0.08)

    surf_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.99, s_neut)])
    surf_lowest_light = "#ffffff"
    surf_low_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.96, s_neut)])
    surf_container_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.94, s_neut)])
    surf_high_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.92, s_neut)])
    surf_highest_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.90, s_neut)])
    on_surf_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.10, s_neut)])
    on_surf_variant_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.30, s_neut * 1.5)])
    outline_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.50, s_neut * 1.5)])
    outline_var_light = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.80, s_neut * 1.5)])

    surf_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.08, s_neut)])
    surf_lowest_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.04, s_neut)])
    surf_low_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.10, s_neut)])
    surf_container_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.12, s_neut)])
    surf_high_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.16, s_neut)])
    surf_highest_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.20, s_neut)])
    on_surf_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.90, s_neut)])
    on_surf_variant_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.80, s_neut * 1.5)])
    outline_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.60, s_neut * 1.5)])
    outline_var_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_neut, 0.30, s_neut * 1.5)])

    p_dark = rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h, 0.80, clamp(s * 0.9))])

    return {
        "light": {
            "--md-sys-color-primary": p_main if l < 0.6 else rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h, 0.4, s)]),
            "--md-sys-color-on-primary": "#ffffff",
            "--md-sys-color-primary-container": p_container_light,
            "--md-sys-color-on-primary-container": on_p_container_light,
            "--md-sys-color-secondary": sec_light,
            "--md-sys-color-on-secondary": "#ffffff",
            "--md-sys-color-secondary-container": sec_container_light,
            "--md-sys-color-on-secondary-container": on_sec_container_light,
            "--md-sys-color-tertiary": tert_light,
            "--md-sys-color-on-tertiary": "#ffffff",
            "--md-sys-color-tertiary-container": tert_container_light,
            "--md-sys-color-on-tertiary-container": on_tert_container_light,
            "--md-sys-color-error": "#ba1a1a",
            "--md-sys-color-on-error": "#ffffff",
            "--md-sys-color-error-container": "#ffdad6",
            "--md-sys-color-on-error-container": "#410002",
            "--md-sys-color-background": surf_light,
            "--md-sys-color-on-background": on_surf_light,
            "--md-sys-color-surface": surf_light,
            "--md-sys-color-on-surface": on_surf_light,
            "--md-sys-color-surface-variant": surf_high_light,
            "--md-sys-color-on-surface-variant": on_surf_variant_light,
            "--md-sys-color-outline": outline_light,
            "--md-sys-color-outline-variant": outline_var_light,
            "--md-sys-color-shadow": "#000000",
            "--md-sys-color-scrim": "#000000",
            "--md-sys-color-inverse-surface": on_surf_light,
            "--md-sys-color-inverse-on-surface": surf_light,
            "--md-sys-color-inverse-primary": p_dark,
            "--md-sys-color-surface-container-lowest": surf_lowest_light,
            "--md-sys-color-surface-container-low": surf_low_light,
            "--md-sys-color-surface-container": surf_container_light,
            "--md-sys-color-surface-container-high": surf_high_light,
            "--md-sys-color-surface-container-highest": surf_highest_light,
        },
        "dark": {
            "--md-sys-color-primary": p_dark,
            "--md-sys-color-on-primary": rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h, 0.15, s)]),
            "--md-sys-color-primary-container": p_container_dark,
            "--md-sys-color-on-primary-container": on_p_container_dark,
            "--md-sys-color-secondary": sec_dark,
            "--md-sys-color-on-secondary": rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_sec, 0.15, clamp(s*0.4))]),
            "--md-sys-color-secondary-container": sec_container_dark,
            "--md-sys-color-on-secondary-container": on_sec_container_dark,
            "--md-sys-color-tertiary": tert_dark,
            "--md-sys-color-on-tertiary": rgb_to_hex([c*255 for c in colorsys.hls_to_rgb(h_tert, 0.15, clamp(s*0.6))]),
            "--md-sys-color-tertiary-container": tert_container_dark,
            "--md-sys-color-on-tertiary-container": on_tert_container_dark,
            "--md-sys-color-error": "#ffb4ab",
            "--md-sys-color-on-error": "#690005",
            "--md-sys-color-error-container": "#93000a",
            "--md-sys-color-on-error-container": "#ffdad6",
            "--md-sys-color-background": surf_dark,
            "--md-sys-color-on-background": on_surf_dark,
            "--md-sys-color-surface": surf_dark,
            "--md-sys-color-on-surface": on_surf_dark,
            "--md-sys-color-surface-variant": surf_high_dark,
            "--md-sys-color-on-surface-variant": on_surf_variant_dark,
            "--md-sys-color-outline": outline_dark,
            "--md-sys-color-outline-variant": outline_var_dark,
            "--md-sys-color-shadow": "#000000",
            "--md-sys-color-scrim": "#000000",
            "--md-sys-color-inverse-surface": on_surf_dark,
            "--md-sys-color-inverse-on-surface": surf_dark,
            "--md-sys-color-inverse-primary": p_main,
            "--md-sys-color-surface-container-lowest": surf_lowest_dark,
            "--md-sys-color-surface-container-low": surf_low_dark,
            "--md-sys-color-surface-container": surf_container_dark,
            "--md-sys-color-surface-container-high": surf_high_dark,
            "--md-sys-color-surface-container-highest": surf_highest_dark,
        }
    }

def main():
    parser = argparse.ArgumentParser(description="Generate Material Design 3 (Baseline & Expressive) CSS custom properties.")
    parser.add_argument("--seed", type=str, default="#6750A4", help="Seed hex color (e.g. #6750A4)")
    parser.add_argument("--expressive", action="store_true", help="Enable Material 3 Expressive high-chroma palette & emphasized styles")
    parser.add_argument("--format", type=str, choices=["css", "json"], default="css", help="Output format")
    args = parser.parse_args()

    palette = generate_palette(args.seed, is_expressive=args.expressive)

    if args.format == "css":
        mode_label = "Material Design 3 Expressive" if args.expressive else "Material Design 3 Baseline"
        print(f"/* {mode_label} Tokens - Light Mode */")
        print(":root {")
        for k, v in palette["light"].items():
            print(f"  {k}: {v};")

        print("\n  /* Standard Typography Scale */")
        print("  --md-sys-typescale-display-large: 400 57px/64px 'Google Sans', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-display-medium: 400 45px/52px 'Google Sans', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-display-small: 400 36px/44px 'Google Sans', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-headline-large: 400 32px/40px 'Google Sans', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-headline-medium: 400 28px/36px 'Google Sans', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-headline-small: 400 24px/32px 'Google Sans', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-title-large: 400 22px/28px 'Google Sans', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-title-medium: 500 16px/24px 'Google Sans', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-title-small: 500 14px/20px 'Google Sans', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-body-large: 400 16px/24px 'Google Sans Text', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-body-medium: 400 14px/20px 'Google Sans Text', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-body-small: 400 12px/16px 'Google Sans Text', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-label-large: 500 14px/20px 'Google Sans Text', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-label-medium: 500 12px/16px 'Google Sans Text', 'Roboto', sans-serif;")
        print("  --md-sys-typescale-label-small: 500 11px/16px 'Google Sans Text', 'Roboto', sans-serif;")

        print("\n  /* M3 Expressive Emphasized Typography Scale */")
        print("  --md-sys-typescale-display-large-emphasized: 700 57px/64px 'Google Sans', sans-serif;")
        print("  --md-sys-typescale-headline-large-emphasized: 700 32px/40px 'Google Sans', sans-serif;")
        print("  --md-sys-typescale-title-large-emphasized: 700 22px/28px 'Google Sans', sans-serif;")
        print("  --md-sys-typescale-label-large-emphasized: 700 14px/20px 'Google Sans Text', sans-serif;")

        print("\n  /* Shapes */")
        print("  --md-sys-shape-corner-none: 0px;")
        print("  --md-sys-shape-corner-extra-small: 4px;")
        print("  --md-sys-shape-corner-small: 8px;")
        print("  --md-sys-shape-corner-medium: 12px;")
        print("  --md-sys-shape-corner-large: 16px;")
        print("  --md-sys-shape-corner-extra-large: 28px;")
        print("  --md-sys-shape-corner-full: 9999px;")
        print("  --md-sys-shape-corner-asymmetric-expressive: 28px 8px 28px 28px;")

        print("\n  /* Motion Curves */")
        print("  --md-sys-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);")
        print("  --md-sys-motion-easing-expressive-emphasized: cubic-bezier(0.05, 0.7, 0.1, 1);")
        print("  --md-sys-motion-duration-short: 200ms;")
        print("  --md-sys-motion-duration-medium: 400ms;")
        print("  --md-sys-motion-duration-long: 600ms;")

        print("\n  /* Elevation Box Shadows */")
        print("  --md-sys-elevation-0: none;")
        print("  --md-sys-elevation-1: 0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);")
        print("  --md-sys-elevation-2: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);")
        print("  --md-sys-elevation-3: 0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);")
        print("  --md-sys-elevation-4: 0px 2px 3px 0px rgba(0, 0, 0, 0.30), 0px 6px 10px 4px rgba(0, 0, 0, 0.15);")
        print("  --md-sys-elevation-5: 0px 4px 4px 0px rgba(0, 0, 0, 0.30), 0px 8px 12px 6px rgba(0, 0, 0, 0.15);")
        print("}")
        print(f"\n/* {mode_label} Tokens - Dark Mode */")
        print("[data-theme='dark'], body.dark-mode {")
        for k, v in palette["dark"].items():
            print(f"  {k}: {v};")
        print("}")
    else:
        import json
        print(json.dumps(palette, indent=2))

if __name__ == "__main__":
    main()
