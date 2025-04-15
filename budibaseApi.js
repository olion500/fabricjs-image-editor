/**
 * Budibase API Integration
 */
(function () {
  'use strict';

  /**
   * Budibase API class
   */
  var BudibaseAPI = function () {
    this.baseUrl = 'https://cors-anywhere.herokuapp.com/https://budibase.app/api/public/v1';
    this.appId = 'app_olion_4e90f836bd7e44d5896eed3a8c72efec';
    this.tableId = 'ta_7ad95a76724549559ba4408fceecf7d2';
    this.apiKey = 'eb8720cd05afcc9418acfc3f5710b5fa-b80cdb8d6c925822935c963db8491f1aca170205a5b2576283eadbbe2f711a3f09025ca0b13c'

    this.initialize = async () => {}

    /**
     * Fetch data from Budibase table
     * @returns {Promise<Object>} Table data
     */
    this.fetchTableData = async () => {
      try {
        const response = await fetch(`${this.baseUrl}/tables/${this.tableId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'x-budibase-app-id': this.appId,
            'x-budibase-api-key': this.apiKey
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data from Budibase:', error);
        throw error;
      }
    }

    /**
     * Search for products in Budibase
     * @param {number} productNo - Product number to search for
     * @returns {Promise<Object>} Search results
     */
    this.searchProducts = async (productNo) => {
        try {
          const response = await fetch(`${this.baseUrl}/tables/${this.tableId}/rows/search`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-budibase-app-id': this.appId,
              'x-budibase-api-key': this.apiKey
            },
            body: JSON.stringify({
              query: {
                string: {
                  product_no: `${productNo}`
                }
              }
            })
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error searching products:', error);
          throw error;
        }
      }

    // Initialize when instance is created
    this.initialize();
  }

  // Attach to window object like ImageEditor
  window.BudibaseAPI = BudibaseAPI;
})(); 