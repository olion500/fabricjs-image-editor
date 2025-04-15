// Import all your JS files
import './lib/core.js';
import './lib/toolbar.js';
import './lib/canvas.js';
import './lib/shapes.js';
import './lib/fontfamily.js';
import './lib/freeDrawSettings.js';
import './lib/canvasSettings.js';
import './lib/selectionSettings.js';
import './lib/drawingLine.js';
import './lib/drawingPath.js';
import './lib/drawingText.js';
import './lib/tip.js';
import './lib/upload.js';
import './lib/copyPaste.js';
import './lib/zoom.js';
import './lib/saveInBrowser.js';
import './budibaseApi.js';

// Your initialization code
document.addEventListener('DOMContentLoaded', function() {
  // Initialize your editor
  try {
    // define toolbar buttons to show
    // if this value is undefined or its length is 0, default toolbar buttons will be shown
    const buttons = [
      'clear',
      'color',
      'textbox',
      'shapes',
      'upload',
      // 'select',
      // 'draw',
      // 'line',
      // 'path',
      // 'background',
      // 'redo',
      'save',
      // 'download',
      // 'clear'
    ];
  
    var imgEditor = new ImageEditor('#image-editor-container', buttons, []);
    console.log('initialize image editor');
  
    // Initialize the API and fetch data in an async function
    async function initBudibase() {
      const budibaseApi = new BudibaseAPI();
      
      try {
        // Get product_no from URL query parameters
        // const urlParams = new URLSearchParams(window.location.search);
        // const productNo = urlParams.get('product_no') || 35;
        const pathname = window.location.pathname;
        const matches = pathname.match(/\/(\d+)\//);
        const productNo = matches ? parseInt(matches[1]) : 35;
  
        console.log(matches);
        console.log('Product No:', productNo);
        
        // Search for product
        const searchResults = await budibaseApi.searchProducts(productNo);
        console.log('Search results:', searchResults);
  
        // // Set the background image if product data exists
        // if (searchResults.data && searchResults.data.length > 0) {
        //   const product = searchResults.data[0];
        //   const canvasContainer = document.querySelector('.canvas-container');
          
        //   if (canvasContainer && product.front && product.front.url) {
        //     canvasContainer.style.backgroundImage = `url('${product.front.url}')`;
        //     canvasContainer.classList.add('with-product-image');
  
        //     img.onload = () => {
        //       // Clear the canvas first
        //       const canvas= document.querySelector('#c');
        //       const ctx = canvas.getContext('2d');
        //       ctx.clearRect(0, 0, canvas.width, canvas.height);
              
        //       // Calculate scaling to fit while maintaining aspect ratio
        //       const scale = Math.min(
        //         canvas.width / img.width,
        //         canvas.height / img.height
        //       );
              
        //       // Calculate centered position
        //       const x = (canvas.width - img.width * scale) / 2;
        //       const y = (canvas.height - img.height * scale) / 2;
              
        //       // Draw the image centered and scaled
        //       ctx.drawImage(
        //         img,
        //         x, y,
        //         img.width * scale,
        //         img.height * scale
        //       );
        //     };
            
        //     img.src = product.front.url;
        //   }
        // }
  
      } catch (error) {
        console.error('Failed to interact with Budibase:', error);
      }
    }
  
    // Call the async function
    initBudibase();
  
  } catch (_) {
    const browserWarning = document.createElement('div')
    browserWarning.innerHTML = '<p style="line-height: 26px; margin-top: 100px; font-size: 16px; color: #555">Your browser is out of date!<br/>Please update to a modern browser, for example:<a href="https://www.google.com/chrome/" target="_blank">Chrome</a>!</p>';
  
    browserWarning.setAttribute(
      'style',
      'position: fixed; z-index: 1000; width: 100%; height: 100%; top: 0; left: 0; background-color: #f9f9f9; text-align: center; color: #555;'
    )
  
    // check for flex and grid support
    let divGrid = document.createElement('div')
    divGrid.style['display'] = 'grid'
    let supportsGrid = divGrid.style['display'] === 'grid'
  
    let divFlex = document.createElement('div')
    divFlex.style['display'] = 'flex'
    let supportsFlex = divFlex.style['display'] === 'flex'
  
    if (!supportsGrid || !supportsFlex) {
      document.body.appendChild(browserWarning)
    }
  }
});
