import os
import subprocess

def find_files(directory, extensions):
    """Find files in a directory that match the given extensions."""
    files = []
    for ext in extensions:
        files.extend([f for f in os.listdir(directory) if f.endswith(ext)])
    return files

def generate_thumbnail(model_url, output_path):
    script_path = os.path.join(os.path.dirname(__file__), 'generate-thumbnail.js')
    subprocess.run(['node', script_path, model_url, output_path], check=True)

def process_directory(directory):
    print(f"Processing directory: {directory}")
    
    model_exts = ['.glb']
    image_exts = ['.webp']

    models = find_files(directory, model_exts)
    images = find_files(directory, image_exts)

    for model in models:
        model_name = os.path.splitext(model)[0]
        poster_path = f"{model_name}.webp"
        
        if poster_path not in images:
            model_url = f"https://moose-on-road.github.io/products/{os.path.basename(directory)}/{model}"
            output_path = os.path.join(directory, poster_path)
            generate_thumbnail(model_url, output_path)

def main():
    root_dir = "C:/Users/muirh/Documents/GitHub/moose-on-road.github.io/products"  # Change this to your directory path
    print(f"Root directory: {root_dir}")
    for subdir, dirs, files in os.walk(root_dir):
        print(f"Found directory: {subdir}")
        if subdir != root_dir:  # Check if not the root directory
            process_directory(subdir)

if __name__ == "__main__":
    main()