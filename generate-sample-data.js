// Use the native http module for making requests
const http = require('http');

const API_URL = 'http://localhost:3000/api';

// Helper function to make POST requests
function postData(endpoint, data) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(data);
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: `/api/${endpoint}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(responseData));
                } catch (e) {
                    resolve(responseData);
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.write(postData);
        req.end();
    });
}

async function generateSampleData() {
    console.log('🌿 Generating sample Ayurvedic herb traceability data...\n');

    try {
        // Step 1: Record Collection Event
        console.log('1. Recording herb collection...');
        const collectionData = {
            collectorId: 'FARMER001',
            species: 'Withania somnifera (Ashwagandha)',
            quantity: 30,
            latitude: '26.4499',  // Sangli, Maharashtra coordinates
            longitude: '74.5649',
            address: 'Village: Jath, District: Sangli, Maharashtra',
            harvestMethod: 'sustainable',
            organic: true,
            fairTrade: true
        };

        const collectionResult = await postData('collection', collectionData);
        const batchId = collectionResult.batchId;
        console.log(`   ✓ Collection recorded. Batch ID: ${batchId}`);
        console.log(`   ✓ Sustainability Score: ${collectionResult.sustainabilityScore}/100`);

        // Wait a bit to simulate time passing
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Step 2: Processing Step - Drying
        console.log('\n2. Recording processing (drying)...');
        const processingData = {
            batchId: batchId,
            facilityId: 'PROC001',
            processType: 'drying',
            temperature: 45,
            duration: 8,
            outputQuantity: 25,
            notes: 'Solar drying method used for optimal preservation'
        };

        const processingResult = await postData('processing', processingData);
        console.log(`   ✓ Processing recorded. ID: ${processingResult.processingId}`);

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Step 3: Quality Test - Moisture
        console.log('\n3. Recording quality tests...');
        const moistureTest = {
            batchId: batchId,
            labId: 'LAB001',
            testType: 'moisture',
            results: {
                value: 6.7,
                unit: '%'
            },
            certificate: 'CERT-2024-03-15-MOI',
            passed: true
        };

        const moistureResult = await postData('quality-test', moistureTest);
        console.log(`   ✓ Moisture test recorded: 6.7%`);

        // Quality Test - Pesticide
        const pesticideTest = {
            batchId: batchId,
            labId: 'LAB001',
            testType: 'pesticide',
            results: {
                value: 0.01,
                unit: 'ppm'
            },
            certificate: 'CERT-2024-03-16-PES',
            passed: true
        };

        const pesticideResult = await postData('quality-test', pesticideTest);
        console.log(`   ✓ Pesticide test recorded: 0.01 ppm`);

        // Quality Test - Microbial
        const microbialTest = {
            batchId: batchId,
            labId: 'LAB001',
            testType: 'microbial',
            results: {
                value: 100,
                unit: 'CFU/g'
            },
            certificate: 'CERT-2024-03-16-MIC',
            passed: true
        };

        const microbialResult = await postData('quality-test', microbialTest);
        console.log(`   ✓ Microbial analysis recorded`);

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Step 4: Create Final Product
        console.log('\n4. Creating final product...');
        const productData = {
            name: 'Premium Ashwagandha Powder 100g',
            manufacturerId: 'MFG001',
            ingredients: [{
                name: 'Ashwagandha Root Powder',
                sourceBatchId: batchId,
                percentage: 100
            }],
            manufacturingDate: '2024-03-15',
            expiryDate: '2026-03-15'
        };

        const productResult = await postData('product', productData);
        console.log(`   ✓ Product created successfully!`);
        console.log(`   ✓ Product ID: ${productResult.productId}`);
        console.log(`   ✓ QR Code: ${productResult.qrCode}`);

        // Create special product with ID MER902100
        console.log('\n5. Creating special product MER902100...');
        const specialProductData = {
            name: 'Certified Organic Ashwagandha 100g',
            manufacturerId: 'MFG001',
            ingredients: [{
                name: 'Organic Ashwagandha',
                sourceBatchId: batchId,
                percentage: 100
            }],
            manufacturingDate: '2024-03-15',
            expiryDate: '2026-03-15'
        };

        const specialResult = await postData('product', specialProductData);
        console.log(`   ✓ Special product created!`);
        console.log(`   ✓ Product ID: ${specialResult.productId}`);

        console.log('\n' + '='.repeat(60));
        console.log('✅ Sample data generation complete!');
        console.log('='.repeat(60));
        console.log('\n📱 You can now verify products using these QR codes:');
        console.log(`   1. ${productResult.qrCode} - Premium Ashwagandha`);
        console.log(`   2. ${specialResult.qrCode} - Organic Ashwagandha`);
        console.log('\n🔍 To verify: Go to http://localhost:3000/verify.html');
        console.log('   and enter one of the QR codes above.\n');

        return {
            batchId,
            productId: productResult.productId,
            qrCode: productResult.qrCode,
            specialQrCode: specialResult.qrCode
        };

    } catch (error) {
        console.error('❌ Error generating sample data:', error.message);
        console.error('Make sure the server is running (npm start)');
    }
}

// Run the script
generateSampleData();