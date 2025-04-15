// Create design button and add it to the page
const designButton = document.createElement('a');
designButton.textContent = 'Design';
designButton.classList.add('btnSubmit');
designButton.classList.add('sizeL');

const targetElement = document.querySelector('.action_button');
if (targetElement) {
  targetElement.append(designButton);
}

// Add click event to the design button
designButton.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Create dialog overlay
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  
  // Create dialog container
  const dialog = document.createElement('div');
  dialog.style.backgroundColor = 'white';
  dialog.style.borderRadius = '8px';
  dialog.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  dialog.style.width = '90%';
  dialog.style.height = '90%';
  dialog.style.maxWidth = '1200px';
  dialog.style.display = 'flex';
  dialog.style.flexDirection = 'column';
  
  // Create header with close button
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.style.padding = '16px';
  header.style.borderBottom = '1px solid #e5e5e5';
  
  const title = document.createElement('h2');
  title.textContent = 'Image Editor';
  title.style.fontSize = '20px';
  title.style.fontWeight = 'bold';
  
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;';
  closeButton.style.fontSize = '24px';
  closeButton.style.fontWeight = 'bold';
  closeButton.style.border = 'none';
  closeButton.style.background = 'none';
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', function() {
    document.body.removeChild(overlay);
  });
  
  header.appendChild(title);
  header.appendChild(closeButton);
  
  // Create content area with image editor container
  const content = document.createElement('div');
  content.style.flexGrow = '1';
  content.style.padding = '16px';
  content.style.overflow = 'auto';
  
  const editorContainer = document.createElement('div');
  editorContainer.id = 'image-editor-container';
  editorContainer.style.width = '100%';
  editorContainer.style.height = '100%';
  
  content.appendChild(editorContainer);
  
  // Assemble dialog
  dialog.appendChild(header);
  dialog.appendChild(content);
  overlay.appendChild(dialog);
  
  // Add to body
  document.body.appendChild(overlay);
  
  // Define resources to load
  const resources = [
    // CSS files
    { type: 'css', url: 'https://dominik-migration-source.s3.ap-northeast-2.amazonaws.com/vendor/style.css' },
    { type: 'css', url: 'https://dominik-migration-source.s3.ap-northeast-2.amazonaws.com/vendor/font-awesome-4.7.0/css/font-awesome.min.css' },
    { type: 'css', url: 'https://cdn.jsdelivr.net/npm/spectrum-colorpicker2/dist/spectrum.min.css' },
    { type: 'css', url: 'https://dominik-migration-source.s3.ap-northeast-2.amazonaws.com/vendor/grapick.min.css' },
    
    // JS files
    { type: 'js', url: 'https://cdn.tailwindcss.com' },
    { type: 'js', url: 'https://code.jquery.com/jquery-3.5.1.min.js' },
    { type: 'js', url: 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.6.3/fabric.min.js' },
    { type: 'js', url: 'https://cdn.jsdelivr.net/npm/spectrum-colorpicker2/dist/spectrum.min.js' },
    { type: 'js', url: 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js' },
    { type: 'js', url: 'https://dominik-migration-source.s3.ap-northeast-2.amazonaws.com/vendor/grapick.min.js' },
    { type: 'js', url: 'https://dominik-migration-source.s3.ap-northeast-2.amazonaws.com/vendor/undo-redo-stack.js' },
    
    // Main bundle
    { type: 'js', url: 'https://dominik-migration-source.s3.ap-northeast-2.amazonaws.com/bundle.js' },
    { type: 'js', url: 'https://dominik-migration-source.s3.ap-northeast-2.amazonaws.com/app.js' }
  ];
  
  // Function to load a resource
  function loadResource(resource) {
    return new Promise((resolve, reject) => {
      let element;
      
      if (resource.type === 'css') {
        element = document.createElement('link');
        element.rel = 'stylesheet';
        element.href = resource.url;
      } else if (resource.type === 'js') {
        element = document.createElement('script');
        element.src = resource.url;
      }
      
      element.onload = () => resolve();
      element.onerror = () => reject(`Failed to load ${resource.url}`);
      
      document.head.appendChild(element);
    });
  }
  
  // Load all resources sequentially
  async function loadAllResources() {
    for (const resource of resources) {
      try {
        await loadResource(resource);
        console.log(`Loaded: ${resource.url}`);
      } catch (error) {
        console.error(error);
      }
    }
    
    // Initialize the editor after all resources are loaded
    if (typeof initImageEditor === 'function') {
      initImageEditor();
    } else {
      console.error('initImageEditor function not found');
    }
  }
  
  // Start loading resources
  loadAllResources();
});
