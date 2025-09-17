# Generate sample data for Ayurvedic herb traceability system

Write-Host "🌿 Generating sample Ayurvedic herb traceability data..." -ForegroundColor Green

$baseUrl = "http://localhost:3000/api"

# Step 1: Create Collection Event
Write-Host "`n1. Recording herb collection..." -ForegroundColor Yellow

$collectionData = @{
    collectorId = "FARMER001"
    species = "Withania somnifera (Ashwagandha)"
    quantity = 30
    latitude = "16.8166"
    longitude = "74.5649"
    address = "Village: Jath, District: Sangli, Maharashtra"
    harvestMethod = "sustainable"
    organic = $true
    fairTrade = $true
} | ConvertTo-Json

$collectionResponse = Invoke-RestMethod -Uri "$baseUrl/collection" -Method Post -Body $collectionData -ContentType "application/json"
$batchId = $collectionResponse.batchId

Write-Host "   ✓ Batch ID: $batchId" -ForegroundColor Green
Write-Host "   ✓ Sustainability Score: $($collectionResponse.sustainabilityScore)/100" -ForegroundColor Green

Start-Sleep -Seconds 1

# Step 2: Processing
Write-Host "`n2. Recording processing (drying)..." -ForegroundColor Yellow

$processingData = @{
    batchId = $batchId
    facilityId = "PROC001"
    processType = "drying"
    temperature = 45
    duration = 8
    outputQuantity = 25
    notes = "Solar drying method"
} | ConvertTo-Json

$processingResponse = Invoke-RestMethod -Uri "$baseUrl/processing" -Method Post -Body $processingData -ContentType "application/json"
Write-Host "   ✓ Processing recorded" -ForegroundColor Green

Start-Sleep -Seconds 1

# Step 3: Quality Tests
Write-Host "`n3. Recording quality tests..." -ForegroundColor Yellow

# Moisture test
$moistureTest = @{
    batchId = $batchId
    labId = "LAB001"
    testType = "moisture"
    results = @{
        value = 6.7
        unit = "%"
    }
    certificate = "CERT-2024-MOI"
    passed = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "$baseUrl/quality-test" -Method Post -Body $moistureTest -ContentType "application/json" | Out-Null
Write-Host "   ✓ Moisture: 6.7%" -ForegroundColor Green

# Pesticide test
$pesticideTest = @{
    batchId = $batchId
    labId = "LAB001"
    testType = "pesticide"
    results = @{
        value = 0.01
        unit = "ppm"
    }
    certificate = "CERT-2024-PES"
    passed = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "$baseUrl/quality-test" -Method Post -Body $pesticideTest -ContentType "application/json" | Out-Null
Write-Host "   ✓ Pesticide: 0.01 ppm" -ForegroundColor Green

# Microbial test
$microbialTest = @{
    batchId = $batchId
    labId = "LAB001"
    testType = "microbial"
    results = @{
        value = 100
        unit = "CFU/g"
    }
    certificate = "CERT-2024-MIC"
    passed = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "$baseUrl/quality-test" -Method Post -Body $microbialTest -ContentType "application/json" | Out-Null
Write-Host "   ✓ Microbial analysis completed" -ForegroundColor Green

Start-Sleep -Seconds 1

# Step 4: Create Product
Write-Host "`n4. Creating final product..." -ForegroundColor Yellow

$productData = @{
    name = "Premium Organic Ashwagandha Powder 100g"
    manufacturerId = "MFG001"
    ingredients = @(
        @{
            name = "Organic Ashwagandha Root Powder"
            sourceBatchId = $batchId
            percentage = 100
        }
    )
    manufacturingDate = "2024-03-15"
    expiryDate = "2026-03-15"
} | ConvertTo-Json

$productResponse = Invoke-RestMethod -Uri "$baseUrl/product" -Method Post -Body $productData -ContentType "application/json"

Write-Host "   ✓ Product ID: $($productResponse.productId)" -ForegroundColor Green
Write-Host "   ✓ QR Code: $($productResponse.qrCode)" -ForegroundColor Green

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "✅ Sample data generation complete!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "`n📱 Product QR Code: $($productResponse.qrCode)" -ForegroundColor Yellow
Write-Host "`n🔍 To verify this product:" -ForegroundColor Yellow
Write-Host "   1. Go to http://localhost:3000/verify-new.html" -ForegroundColor White
Write-Host "   2. Enter: $($productResponse.qrCode)" -ForegroundColor White
Write-Host "   3. Click 'Verify' to see the complete journey!" -ForegroundColor White
Write-Host ""