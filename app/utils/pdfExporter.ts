import { CulvertFieldCard } from './storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

/**
 * Generate an HTML template for the culvert field card report
 * @param fieldCard The field card data to include in the report
 * @returns HTML string for the report
 */
const generateReportHtml = (fieldCard: CulvertFieldCard): string => {
  const {
    id,
    timestamp,
    location,
    inputValues,
    drainage,
    recommendedSize,
    capacity,
    notes,
  } = fieldCard;

  const dateFormat = new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const timeFormat = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Format measurements if they exist
  const measurementsHtml = inputValues.measurements?.map((m, index) => `
    <tr>
      <td>Measurement ${index + 1}</td>
      <td>${m.width.toFixed(2)} m</td>
      <td>${m.depth.toFixed(2)} m</td>
    </tr>
  `).join('') || '';

  // Format culvert size based on type
  const culvertSizeHtml = recommendedSize.type === 'round'
    ? `<strong>Diameter:</strong> ${(recommendedSize.diameter / 1000).toFixed(2)} m (${recommendedSize.diameter} mm)`
    : `<strong>Width:</strong> ${(recommendedSize.width! / 1000).toFixed(2)} m (${recommendedSize.width} mm)<br>
       <strong>Height:</strong> ${(recommendedSize.height! / 1000).toFixed(2)} m (${recommendedSize.height} mm)`;

  // Generate the HTML template
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Culvert Sizing Field Card</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
          border-bottom: 2px solid #4CAF50;
          padding-bottom: 10px;
        }
        .header h1 {
          color: #2E7D32;
          margin-bottom: 5px;
        }
        .header p {
          color: #555;
          margin-top: 0;
        }
        .section {
          margin-bottom: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 15px;
        }
        .section h2 {
          margin-top: 0;
          color: #2E7D32;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        table, th, td {
          border: 1px solid #ddd;
        }
        th, td {
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .result {
          font-size: 1.2em;
          color: #2E7D32;
          font-weight: bold;
        }
        .warning {
          color: #ff9800;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 0.8em;
          color: #777;
          border-top: 1px solid #ddd;
          padding-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Culvert Sizing Field Card</h1>
        <p>Generated on ${dateFormat} at ${timeFormat}</p>
      </div>

      <div class="section">
        <h2>Location Information</h2>
        <table>
          <tr>
            <th>Field Card ID</th>
            <td>${id}</td>
          </tr>
          ${location ? `
          <tr>
            <th>Coordinates</th>
            <td>${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}</td>
          </tr>
          <tr>
            <th>GPS Accuracy</th>
            <td>${location.accuracy.toFixed(1)} m</td>
          </tr>
          ` : '<tr><th>Location</th><td>Not recorded</td></tr>'}
        </table>
      </div>

      <div class="section">
        <h2>Input Parameters</h2>
        <table>
          <tr>
            <th>Watershed Area</th>
            <td>${inputValues.basinArea.toFixed(2)} km²</td>
          </tr>
          <tr>
            <th>Precipitation Region</th>
            <td>${inputValues.precipitationRegion}</td>
          </tr>
          <tr>
            <th>Road Type</th>
            <td>${inputValues.roadType}</td>
          </tr>
          <tr>
            <th>Stream Type</th>
            <td>${inputValues.streamType}</td>
          </tr>
          <tr>
            <th>Stream Gradient</th>
            <td>${inputValues.gradient.toFixed(1)}%</td>
          </tr>
          <tr>
            <th>Road Width</th>
            <td>${inputValues.roadWidth.toFixed(1)} m</td>
          </tr>
        </table>

        ${inputValues.measurements && inputValues.measurements.length > 0 ? `
        <h3>Stream Measurements</h3>
        <table>
          <tr>
            <th>Measurement</th>
            <th>Width</th>
            <th>Depth</th>
          </tr>
          ${measurementsHtml}
        </table>
        ` : ''}
      </div>

      <div class="section">
        <h2>Hydrology Analysis</h2>
        <table>
          <tr>
            <th>Q100 Flow Rate</th>
            <td>${drainage.peakFlow.toFixed(2)} m³/s</td>
          </tr>
          <tr>
            <th>Calculation Method</th>
            <td>${drainage.method}</td>
          </tr>
          ${drainage.climateProjection ? `
          <tr>
            <th>Climate Adjustment</th>
            <td>+${drainage.climateProjection}%</td>
          </tr>
          ` : ''}
        </table>
      </div>

      <div class="section">
        <h2>Results and Recommendations</h2>
        <p>Based on the analysis, the recommended culvert size is:</p>
        <p class="result">
          ${recommendedSize.type.charAt(0).toUpperCase() + recommendedSize.type.slice(1)} Culvert<br>
          ${culvertSizeHtml}
        </p>
        
        ${!recommendedSize.transportable ? `
        <p class="warning">
          <strong>Note:</strong> Due to access limitations, multiple smaller culverts may be required for installation.
        </p>
        ` : ''}

        <h3>Culvert Performance</h3>
        <table>
          <tr>
            <th>Maximum Flow Capacity</th>
            <td>${capacity.maxFlow.toFixed(2)} m³/s</td>
          </tr>
          <tr>
            <th>Flow Velocity</th>
            <td>${capacity.velocity.toFixed(2)} m/s</td>
          </tr>
        </table>
      </div>

      ${notes ? `
      <div class="section">
        <h2>Field Notes</h2>
        <p>${notes.replace(/\n/g, '<br>')}</p>
      </div>
      ` : ''}

      <div class="footer">
        <p>Generated by AI-Forester-App | &copy; ${new Date().getFullYear()}</p>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate a PDF report for a culvert field card and share it
 * @param fieldCard The field card to generate a report for
 */
export const generateCulvertPdfReport = async (fieldCard: CulvertFieldCard): Promise<void> => {
  try {
    // Generate the HTML content
    const htmlContent = generateReportHtml(fieldCard);
    
    // Generate a PDF from the HTML
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });
    
    // Format a filename based on the field card ID and date
    const date = new Date(fieldCard.timestamp);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const filename = `culvert-sizing_${formattedDate}_${fieldCard.id.substring(0, 8)}.pdf`;
    
    // Copy the file to a sharable location with the formatted filename
    const shareableUri = FileSystem.documentDirectory + filename;
    await FileSystem.copyAsync({
      from: uri,
      to: shareableUri,
    });
    
    // Check if sharing is available
    const isSharingAvailable = await Sharing.isAvailableAsync();
    
    if (isSharingAvailable) {
      // Share the PDF
      await Sharing.shareAsync(shareableUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share Culvert Sizing Report',
        UTI: 'com.adobe.pdf',
      });
    } else {
      throw new Error('Sharing is not available on this device');
    }
  } catch (error) {
    console.error('Error generating PDF report:', error);
    throw new Error('Failed to generate and share PDF report');
  }
};