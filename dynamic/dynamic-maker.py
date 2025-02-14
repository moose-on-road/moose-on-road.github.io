import os

# Change the current working directory to the directory of the script
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# Define the template with placeholders for the paths
html_template = """
<body>
<model-viewer src="https://moose-on-road.github.io/products/{model_path}" camera-controls poster="https://moose-on-road.github.io/products/{poster_path}" shadow-intensity="1" environment-image="https://moose-on-road.github.io/dynamic/studio.hdr" exposure="2"
style="width: 640px; height: 480px; border:2px solid #eeeeee;">
      <div class="progress-bar hide" slot="progress-bar">
          <div class="update-bar"></div>
     </div>
    </model-viewer> 
</body> 
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
<!--
<embed src="https://moose-on-road.github.io/products/{model_path}-dynamic.html" width="700px" height="500px"></embed>
-->
"""

def find_files(directory, extensions):
    """Find files in a directory that match the given extensions."""
    files = []
    for ext in extensions:
        files.extend([f for f in os.listdir(directory) if f.endswith(ext)])
    return files

def update_html(directory):
    """Update or create the HTML file in the given directory."""
    
    print(f"Processing directory: {directory}")  # This line prints the current directory being processed
    
    # Define the file types you're looking for
    model_exts = ['.glb']
    image_exts = ['.webp']

    # Find files that match the extensions
    models = find_files(directory, model_exts)
    images = find_files(directory, image_exts)

    # Simple logic to pick a model, poster, and environment image
    model_path = models[0] if models else "default_model.glb"
    poster_path = next((img for img in images if img.endswith('.webp')))
    """env_image_path = next((img for img in images if img.endswith('.hdr')), "default_env.hdr")"""
    
    # Fill the template
    html_content = html_template.format(model_path=(os.path.basename(directory) + "/" + model_path), poster_path=(os.path.basename(directory) + "/" + poster_path))

    html_file_path = os.path.join(directory, os.path.basename(directory) + "-dynamic.html")
    if os.path.exists(html_file_path):
        with open(html_file_path, "r") as html_file:
            existing_content = html_file.read()

        # Check if the file should be skipped
        if "skip-update" in existing_content:
            print(f"Skipping update for {html_file_path} due to 'skip-update' marker.")
            return  # Skip the rest of the function

        # Check for existing "new content section" and remove it
        start_marker = "<!-- Updated generic code Start"
        end_marker = "Updated generic code End -->"
        start_pos = existing_content.find(start_marker)
        end_pos = existing_content.find(end_marker)
        
        if start_pos != -1 and end_pos != -1:
            # Remove the existing section including the end marker
            existing_content = existing_content[:start_pos] + existing_content[end_pos + len(end_marker):]
        
        if "custom-attribute" in existing_content:
            print(f"Custom attribute detected in {html_file_path}. Injecting new model-viewer element.")
            # Find the position to insert the new model-viewer element
            insert_pos = existing_content.find('<body>')
            if insert_pos != -1:
                # Insert the new model-viewer element before <body> tag
                new_content = existing_content[:insert_pos] + "<!-- Updated generic code Start\n" + html_content + "\n Updated generic code End -->\n" + existing_content[insert_pos:]
                with open(html_file_path, "w") as html_file:
                    html_file.write(new_content)
            return
    
    # If the file does not exist or does not contain the custom attribute, write the new content
    with open(html_file_path, "w") as html_file:
        html_file.write(html_content)
        
def main():
    root_dir = "../products"  # Change this to your directory path
    for subdir, dirs, files in os.walk(root_dir):
        if subdir != root_dir:  # Check if not the root directory
            update_html(subdir)

if __name__ == "__main__":
    main()