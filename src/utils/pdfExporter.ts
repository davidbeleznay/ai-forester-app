import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';
import { CulvertFieldCard } from './storage';
import { formatCoordinates } from '../config/location';

/**
 * Generate and share a PDF report for a Culvert Field Card
 * Note: This is a simplified implementation using HTML to generate a PDF
 * In a production app, you might want to use a more robust solution like react-native-html-to-pdf
 * 
 * @param fieldCard - The culvert field card data
 */
export const generateCulvertPdfReport = async (fieldCard: CulvertFieldCard): Promise<void> => {
  try {
    // Create filename based on the field card name and date
    const sanitizedName = fieldCard.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const timestamp = new Date().toISOString().replace(/:/g, '-').substring(0, 19);
    const filename = `culvert_${sanitizedName}_${timestamp}.html`;
    
    // Generate HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Culvert Sizing Report - ${fieldCard.name}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            color: #333;
            line-height: 1.6;
          }
          h1 { 
            color: #2F855A; 
            font-size: 24px; 
            border-bottom: 2px solid #2F855A; 
            padding-bottom: 10px;
          }
          h2 { 
            color: #2D3748; 
            font-size: 18px; 
            margin-top: 20px; 
          }
          .section { 
            margin-bottom: 25px; 
            padding: 15px; 
            background-color: #F7FAFC; 
            border-radius: 5px;
          }
          .highlight {
            background-color: #C6F6D5;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            margin: 20px 0;
          }
          .highlight h2 {
            margin-top: 0;
            color: #2F855A;
          }
          .highlight .size {
            font-size: 32px;
            font-weight: bold;
            color: #2F855A;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #E2E8F0;
          }
          th {
            background-color: #EDF2F7;
            font-weight: bold;
          }
          .logo {
            text-align: center;
            margin-bottom: 20px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #718096;
            border-top: 1px solid #E2E8F0;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="logo">
          <h1>AI Forester Field Companion</h1>
        </div>
        
        <div class="highlight">
          <h2>Recommended Culvert Size</h2>
          <div class="size">${fieldCard.results.recommendedSize} mm</div>
          <p>Based on ${fieldCard.results.method}</p>
        </div>
        
        <div class="section">
          <h2>Field Card Information</h2>
          <table>
            <tr>
              <th>Name</th>
              <td>${fieldCard.name}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>${fieldCard.date}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>${fieldCard.location ? formatCoordinates(fieldCard.location.latitude, fieldCard.location.longitude) : 'Not recorded'}</td>
            </tr>
            ${fieldCard.location?.name ? `
            <tr>
              <th>Location Name</th>
              <td>${fieldCard.location.name}</td>
            </tr>` : ''}
          </table>
        </div>
        
        <div class="section">
          <h2>Input Parameters</h2>
          <table>
            <tr>
              <th>Drainage Area</th>
              <td>${fieldCard.drainageArea} hectares</td>
            </tr>
            <tr>
              <th>Stream Gradient</th>
              <td>${fieldCard.streamGradient}%</td>
            </tr>
            <tr>
              <th>Region</th>
              <td>${fieldCard.region}</td>
            </tr>
            <tr>
              <th>Culvert Material</th>
              <td>${fieldCard.culvertMaterial}</td>
            </tr>
          </table>
        </div>
        
        <div class="section">
          <h2>Stream Geometry</h2>
          <table>
            <tr>
              <th>Average Top Width (W1)</th>
              <td>${fieldCard.streamGeometry.averageTopWidth.toFixed(2)} m</td>
            </tr>
            <tr>
              <th>Bottom Width (W2)</th>
              <td>${fieldCard.streamGeometry.bottomWidth.toFixed(2)} m</td>
            </tr>
            <tr>
              <th>Average Depth</th>
              <td>${fieldCard.streamGeometry.averageDepth.toFixed(2)} m</td>
            </tr>
            <tr>
              <th>Cross-sectional Area</th>
              <td>${fieldCard.streamGeometry.crossSectionalArea.toFixed(2)} m²</td>
            </tr>
            <tr>
              <th>Width-to-Depth Ratio</th>
              <td>${fieldCard.streamGeometry.widthToDepthRatio.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        
        ${fieldCard.climateFactors ? `
        <div class="section">
          <h2>Climate Factors</h2>
          <table>
            <tr>
              <th>Projected Rainfall (${fieldCard.climateFactors.year})</th>
              <td>${fieldCard.climateFactors.projectedRainfall} mm/hr</td>
            </tr>
          </table>
        </div>` : ''}
        
        <div class="section">
          <h2>Results</h2>
          <table>
            <tr>
              <th>Method Used</th>
              <td>${fieldCard.results.method}</td>
            </tr>
            ${fieldCard.transportabilityUsed ? `
            <tr>
              <th>Transportability Size</th>
              <td>${fieldCard.results.transportabilitySize} mm</td>
            </tr>` : ''}
            <tr>
              <th>Safety Factor</th>
              <td>${fieldCard.results.safetyFactor}</td>
            </tr>
            <tr>
              <th>Controlling Factor</th>
              <td>${fieldCard.results.controllingFactor === 'inlet' ? 'Inlet Control' : 'Outlet Control'}</td>
            </tr>
          </table>
        </div>
        
        <div class="footer">
          <p>Generated by AI Forester Field Companion on ${new Date().toLocaleDateString()}</p>
          <p>www.aiforester.com</p>
        </div>
      </body>
      </html>
    `;
    
    // Save HTML to a temporary file
    const fileUri = `${FileSystem.documentDirectory}${filename}`;
    await FileSystem.writeAsStringAsync(fileUri, htmlContent);
    
    // Share the file
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      console.error('Sharing is not available on this device');
      // You might want to implement a fallback here, like saving to downloads folder
    }
  } catch (error) {
    console.error('Error generating PDF report:', error);
    throw error;
  }
};

/**
 * Export all field cards to a CSV file
 * @param fieldCards - Array of field cards to export
 */
export const exportAllFieldCardsToCSV = async (fieldCards: any[]): Promise<void> => {
  try {
    if (fieldCards.length === 0) {
      throw new Error('No field cards to export');
    }
    
    // Create timestamp for filename
    const timestamp = new Date().toISOString().replace(/:/g, '-').substring(0, 19);
    const filename = `ai_forester_field_cards_${timestamp}.csv`;
    
    // Create CSV header based on the first field card
    const firstCard = fieldCards[0];
    const headers = Object.keys(firstCard).filter(key => 
      typeof firstCard[key] !== 'object' || firstCard[key] === null
    );
    
    // Add location columns if they exist
    if (firstCard.location) {
      headers.push('latitude', 'longitude', 'locationName');
    }
    
    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    
    // Add data rows
    fieldCards.forEach(card => {
      const row = headers.map(header => {
        if (header === 'latitude' && card.location) {
          return card.location.latitude || '';
        }
        if (header === 'longitude' && card.location) {
          return card.location.longitude || '';
        }
        if (header === 'locationName' && card.location) {
          return card.location.name || '';
        }
        
        // Handle regular fields
        if (typeof card[header] === 'object' && card[header] !== null) {
          return ''; // Skip objects/arrays
        }
        
        // Escape commas and quotes in string values
        if (typeof card[header] === 'string') {
          return `"${card[header].replace(/"/g, '""')}"`;
        }
        
        return card[header] || '';
      });
      
      csvContent += row.join(',') + '\n';
    });
    
    // Save CSV to a temporary file
    const fileUri = `${FileSystem.documentDirectory}${filename}`;
    await FileSystem.writeAsStringAsync(fileUri, csvContent);
    
    // Share the file
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      console.error('Sharing is not available on this device');
    }
  } catch (error) {
    console.error('Error exporting field cards to CSV:', error);
    throw error;
  }
};